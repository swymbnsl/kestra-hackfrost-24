"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for demonstration
const mockPolls = [
  {
    id: 1,
    title: "New Bike Lanes",
    status: "Active",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    votes: 342,
  },
  {
    id: 2,
    title: "Community Garden Location",
    status: "Active",
    startDate: "2023-11-20",
    endDate: "2023-12-20",
    votes: 156,
  },
  {
    id: 3,
    title: "Park Renovation Priority",
    status: "Active",
    startDate: "2023-11-18",
    endDate: "2023-12-18",
    votes: 278,
  },
  {
    id: 4,
    title: "Public Library Hours Extension",
    status: "Closed",
    startDate: "2023-10-01",
    endDate: "2023-11-01",
    votes: 502,
  },
  {
    id: 5,
    title: "Downtown Parking Solutions",
    status: "Scheduled",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    votes: 0,
  },
];

export default function PollsManagement() {
  const [polls, setPolls] = useState(mockPolls);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPollTitle, setNewPollTitle] = useState("");
  const [newPollDescription, setNewPollDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPolls = polls.filter((poll) =>
    poll.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePoll = () => {
    // In a real application, you would send this data to your backend
    const newPoll = {
      id: polls.length + 1,
      title: newPollTitle,
      status: "Scheduled",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      votes: 0,
    };
    setPolls([...polls, newPoll]);
    setNewPollTitle("");
    setNewPollDescription("");
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Polls Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manage Polls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search polls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-500" />}
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Poll
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Poll</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new community poll.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="poll-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="poll-title"
                      value={newPollTitle}
                      onChange={(e) => setNewPollTitle(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="poll-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="poll-description"
                      value={newPollDescription}
                      onChange={(e) => setNewPollDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreatePoll}>Create Poll</Button>
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
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolls.map((poll) => (
                <TableRow key={poll.id}>
                  <TableCell className="font-medium">{poll.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        poll.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : poll.status === "Closed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {poll.status}
                    </span>
                  </TableCell>
                  <TableCell>{poll.startDate}</TableCell>
                  <TableCell>{poll.endDate}</TableCell>
                  <TableCell>{poll.votes}</TableCell>
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
