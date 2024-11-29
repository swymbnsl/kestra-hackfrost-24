"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, MapPin, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock data for issue categories
const issueCategories = [
  { id: 1, name: "Infrastructure" },
  { id: 2, name: "Public Safety" },
  { id: 3, name: "Environmental" },
  { id: 4, name: "Community Services" },
  { id: 5, name: "Other" },
];

export default function ReportIssuePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    toast({
      title: "Issue Reported",
      description: "Your issue has been successfully submitted.",
    });
    router.push("/");
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>
            Provide details about the issue you've encountered in your
            community.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="issueName">Issue Name</Label>
              <Input
                id="issueName"
                placeholder="Enter a brief title for the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueCategory">Issue Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {issueCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueLocation">Issue Location</Label>
              <div className="flex space-x-2">
                <Input
                  id="issueLocation"
                  placeholder="Enter the location of the issue"
                  className="flex-grow"
                  required
                />
                <Button type="button" variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDescription">Issue Description</Label>
              <Textarea
                id="issueDescription"
                placeholder="Provide more details about the issue"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueImage">Issue Image (Optional)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="issueImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("issueImage")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                {imagePreview ? (
                  <div className="relative w-20 h-20">
                    <img
                      src={imagePreview}
                      alt="Issue preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2"
                      onClick={() => setImagePreview(null)}
                    >
                      X
                    </Button>
                  </div>
                ) : (
                  <Button type="button" variant="outline" size="icon">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Issue Report"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
