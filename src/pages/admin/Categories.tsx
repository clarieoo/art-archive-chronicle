import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Edit, Trash2, Plus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      id: 1, 
      name: "Renaissance", 
      description: "Art from the European Renaissance period (14th-17th century)",
      artworkCount: 25,
      status: "active",
      createdDate: "2024-01-01"
    },
    { 
      id: 2, 
      name: "Medieval", 
      description: "Art from the Middle Ages (5th-15th century)",
      artworkCount: 18,
      status: "active",
      createdDate: "2024-01-01"
    },
    { 
      id: 3, 
      name: "Baroque", 
      description: "European artistic style from 17th-18th century",
      artworkCount: 12,
      status: "active",
      createdDate: "2024-01-05"
    },
    { 
      id: 4, 
      name: "Classical", 
      description: "Greek and Roman classical art",
      artworkCount: 8,
      status: "inactive",
      createdDate: "2024-01-10"
    },
    { 
      id: 5, 
      name: "Gothic", 
      description: "Gothic architectural and artistic style",
      artworkCount: 15,
      status: "active",
      createdDate: "2024-01-12"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-primary">Categories</h1>
            <p className="text-muted-foreground text-lg">
              Manage art categories and classifications
            </p>
          </div>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Art Categories</CardTitle>
                <CardDescription>
                  Manage categories for organizing artworks
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search categories by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories Table */}
            <div className="rounded-md border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Artworks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">{category.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{category.artworkCount} artworks</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(category.status)}>
                          {category.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{category.createdDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Artworks
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {category.status === 'active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Category
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No categories found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}