"use client"

import { useMemo } from "react"
import Link from "next/link"
import { riskAlerts, auditEvents } from "@/lib/mock-data"
import { formatRelativeTime, getSeverityColor, getStatusColor } from "@/lib/format"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, AlertTriangle, CheckCircle, Clock, ArrowRight, FileWarning, Activity } from "lucide-react"

export function RiskDashboard() {
  const openAlerts = useMemo(() => riskAlerts.filter((a) => a.status === "open"), [])
  const investigatingAlerts = useMemo(() => riskAlerts.filter((a) => a.status === "investigating"), [])
  const criticalAlerts = useMemo(() => riskAlerts.filter((a) => a.severity === "critical"), [])
  const resolvedToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    return riskAlerts.filter((a) => a.status === "resolved" && a.createdAt.startsWith(today)).length
  }, [])

  const recentAuditEvents = useMemo(() => auditEvents.slice(0, 5), [])

  return (
    <div className="space-y-6">
      <PageHeader title="Risk & Compliance Dashboard" description="Monitor alerts, cases, and policy compliance">
        <Button asChild>
          <Link href="/risk">
            View All Alerts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Open Alerts" value={openAlerts.length} icon={AlertTriangle} />
        <StatCard title="Under Investigation" value={investigatingAlerts.length} icon={Clock} />
        <StatCard title="Critical Alerts" value={criticalAlerts.length} icon={ShieldAlert} />
        <StatCard title="Resolved Today" value={resolvedToday} icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Queue */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Alerts Queue</CardTitle>
              <CardDescription>Recent risk and compliance alerts</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/risk">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskAlerts.slice(0, 6).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${getSeverityColor(alert.severity)}`}
                    >
                      <FileWarning className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <Badge variant="outline" className={`text-[10px] ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(alert.createdAt)}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`text-[10px] ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAuditEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="text-sm">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{formatRelativeTime(event.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" size="sm" className="px-0 mt-3" asChild>
                <Link href="/audit">View Full Audit Log</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                <CardTitle className="text-sm text-red-500">Critical Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {criticalAlerts[0] ? (
                <>
                  <p className="text-sm font-medium">{criticalAlerts[0].title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{criticalAlerts[0].description}</p>
                  <Button variant="destructive" size="sm" className="mt-3">
                    Investigate Now
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No critical alerts at this time.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
