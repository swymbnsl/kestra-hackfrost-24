"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Users, FileText, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NotificationsDialog } from "@/components/admin-notifications";

// Mock data for demonstration
const communityStats = {
  totalMembers: 1250,
  activeMembers: 876,
  totalIssues: 156,
  resolvedIssues: 98,
  participationRate: 70
};

const recentActivity = [
  {
    id: 1,
    type: "New Member",
    description: "John Doe joined the community",
    date: "2023-11-30"
  },
  {
    id: 2,
    type: "Issue Reported",
    description: "Pothole on Main Street",
    date: "2023-11-29"
  },
  {
    id: 3,
    type: "Poll Closed",
    description: "Park Renovation Priority",
    date: "2023-11-28"
  }
];

const mockNotifications = [
  {
    id: "1",
    type: "info",
    title: "New Member Joined",
    description: "John Doe has joined the community.",
    date: new Date("2023-11-30T10:00:00"),
    read: false
  },
  {
    id: "2",
    type: "warning",
    title: "Report Flagged",
    description: "A new issue report has been flagged for review.",
    date: new Date("2023-11-29T15:30:00"),
    read: false
  },
  {
    id: "3",
    type: "success",
    title: "Poll Completed",
    description: 'The "Park Renovation" poll has concluded.',
    date: new Date("2023-11-28T09:45:00"),
    read: true
  }
];

export default function AdminDashboard() {
  const [participationRate, setParticipationRate] = useState(
    communityStats.participationRate
  );
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationRead = id => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <NotificationsDialog
          notifications={notifications}
          onNotificationRead={handleNotificationRead}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {communityStats.totalMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              {communityStats.activeMembers} active in the last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {communityStats.totalIssues}
            </div>
            <p className="text-xs text-muted-foreground">
              {communityStats.resolvedIssues} resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Participation Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{participationRate}%</div>
            <Progress value={participationRate} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Community Health
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              Based on engagement and issue resolution
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events in your community</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map(activity => (
                <li
                  key={activity.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.date}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/issues">
                <FileText className="mr-2 h-4 w-4" /> Manage Issues and Polls
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/members">
                <Users className="mr-2 h-4 w-4" /> Manage Community Members
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" /> Community Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
