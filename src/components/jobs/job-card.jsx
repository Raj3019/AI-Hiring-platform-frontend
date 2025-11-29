import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Briefcase, Building2 } from "lucide-react";

export function JobCard({ job }) {
  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md bg-card">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight leading-tight">{job.title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
          </div>
          <Badge variant={job.type === "Full-time" ? "default" : "secondary"} className="shrink-0">
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 py-2">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.category}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.postedAt}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full font-semibold shadow-none">Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
