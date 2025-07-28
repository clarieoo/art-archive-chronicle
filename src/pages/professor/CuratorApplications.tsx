import { ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CuratorApplications() {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

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
    }
  ];

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
            {applications.map((application) => (
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
                               className="text-primary hover:underline"
                             >
                               {application.portfolioLink}
                             </a>
                             <p className="text-sm text-muted-foreground mt-1">(CV file uploaded)</p>
                           </div>

                          <div>
                            <h4 className="font-semibold mb-2">Submitted Date</h4>
                            <p className="text-muted-foreground">
                              {new Date(application.submittedAt).toLocaleDateString()}
                            </p>
                          </div>

                          {application.status === 'pending' && (
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
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {application.status === 'pending' && (
                      <>
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
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}