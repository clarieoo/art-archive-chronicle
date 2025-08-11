import { Calendar, Megaphone, Video, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export type Announcement = {
  id: string;
  title: string;
  date: string; // ISO string
  type: "maintenance" | "feature" | "event";
  summary: string;
  link?: { href: string; label: string };
};

export const announcements: Announcement[] = [
  {
    id: "maint-2025-08-15",
    title: "Scheduled Maintenance – Aug 15, 02:00–03:00 UTC",
    date: "2025-08-15T02:00:00.000Z",
    type: "maintenance",
    summary:
      "We’ll upgrade databases and apply security patches. Brief downtime (up to 10 minutes) may occur during the window.",
  },
  {
    id: "feature-adv-search",
    title: "Advanced Search: Filter by Period, Category, Rating",
    date: "2025-08-05T10:00:00.000Z",
    type: "feature",
    summary:
      "Quickly find artworks using period/category filters and sort by popularity or recency for better discovery.",
  },
  {
    id: "event-webinar-01",
    title: "Webinar: Curating Renaissance Masterpieces",
    date: "2025-08-20T17:00:00.000Z",
    type: "event",
    summary:
      "Join historians for a live session on digital curation workflows and storytelling best practices.",
  },
  {
    id: "feature-mobile-ui",
    title: "Improved Mobile UI: Faster, Smoother Browsing",
    date: "2025-08-10T08:00:00.000Z",
    type: "feature",
    summary:
      "We refined navigation and image loading on phones and tablets to make exploring the gallery feel effortless.",
  },
  {
    id: "event-community-challenge",
    title: "Community Challenge: Baroque Highlights Week",
    date: "2025-08-25T12:00:00.000Z",
    type: "event",
    summary:
      "Share your favorite Baroque pieces, vote on submissions, and celebrate dramatic light and movement.",
  },
];

function typeBadge(type: Announcement["type"]) {
  switch (type) {
    case "maintenance":
      return (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-warning">
          <Wrench className="h-4 w-4" aria-hidden="true" /> Maintenance
        </span>
      );
    case "feature":
      return (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
          <Megaphone className="h-4 w-4" aria-hidden="true" /> New Feature
        </span>
      );
    case "event":
      return (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          <Video className="h-4 w-4" aria-hidden="true" /> Event
        </span>
      );
  }
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}

export function AnnouncementsSection() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: announcements.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        headline: a.title,
        datePublished: a.date,
        description: a.summary,
        url: a.link?.href ?? "/",
      },
    })),
  };

  return (
    <section aria-labelledby="announcements-title" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 id="announcements-title" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Latest Announcements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Product updates, planned maintenance, and community events.
          </p>
        </header>

        <Carousel className="w-full max-w-3xl mx-auto" opts={{ loop: true, align: "start" }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}>
          <CarouselContent>
            {announcements.map((a) => (
              <CarouselItem key={a.id} className="basis-full">
                <Card className="hover:shadow-elegant transition-all duration-300 animate-fade-in">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {typeBadge(a.type)}
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {formatDate(a.date)}
                      </span>
                    </div>
                    <CardTitle className="text-xl mt-2">{a.title}</CardTitle>
                    <CardDescription>{a.summary}</CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between mt-6">
            <CarouselPrevious aria-label="Previous announcement" />
            <CarouselNext aria-label="Next announcement" />
          </div>
        </Carousel>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </section>
  );
}
