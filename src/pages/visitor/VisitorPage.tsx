import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Image as ImageIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import sampleArt1 from '@/assets/sample-art-1.jpg';
import sampleArt2 from '@/assets/sample-art-2.jpg';
import sampleArt3 from '@/assets/sample-art-3.jpg';

const VisitorPage = () => {
  const featuredArtworks = [
    {
      id: 1,
      title: "Renaissance Masterpiece",
      artist: "Leonardo da Vinci",
      period: "Renaissance",
      image: sampleArt1,
      rating: 4.8
    },
    {
      id: 2,
      title: "Classical Sculpture",
      artist: "Michelangelo",
      period: "Classical",
      image: sampleArt2,
      rating: 4.9
    },
    {
      id: 3,
      title: "Medieval Illumination",
      artist: "Unknown Master",
      period: "Medieval",
      image: sampleArt3,
      rating: 4.7
    }
  ];

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
              <Button size="lg" asChild className="bg-brown-medium hover:bg-brown-medium/90 text-warm-white border-0 shadow-elegant">
                <Link to="/gallery">
                  Explore Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-warm-white text-warm-white hover:bg-warm-white hover:text-brown-dark">
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
              {featuredArtworks.map((artwork) => (
                <Card key={artwork.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 bg-primary/90">
                      {artwork.period}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-foreground mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      by {artwork.artist}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(artwork.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {artwork.rating}
                      </span>
                    </div>
                  </CardContent>
                </Card>
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
              <Button size="lg" variant="secondary" asChild>
                <Link to="/upgrade-curator">Upgrade to Curator</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/gallery">Explore Gallery</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default VisitorPage;