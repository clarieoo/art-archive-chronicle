import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Renaissance', value: 'Renaissance' },
    { label: 'Medieval', value: 'Medieval' },
    { label: 'Baroque', value: 'Baroque' },
    { label: 'Classical', value: 'Classical' },
    { label: 'Gothic', value: 'Gothic' },
    { label: 'Roman', value: 'Roman' }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Art Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our collection of 60 historical artworks. Rate your favorites with up to 5 stars 
            and save pieces to watch later.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-card p-6 rounded-lg shadow-soft">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artworks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem 
                      key={category.value} 
                      value={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || categoryFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid searchQuery={searchQuery} categoryFilter={categoryFilter === 'all' ? '' : categoryFilter} />
      </div>
    </div>
  );
}