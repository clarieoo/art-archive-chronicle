import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const VisitorPage = () => {
  return (
    <DashboardLayout userRole="visitor">
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background with museum/gallery aesthetic */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2070&auto=format&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brown-dark/80 via-brown-medium/70 to-brown-light/80"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-warm-white mb-8 leading-tight">
            Discover History Through Art
          </h1>
          
          <p className="text-xl md:text-2xl text-warm-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Journey through time with our carefully curated collection of historical artifacts and masterpieces.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" asChild className="bg-brown-medium hover:bg-brown-medium/90 text-warm-white border-0 px-8 py-4 text-lg">
              <Link to="/gallery">
                Explore Gallery
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-warm-white text-warm-white hover:bg-warm-white hover:text-brown-dark px-8 py-4 text-lg"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VisitorPage;