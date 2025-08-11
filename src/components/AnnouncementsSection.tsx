import { Calendar, Megaphone, Video, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type Announcement = {
  id: string;
  title: string;
  date: string; // ISO string
  type: "maintenance" | "feature" | "event";
  summary: string;
  link?: { href: string; label: string };
};

const announcements: Announcement[] = [
  {
    id: "maint-2025-08-15",
    title: "Scheduled Maintenance – August 15, 02:00–03:00 UTC",
    date: "2025-08-15T02:00:00.000Z",
    type: "maintenance",
    summary:
      "We'll perform routine database upgrades to keep things fast and secure. Downtime may last up to 10 minutes during the window.",
    link: { href: "/about#status", label: "Status details" },
  },
  {
    id: "feature-adv-search",
    title: "New: Advanced Search with Filters and Ratings",
    date: "2025-08-05T10:00:00.000Z",
    type: "feature",
    summary:
      "Find artworks faster with period, category, and rating filters. You can also sort by popularity or recency.",
    link: { href: "/gallery", label: "Try it now" },
  },
  {
    id: "event-webinar-01",
    title: "Community Webinar: Curating Renaissance Art",
    date: "2025-08-20T17:00:00.000Z",
    type: "event",
    summary:
      "Join our live session with guest historians on best practices for digital curation and storytelling.",
    link: { href: "/contact", label: "Register free" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((a) => (
            <Card key={a.id} className="hover:shadow-elegant transition-all duration-300">
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
              <CardContent>
                {a.link && (
                  <a
                    href={a.link.href}
                    className="text-primary hover:underline font-medium"
                    aria-label={`${a.link.label}: ${a.title}`}
                  >
                    {a.link.label}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </section>
  );
}
