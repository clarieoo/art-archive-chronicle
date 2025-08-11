import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Image as ImageIcon, Star } from 'lucide-react';
import { ArtCard } from '@/components/gallery/ArtCard';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Footer } from '@/components/layout/Footer';
import sampleArt1 from '@/assets/sample-art-1.jpg';
import sampleArt2 from '@/assets/sample-art-2.jpg';
import sampleArt3 from '@/assets/sample-art-3.jpg';
import sampleArt4 from '@/assets/sample-art-4.jpg';
import sampleArt5 from '@/assets/sample-art-5.jpg';
import sampleArt6 from '@/assets/sample-art-6.jpg';
import { AnnouncementsSection } from '@/components/AnnouncementsSection';

const VisitorPage = () => {
  const images = [sampleArt1, sampleArt2, sampleArt3, sampleArt4, sampleArt5, sampleArt6];
  const artists = ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Botticelli', 'Donatello', 'Caravaggio'];
  const periods = ['Renaissance', 'Medieval', 'Baroque', 'Classical', 'Gothic', 'Roman'];
  const titles = [
    'Madonna and Child', 'David', 'The Creation', 'Venus Rising', 'Sacred Manuscript',
    'Portrait of a Lady'
  ];

  const featuredArtworks = Array.from({ length: 6 }, (_, i) => ({
    id: `art-${i + 1}`,
    title: titles[i],
    artist: artists[i],
    period: periods[i],
    image: images[i],
    rating: Math.random() * 2 + 3, // Random rating between 3-5
    totalRatings: Math.floor(Math.random() * 500) + 50,
  }));

  return (
    <DashboardLayout userRole="visitor">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brown-dark/90 via-brown-medium/80 to-brown-light/85"></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-warm-white/20 text-warm-white border-warm-white/30">
              Historical Archive Collection
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-warm-white mb-6 leading-tight">
              Discover the Beauty of
              <span className="block text-warm-white/90">Historical Art</span>
            </h1>
            
            <p className="text-xl text-warm-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of 60 remarkable artworks spanning centuries of human creativity. 
              Rate, save, and immerse yourself in the stories behind each masterpiece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-elegant">
              <Link to="/gallery">
                Explore Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border-2 border-secondary">
              <Link to="/about">Learn More</Link>
            </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">60+</h3>
                <p className="text-muted-foreground">Curated Artworks</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">1000+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">5000+</h3>
                <p className="text-muted-foreground">Ratings Given</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artworks */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Artworks
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover some of the most beloved pieces in our collection, carefully selected for their 
                historical significance and artistic excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredArtworks.slice(0, 3).map((artwork) => (
                <ArtCard
                  key={artwork.id}
                  id={artwork.id}
                  title={artwork.title}
                  artist={artwork.artist}
                  period={artwork.period}
                  image={artwork.image}
                  rating={artwork.rating}
                  totalRatings={artwork.totalRatings}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/gallery">
                  View All Artworks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Announcements */}
        <AnnouncementsSection />

        {/* Call to Action */}
        <section className="py-20 bg-gradient-rich text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Create an account to rate artworks, save your favorites, and connect with fellow art enthusiasts. 
              Upgrade to curator status to share your own historical pieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/signup">Sign Up Today</Link>
              </Button>
              <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border-2 border-secondary">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default VisitorPage;