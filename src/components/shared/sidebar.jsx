"use client";

import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";
import {
  Bell,
  FileText,
  Home,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const hideSidebarPaths = ["/"];
  if (hideSidebarPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="hidden w-64 min-h-screen flex-col bg-zinc-900 p-4 md:flex">
      <div className="flex items-center gap-2 px-2 py-4">
        <Image
          src="/globe.svg"
          width={20}
          height={20}
          alt="Picture of the author"
        />
        <span className="text-lg font-semibold text-white">CivicPulse</span>
      </div>
      <nav className="flex-1 space-y-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg bg-zinc-800 px-3 py-2 text-white transition-colors hover:text-zinc-200"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <FileText className="h-5 w-5" />
          Issues
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <MessageCircle className="h-5 w-5" />
          Feedback
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <Users className="h-5 w-5" />
          Community
        </Link>
      </nav>
      <Separator className="my-4 bg-zinc-800" />
      <nav className="space-y-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <Bell className="h-5 w-5" />
          Notifications
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          Swayam
        </Link>
      </nav>
    </div>
  );
}
