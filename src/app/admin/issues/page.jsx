"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const mockIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    status: "Open",
    category: "Infrastructure",
    date: "2023-11-30",
    votes: 15,
    poll: {
      id: 1,
      title: "How to fix the pothole?",
      votes: 78,
      options: ["Temporary fix", "Complete road renovation"]
    }
  },
  {
    id: 2,
    title: "Noise Complaint in Downtown",
    status: "In Progress",
    category: "Public Safety",
    date: "2023-11-29",
    votes: 8,
    poll: {
      id: 2,
      title: "Implement quiet hours?",
      votes: 120,
      options: ["Yes, from 10 PM", "No, it's not necessary"]
    }
  },
  {
    id: 3,
    title: "Park Cleanup Initiative",
    status: "Open",
    category: "Environment",
    date: "2023-11-28",
    votes: 22,
    poll: {
      id: 3,
      title: "Best day for community cleanup",
      votes: 95,
      options: ["Saturday morning", "Sunday afternoon"]
    }
  },
  {
    id: 4,
    title: "Street Light Outage",
    status: "Resolved",
    category: "Infrastructure",
    date: "2023-11-27",
    votes: 5,
    poll: null
  },
  {
    id: 5,
    title: "Community Center Renovation",
    status: "In Progress",
    category: "Community Services",
    date: "2023-11-26",
    votes: 30,
    poll: {
      id: 4,
      title: "Prioritize renovation areas",
      votes: 150,
      options: ["Gym equipment", "Meeting rooms", "Outdoor space"]
    }
  }
];

export default function IssuesManagement() {
  const [issues, setIssues] = useState(mockIssues);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredIssues = issues
    .filter(issue =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(issue => statusFilter === "All" || issue.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleCreateIssue = () => {
    // In a real application, you would send this data to your backend
    const createdIssue = {
      id: issues.length + 1,
      ...newIssue,
      status: "Open",
      date: new Date().toISOString().split("T")[0],
      votes: 0,
      poll: null
    };
    setIssues([...issues, createdIssue]);
    setNewIssue({ title: "", description: "", category: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Issues and Polls Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter and Sort Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-500" />}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Issue
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Issue</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new community issue.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="issue-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="issue-title"
                      value={newIssue.title}
                      onChange={e =>
                        setNewIssue({ ...newIssue, title: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="issue-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="issue-description"
                      value={newIssue.description}
                      onChange={e =>
                        setNewIssue({
                          ...newIssue,
                          description: e.target.value
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="issue-category" className="text-right">
                      Category
                    </Label>
                    <Select
                      onValueChange={value =>
                        setNewIssue({ ...newIssue, category: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Infrastructure">
                          Infrastructure
                        </SelectItem>
                        <SelectItem value="Public Safety">
                          Public Safety
                        </SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                        <SelectItem value="Community Services">
                          Community Services
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateIssue}>Create Issue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Linked Poll</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map(issue => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell>{issue.date}</TableCell>
                  <TableCell>{issue.votes}</TableCell>
                  <TableCell>
                    {issue.poll ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Poll
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{issue.poll.title}</DialogTitle>
                            <DialogDescription>
                              Total votes: {issue.poll.votes}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <h4 className="mb-4 text-sm font-medium">
                              Poll Options:
                            </h4>
                            <ul className="space-y-2">
                              {issue.poll.options.map((option, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between items-center"
                                >
                                  <span>{option}</span>
                                  <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm">
                                      <ThumbsUp className="mr-2 h-4 w-4" />
                                      Vote
                                    </Button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" size="sm">
                        Create Poll
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
