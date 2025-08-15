import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, Plus, Edit, Trash2, Megaphone, AlertCircle, Calendar, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "maintenance" | "feature" | "event";
  date: string;
  time: string;
}

const sampleAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "System Maintenance Scheduled",
    description: "Scheduled maintenance to improve system performance and security updates.",
    type: "maintenance",
    date: "2024-01-15",
    time: "14:00"
  },
  {
    id: "2",
    title: "New Search Feature Released",
    description: "Enhanced search functionality with advanced filters now available.",
    type: "feature",
    date: "2024-01-12",
    time: "09:30"
  },
  {
    id: "3",
    title: "Art Exhibition Opening",
    description: "Grand opening of the Medieval Art collection this weekend.",
    type: "event",
    date: "2024-01-20",
    time: "16:00"
  },
  {
    id: "4",
    title: "Database Optimization",
    description: "Scheduled database optimization for improved loading times.",
    type: "maintenance",
    date: "2024-01-10",
    time: "02:00"
  },
  {
    id: "5",
    title: "Mobile App Update",
    description: "New mobile application version with enhanced user interface.",
    type: "feature",
    date: "2024-01-08",
    time: "11:15"
  },
  {
    id: "6",
    title: "Virtual Gallery Tour",
    description: "Join our virtual guided tour of the Renaissance collection.",
    type: "event",
    date: "2024-01-25",
    time: "19:00"
  },
  {
    id: "7",
    title: "Security Updates",
    description: "Important security patches and system updates implementation.",
    type: "maintenance",
    date: "2024-01-05",
    time: "01:30"
  },
  {
    id: "8",
    title: "Advanced Bookmarking",
    description: "New bookmarking system with categorization and sharing options.",
    type: "feature",
    date: "2024-01-03",
    time: "10:45"
  }
];

const ITEMS_PER_PAGE = 5;

export default function ManageAnnouncements() {
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(sampleAnnouncements.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAnnouncements = sampleAnnouncements.slice(startIndex, endIndex);

  const getTypeBadge = (type: Announcement["type"]) => {
    switch (type) {
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Maintenance
          </Badge>
        );
      case "feature":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            Feature
          </Badge>
        );
      case "event":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
            <Calendar className="w-3 h-3 mr-1" />
            Event
          </Badge>
        );
    }
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Announcement",
      description: `Editing announcement with ID: ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Announcement",
      description: `Announcement with ID: ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 4) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 3) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Manage Announcements</h1>
            </div>
          </div>
          <Link to="/admin/announcements/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Make New Announcement
            </Button>
          </Link>
        </div>

        {/* Announcements Table */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>All Announcements</CardTitle>
            <CardDescription>
              View and manage all system announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">
                      {announcement.title}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={announcement.description}>
                        {announcement.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(announcement.type)}
                    </TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell>{announcement.time}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(announcement.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(announcement.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}