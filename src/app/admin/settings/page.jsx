"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockSettings = {
  communityName: "Greenville Community",
  description:
    "A vibrant community focused on sustainable living and green initiatives.",
  location: "Greenville, CA",
  allowNewMembers: true,
  requireApproval: true,
  enablePolls: true,
  maxPollDuration: 7,
  defaultLanguage: "en",
  timeZone: "America/Los_Angeles",
  notificationFrequency: "daily",
  privacyLevel: "public"
};

export default function CommunitySettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(mockSettings);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = name => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelectChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = value => {
    setSettings(prev => ({ ...prev, maxPollDuration: value[0] }));
  };

  const handleSave = () => {
    // In a real application, you would send this data to your backend
    console.log("Saving settings:", settings);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your community settings have been updated successfully."
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Community Settings</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your community&apos;s general information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="communityName">Community Name</Label>
                <Input
                  id="communityName"
                  name="communityName"
                  value={settings.communityName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={settings.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={settings.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Default Language</Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={value =>
                    handleSelectChange("defaultLanguage", value)
                  }
                >
                  <SelectTrigger id="defaultLanguage">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select
                  value={settings.timeZone}
                  onValueChange={value => handleSelectChange("timeZone", value)}
                >
                  <SelectTrigger id="timeZone">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time (PT)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      Greenwich Mean Time (GMT)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle>Membership Settings</CardTitle>
              <CardDescription>
                Configure membership options for your community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowNewMembers"
                  checked={settings.allowNewMembers}
                  onCheckedChange={() => handleSwitchChange("allowNewMembers")}
                />
                <Label htmlFor="allowNewMembers">Allow New Members</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="requireApproval"
                  checked={settings.requireApproval}
                  onCheckedChange={() => handleSwitchChange("requireApproval")}
                />
                <Label htmlFor="requireApproval">
                  Require Approval for New Members
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notificationFrequency">
                  Notification Frequency
                </Label>
                <Select
                  value={settings.notificationFrequency}
                  onValueChange={value =>
                    handleSelectChange("notificationFrequency", value)
                  }
                >
                  <SelectTrigger id="notificationFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="polls">
          <Card>
            <CardHeader>
              <CardTitle>Poll Settings</CardTitle>
              <CardDescription>
                Manage settings for community polls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enablePolls"
                  checked={settings.enablePolls}
                  onCheckedChange={() => handleSwitchChange("enablePolls")}
                />
                <Label htmlFor="enablePolls">Enable Community Polls</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPollDuration">
                  Maximum Poll Duration: {settings.maxPollDuration} days
                </Label>
                <Slider
                  id="maxPollDuration"
                  min={1}
                  max={30}
                  step={1}
                  value={[settings.maxPollDuration]}
                  onValueChange={handleSliderChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Configure privacy options for your community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacyLevel">Community Privacy Level</Label>
                <Select
                  value={settings.privacyLevel}
                  onValueChange={value =>
                    handleSelectChange("privacyLevel", value)
                  }
                >
                  <SelectTrigger id="privacyLevel">
                    <SelectValue placeholder="Select privacy level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button onClick={handleSave}>Save All Settings</Button>
      </div>
    </div>
  );
}
