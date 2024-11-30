import { useState } from "react";
import { format } from "date-fns";
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  MailOpen,
  FileText,
  PieChart,
  Users
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CommunityNotificationsDialog({
  notifications,
  onNotificationRead
}) {
  const [open, setOpen] = useState(false);

  const getIcon = type => {
    switch (type) {
      case "issue_update":
        return <FileText className="h-4 w-4" />;
      case "poll_result":
        return <PieChart className="h-4 w-4" />;
      case "new_issue":
        return <AlertTriangle className="h-4 w-4" />;
      case "community_update":
        return <Users className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = type => {
    switch (type) {
      case "issue_update":
        return "default";
      case "poll_result":
        return "success";
      case "new_issue":
        return "destructive";
      case "community_update":
        return "secondary";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Community Notifications</DialogTitle>
          <DialogDescription>
            You have {unreadCount} unread notifications
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[400px] w-full pr-4">
              {notifications.map(notification => (
                <CommunityNotificationItem
                  key={notification.id}
                  notification={notification}
                  onNotificationRead={onNotificationRead}
                />
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread">
            <ScrollArea className="h-[400px] w-full pr-4">
              {notifications
                .filter(n => !n.read)
                .map(notification => (
                  <CommunityNotificationItem
                    key={notification.id}
                    notification={notification}
                    onNotificationRead={onNotificationRead}
                  />
                ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function CommunityNotificationItem({ notification, onNotificationRead }) {
  const getIcon = type => {
    switch (type) {
      case "issue_update":
        return <FileText className="h-4 w-4" />;
      case "poll_result":
        return <PieChart className="h-4 w-4" />;
      case "new_issue":
        return <AlertTriangle className="h-4 w-4" />;
      case "community_update":
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getBadgeVariant = type => {
    switch (type) {
      case "issue_update":
        return "default";
      case "poll_result":
        return "success";
      case "new_issue":
        return "destructive";
      case "community_update":
        return "secondary";
    }
  };

  return (
    <div
      className={`mb-4 p-4 rounded-lg ${
        notification.read
          ? "bg-secondary"
          : "bg-primary-foreground border-l-4 border-blue-500"
      }`}
      onClick={() => {
        if (!notification.read) {
          onNotificationRead(notification.id);
        }
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <Badge variant={getBadgeVariant(notification.type)}>
          {getIcon(notification.type)}
          <span className="ml-1 capitalize">
            {notification.type.replace("_", " ")}
          </span>
        </Badge>
        <span className="text-xs text-muted-foreground">
          {format(notification.date, "MMM d, yyyy HH:mm")}
        </span>
      </div>
      <h4 className="font-semibold mb-1">{notification.title}</h4>
      <p className="text-sm text-muted-foreground">
        {notification.description}
      </p>
      {!notification.read && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={() => onNotificationRead(notification.id)}
        >
          <MailOpen className="h-4 w-4 mr-2" />
          Mark as Read
        </Button>
      )}
    </div>
  );
}
