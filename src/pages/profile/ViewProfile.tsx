import { ArrowLeft, Edit, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ViewProfile() {
  const navigate = useNavigate();

  // Mock user data - replace with actual user data from context/API
  const user = {
    username: "john_doe",
    email: "john.doe@example.com",
    profilePicture: "", // empty for fallback
    fullName: "John Doe",
    role: "curator"
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Arrow */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profilePicture} alt={user.fullName} />
                <AvatarFallback className="text-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Username</label>
                <p className="text-lg text-foreground">{user.username}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-lg text-foreground">{user.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-lg text-foreground capitalize">{user.role}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex justify-center pt-4">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/profile/edit">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}