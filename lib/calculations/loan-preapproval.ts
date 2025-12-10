/**
 * Loan Pre-Approval Calculator
 * Calculates loan eligibility based on financial data
 */

import type { Account, Loan, Transaction } from '@/lib/types'

export interface LoanPreApprovalInput {
  requestedAmount: number
  requestedTerm: number // months
  accounts: Account[]
  existingLoans: Loan[]
  transactions: Transaction[]
  monthlyIncome?: number // If not provided, will be estimated from transactions
  creditScore?: number // If not provided, will use default of 700
}

export interface LoanPreApprovalResult {
  approved: boolean
  monthlyPayment: number
  interestRate: number
  totalInterest: number
  totalRepayment: number
  dtiRatio: number
  dtiPercentage: number
  strengths: string[]
  concerns: string[]
  conditions: string[]
  maxLoanAmount?: number
  requestedAmount: number
  requestedTerm: number
}

/**
 * Analyzes loan pre-approval eligibility
 */
export function analyzeLoanPreApproval(input: LoanPreApprovalInput): LoanPreApprovalResult {
  const {
    requestedAmount,
    requestedTerm,
    accounts,
    existingLoans,
    transactions,
    monthlyIncome: providedIncome,
    creditScore = 700
  } = input

  // Calculate monthly income (from transactions or provided)
  const monthlyIncome = providedIncome || estimateMonthlyIncome(transactions)

  // Calculate existing monthly debt payments
  const existingMonthlyDebt = existingLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0)

  // Determine interest rate based on credit score
  const interestRate = determineInterestRate(creditScore)

  // Calculate proposed monthly payment
  const proposedMonthlyPayment = calculateMonthlyPayment(requestedAmount, interestRate, requestedTerm)

  // Calculate total monthly debt (existing + proposed)
  const totalMonthlyDebt = existingMonthlyDebt + proposedMonthlyPayment

  // Calculate DTI ratio
  const dtiRatio = calculateDTI(totalMonthlyDebt, monthlyIncome)
  const dtiPercentage = Math.round(dtiRatio * 100)

  // Calculate total interest and repayment
  const totalRepayment = proposedMonthlyPayment * requestedTerm
  const totalInterest = totalRepayment - requestedAmount

  // Determine approval
  const maxDTI = 0.50 // 50% maximum DTI as per lending policy
  const approved = dtiRatio <= maxDTI && monthlyIncome > 0

  // Calculate maximum loan amount user can afford
  const maxAffordableDebt = monthlyIncome * maxDTI
  const maxLoanAmount = calculateMaxLoanAmount(
    maxAffordableDebt - existingMonthlyDebt,
    interestRate,
    requestedTerm
  )

  // Build strengths, concerns, and conditions
  const strengths: string[] = []
  const concerns: string[] = []
  const conditions: string[] = []

  // Analyze strengths
  if (dtiRatio < 0.35) {
    strengths.push('Excellent debt-to-income ratio - well below 35%')
  } else if (dtiRatio < 0.42) {
    strengths.push('Good debt-to-income ratio - comfortably within guidelines')
  }

  if (creditScore >= 750) {
    strengths.push('Excellent credit score qualifies for best rates')
  } else if (creditScore >= 700) {
    strengths.push('Good credit score')
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  if (totalBalance > requestedAmount * 0.1) {
    strengths.push(`Strong cash reserves (${formatCurrency(totalBalance, 'AED')})`)
  }

  // Analyze income stability
  const hasRegularIncome = checkIncomeStability(transactions)
  if (hasRegularIncome) {
    strengths.push('Regular income detected over past 6 months')
  }

  // Analyze concerns
  if (dtiRatio > 0.45) {
    concerns.push(`High DTI ratio at ${dtiPercentage}% - near maximum threshold of 50%`)
  } else if (dtiRatio > 0.40) {
    concerns.push(`DTI ratio at ${dtiPercentage}% - approaching upper limit`)
  }

  if (creditScore < 650) {
    concerns.push('Credit score below optimal range - higher interest rate applied')
  }

  if (requestedAmount > maxLoanAmount) {
    concerns.push(`Requested amount exceeds recommended maximum of ${formatCurrency(maxLoanAmount, 'AED')}`)
  }

  if (existingLoans.length >= 3) {
    concerns.push(`Multiple existing loans (${existingLoans.length}) - debt consolidation recommended`)
  }

  if (!hasRegularIncome) {
    concerns.push('Irregular income pattern detected')
  }

  // Add conditions
  if (approved) {
    conditions.push('Subject to identity verification and document submission')
    conditions.push('Final approval subject to credit bureau report')
    
    if (requestedAmount > 100000) {
      conditions.push('Salary assignment or collateral may be required')
    }

    if (dtiRatio > 0.40) {
      conditions.push('May require additional income proof or guarantor')
    }
  }

  return {
    approved,
    monthlyPayment: proposedMonthlyPayment,
    interestRate,
    totalInterest,
    totalRepayment,
    dtiRatio,
    dtiPercentage,
    strengths,
    concerns,
    conditions,
    maxLoanAmount: approved ? maxLoanAmount : undefined,
    requestedAmount,
    requestedTerm
  }
}

/**
 * Calculate monthly payment using loan amortization formula
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12
  
  if (monthlyRate === 0) {
    return principal / termMonths
  }
  
  const payment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  
  return Math.round(payment * 100) / 100
}

/**
 * Calculate debt-to-income ratio
 */
export function calculateDTI(monthlyDebt: number, monthlyIncome: number): number {
  if (monthlyIncome === 0) return 1.0
  return monthlyDebt / monthlyIncome
}

/**
 * Determine interest rate based on credit score
 */
export function determineInterestRate(creditScore: number): number {
  if (creditScore >= 750) return 4.99 // Excellent
  if (creditScore >= 700) return 5.99 // Good
  if (creditScore >= 650) return 7.49 // Fair
  return 9.99 // Poor
}

/**
 * Calculate total interest over loan term
 */
export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termMonths)
  const totalRepayment = monthlyPayment * termMonths
  return totalRepayment - principal
}

/**
 * Calculate maximum loan amount affordable given monthly payment budget
 */
function calculateMaxLoanAmount(
  maxMonthlyPayment: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12
  
  if (monthlyRate === 0) {
    return maxMonthlyPayment * termMonths
  }
  
  const maxPrincipal = maxMonthlyPayment * 
    (Math.pow(1 + monthlyRate, termMonths) - 1) /
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths))
  
  return Math.round(maxPrincipal)
}

/**
 * Estimate monthly income from salary transactions
 */
function estimateMonthlyIncome(transactions: Transaction[]): number {
  // Find salary/income transactions
  const salaryTransactions = transactions.filter(tx => 
    tx.type === 'credit' && 
    (tx.category === 'salary' || 
     tx.description.toLowerCase().includes('salary') ||
     tx.description.toLowerCase().includes('income'))
  )

  if (salaryTransactions.length === 0) {
    return 0
  }

  // Calculate average monthly salary from last 3 months
  const recentSalaries = salaryTransactions
    .slice(0, 3)
    .map(tx => tx.amount)

  const avgSalary = recentSalaries.reduce((sum, amt) => sum + amt, 0) / recentSalaries.length
  
  return Math.round(avgSalary)
}

/**
 * Check if user has stable income (regular salary credits)
 */
function checkIncomeStability(transactions: Transaction[]): boolean {
  const salaryTransactions = transactions.filter(tx => 
    tx.type === 'credit' && 
    (tx.category === 'salary' || 
     tx.description.toLowerCase().includes('salary'))
  )

  // Check if we have at least 3 salary transactions in the data
  return salaryTransactions.length >= 3
}

/**
 * Helper to format currency
 */
function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

