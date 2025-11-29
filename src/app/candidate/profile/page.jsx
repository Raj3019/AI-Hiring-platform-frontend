"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Mail, 
  Edit, 
  Star, 
  Users, 
  CheckCircle,
  X,
  ChevronDown,
  Upload,
  CalendarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  User,
  GraduationCap,
  Briefcase,
  Globe
} from "lucide-react";
import EducationSection from "@/components/profile/EducationSection";
import ExperienceSection from "@/components/profile/ExperienceSection";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, icon: User, title: "Personal Information", subtitle: "Add Personal Info" },
  { id: 2, icon: GraduationCap, title: "Education & Skills", subtitle: "Education Details" },
  { id: 3, icon: Briefcase, title: "Experience", subtitle: "Work Experience" },
  { id: 4, icon: Globe, title: "Additional Info", subtitle: "Links & Preferences" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [openSection, setOpenSection] = useState("tenth");
  const [openPopovers, setOpenPopovers] = useState({});
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeUploadSuccess, setResumeUploadSuccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Fetch user profile data on mount
  useEffect(() => {
    // Redirect if not logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace('/login');
      return;
    }
    setAuthLoading(false);

    const fetchProfile = async () => {
      try {
        // Adjust API endpoint as needed
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/profile`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        if (res.ok) {
          const responseData = await res.json();
          console.log("API Response:", responseData);
          
          const data = responseData.data || responseData;
          
          // Transform the API response to match form structure
          const transformedData = {
            fullName: data.fullName || "",
            about: data.about || "",
            phone: data.phone || "",
            dateOfBirth: data.dateOfBirth || "",
            gender: data.gender || "",
            area: data.area || "",
            currentCity: data.currentCity || "",
            state: data.state || "",
            country: data.country || "India",
            zipCode: data.zipCode || "",
            profilePicture: data.profilePicture || "",
            
            // Skills
            skills: data.skills || "",
            
            // Transform education object to flat structure
            ...(data.education ? {
              // 10th Standard
              tenthSchoolName: data.education.tenth?.schoolName || "",
              tenthBoard: data.education.tenth?.board || "",
              tenthPercentage: data.education.tenth?.percentage || "",
              tenthGrade: data.education.tenth?.grade || "",
              tenthPassingYear: data.education.tenth?.passingYear || "",
              tenthCity: data.education.tenth?.city || "",
              tenthState: data.education.tenth?.state || "",
              
              // Junior College (12th)
              juniorCollegeName: data.education.juniorCollege?.collegeName || "",
              juniorBoard: data.education.juniorCollege?.board || "",
              juniorStream: data.education.juniorCollege?.stream || "",
              juniorPercentage: data.education.juniorCollege?.percentage || "",
              juniorGrade: data.education.juniorCollege?.grade || "",
              juniorPassingYear: data.education.juniorCollege?.passingYear || "",
              juniorCity: data.education.juniorCollege?.city || "",
              juniorState: data.education.juniorCollege?.state || "",
              
              // Graduation
              graduationCollegeName: data.education.graduation?.collegeName || "",
              graduationUniversity: data.education.graduation?.university || "",
              graduationDegree: data.education.graduation?.degree || "",
              graduationSpecialization: data.education.graduation?.specialization || "",
              graduationCGPA: data.education.graduation?.cgpa || "",
              graduationPassingYear: data.education.graduation?.passingYear || "",
              graduationCity: data.education.graduation?.city || "",
              graduationState: data.education.graduation?.state || "",
            } : {}),
            
            // Experience
            isFresher: data.isFresher || false,
            experienceYears: data.experienceYears || "",
            workExperience: data.workExperience || [{ jobTitle: "", company: "", location: "", startDate: "", endDate: "", currentlyWorking: false, description: "" }],
            certifications: data.certifications || [{ name: "", issuingOrganization: "", issueDate: "", credentialURL: "" }],
            languages: data.languages || [{ language: "", proficiency: "" }],
            
            // Additional Info
            resumeFileURL: data.resumeFileURL || "",
            portfolioUrl: data.portfolioUrl || "",
            linkedinUrl: data.linkedinUrl || "",
            githubUrl: data.githubUrl || "",
            jobType: data.jobType || [],
            workMode: data.workMode || [],
            preferredLocations: data.preferredLocations || "",
            willingToRelocate: data.willingToRelocate || false,
          };
          
          setFormData((prev) => ({
            ...prev,
            ...transformedData,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [router]);

  const [formData, setFormData] = useState({
    // Personal Information
    profilePicture: "",
    fullName: "John Doe",
    about: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    area: "",
    currentCity: "",
    state: "",
    country: "India",
    zipCode: "",
    
    // Education & Skills
    skills: "",
    tenthSchoolName: "", tenthBoard: "", tenthPercentage: "", tenthGrade: "", tenthPassingYear: "", tenthCity: "", tenthState: "",
    juniorCollegeName: "", juniorBoard: "", juniorStream: "", juniorPercentage: "", juniorGrade: "", juniorPassingYear: "", juniorCity: "", juniorState: "",
    graduationCollegeName: "", graduationUniversity: "", graduationDegree: "", graduationSpecialization: "", graduationCGPA: "", graduationPassingYear: "", graduationCity: "", graduationState: "",
    pgCollegeName: "", pgUniversity: "", pgDegree: "", pgSpecialization: "", pgCGPA: "", pgPassingYear: "",
    
    // Experience
    isFresher: false,
    experienceYears: "",
    workExperience: [{ jobTitle: "", company: "", location: "", startDate: "", endDate: "", currentlyWorking: false, description: "" }],
    certifications: [{ name: "", issuingOrganization: "", issueDate: "", credentialURL: "" }],
    languages: [{ language: "", proficiency: "" }],
    
    // Additional Info
    resumeFileURL: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    jobType: [],
    workMode: [],
    preferredLocations: "",
    willingToRelocate: false,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = async (file) => {
    if (!file) return;

    setResumeUploading(true);
    setResumeUploadSuccess(false);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Make sure you store userId when user logs in
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/profile/${userId}/resume`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateFormData("resumeFileURL", data.resumeUrl || data.filePath || file.name);
        setResumeUploadSuccess(true);
        console.log("Resume uploaded successfully:", data);
        // Hide success message after 3 seconds
        setTimeout(() => setResumeUploadSuccess(false), 3000);
      } else {
        console.error("Resume upload failed:", await response.text());
        alert("Failed to upload resume. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("An error occurred while uploading resume.");
    } finally {
      setResumeUploading(false);
    }
  };

  const togglePopover = (popoverName, isOpen) => {
    setOpenPopovers((prev) => ({ ...prev, [popoverName]: isOpen }));
  };

  const isPopoverOpen = (popoverName) => {
    return openPopovers[popoverName] || false;
  };

  const handleSave = async () => {
    console.log("Saving profile:", formData);
    setIsEditMode(false);
    // Add API call here to save the data
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setCurrentStep(0);
  };

  if (authLoading) {
    return null; // or a spinner/loading component
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        {!isEditMode && (
          <Button onClick={() => setIsEditMode(true)} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
        {isEditMode && (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-8rem)] overflow-auto">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4 group">
                <img 
                  src={formData.profilePicture || "https://github.com/shadcn.png"} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary/10"
                />
                {isEditMode && (
                  <label 
                    htmlFor="profilePictureUpload" 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="h-6 w-6 text-white" />
                    <input
                      id="profilePictureUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateFormData("profilePicture", reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-1">{formData.fullName}</h2>
              <p className="text-muted-foreground text-sm mb-2">Product Designer</p>
              
              {formData.currentCity && formData.state && (
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1 justify-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {formData.currentCity}, {formData.state}
                </p>
              )}
              
              <Badge variant="secondary" className="mb-4">Pro Member</Badge>
              
              <Button className="w-full mb-6 gap-2">
                <Mail className="h-4 w-4" />
                Message
              </Button>
              
              {/* Skills Preview */}
              {formData.skills && (
                <div className="w-full mb-6 text-left">
                  <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Top Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(formData.skills) ? formData.skills : formData.skills.split(',')).slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {typeof skill === 'string' ? skill.trim() : skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="w-full space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Last active</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
                {formData.experienceYears && !formData.isFresher && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{formData.experienceYears} years</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats/Activity OR Edit Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {!isEditMode ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">128</div>
                      <div className="text-xs text-muted-foreground">Projects Completed</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8.5k</div>
                      <div className="text-xs text-muted-foreground">Team Members</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">99%</div>
                      <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[1, 2, 3].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 pb-6 border-b last:border-0 last:pb-0">
                        <div className="mt-1 p-2 bg-muted rounded-full">
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Completed project "Dashboard UI"
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            // Edit Form
            <Card>
              <CardContent className="pt-6">
                {/* Step Indicator */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {steps.map((step, index) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={step.id} className="flex items-center gap-3">
                          <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setCurrentStep(index)}
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                                index === currentStep
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-400"
                              )}
                            >
                              <StepIcon className="w-4 h-4" />
                            </div>
                            <div className="hidden md:block">
                              <div
                                className={cn(
                                  "font-semibold text-sm transition-colors whitespace-nowrap",
                                  index === currentStep ? "text-black" : "text-gray-400"
                                )}
                              >
                                {step.title}
                              </div>
                            </div>
                          </div>
                          {index < steps.length - 1 && (
                            <ChevronDown className="text-gray-300 w-4 h-4 rotate-[-90deg] hidden sm:block" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form Content - Scrollable */}
                <div className="max-h-[600px] overflow-y-auto pr-2 bg-gray-50/30 rounded-lg p-4">
                  {/* Step 0: Personal Information */}
                  {currentStep === 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-2">Personal Information</h2>
                      <p className="text-sm text-gray-600 mb-5">Enter Your Personal Details</p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => updateFormData("fullName", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="about">About</Label>
                          <Textarea
                            id="about"
                            placeholder="Tell us about yourself"
                            value={formData.about}
                            onChange={(e) => updateFormData("about", e.target.value)}
                            className="min-h-20"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="+91 98765 43210"
                              maxLength={10}
                              value={formData.phone}
                              onChange={(e) => updateFormData("phone", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Popover open={isPopoverOpen("dateOfBirth")} onOpenChange={(isOpen) => togglePopover("dateOfBirth", isOpen)}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formData.dateOfBirth && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formData.dateOfBirth ? format(new Date(formData.dateOfBirth), "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                                  onSelect={(date) => {
                                    updateFormData("dateOfBirth", date ? date.toISOString() : "");
                                    togglePopover("dateOfBirth", false);
                                  }}
                                  captionLayout="dropdown"
                                  fromYear={1950}
                                  toYear={new Date().getFullYear()}
                                  disabled={(date) => date > new Date()}
                                  defaultMonth={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date(2000, 0, 1)}
                                  className="rounded-md border"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Popover open={isPopoverOpen("gender")} onOpenChange={(isOpen) => togglePopover("gender", isOpen)}>
                            <PopoverTrigger asChild>
                              <Button variant="outline" role="combobox" className="w-full justify-between">
                                {formData.gender || "Select gender"}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                              <div className="p-1">
                                {["Male", "Female", "Other"].map((gender) => (
                                  <div
                                    key={gender}
                                    className={cn(
                                      "flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100",
                                      formData.gender === gender && "bg-gray-100"
                                    )}
                                    onClick={() => {
                                      updateFormData("gender", gender);
                                      togglePopover("gender", false);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.gender === gender ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {gender}
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="area">Area/Locality</Label>
                          <Input
                            id="area"
                            placeholder="e.g., Koramangala"
                            value={formData.area}
                            onChange={(e) => updateFormData("area", e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentCity">City</Label>
                            <Input
                              id="currentCity"
                              placeholder="e.g., Bangalore"
                              value={formData.currentCity}
                              onChange={(e) => updateFormData("currentCity", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              placeholder="e.g., Karnataka"
                              value={formData.state}
                              onChange={(e) => updateFormData("state", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              placeholder="India"
                              value={formData.country}
                              onChange={(e) => updateFormData("country", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input
                              id="zipCode"
                              placeholder="560001"
                              value={formData.zipCode}
                              onChange={(e) => updateFormData("zipCode", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Education & Skills */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl font-bold mb-2">Education & Skills</h2>
                      <p className="text-sm text-gray-600 mb-5">Enter Your Educational Background</p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="skills">Skills (comma-separated)</Label>
                          <Input
                            id="skills"
                            placeholder="e.g., JavaScript, React, Node.js, Python"
                            value={formData.skills}
                            onChange={(e) => updateFormData("skills", e.target.value)}
                          />
                        </div>
                        <EducationSection
                          formData={formData}
                          updateFormData={updateFormData}
                          openSection={openSection}
                          setOpenSection={setOpenSection}
                          openPopovers={openPopovers}
                          togglePopover={togglePopover}
                          isPopoverOpen={isPopoverOpen}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Experience */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl font-bold mb-2">Work Experience</h2>
                      <p className="text-sm text-gray-600 mb-5">Tell us about your professional experience</p>
                      <ExperienceSection
                        formData={formData}
                        updateFormData={updateFormData}
                        openSection={openSection}
                        setOpenSection={setOpenSection}
                        togglePopover={togglePopover}
                        isPopoverOpen={isPopoverOpen}
                      />
                    </div>
                  )}

                  {/* Step 3: Additional Info - Placeholder */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl font-bold mb-2">Additional Information</h2>
                      <p className="text-sm text-gray-600 mb-5">Links and Job Preferences</p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="resumeUpload">Resume</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="resumeUpload"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              disabled={resumeUploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleResumeUpload(file);
                                }
                              }}
                            />
                            {formData.resumeFileURL && !resumeUploading && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  updateFormData("resumeFileURL", "");
                                  setResumeUploadSuccess(false);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          {/* Upload Status Messages */}
                          {resumeUploading && (
                            <div className="flex items-center gap-2 text-sm text-blue-600">
                              <Upload className="h-4 w-4 animate-bounce" />
                              <span>Uploading resume...</span>
                            </div>
                          )}
                          
                          {resumeUploadSuccess && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span>Resume uploaded successfully!</span>
                            </div>
                          )}
                          
                          {formData.resumeFileURL && !resumeUploading && (
                            <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <p className="text-xs text-green-700 flex-1">
                                <span className="font-medium">Current resume:</span> {formData.resumeFileURL.split('/').pop() || formData.resumeFileURL}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                          <Input
                            id="portfolioUrl"
                            placeholder="https://yourportfolio.com"
                            value={formData.portfolioUrl}
                            onChange={(e) => updateFormData("portfolioUrl", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                          <Input
                            id="linkedinUrl"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={formData.linkedinUrl}
                            onChange={(e) => updateFormData("linkedinUrl", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="githubUrl">GitHub URL</Label>
                          <Input
                            id="githubUrl"
                            placeholder="https://github.com/yourusername"
                            value={formData.githubUrl}
                            onChange={(e) => updateFormData("githubUrl", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-row-reverse justify-between mt-6 pt-4 border-t">
                  {currentStep !== steps.length - 1 && (
                    <Button
                      onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                    >
                      Next
                    </Button>
                  )}
                  {currentStep !== 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                    >
                      Previous
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
