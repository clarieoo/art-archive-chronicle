import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Megaphone, Calendar as CalendarIcon, Type, FileText, Tags, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const AnnouncementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.enum(["maintenance", "feature", "event"]),
  date: z.date({ required_error: "Please pick a date and time" }),
  time: z.string().regex(/^\d{2}:\d{2}$/g, "Use 24h format HH:MM"),
  summary: z.string().min(10, "Please add a short description"),
  tags: z.string().optional(),
  linkLabel: z.string().optional(),
  linkUrl: z.string().url("Enter a valid URL").optional(),
});

type AnnouncementForm = z.infer<typeof AnnouncementSchema>;

export default function MakeAnnouncement() {
  const form = useForm<AnnouncementForm>({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      title: "",
      type: "feature",
      date: new Date(),
      time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit" }),
      summary: "",
      tags: "",
      linkLabel: "",
      linkUrl: "",
    },
  });

  const watch = form.watch();

  React.useEffect(() => {
    document.title = "Make Announcement | Admin";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Create a new announcement to notify users about updates, events, or maintenance.");
  }, []);

  function onSubmit(values: AnnouncementForm) {
    // Combine date and time into ISO string for demonstration
    const [hours, minutes] = values.time.split(":").map((n) => parseInt(n, 10));
    const scheduled = new Date(values.date);
    scheduled.setHours(hours, minutes, 0, 0);

    const payload = {
      ...values,
      dateTimeISO: scheduled.toISOString(),
      tags: values.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [],
      link: values.linkUrl ? { href: values.linkUrl, label: values.linkLabel || "Learn more" } : undefined,
    };

    console.log("Announcement payload (demo only):", payload);
    toast({
      title: "Announcement drafted",
      description: `“${values.title}” scheduled for ${format(scheduled, "PPpp")}`,
    });
  }

  return (
    <main className="p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="mb-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 inline-flex items-center gap-3">
              <Megaphone className="h-8 w-8 text-primary" /> Make Announcement
            </h1>
            <p className="text-muted-foreground">Notify users about product updates, events, and maintenance.</p>
          </div>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-6 rounded-xl border">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center gap-2"><Type className="h-4 w-4" /> Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Scheduled Maintenance – Aug 15" {...field} />
                  </FormControl>
                  <FormDescription>Keep it concise and informative.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex items-center gap-2"><Tags className="h-4 w-4" /> Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time (24h)</FormLabel>
                    <FormControl>
                      <Input type="time" step="60" placeholder="14:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Briefly describe the announcement..." {...field} />
                  </FormControl>
                  <FormDescription>Provide context or instructions users should know.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., database, performance" {...field} />
                  </FormControl>
                  <FormDescription>Comma-separated keywords to categorize the announcement.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="linkLabel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Label (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Learn more" {...field} />
                    </FormControl>
                    <FormDescription>Text shown on the link to more details.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/post" {...field} />
                    </FormControl>
                    <FormDescription>Where users can read the full announcement.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit" className="hover-scale">
                Publish
              </Button>
            </div>
          </form>
          <aside className="mt-8">
            <div className="rounded-xl border bg-muted/20 p-5">
              <p className="text-sm font-medium text-muted-foreground mb-2">Live preview</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary capitalize">{watch.type}</span>
                  <span className="text-xs text-muted-foreground">{watch.date ? format(watch.date, "PP") : "Pick a date"} {watch.time}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{watch.title || "Your announcement title"}</h3>
                <p className="text-sm text-muted-foreground">{watch.summary || "A brief description will appear here."}</p>
                {watch.linkUrl && (
                  <a href={watch.linkUrl} className="story-link inline-flex items-center text-sm mt-2" target="_blank" rel="noreferrer">
                    {watch.linkLabel || "Learn more"}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </Form>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Make Announcement",
            description: "Create a new announcement to notify users about updates, events, or maintenance.",
          }),
        }}
      />
    </main>
  );
}
