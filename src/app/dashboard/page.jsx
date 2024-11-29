"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  FileText,
  HelpCircle,
  MessageSquare,
  PieChart,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const userActivities = [
  {
    id: 1,
    type: "Issue Reported",
    title: "Pothole on Main St",
    status: "In Progress",
    date: "2023-11-25",
  },
  {
    id: 2,
    type: "Poll Participation",
    title: "Park Renovation",
    status: "Completed",
    date: "2023-11-23",
  },
  {
    id: 3,
    type: "Feedback Provided",
    title: "Community Center",
    status: "Received",
    date: "2023-11-20",
  },
];

const activePolls = [
  { id: 1, title: "New Bike Lanes", endDate: "2023-12-15" },
  { id: 2, title: "Community Garden Location", endDate: "2023-12-20" },
];

export default function UserDashboard() {
  const [progress, setProgress] = useState(66);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Community Member!</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Issues Reported
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Polls Participated
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resources Accessed
            </CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Score
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <Progress value={progress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="polls">Polls</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ul className="space-y-4 mt-4">
                  {userActivities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type} - {activity.date}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              {/* Add content for other tabs as needed */}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Access key features and information
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild className="w-full justify-start">
              <Link href="/report-issue">
                <Plus className="mr-2 h-4 w-4" /> Report a New Issue
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/active-polls">
                <PieChart className="mr-2 h-4 w-4" /> Participate in Active
                Polls
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/resource-hub">
                <HelpCircle className="mr-2 h-4 w-4" /> Access Resource Hub
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/notifications">
                <Bell className="mr-2 h-4 w-4" /> View Notifications
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/provide-feedback">
                <MessageSquare className="mr-2 h-4 w-4" /> Provide Feedback
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Active Polls</CardTitle>
          <CardDescription>
            Make your voice heard in the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {activePolls.map((poll) => (
              <li key={poll.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{poll.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Ends on {poll.endDate}
                  </p>
                </div>
                <Button size="sm">Vote Now</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
