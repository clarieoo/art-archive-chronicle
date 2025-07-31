import { useState } from 'react';
import { CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AdvancedSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  anyField: string;
  title: string;
  category: string;
  culture: string;
  department: string;
  period: string;
  fromDate?: Date;
  toDate?: Date;
  sortBy: string;
}

export function AdvancedSearchDialog({ open, onOpenChange, onSearch }: AdvancedSearchDialogProps) {
  const [anyField, setAnyField] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [culture, setCulture] = useState('');
  const [department, setDepartment] = useState('');
  const [period, setPeriod] = useState('');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [sortBy, setSortBy] = useState('best_match');

  const categories = [
    'Renaissance', 'Medieval', 'Baroque', 'Classical', 'Gothic', 'Roman'
  ];

  const cultures = [
    'Italian', 'French', 'Spanish', 'German', 'Dutch', 'Flemish', 'Byzantine'
  ];

  const departments = [
    'Paintings', 'Sculptures', 'Manuscripts', 'Decorative Arts', 'Prints', 'Drawings'
  ];

  const periods = [
    'Ancient', 'Medieval', 'Renaissance', 'Baroque', 'Neoclassical', 'Romantic'
  ];

  const sortOptions = [
    { value: 'best_match', label: 'Best Match' },
    { value: 'ascending', label: 'Ascending' },
    { value: 'descending', label: 'Descending' },
    { value: 'most_few', label: 'Most Few' },
    { value: 'least_few', label: 'Least Few' }
  ];

  const handleSearch = () => {
    const filters: SearchFilters = {
      anyField,
      title,
      category,
      culture,
      department,
      period,
      fromDate,
      toDate,
      sortBy
    };
    onSearch(filters);
    onOpenChange(false);
  };

  const clearFilters = () => {
    setAnyField('');
    setTitle('');
    setCategory('');
    setCulture('');
    setDepartment('');
    setPeriod('');
    setFromDate(undefined);
    setToDate(undefined);
    setSortBy('best_match');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Detail Search Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detail Search</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                />
              </div>

              {/* Culture */}
              <div className="space-y-2">
                <Label htmlFor="culture">Culture</Label>
                <Input
                  id="culture"
                  value={culture}
                  onChange={(e) => setCulture(e.target.value)}
                  placeholder="Enter culture"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter department"
                />
              </div>

              {/* Period */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="Enter period"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Date Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Date */}
              <div className="space-y-2">
                <Label>From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Calendar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* To Date */}
              <div className="space-y-2">
                <Label>To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Calendar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy">Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}