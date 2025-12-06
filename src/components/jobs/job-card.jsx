import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Briefcase, Building2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export function JobCard({ job }) {
  // Helpers to safely render possible object fields from API
  const formatSalary = (salary) => {
    if (!salary && salary !== 0) return "";
    if (typeof salary === "string") return salary;
    if (typeof salary === "number") return `${salary}`;
    if (Array.isArray(salary)) {
      return salary.map(formatSalary).join(" • ");
    }
    if (typeof salary === "object") {
      // common shape: { min, max, currency }
      const { min, max, currency } = salary;
      if (min != null && max != null) {
        const cur = currency ?? "";
        // use Intl when numbers provided
        if (typeof min === 'number' && typeof max === 'number') {
          try {
            const nf = new Intl.NumberFormat(undefined, { style: 'currency', currency: currency ?? 'USD', maximumFractionDigits: 0 });
            return `${nf.format(min)} - ${nf.format(max)}`;
          } catch (e) {
            return `${cur}${min} - ${cur}${max}`;
          }
        }
        return `${cur}${min} - ${cur}${max}`;
      }
      // fallback: try to stringify simple values
      try {
        return JSON.stringify(salary);
      } catch (e) {
        return String(salary);
      }
    }
    return String(salary);
  };

  const formatLocation = (location) => {
    if (!location && location !== 0) return "";
    if (typeof location === 'string') return location;
    if (Array.isArray(location)) return location.join(', ');
    if (typeof location === 'object') {
      // common shape: { city, region }
      const { city, region, address } = location;
      if (city && region) return `${city}, ${region}`;
      if (city) return city;
      if (address) return address;
      try { return JSON.stringify(location); } catch (e) { return String(location); }
    }
    return String(location);
  }

  const formatPostedAt = (postedAt) => {
    if (!postedAt && postedAt !== 0) return "";

    // If backend provided a simple object like { daysAgo } or { pretty }
    if (typeof postedAt === "object") {
      if (postedAt.daysAgo != null) return `${postedAt.daysAgo} days ago`;
      if (postedAt.pretty) return postedAt.pretty;
      // try to extract a date field
      if (postedAt.date) postedAt = postedAt.date;
    }

    // Normalize strings/numbers to a Date
    let date;
    if (typeof postedAt === 'number' || typeof postedAt === 'string') {
      date = new Date(postedAt);
    }

    if (!date || isNaN(date.getTime())) {
      try { return String(postedAt); } catch (e) { return ''; }
    }

    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secondsAgo < 60) return 'Just now';
    if (secondsAgo < 3600) {
      const mins = Math.floor(secondsAgo / 60);
      return mins === 1 ? '1 minute ago' : `${mins} minutes ago`;
    }
    if (secondsAgo < 86400) {
      const hrs = Math.floor(secondsAgo / 3600);
      return hrs === 1 ? '1 hour ago' : `${hrs} hours ago`;
    }
    if (secondsAgo < 7 * 86400) {
      const days = Math.floor(secondsAgo / 86400);
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }

    // Fallback to a readable date for older items
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // normalize department field from various possible names
  const getDepartment = () => {
    const candidates = [
      job.department,
      job.departmentName,
      job.department_name,
      job.dept,
      job.departmentId,
      job.department_id,
      job.dept_name,
      job.company?.department,
      job.company?.departmentName,
      job.company?.department_name,
    ];

    for (const dept of candidates) {
      if (dept == null) continue;
      if (typeof dept === 'string' && dept.trim() !== '') return dept;
      if (Array.isArray(dept)) {
        const names = dept.map(d => (typeof d === 'string' ? d : (d?.name ?? d?.title ?? ''))).filter(Boolean);
        if (names.length) return names.join(', ');
      }
      if (typeof dept === 'object') {
        const name = dept.name ?? dept.title ?? dept.departmentName ?? dept.department_name ?? dept._id;
        if (name) return String(name);
      }
      // fallback to string conversion
      try { return String(dept); } catch (e) { continue; }
    }

    return null;
  };

  // Dev-only debug to help find where department is stored on the job object
  if (process.env.NODE_ENV !== 'production') {
    try {
      // eslint-disable-next-line no-console
      console.debug('Job department raw:', {
        department: job.department,
        departmentName: job.departmentName,
        department_name: job.department_name,
        departmentId: job.departmentId ?? job.department_id,
        companyDepartment: job.company?.department,
      });
    } catch (e) {}
  }

  const router = useRouter();

  const handleApply = () => {
    const id = job._id ?? job.id ?? encodeURIComponent((job.title ?? 'job').toLowerCase().replace(/\s+/g, '-'));
    router.push(`/jobs/${id}`);
  };

  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md bg-card">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight leading-tight">{job.title}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">{job.companyName ?? job.company}</span>
              </div>
          </div>
          <Badge variant={(job.workType ?? job.type) === "Full-time" ? "default" : "secondary"} className="shrink-0">
            {job.workType ?? job.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 py-2">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{formatLocation(job.location)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{formatSalary(job.salary)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {getDepartment() ?? (Array.isArray(job.category) ? job.category.join(', ') : (typeof job.category === 'object' ? (job.category.name ?? JSON.stringify(job.category)) : job.category))}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{formatPostedAt(job.updatedAt ?? job.postedAt)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed">
          {Array.isArray(job.description) ? job.description.join(' ') : (typeof job.description === 'object' ? JSON.stringify(job.description) : job.description)}
        </p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full font-semibold shadow-none" onClick={handleApply}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
