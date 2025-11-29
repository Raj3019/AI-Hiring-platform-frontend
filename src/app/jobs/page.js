"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { jobs as initialJobs } from "@/lib/jobs-data";
import { Button } from "@/components/ui/button";
import AlertGradientDemo from "@/components/ui/alert-10";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const showSetupAlert = searchParams.get("newUser") === "true";
  
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
  });

  useEffect(() => {
    const newFilteredJobs = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === "" || job.category === filters.category;
      const matchesType = filters.type === "" || job.type === filters.type;

      return matchesSearch && matchesCategory && matchesType;
    });
    setFilteredJobs(newFilteredJobs);
  }, [filters, jobs]);

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      type: "",
    });
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="container mx-auto px-4 py-12">
        {showSetupAlert && (
          <div className="mb-6">
            <AlertGradientDemo showSetupAlert={true} />
          </div>
        )}
        
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Careers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Join our team and help us build the future. Explore open positions below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <JobFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleReset}
            />
          </aside>
          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border rounded-xl bg-card border-dashed">
                  <div className="text-muted-foreground text-lg font-medium">No jobs found</div>
                  <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button variant="link" onClick={handleReset} className="mt-4">Clear all filters</Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
