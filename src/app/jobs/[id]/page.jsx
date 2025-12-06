"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, ChevronLeft, Loader2, X, MapPin, Briefcase, Clock, DollarSign, Award, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import FileUpload06 from '@/components/file-upload-06';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// small helpers
const formatSalary = (salary) => {
  if (!salary && salary !== 0) return '';
  if (typeof salary === 'string') return salary;
  if (typeof salary === 'number') return salary.toString();
  if (salary.min != null || salary.max != null) {
    try {
      const min = salary.min ?? '';
      const max = salary.max ?? '';
      const cur = salary.currency ?? 'USD';
      if (typeof min === 'number' && typeof max === 'number') {
        const nf = new Intl.NumberFormat(undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0 });
        return `${nf.format(min)} - ${nf.format(max)}`;
      }
      return `${cur} ${min} - ${max}`;
    } catch (e) {
      return '';
    }
  }
  return String(salary);
};

const timeAgo = (iso) => {
  try {
    const date = new Date(iso);
    if (isNaN(date)) return '';
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secondsAgo < 60) return 'Just now';
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  } catch (e) { return '' }
};

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [score, setScore] = useState(null);
  const [reason, setReason] = useState(null);
  const scoreRef = useRef(null);
  const reasonRef = useRef(null);

  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [scoringLoading, setScoringLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const filePickerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const API = process.env.NEXT_PUBLIC_API_URL ?? '';

        // Try single-job endpoint first
        try {
          const res = await axios.get(`${API}/job/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (!mounted) return;
          const data = res.data?.data ?? res.data ?? null;
          setJob(data);
          return;
        } catch (singleErr) {
          // If single job endpoint not available or returns 404, fallback to list lookup
          const status = singleErr?.response?.status;
          if (status !== 404) throw singleErr;
        }

        // Fallback: fetch all jobs and find matching id/slug
        try {
          const listRes = await axios.get(`${API}/jobs`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (!mounted) return;
          const list = listRes.data?.data ?? listRes.data ?? [];
          const match = (list || []).find((j) => {
            const jid = j._id ?? j.id ?? (j.slug ?? j.title?.toLowerCase().replace(/\s+/g, '-'));
            return String(jid) === String(id);
          });
          if (match) {
            setJob(match);
            return;
          }
          // not found in list -> keep falling through to set error
          throw new Error('Job not found');
        } catch (listErr) {
          throw listErr;
        }
      } catch (err) {
        console.error('Failed to fetch job details', err);
        // Show a helpful message for 404s
        const status = err?.response?.status;
        if (status === 404) {
          setError('Job not found. Please check the job ID or API endpoint.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load job');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJob();
    return () => { mounted = false; };
  }, [id]);

  const openFilePicker = () => {
    filePickerRef.current?.click();
  };

  const onFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newUploads = Array.from(selectedFiles).map((file, index) => ({
        id: `file-${index}`,
        name: file.name,
        progress: 0,
        status: 'uploading',
      }));
      setUploads((prev) => [...prev, ...newUploads]);

      // Reset file input value
      event.target.value = '';

      // Mock upload progress
      newUploads.forEach((upload) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 20) + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploads((prev) =>
              prev.map((u) => (u.id === upload.id ? { ...u, progress, status: 'completed' } : u))
            );
          } else {
            setUploads((prev) =>
              prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
            );
          }
        }, 400);
      });
    }
  };

  const removeUploadById = (id) => {
    setUploads((prevUploads) => prevUploads.filter((file) => file.id !== id));
  };

  // Ensure the file's state is reset when canceled
  const activeUploads = uploads.filter((file) => file.status === 'uploading');
  const completedUploads = uploads.filter((file) => file.status === 'completed');

  const handleFilesChange = (files) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]); // Take the first file
      // Reset score when file changes
      setScore(null);
      setReason(null);
    } else {
      setSelectedFile(null);
    }
  };

  const handleCheckScore = async () => {
    if (!selectedFile || !job) return;

    setScoringLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const API = process.env.NEXT_PUBLIC_API_URL ?? '';
      
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('jobDescription', JSON.stringify(job)); // Sending job details

      const res = await axios.post(`${API}/job/test/${job._id ?? job.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.data) {

        
        let finalScore = null;
        let finalReason = null;

        // The API returns: { message: "{\"score\": 3, \"reason\": \"...\"}" }
        // We need to parse the stringified JSON inside the message field
        
        if (res.data.message) {
            const messageStr = res.data.message;
            
            try {
                // Parse the stringified JSON
                const parsed = JSON.parse(messageStr);
                
                if (parsed && typeof parsed === 'object') {
                    finalScore = parsed.score;
                    finalReason = parsed.reason;
                }
            } catch (e) {
                console.error('Failed to parse message JSON:', e);
                console.error('Message content:', messageStr);
            }
        }
        // Fallback: check if score/reason are directly in response
        else if (res.data.score !== undefined) {
            finalScore = res.data.score;
            finalReason = res.data.reason;
        }
        // Check in data.data
        else if (res.data.data) {
            if (res.data.data.message) {
                try {
                    const parsed = JSON.parse(res.data.data.message);
                    finalScore = parsed.score;
                    finalReason = parsed.reason;
                } catch (e) {
                    console.error('Failed to parse data.data.message:', e);
                }
            } else {
                finalScore = res.data.data.score;
                finalReason = res.data.data.reason;
            }
        }

        if (finalScore !== null && finalScore !== undefined) {
            // Store in refs immediately (synchronous)
            scoreRef.current = Number(finalScore);
            reasonRef.current = finalReason || 'No detailed analysis provided.';
            
            // Also set state for potential future use
            setScore(Number(finalScore));
            setReason(finalReason || 'No detailed analysis provided.');
            
            setShowScoreDialog(true);
        } else {
            console.error('Could not extract score from response');
            toast.error('Failed to parse score from API response.', {
              description: 'Please check the console for more details.',
              style: {
                '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                '--normal-text': 'var(--destructive)',
                '--normal-border': 'var(--destructive)'
              },
              duration: 5000,
            });
        }
      }
    } catch (err) {
      console.error('Failed to check score', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to analyze resume. Please try again.';
      
      toast.error(errorMessage, {
        style: {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        },
        duration: 5000,
      });
    } finally {
      setScoringLoading(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!selectedFile || !job) return;

    setSubmitting(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const API = process.env.NEXT_PUBLIC_API_URL ?? '';

      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('jobId', job._id ?? job.id);

      await axios.post(`${API}/job/${job._id ?? job.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // Handle success (e.g., redirect or show success message)
      toast.success('Application submitted successfully!', {
        description: 'Your application has been received and is being processed.',
        duration: 4000,
      });
      
      // Clear the selected file after successful submission
      setSelectedFile(null);
      setScore(null);
      setReason(null);
      
      // router.push('/applications'); // Optional redirect
    } catch (err) {
      console.error('Failed to submit application', err);
      
      // Don't show toast for 401/403 as interceptor handles those
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        // Interceptor will handle redirect
        return;
      }
      
      // Extract error message from response
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to submit application. Please try again.';
      
      toast.error(errorMessage, {
        style: {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        },
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/5">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground py-4 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 pb-6">

        {loading ? (
          <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded">{String(error)}</div>
        ) : (!job) ? (
          <div className="p-6 bg-card rounded">Job not found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <main className="lg:col-span-2">
              {/* Company and Title */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.companyName}</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {job.location && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  )}
                  {job.workType && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
                      {job.workType}
                    </span>
                  )}
                  {job.experienceLevel && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {job.experienceLevel}
                    </span>
                  )}
                  {job.createdAt && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Posted {timeAgo(job.createdAt)}
                    </span>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg border p-5 mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-4 w-4" />
                  <h2 className="font-bold text-base">Job Description</h2>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {Array.isArray(job.description) ? job.description.join('\n\n') : (typeof job.description === 'object' ? JSON.stringify(job.description) : job.description)}
                </div>
              </div>

              {/* Required Skills */}
              {job.skillsRequired && job.skillsRequired.length > 0 && (
                <div className="bg-white rounded-lg border p-5 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4" />
                    <h2 className="font-bold text-base">Required Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Salary & Department */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg border border-green-100 p-4">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase">Salary Range</span>
                  </div>
                  <div className="font-bold text-lg">{formatSalary(job.salary) || 'Competitive'}</div>
                </div>
                <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase">Department</span>
                  </div>
                  <div className="font-bold text-lg">{job.department ?? job.category ?? 'General'}</div>
                </div>
              </div>
            </main>

            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-white p-6 rounded-xl border">
                <h2 className="font-bold text-lg mb-4">Apply for this job</h2>
                
                <div className="mb-6">
                  {/* File Upload 06 Component */}
                  <FileUpload06 onFilesChange={handleFilesChange} />
                </div>

                {selectedFile && (
                  <div className="space-y-3 mb-6">
                    <Button 
                      onClick={handleCheckScore} 
                      disabled={scoringLoading}
                      variant="outline"
                      className="w-full border-blue-200 hover:bg-blue-50 text-blue-700 font-medium h-11 rounded-lg"
                    >
                      {scoringLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Check Resume Score
                        </>
                      )}
                    </Button>

                    <Dialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            {(scoreRef.current || 0) >= 7 ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (scoreRef.current || 0) >= 4 ? (
                              <AlertCircle className="h-6 w-6 text-yellow-600" />
                            ) : (
                              <TrendingUp className="h-6 w-6 text-red-600" />
                            )}
                            Resume Match Analysis
                          </DialogTitle>
                          <DialogDescription className="text-base">
                            AI-powered analysis of how well your resume matches this position
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-6 space-y-6">
                          {/* Score Display */}
                          <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Match Score</span>
                              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold shadow-sm ${ 
                                (scoreRef.current || 0) >= 7 ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200' : 
                                (scoreRef.current || 0) >= 4 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200' : 
                                'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                              }`}>
                                <Award className="h-5 w-5" />
                                <span>{scoreRef.current !== null ? scoreRef.current : '?'}/10</span>
                              </div>
                            </div>
                            
                            {/* Enhanced Progress Bar */}
                            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                              <div 
                                className={`h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                                  (scoreRef.current || 0) >= 7 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                                  (scoreRef.current || 0) >= 4 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                                  'bg-gradient-to-r from-red-400 to-red-600'
                                }`} 
                                style={{ width: `${(scoreRef.current || 0) * 10}%` }}
                              >
                                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                              </div>
                            </div>
                            
                            {/* Score interpretation */}
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                              {(scoreRef.current || 0) >= 7 ? '🎉 Excellent match! Your profile aligns very well.' : 
                               (scoreRef.current || 0) >= 4 ? '👍 Good match with some areas for improvement.' : 
                               '💡 Consider enhancing your skills for this role.'}
                            </p>
                          </div>

                          {/* Analysis Section */}
                          <div className="bg-gradient-to-br from-muted/30 to-muted/50 p-5 rounded-xl border border-border shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <Briefcase className="h-4 w-4 text-foreground" />
                              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Detailed Analysis</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {reasonRef.current || 'Loading analysis...'}
                            </p>
                          </div>
                        </div>

                        <DialogFooter className="gap-2">
                          <Button type="button" variant="outline" onClick={() => setShowScoreDialog(false)} className="flex-1">
                            Close
                          </Button>
                          <Button type="button" onClick={() => setShowScoreDialog(false)} className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700">
                            Got it!
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                  </div>
                )}

                <Button 
                  type="submit" 
                  onClick={handleSubmitApplication}
                  disabled={!selectedFile || submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
