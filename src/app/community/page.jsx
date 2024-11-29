"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, MapPin, LogOut, UserPlus, ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for communities
const communities = [
  {
    id: "1",
    name: "Greenville Community",
    profilePic: "/placeholder.svg?height=100&width=100",
    description:
      "A vibrant community focused on sustainable living and green initiatives.",
    location: "Greenville, CA",
    members: 1250,
    membersList: [
      {
        id: "1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      {
        id: "2",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40"
      }
      // ... more members
    ],
    authorityMembers: [
      {
        id: "1",
        name: "Mayor Thompson",
        role: "Community Leader",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      {
        id: "2",
        name: "Sarah Lee",
        role: "Environmental Coordinator",
        avatar: "/placeholder.svg?height=40&width=40"
      }
      // ... more authority members
    ]
  },
  {
    id: "2",
    name: "Riverside Neighborhood",
    profilePic: "/placeholder.svg?height=100&width=100",
    description:
      "A close-knit riverside community with a focus on water conservation and recreation.",
    location: "Riverside, OR",
    members: 850,
    membersList: [
      {
        id: "1",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      {
        id: "2",
        name: "Bob Williams",
        avatar: "/placeholder.svg?height=40&width=40"
      }
      // ... more members
    ],
    authorityMembers: [
      {
        id: "1",
        name: "Captain Rivera",
        role: "Community Safety Officer",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      {
        id: "2",
        name: "Dr. Emily Chen",
        role: "Health Coordinator",
        avatar: "/placeholder.svg?height=40&width=40"
      }
      // ... more authority members
    ]
  }
];

export default function CommunityPage() {
  const [currentCommunity, setCurrentCommunity] = useState(communities[0]);
  const [joinCode, setJoinCode] = useState("");
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const handleCommunityChange = communityId => {
    const newCommunity = communities.find(c => c.id === communityId);
    if (newCommunity) {
      setCurrentCommunity(newCommunity);
    }
  };

  const handleJoinCommunity = () => {
    // In a real application, you would validate the join code and join the new community
    console.log("Joining community with code:", joinCode);
    setJoinCode("");
    setIsJoinDialogOpen(false);
  };

  const handleLeaveCommunity = () => {
    // In a real application, you would handle leaving the current community
    console.log("Leaving community:", currentCommunity.name);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Community</CardTitle>
            <CardDescription>
              View and manage your community membership
            </CardDescription>
          </div>
          <Select
            onValueChange={handleCommunityChange}
            defaultValue={currentCommunity.id}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select community" />
            </SelectTrigger>
            <SelectContent>
              {communities.map(community => (
                <SelectItem key={community.id} value={community.id}>
                  {community.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={currentCommunity.profilePic}
                alt={currentCommunity.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">
                {currentCommunity.name}
              </h2>
              <p className="text-muted-foreground mb-4">
                {currentCommunity.description}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{currentCommunity.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{currentCommunity.members} members</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Join New Community
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Join a New Community</DialogTitle>
                <DialogDescription>
                  Enter the 6-digit alphanumeric code to join a new community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="join-code" className="text-right">
                    Join Code
                  </Label>
                  <Input
                    id="join-code"
                    value={joinCode}
                    onChange={e => setJoinCode(e.target.value)}
                    placeholder="Enter code"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleJoinCommunity}>Join Community</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="destructive" onClick={handleLeaveCommunity}>
            <LogOut className="mr-2 h-4 w-4" />
            Leave Community
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Community Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-members">
            <TabsList>
              <TabsTrigger value="all-members">All Members</TabsTrigger>
              <TabsTrigger value="authority-members">
                Authority Members
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all-members">
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCommunity.membersList.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="authority-members">
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {currentCommunity.authorityMembers.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
