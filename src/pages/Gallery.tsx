import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { AdvancedSearchDialog } from '@/components/gallery/AdvancedSearchDialog';

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const handleAdvancedSearch = (filters: any) => {
    // Apply advanced search filters
    setSearchQuery(filters.anyField || filters.title || '');
    setCategoryFilter(filters.category || '');
  };

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

            {/* Search Button */}
            <Button
              variant="outline"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>

            {/* Detail Search Button */}
            <Button
              variant="outline"
              onClick={() => setAdvancedSearchOpen(true)}
              className="text-amber-700 border-amber-700 hover:bg-amber-50"
            >
              Detail Search
            </Button>

            {/* Clear Filters */}
            {(searchQuery || categoryFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid searchQuery={searchQuery} categoryFilter={categoryFilter} />
        
        {/* Advanced Search Dialog */}
        <AdvancedSearchDialog
          open={advancedSearchOpen}
          onOpenChange={setAdvancedSearchOpen}
          onSearch={handleAdvancedSearch}
        />
      </div>
    </div>
  );
}