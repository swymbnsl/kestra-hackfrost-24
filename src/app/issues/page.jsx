"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  ThumbsDown,
  ThumbsUp,
  SortAsc,
  SortDesc,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data for reported issues
const mockIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    status: "Open",
    description: "Large pothole causing traffic issues",
    location: "123 Main St",
    category: "Infrastructure",
    createdAt: "2023-11-28",
    inPolling: true,
    votes: { up: 15, down: 3 },
  },
  {
    id: 2,
    title: "Broken Streetlight",
    status: "In Progress",
    description: "Streetlight not working at night",
    location: "Corner of Oak and Pine",
    category: "Public Safety",
    createdAt: "2023-11-25",
    inPolling: false,
  },
  {
    id: 3,
    title: "Graffiti in Park",
    status: "Resolved",
    description: "Graffiti on playground equipment",
    location: "Central Park",
    category: "Community Services",
    createdAt: "2023-11-20",
    inPolling: false,
  },
  {
    id: 4,
    title: "Noise Complaint",
    status: "Open",
    description: "Loud music from neighbor",
    location: "456 Elm St",
    category: "Public Safety",
    createdAt: "2023-11-30",
    inPolling: true,
    votes: { up: 8, down: 2 },
  },
  {
    id: 5,
    title: "Trash Collection Delay",
    status: "In Progress",
    description: "Garbage not collected for a week",
    location: "Maple Avenue",
    category: "Community Services",
    createdAt: "2023-11-27",
    inPolling: false,
  },
];

const IssueCard = ({ issue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleVote = (voteType) => {
    // Simulate API call to update vote
    toast({
      title: "Vote Recorded",
      description: `You've ${
        voteType === "up" ? "supported" : "opposed"
      } this issue.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{issue.title}</CardTitle>
            <CardDescription>
              {issue.category} - {issue.createdAt}
            </CardDescription>
          </div>
          <Badge
            variant={
              issue.status === "Open"
                ? "default"
                : issue.status === "In Progress"
                ? "secondary"
                : "success"
            }
          >
            {issue.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{issue.location}</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{issue.title}</DialogTitle>
              <DialogDescription>
                {issue.category} - {issue.createdAt}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Status:</strong> {issue.status}
              </p>
              <p>
                <strong>Location:</strong> {issue.location}
              </p>
              <p>
                <strong>Description:</strong> {issue.description}
              </p>
              {issue.inPolling && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">
                    This issue is currently in the polling stage:
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => handleVote("up")}
                      variant="outline"
                      size="sm"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Support ({issue.votes?.up || 0})
                    </Button>
                    <Button
                      onClick={() => handleVote("down")}
                      variant="outline"
                      size="sm"
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Oppose ({issue.votes?.down || 0})
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default function IssuesPage() {
  const [issues, setIssues] = useState(mockIssues);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    let filteredIssues = mockIssues;

    if (searchTerm) {
      filteredIssues = filteredIssues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.category === selectedCategory
      );
    }

    filteredIssues.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setIssues(filteredIssues);
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Community Issues</h1>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4 text-gray-500" />}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Public Safety">Public Safety</SelectItem>
                <SelectItem value="Community Services">
                  Community Services
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="open">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues
                .filter((issue) => issue.status === "Open")
                .map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="in-progress">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues
                .filter((issue) => issue.status === "In Progress")
                .map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="resolved">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues
                .filter((issue) => issue.status === "Resolved")
                .map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {issues.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No issues found matching your criteria.
          </p>
        )}

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/report-issue">
              Report a New Issue <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
