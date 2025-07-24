import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  educationalBackground: z.string().min(10, 'Please provide details about your educational background'),
  professionalCertifications: z.string().optional(),
  relevantExperience: z.string().min(10, 'Please describe your relevant experience'),
  portfolioWork: z.string().min(10, 'Please describe your portfolio or previous work'),
  motivation: z.string().min(20, 'Please explain why you want to become a curator'),
});

type FormData = z.infer<typeof formSchema>;

export default function UpgradeCurator() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      educationalBackground: '',
      professionalCertifications: '',
      relevantExperience: '',
      portfolioWork: '',
      motivation: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission here
      console.log('Curator application data:', data);
      
      toast({
        title: "Application Submitted",
        description: "Your curator application has been submitted successfully. We'll review it within 5-7 days.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearForm = () => {
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Arrow */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requirements Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Bachelor's degree in Art History, Museum Studies, or related field
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Minimum 2 years of experience in art curation or museum work
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Portfolio of previous curatorial work or exhibitions
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Strong knowledge of historical periods and artistic movements
                  </p>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-center mb-2">Review Period</h3>
                <p className="text-center text-2xl font-bold text-primary">5-7 Days</p>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Qualifications</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="educationalBackground"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Educational Background <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="professionalCertifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Certifications</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="relevantExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relevant Experience <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="portfolioWork"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio/Previous Work <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Motivation</h3>
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why do you want to become a curator? <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearForm}
                      className="flex-1"
                    >
                      Clear Form
                    </Button>
                    <Button type="submit" className="flex-1">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}