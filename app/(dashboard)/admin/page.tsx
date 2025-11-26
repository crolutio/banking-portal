"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRole } from "@/lib/role-context"
import { policies } from "@/lib/mock-data"
import { Shield, FileText, Bot, Save, Plus, Edit, Trash2, Lock, EyeOff, Globe } from "lucide-react"

// Mock RBAC matrix
const rbacMatrix = [
  { resource: "Account Balances", customer: true, rm: true, risk: true, admin: true },
  { resource: "Transaction History", customer: true, rm: true, risk: true, admin: true },
  { resource: "Customer PII", customer: true, rm: false, risk: true, admin: true },
  { resource: "Full IBAN/Account Numbers", customer: true, rm: false, risk: true, admin: true },
  { resource: "CRM Notes", customer: false, rm: true, risk: true, admin: true },
  { resource: "Risk Alerts", customer: false, rm: false, risk: true, admin: true },
  { resource: "Audit Logs", customer: false, rm: false, risk: true, admin: true },
  { resource: "Policy Configuration", customer: false, rm: false, risk: false, admin: true },
  { resource: "AI Guardrails", customer: false, rm: false, risk: false, admin: true },
]

// Mock integrations
const integrations = [
  { id: "core_banking", name: "Core Banking System", status: "connected", lastSync: "2 minutes ago" },
  { id: "crm", name: "CRM Platform", status: "connected", lastSync: "5 minutes ago" },
  { id: "kyc_vendor", name: "KYC Verification Service", status: "connected", lastSync: "1 hour ago" },
  { id: "fraud_engine", name: "Fraud Detection Engine", status: "connected", lastSync: "Real-time" },
  { id: "swift", name: "SWIFT Network", status: "connected", lastSync: "Live" },
  { id: "card_processor", name: "Card Processor", status: "maintenance", lastSync: "Scheduled maintenance" },
]

// AI Guardrails config
const aiGuardrails = {
  requireCitations: true,
  restrictedTopics: ["Investment advice", "Tax advice", "Legal recommendations", "Competitor comparisons"],
  escalationTriggers: ["Complaint", "Regulatory inquiry", "Legal threat", "Fraud claim"],
  piiMaskingDefault: true,
  confidenceThreshold: 0.7,
}

export default function AdminPage() {
  const { role } = useRole()
  const [selectedPolicy, setSelectedPolicy] = useState<(typeof policies)[0] | null>(null)
  const [guardrailSettings, setGuardrailSettings] = useState(aiGuardrails)

  // Check if user has access
  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">The Admin Console is only available to Admin users.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground">System configuration, policies, and permissions management</p>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="products">Products & Fees</TabsTrigger>
          <TabsTrigger value="policies">Policy Studio</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="guardrails">AI Guardrails</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Products & Fees Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Configuration</CardTitle>
                  <CardDescription>Manage banking products and fee structures</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Monthly Fee</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Current Account</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>AED 25</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Premium Savings</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>Free</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Visa Infinite</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>AED 500/year</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Personal Loan</TableCell>
                    <TableCell>Lending</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>5.99% APR</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policy Studio Tab */}
        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Policies</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-4 pb-4 space-y-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPolicy?.id === policy.id ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedPolicy(policy)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{policy.title}</p>
                          <p className="text-xs text-muted-foreground">v{policy.version}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {policy.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              {selectedPolicy ? (
                <>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedPolicy.title}</CardTitle>
                        <CardDescription>
                          Version {selectedPolicy.version} • Effective {selectedPolicy.effectiveDate}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Test Sandbox
                        </Button>
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Policy Content (Markdown)</Label>
                        <Textarea className="mt-1 font-mono text-sm h-64" defaultValue={selectedPolicy.content} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Category: {selectedPolicy.category}</span>
                        <span>•</span>
                        <span>Last modified: {selectedPolicy.effectiveDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center h-96 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Select a Policy</h3>
                  <p className="text-sm text-muted-foreground">Choose a policy to edit or create a new one</p>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Role-Based Access Control
              </CardTitle>
              <CardDescription>Configure data access permissions for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead className="text-center">Customer</TableHead>
                    <TableHead className="text-center">RM</TableHead>
                    <TableHead className="text-center">Risk</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rbacMatrix.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.resource}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={row.customer} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={row.rm} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={row.risk} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={row.admin} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Permissions
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeOff className="h-5 w-5" />
                PII Masking Rules
              </CardTitle>
              <CardDescription>Configure automatic data masking for sensitive information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Default PII Masking</p>
                    <p className="text-sm text-muted-foreground">Mask sensitive data in AI responses by default</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Full Account Number Masking</p>
                    <p className="text-sm text-muted-foreground">Show only last 4 digits of account numbers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">IBAN Partial Display</p>
                    <p className="text-sm text-muted-foreground">Mask middle portion of IBAN numbers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Guardrails Tab */}
        <TabsContent value="guardrails" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Safety & Compliance
              </CardTitle>
              <CardDescription>Configure AI behavior, restrictions, and escalation rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Require Citations</p>
                      <p className="text-sm text-muted-foreground">All AI responses must include source citations</p>
                    </div>
                    <Switch
                      checked={guardrailSettings.requireCitations}
                      onCheckedChange={(v) => setGuardrailSettings((s) => ({ ...s, requireCitations: v }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Default PII Masking</p>
                      <p className="text-sm text-muted-foreground">Mask sensitive data in AI responses</p>
                    </div>
                    <Switch
                      checked={guardrailSettings.piiMaskingDefault}
                      onCheckedChange={(v) => setGuardrailSettings((s) => ({ ...s, piiMaskingDefault: v }))}
                    />
                  </div>
                  <div className="p-4 rounded-lg border">
                    <Label>Confidence Threshold</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Minimum confidence level for AI responses (below this triggers escalation)
                    </p>
                    <Select
                      value={guardrailSettings.confidenceThreshold.toString()}
                      onValueChange={(v) =>
                        setGuardrailSettings((s) => ({ ...s, confidenceThreshold: Number.parseFloat(v) }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">50% - Low</SelectItem>
                        <SelectItem value="0.7">70% - Medium</SelectItem>
                        <SelectItem value="0.85">85% - High</SelectItem>
                        <SelectItem value="0.95">95% - Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <Label>Restricted Topics</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Topics the AI should refuse to provide advice on
                    </p>
                    <div className="space-y-2 mt-2">
                      {guardrailSettings.restrictedTopics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="secondary" className="flex-1 justify-between py-1.5">
                            {topic}
                            <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Topic
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <Label>Escalation Triggers</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Keywords that automatically escalate to human support
                    </p>
                    <div className="space-y-2 mt-2">
                      {guardrailSettings.escalationTriggers.map((trigger, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="flex-1 justify-between py-1.5 border-orange-200 text-orange-700"
                          >
                            {trigger}
                            <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Trigger
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Guardrails
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                System Integrations
              </CardTitle>
              <CardDescription>Manage connections to external systems and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">Last sync: {integration.lastSync}</p>
                      </div>
                      <Badge
                        variant={integration.status === "connected" ? "default" : "secondary"}
                        className={
                          integration.status === "connected"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : ""
                        }
                      >
                        {integration.status === "connected" ? "Connected" : "Maintenance"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
