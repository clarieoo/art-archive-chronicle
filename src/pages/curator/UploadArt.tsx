import { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, CalendarIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const UploadArt = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dimension: '',
    category: '',
    tags: '',
    culture: '',
    department: '',
    period: '',
    location: '',
    files: [] as File[]
  });

  const [previews, setPreviews] = useState<string[]>([]);
  const [foundDate, setFoundDate] = useState<Date>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && formData.files.length + files.length <= 5) {
      const newFiles = [...formData.files, ...files];
      setFormData({ ...formData, files: newFiles });
      
      // Generate previews for new files
      const newPreviews = [...previews];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          setPreviews([...newPreviews]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
    setPreviews(newPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Uploading art:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/curator')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Upload New Art</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Art Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="files">Artwork Images (up to 5)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    {previews.length > 0 ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {previews.map((preview, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={preview} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                size="sm"
                                className="absolute top-2 right-2 bg-amber-800 hover:bg-amber-900 text-white border-0 w-6 h-6 p-0 rounded-full"
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                        {formData.files.length < 5 && (
                          <div className="text-center">
                            <Label
                              htmlFor="files"
                              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                            >
                              Add More Images
                            </Label>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <Label
                            htmlFor="files"
                            className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          >
                            Choose Images
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Select up to 5 images for your artwork
                        </p>
                      </div>
                    )}
                    <Input
                      id="files"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter artwork title"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your artwork..."
                    rows={4}
                    required
                  />
                </div>

                {/* Dimension */}
                <div className="space-y-2">
                  <Label htmlFor="dimension">Dimension</Label>
                  <Input
                    id="dimension"
                    value={formData.dimension}
                    onChange={(e) => setFormData({ ...formData, dimension: e.target.value })}
                    placeholder="Enter artwork dimensions (e.g., 24 x 36 inches)"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter artwork category"
                    required
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate tags with commas (e.g., abstract, colorful, modern)
                  </p>
                </div>

                {/* Culture */}
                <div className="space-y-2">
                  <Label htmlFor="culture">Culture</Label>
                  <Input
                    id="culture"
                    value={formData.culture}
                    onChange={(e) => setFormData({ ...formData, culture: e.target.value })}
                    placeholder="Enter cultural context or origin"
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Enter department or institution"
                  />
                </div>

                {/* Period */}
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Enter time period or era"
                  />
                </div>

                {/* Exact Found Date */}
                <div className="space-y-2">
                  <Label htmlFor="foundDate">Exact Found Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !foundDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {foundDate ? format(foundDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={foundDate}
                        onSelect={setFoundDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Location Section */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-foreground">Location</h3>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter current location or museum"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Art
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};