"use client";

import { useState } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const mockIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    status: "Open",
    category: "Infrastructure",
    date: "2023-11-30",
    votes: 15,
  },
  {
    id: 2,
    title: "Broken Streetlight",
    status: "In Progress",
    category: "Public Safety",
    date: "2023-11-29",
    votes: 8,
  },
  {
    id: 3,
    title: "Graffiti in Park",
    status: "Resolved",
    category: "Community Services",
    date: "2023-11-28",
    votes: 5,
  },
  {
    id: 4,
    title: "Noise Complaint",
    status: "Open",
    category: "Public Safety",
    date: "2023-11-27",
    votes: 12,
  },
  {
    id: 5,
    title: "Trash Collection Delay",
    status: "In Progress",
    category: "Community Services",
    date: "2023-11-26",
    votes: 20,
  },
];

export default function IssuesManagement() {
  const [issues, setIssues] = useState(mockIssues);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredIssues = issues
    .filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((issue) => statusFilter === "All" || issue.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Issues Management</h1>

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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        issue.status === "Open"
                          ? "bg-yellow-100 text-yellow-800"
                          : issue.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell>{issue.date}</TableCell>
                  <TableCell>{issue.votes}</TableCell>
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
