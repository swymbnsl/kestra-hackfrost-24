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
  Users,
  Calendar,
  Zap
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommunityNotificationsDialog } from "@/components/members-notifications";

// Mock data for demonstration
const userActivities = [
  {
    id: 1,
    type: "Issue Reported",
    title: "Pothole on Main St",
    status: "In Progress",
    date: "2023-11-25"
  },
  {
    id: 2,
    type: "Poll Participation",
    title: "Park Renovation",
    status: "Completed",
    date: "2023-11-23"
  },
  {
    id: 3,
    type: "Feedback Provided",
    title: "Community Center",
    status: "Received",
    date: "2023-11-20"
  }
];

const activePolls = [
  { id: 1, title: "New Bike Lanes", endDate: "2023-12-15" },
  { id: 2, title: "Community Garden Location", endDate: "2023-12-20" }
];

const upcomingEvents = [
  { id: 1, title: "Town Hall Meeting", date: "2023-12-05", time: "19:00" },
  { id: 2, title: "Community Cleanup Day", date: "2023-12-10", time: "09:00" }
];

const mockNotifications = [
  {
    id: "1",
    type: "issue_update",
    title: "Pothole Update",
    description: "The pothole on Main St has been scheduled for repair.",
    date: new Date("2023-11-30T10:00:00"),
    read: false
  },
  {
    id: "2",
    type: "poll_result",
    title: "Park Renovation Results",
    description: "The results for the Park Renovation poll are now available.",
    date: new Date("2023-11-29T15:30:00"),
    read: false
  },
  {
    id: "3",
    type: "new_issue",
    title: "New Issue Reported",
    description:
      'A new issue "Broken Streetlight" has been reported in your area.',
    date: new Date("2023-11-28T09:45:00"),
    read: true
  },
  {
    id: "4",
    type: "community_update",
    title: "Community Meeting",
    description: "Reminder: Community town hall meeting this Saturday.",
    date: new Date("2023-11-27T14:00:00"),
    read: false
  }
];

export default function UserDashboard() {
  const [progress, setProgress] = useState(66);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationRead = id => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome, John Doe!</h1>
            <p className="text-muted-foreground">Active Community Member</p>
          </div>
        </div>
        <CommunityNotificationsDialog
          notifications={notifications}
          onNotificationRead={handleNotificationRead}
        />
      </div>

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
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <Progress value={progress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card className="col-span-2">
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
                  {userActivities.map(activity => (
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
                      <Badge
                        variant={
                          activity.status === "Completed"
                            ? "success"
                            : activity.status === "In Progress"
                            ? "warning"
                            : "default"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              {/* Add content for other tabs as needed */}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
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
              <Link href="/community-events">
                <Calendar className="mr-2 h-4 w-4" /> View Community Events
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

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Polls</CardTitle>
            <CardDescription>
              Make your voice heard in the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activePolls.map(poll => (
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

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Community Events</CardTitle>
            <CardDescription>Stay involved in your community</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingEvents.map(event => (
                <li
                  key={event.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    RSVP
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
