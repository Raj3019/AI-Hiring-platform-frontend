"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AlertGradientDemo from "@/components/ui/alert-10";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const showSetupAlert = searchParams.get("newUser") === "true";
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const {isLoggedIn, loading, logout} = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
  });

  // Redirect if unauthenticated and compute filtered list when jobs/filters change
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/login');
      return;
    }

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
  }, [isLoggedIn, loading, filters, jobs, router]);

  // Fetch jobs from API when user is authenticated
  // Fetch jobs (moved out so it can be retried)
  const fetchJobs = async () => {
    setJobsLoading(true);
    setJobsError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // no token locally -> force logout/redirect
        await logout();
        router.replace('/login');
        return;
      }
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // adjust according to your backend response shape
      const data = res.data?.data ?? res.data ?? [];
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      const status = err?.response?.status;
      // If token expired/invalid, force logout and redirect to login
      if (status === 401) {
        try {
          await logout();
        } catch (e) {
          console.error('Error during logout after 401:', e);
        }
        router.replace('/login');
        return;
      }
      setJobsError(err.response?.data?.message || err.message || 'Failed to load jobs');
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && isLoggedIn) {
      fetchJobs();
    }
  }, [isLoggedIn, loading]);

  // Show auth loading OR jobs loading spinner
  if (loading || !isLoggedIn || jobsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      type: "",
    });
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="container mx-auto px-4 py-5"> 
        {showSetupAlert && (
          <div className="mb-6">
            <AlertGradientDemo showSetupAlert={true} />
          </div>
        )}
        {jobsError && (
          <div className="mb-6">
            <div className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <strong className="block">Failed to load jobs</strong>
                  <div className="mt-1">{String(jobsError)}</div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <Button variant="ghost" onClick={() => fetchJobs()}>Retry</Button>
                  <Button variant="outline" onClick={async () => { await logout(); router.replace('/login'); }}>Logout</Button>
                </div>
              </div>
            </div>
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
                filteredJobs.map((job, idx) => (
                  <JobCard
                    key={job._id ?? job.id ?? `${job.title}-${job.company}-${idx}`}
                    job={job}
                  />
                ))
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
