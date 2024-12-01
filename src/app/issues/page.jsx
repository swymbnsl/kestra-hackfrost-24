"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  ThumbsDown,
  ThumbsUp,
  SortAsc,
  SortDesc
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const IssueCard = ({ issue, onIssueUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleVote = async voteType => {
    try {
      const response = await fetch(`/api/issues/${issue._id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ voteType })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to record vote");
      }

      toast({
        title: "Vote Recorded",
        description: `You've ${
          voteType === "up" ? "supported" : "opposed"
        } this issue.`
      });

      // Notify parent to refresh issues
      onIssueUpdate();
    } catch (error) {
      console.error("Error recording vote:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to record vote. Please try again later.",
        variant: "destructive"
      });
    }
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const { toast } = useToast();

  const fetchIssues = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/issues");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch issues");
      }

      const data = await response.json();
      setIssues(data.issues || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to load issues. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchIssues();
    }
  }, [isLoaded, isSignedIn, fetchIssues]);

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = [...issues];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        issue =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(issue => issue.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [issues, searchTerm, selectedCategory, sortOrder]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">
          Please sign in to view issues
        </h2>
        <Button>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Community Issues</h1>

        {isLoading ? (
          <div className="text-center py-10">Loading issues...</div>
        ) : (
          <>
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
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
                    <SelectItem value="Infrastructure">
                      Infrastructure
                    </SelectItem>
                    <SelectItem value="Public Safety">Public Safety</SelectItem>
                    <SelectItem value="Community Services">
                      Community Services
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
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

              {["all", "open", "in-progress", "resolved"].map(tab => (
                <TabsContent key={tab} value={tab}>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAndSortedIssues
                      .filter(
                        issue =>
                          tab === "all" ||
                          (tab === "open" && issue.status === "Open") ||
                          (tab === "in-progress" &&
                            issue.status === "In Progress") ||
                          (tab === "resolved" && issue.status === "Resolved")
                      )
                      .map(issue => (
                        <IssueCard
                          key={issue._id}
                          issue={issue}
                          onIssueUpdate={fetchIssues}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {filteredAndSortedIssues.length === 0 && (
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
          </>
        )}
      </div>
    </div>
  );
}
