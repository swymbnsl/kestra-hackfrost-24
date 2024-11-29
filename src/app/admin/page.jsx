import { Button } from "@/components/ui/button";
import { FileText, PieChart } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* rest of the component code */}

      <div className="mt-8 flex justify-center space-x-4">
        <Button asChild>
          <Link href="/admin/issues">
            <FileText className="mr-2 h-4 w-4" /> Manage Issues
          </Link>
        </Button>
        <Button asChild>
          <Link href="/admin/polls">
            <PieChart className="mr-2 h-4 w-4" /> Manage Polls
          </Link>
        </Button>
      </div>
    </div>
  );
}
