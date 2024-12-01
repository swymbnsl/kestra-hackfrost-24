export interface Issue {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: "Infrastructure" | "Safety" | "Environmental" | "Other";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  attachments: Array<{
    url: string;
    type: string;
    filename: string;
  }>;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  votes: {
    up: number;
    down: number;
  };
  inPolling: boolean;
  comments: Array<{
    _id: string;
    text: string;
    createdBy: {
      _id: string;
      name: string;
    };
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
