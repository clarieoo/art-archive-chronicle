import { ArrowLeft, Eye, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CuratorApplications() {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for curator applications
  const applications = [
    {
      id: 1,
      fullName: "John Smith",
      email: "john.smith@email.com",
      education: "Master's in Art History, Yale University",
      experience: "5 years as Assistant Curator at Metropolitan Museum",
      motivation: "Passionate about sharing historical art with wider audiences...",
      portfolioLink: "https://johnsmith-art.portfolio.com",
      status: "pending",
      submittedAt: "2024-01-15"
    },
    {
      id: 2,
      fullName: "Sarah Johnson",
      email: "sarah.j@email.com",
      education: "PhD in Museum Studies, Harvard University",
      experience: "3 years at Louvre, specializing in Renaissance period",
      motivation: "Dedicated to preserving cultural heritage...",
      portfolioLink: "https://sarahjohnson-museum.com",
      status: "approved",
      submittedAt: "2024-01-10"
    },
    {
      id: 3,
      fullName: "Michael Brown",
      email: "michael.brown@email.com",
      education: "Bachelor's in Fine Arts, RISD",
      experience: "2 years at Whitney Museum, focusing on contemporary art",
      motivation: "Eager to contribute to modern art curation...",
      portfolioLink: "https://michaelbrown-art.com",
      status: "rejected",
      submittedAt: "2024-01-08"
    },
    {
      id: 4,
      fullName: "Emily Davis",
      email: "emily.davis@email.com",
      education: "Master's in Art Curation, NYU",
      experience: "4 years at MoMA, specializing in photography",
      motivation: "Passionate about visual storytelling through photography...",
      portfolioLink: "https://emilydavis-curator.com",
      status: "pending",
      submittedAt: "2024-01-20"
    },
    {
      id: 5,
      fullName: "Robert Wilson",
      email: "robert.wilson@email.com",
      education: "PhD in Art History, Princeton",
      experience: "6 years at Guggenheim, specializing in abstract art",
      motivation: "Dedicated to expanding abstract art appreciation...",
      portfolioLink: "https://robertwilson-abstract.com",
      status: "approved",
      submittedAt: "2024-01-05"
    },
    {
      id: 6,
      fullName: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      education: "Master's in Museum Studies, Columbia",
      experience: "3 years at Brooklyn Museum, contemporary installations",
      motivation: "Focused on community engagement through art...",
      portfolioLink: "https://lisagarcia-community.com",
      status: "pending",
      submittedAt: "2024-01-25"
    }
  ];

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = applications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprove = (id: number) => {
    console.log(`Approved application ${id}`);
    // Handle approval logic
  };

  const handleReject = (id: number) => {
    console.log(`Rejected application ${id}`);
    // Handle rejection logic
  };

  return (
    <div className="p-6">
      {/* Header with back arrow */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Curator Applications</h1>
          <p className="text-muted-foreground">
            Review and manage upgrade to curator requests
          </p>
        </div>
      </div>

      {/* Applications Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Educational Background</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.fullName}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell className="max-w-xs truncate">{application.education}</TableCell>
                <TableCell>{new Date(application.submittedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      application.status === 'approved' ? 'default' : 
                      application.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Application Details - {application.fullName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Full Name</h4>
                              <p className="text-muted-foreground">{application.fullName}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Email</h4>
                              <p className="text-muted-foreground">{application.email}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Educational Background</h4>
                            <p className="text-muted-foreground">{application.education}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Professional Experience</h4>
                            <p className="text-muted-foreground">{application.experience}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Motivation</h4>
                            <p className="text-muted-foreground">{application.motivation}</p>
                          </div>
                          
                            <div>
                              <h4 className="font-semibold mb-2">Portfolio</h4>
                              <a 
                                href={application.portfolioLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline block mb-3"
                              >
                                {application.portfolioLink}
                              </a>
                              
                              <div className="space-y-2">
                                <p className="text-sm font-medium">CV Document:</p>
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                                  <FileText className="h-8 w-8 text-red-500" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{application.fullName.replace(' ', '_')}_CV.pdf</p>
                                    <p className="text-xs text-muted-foreground">PDF Document • 2.4 MB</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => window.open(`/sample-cv-${application.id}.pdf`, '_blank')}
                                      className="h-8"
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = `/sample-cv-${application.id}.pdf`;
                                        link.download = `${application.fullName.replace(' ', '_')}_CV.pdf`;
                                        link.click();
                                      }}
                                      className="h-8"
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                          <div>
                            <h4 className="font-semibold mb-2">Submitted Date</h4>
                            <p className="text-muted-foreground">
                              {new Date(application.submittedAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex gap-3 pt-4 border-t">
                            <Button 
                              onClick={() => handleApprove(application.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleReject(application.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm"
                      onClick={() => handleApprove(application.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(application.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}