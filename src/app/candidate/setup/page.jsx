"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, User, CreditCard, Home, GraduationCap, Briefcase, Globe, Upload, CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";

const steps = [
  {
    id: 1,
    icon: User,
    title: "Personal Information",
    subtitle: "Add Personal Info",
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Education & Skills",
    subtitle: "Education Details",
  },
  {
    id: 3,
    icon: Briefcase,
    title: "Experience",
    subtitle: "Work Experience",
  },
  {
    id: 4,
    icon: Globe,
    title: "Additional Info",
    subtitle: "Links & Preferences",
  },
  // {
  //   id: 5,
  //   icon: CreditCard,
  //   title: "Billing",
  //   subtitle: "Payment Details",
  // },
];

const pricingPlans = [
  {
    name: "Basic",
    description: "Get 1 project with 1 team member.",
    price: 0,
    period: "/month",
  },
  {
    name: "Pro",
    description: "Get 5 projects with 5 team members.",
    price: 99,
    period: "/month",
  },
  {
    name: "Elite",
    description: "Get 25 projects with 25 team members.",
    price: 299,
    period: "/year",
  },
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [openSection, setOpenSection] = useState("tenth"); // Track which section is open across all steps
  
  // State to control Popover open/close - using object to handle dynamic keys
  const [openPopovers, setOpenPopovers] = useState({});
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
    }
  })

  const [formData, setFormData] = useState({
    // Personal Information (Step 0)
    profilePicture: "",
    fullName: "",
    about: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    area: "",
    currentCity: "",
    state: "",
    country: "India",
    zipCode: "",
    
    // Education & Skills (Step 1)
    skills: "",
    
    // 10th Standard
    tenthSchoolName: "",
    tenthBoard: "",
    tenthPercentage: "",
    tenthGrade: "",
    tenthPassingYear: "",
    tenthCity: "",
    tenthState: "",
    
    // Junior College (12th)
    juniorCollegeName: "",
    juniorBoard: "",
    juniorStream: "",
    juniorPercentage: "",
    juniorGrade: "",
    juniorPassingYear: "",
    juniorCity: "",
    juniorState: "",
    
    // Graduation
    graduationCollegeName: "",
    graduationUniversity: "",
    graduationDegree: "",
    graduationSpecialization: "",
    graduationCGPA: "",
    graduationPassingYear: "",
    graduationCity: "",
    graduationState: "",
    
    // Post Graduation (optional)
    pgCollegeName: "",
    pgUniversity: "",
    pgDegree: "",
    pgSpecialization: "",
    pgCGPA: "",
    pgPassingYear: "",
    
    // Experience (Step 2)
    isFresher: false,
    experienceYears: "",
    currentJobTitle: "",
    currentCompany: "",
    workExperience: [{
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: ""
    }],
    
    // Certifications
    certifications: [{
      name: "",
      issuingOrganization: "",
      issueDate: "",
      credentialURL: ""
    }],
    
    // Languages
    languages: [{
      language: "",
      proficiency: ""
    }],
    
    // Additional Info (Step 3)
    resumeFileURL: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    
    // Job Preferences
    jobType: [],
    workMode: [],
    preferredLocations: "",
    willingToRelocate: false,
    
    // Billing (Step 4)
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvc: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePopover = (popoverName, isOpen) => {
    setOpenPopovers((prev) => ({ ...prev, [popoverName]: isOpen }));
  };

  const isPopoverOpen = (popoverName) => {
    return openPopovers[popoverName] || false;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/employee/setup`, formData, 
        {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      alert("Profile setup sucessfully")
      Router.push('/jobs')
    } catch (error) {
      alert(
        err.response?.data?.message ||
        "Profile setup failed. Please try again."
      );
    }
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-[40%] bg-gray-50 flex-col items-center justify-center p-12">
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-lg h-auto relative"> {/* Increased max-w */}
            <Image
              src="/avatar-illustration.png"
              alt="Professional illustration"
              width={700}
              height={1000}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col p-6 lg:p-10">
        {/* Step Indicator */}
        <div className="mb-5 mt-2"> {/* Further reduced mt-2 to minimize white space above the step indicator */}
          <div className="flex items-center gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                        index < currentStep
                          ? "bg-black text-white"
                          : index === currentStep
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {index < currentStep ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <StepIcon className="w-[18px] h-[18px]" />
                      )}
                    </div>
                    <div>
                      <div
                        className={cn(
                          "font-semibold text-[15px] transition-colors",
                          index <= currentStep ? "text-black" : "text-gray-400"
                        )}
                      >
                        {step.title}
                      </div>
                      <div className={cn(
                        "text-[13px] transition-colors",
                        index <= currentStep ? "text-gray-500" : "text-gray-400"
                      )}>
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="text-gray-300 w-4 h-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 max-w-3xl">
          {/* Step 0: Personal Information */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 mt-8">Personal Information</h2>
              <p className="text-base text-gray-600 mb-6">Enter Your Personal Details</p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="profilePicture"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Choose File</span>
                    </label>
                    <span className="text-sm text-gray-500">
                      {formData.profilePicture ? formData.profilePicture.name || 'File selected' : 'No file chosen'}
                    </span>
                  </div>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateFormData("profilePicture", file);
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500">Upload your profile picture (JPG, PNG, or GIF)</p>
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <h2 className="text-2xl font-bold mb-2 mt-8">Education & Skills</h2>
              <p className="text-base text-gray-600 mb-6">Enter Your Educational Background</p>

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

                {/* 10th Standard */}
                <Collapsible 
                  open={openSection === "tenth"} 
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "tenth" : "")} 
                  className="border rounded-lg"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <h3 className="font-semibold text-base">10th Standard</h3>
                    <CollapsibleTrigger asChild className="group">
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="p-4 pt-0">
                    <div className="space-y-3 mt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthSchoolName" className="text-sm">School Name</Label>
                          <Input
                            id="tenthSchoolName"
                            placeholder="ABC High School"
                            value={formData.tenthSchoolName}
                            onChange={(e) => updateFormData("tenthSchoolName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthBoard" className="text-sm">Board</Label>
                          <Popover open={isPopoverOpen("tenthBoard")} onOpenChange={(isOpen) => togglePopover("tenthBoard", isOpen)}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                              >
                                {formData.tenthBoard || "Select board"}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                              <div className="p-1">
                                {["CBSE", "ICSE", "State Board", "Other"].map((board) => (
                                  <div
                                    key={board}
                                    className={cn(
                                      "flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100",
                                      formData.tenthBoard === board && "bg-gray-100"
                                    )}
                                    onClick={() => {
                                      updateFormData("tenthBoard", board);
                                      togglePopover("tenthBoard", false);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.tenthBoard === board ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {board}
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthPercentage" className="text-sm">%</Label>
                          <Input
                            id="tenthPercentage"
                            placeholder="85"
                            value={formData.tenthPercentage}
                            onChange={(e) => updateFormData("tenthPercentage", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthGrade" className="text-sm">Grade</Label>
                          <Input
                            id="tenthGrade"
                            placeholder="A+"
                            value={formData.tenthGrade}
                            onChange={(e) => updateFormData("tenthGrade", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthPassingYear" className="text-sm">Year</Label>
                          <Input
                            id="tenthPassingYear"
                            type="number"
                            placeholder="2015"
                            value={formData.tenthPassingYear}
                            onChange={(e) => updateFormData("tenthPassingYear", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthCity" className="text-sm">City</Label>
                          <Input
                            id="tenthCity"
                            placeholder="City"
                            value={formData.tenthCity}
                            onChange={(e) => updateFormData("tenthCity", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="tenthState" className="text-sm">State</Label>
                          <Input
                            id="tenthState"
                            placeholder="State"
                            value={formData.tenthState}
                            onChange={(e) => updateFormData("tenthState", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Junior College (12th) */}
                <Collapsible 
                  open={openSection === "junior"} 
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "junior" : "")} 
                  className="border rounded-lg"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <h3 className="font-semibold text-base">Junior College (12th)</h3>
                    <CollapsibleTrigger asChild className="group">
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="p-4 pt-0">
                    <div className="space-y-3 mt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorCollegeName" className="text-sm">College Name</Label>
                          <Input
                            id="juniorCollegeName"
                            placeholder="XYZ Junior College"
                            value={formData.juniorCollegeName}
                            onChange={(e) => updateFormData("juniorCollegeName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorBoard" className="text-sm">Board</Label>
                          <Popover open={isPopoverOpen("juniorBoard")} onOpenChange={(isOpen) => togglePopover("juniorBoard", isOpen)}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                              >
                                {formData.juniorBoard || "Select board"}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                              <div className="p-1">
                                {["CBSE", "ICSE", "State Board", "Other"].map((board) => (
                                  <div
                                    key={board}
                                    className={cn(
                                      "flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100",
                                      formData.juniorBoard === board && "bg-gray-100"
                                    )}
                                    onClick={() => {
                                      updateFormData("juniorBoard", board);
                                      togglePopover("juniorBoard", false);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.juniorBoard === board ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {board}
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="juniorStream" className="text-sm">Stream</Label>
                        <Popover open={isPopoverOpen("juniorStream")} onOpenChange={(isOpen) => togglePopover("juniorStream", isOpen)}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {formData.juniorStream || "Select stream"}
                              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                            <div className="p-1">
                              {["Science", "Commerce", "Arts", "Other"].map((stream) => (
                                <div
                                  key={stream}
                                  className={cn(
                                    "flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100",
                                    formData.juniorStream === stream && "bg-gray-100"
                                  )}
                                  onClick={() => {
                                    updateFormData("juniorStream", stream);
                                    togglePopover("juniorStream", false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.juniorStream === stream ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {stream}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorPercentage" className="text-sm">%</Label>
                          <Input
                            id="juniorPercentage"
                            placeholder="85"
                            value={formData.juniorPercentage}
                            onChange={(e) => updateFormData("juniorPercentage", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorGrade" className="text-sm">Grade</Label>
                          <Input
                            id="juniorGrade"
                            placeholder="A+"
                            value={formData.juniorGrade}
                            onChange={(e) => updateFormData("juniorGrade", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorPassingYear" className="text-sm">Year</Label>
                          <Input
                            id="juniorPassingYear"
                            type="number"
                            placeholder="2017"
                            value={formData.juniorPassingYear}
                            onChange={(e) => updateFormData("juniorPassingYear", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorCity" className="text-sm">City</Label>
                          <Input
                            id="juniorCity"
                            placeholder="City"
                            value={formData.juniorCity}
                            onChange={(e) => updateFormData("juniorCity", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="juniorState" className="text-sm">State</Label>
                          <Input
                            id="juniorState"
                            placeholder="State"
                            value={formData.juniorState}
                            onChange={(e) => updateFormData("juniorState", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Graduation */}
                <Collapsible 
                  open={openSection === "graduation"} 
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "graduation" : "")} 
                  className="border rounded-lg"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <h3 className="font-semibold text-base">Graduation</h3>
                    <CollapsibleTrigger asChild className="group">
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="p-4 pt-0">
                    <div className="space-y-3 mt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationCollegeName" className="text-sm">College Name</Label>
                          <Input
                            id="graduationCollegeName"
                            placeholder="ABC College"
                            value={formData.graduationCollegeName}
                            onChange={(e) => updateFormData("graduationCollegeName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationUniversity" className="text-sm">University</Label>
                          <Input
                            id="graduationUniversity"
                            placeholder="XYZ University"
                            value={formData.graduationUniversity}
                            onChange={(e) => updateFormData("graduationUniversity", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationDegree" className="text-sm">Degree</Label>
                          <Input
                            id="graduationDegree"
                            placeholder="B.Tech, BCA, BSc, etc."
                            value={formData.graduationDegree}
                            onChange={(e) => updateFormData("graduationDegree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationSpecialization" className="text-sm">Specialization</Label>
                          <Input
                            id="graduationSpecialization"
                            placeholder="Computer Science"
                            value={formData.graduationSpecialization}
                            onChange={(e) => updateFormData("graduationSpecialization", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationCGPA" className="text-sm">CGPA/%</Label>
                          <Input
                            id="graduationCGPA"
                            placeholder="8.5 or 85%"
                            value={formData.graduationCGPA}
                            onChange={(e) => updateFormData("graduationCGPA", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationPassingYear" className="text-sm">Year</Label>
                          <Input
                            id="graduationPassingYear"
                            type="number"
                            placeholder="2020"
                            value={formData.graduationPassingYear}
                            onChange={(e) => updateFormData("graduationPassingYear", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="graduationCity" className="text-sm">City</Label>
                          <Input
                            id="graduationCity"
                            placeholder="City"
                            value={formData.graduationCity}
                            onChange={(e) => updateFormData("graduationCity", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Post Graduation */}
                <Collapsible 
                  open={openSection === "postGraduation"} 
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "postGraduation" : "")} 
                  className="border rounded-lg"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <h3 className="font-semibold text-base">Post Graduation (Optional)</h3>
                    <CollapsibleTrigger asChild className="group">
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="p-4 pt-0">
                    <div className="space-y-3 mt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="pgCollegeName" className="text-sm">College Name</Label>
                          <Input
                            id="pgCollegeName"
                            placeholder="ABC College"
                            value={formData.pgCollegeName}
                            onChange={(e) => updateFormData("pgCollegeName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="pgUniversity" className="text-sm">University</Label>
                          <Input
                            id="pgUniversity"
                            placeholder="XYZ University"
                            value={formData.pgUniversity}
                            onChange={(e) => updateFormData("pgUniversity", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="pgDegree" className="text-sm">Degree</Label>
                          <Input
                            id="pgDegree"
                            placeholder="M.Tech, MCA, MSc, MBA, etc."
                            value={formData.pgDegree}
                            onChange={(e) => updateFormData("pgDegree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="pgSpecialization" className="text-sm">Specialization</Label>
                          <Input
                            id="pgSpecialization"
                            placeholder="Data Science"
                            value={formData.pgSpecialization}
                            onChange={(e) => updateFormData("pgSpecialization", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="pgCGPA" className="text-sm">CGPA/%</Label>
                          <Input
                            id="pgCGPA"
                            placeholder="8.5 or 85%"
                            value={formData.pgCGPA}
                            onChange={(e) => updateFormData("pgCGPA", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="pgPassingYear" className="text-sm">Year</Label>
                          <Input
                            id="pgPassingYear"
                            type="number"
                            placeholder="2022"
                            value={formData.pgPassingYear}
                            onChange={(e) => updateFormData("pgPassingYear", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 mt-8">Work Experience</h2>
              <p className="text-base text-gray-600 mb-6">Tell us about your professional experience</p>

              <div className="space-y-5">
                {/* Fresher Checkbox */}
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="isFresher"
                    checked={formData.isFresher || false}
                    onCheckedChange={(checked) => {
                      updateFormData("isFresher", checked);
                      if (checked) {
                        // Clear work experience when marked as fresher
                        updateFormData("experienceYears", "0");
                        updateFormData("workExperience", [{
                          jobTitle: "",
                          company: "",
                          location: "",
                          startDate: "",
                          endDate: "",
                          currentlyWorking: false,
                          description: ""
                        }]);
                      }
                    }}
                  />
                  <Label htmlFor="isFresher" className="cursor-pointer font-medium">
                    I am a Fresher (No work experience)
                  </Label>
                </div>

                {/* Work Experience Section - Hidden if Fresher */}
                {!formData.isFresher && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">Total Years of Experience</Label>
                      <Input
                        id="experienceYears"
                        type="number"
                        placeholder="5"
                        value={formData.experienceYears}
                        onChange={(e) => updateFormData("experienceYears", e.target.value)}
                      />
                    </div>

                    {/* Work Experience Details - Collapsible */}
                    <Collapsible 
                      open={openSection === "workExperience"} 
                      onOpenChange={(isOpen) => setOpenSection(isOpen ? "workExperience" : "")} 
                      className="border rounded-lg"
                    >
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <h3 className="font-semibold text-lg">Work Experience Details</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newExperiences = [...formData.workExperience, {
                                jobTitle: "",
                                company: "",
                                location: "",
                                startDate: "",
                                endDate: "",
                                currentlyWorking: false,
                                description: ""
                              }];
                              updateFormData("workExperience", newExperiences);
                            }}
                          >
                            + Add Experience
                          </Button>
                          <CollapsibleTrigger asChild className="group">
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>
                      <CollapsibleContent className="p-4 pt-0">
                        <div className="space-y-4 mt-4">
                          {formData.workExperience.map((exp, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-white">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium">Experience {index + 1}</h4>
                                {formData.workExperience.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => {
                                      const newExperiences = formData.workExperience.filter((_, i) => i !== index);
                                      updateFormData("workExperience", newExperiences);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>

                              <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-2">
                                    <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                                    <Input
                                      id={`jobTitle-${index}`}
                                      placeholder="Senior Software Engineer"
                                      value={exp.jobTitle}
                                      onChange={(e) => {
                                        const newExperiences = [...formData.workExperience];
                                        newExperiences[index].jobTitle = e.target.value;
                                        updateFormData("workExperience", newExperiences);
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`company-${index}`}>Company</Label>
                                    <Input
                                      id={`company-${index}`}
                                      placeholder="Tech Corp"
                                      value={exp.company}
                                      onChange={(e) => {
                                        const newExperiences = [...formData.workExperience];
                                        newExperiences[index].company = e.target.value;
                                        updateFormData("workExperience", newExperiences);
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`location-${index}`}>Location</Label>
                                  <Input
                                    id={`location-${index}`}
                                    placeholder="Bangalore, India"
                                    value={exp.location}
                                    onChange={(e) => {
                                      const newExperiences = [...formData.workExperience];
                                      newExperiences[index].location = e.target.value;
                                      updateFormData("workExperience", newExperiences);
                                    }}
                                  />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-2">
                                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                                    <Popover open={isPopoverOpen(`startDate-${index}`)} onOpenChange={(isOpen) => togglePopover(`startDate-${index}`, isOpen)}>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !exp.startDate && "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {exp.startDate ? format(new Date(exp.startDate), "PPP") : "Pick a date"}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar
                                          mode="single"
                                          selected={exp.startDate ? new Date(exp.startDate) : undefined}
                                          onSelect={(date) => {
                                            const newExperiences = [...formData.workExperience];
                                            newExperiences[index].startDate = date ? date.toISOString() : "";
                                            updateFormData("workExperience", newExperiences);
                                            togglePopover(`startDate-${index}`, false);
                                          }}
                                          captionLayout="dropdown"
                                          fromYear={1990}
                                          toYear={new Date().getFullYear()}
                                          disabled={(date) => date > new Date()}
                                          defaultMonth={exp.startDate ? new Date(exp.startDate) : new Date(2020, 0, 1)}
                                          className="rounded-md border"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                                    <Popover open={isPopoverOpen(`endDate-${index}`)} onOpenChange={(isOpen) => togglePopover(`endDate-${index}`, isOpen)}>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          disabled={exp.currentlyWorking}
                                          className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !exp.endDate && "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {exp.endDate ? format(new Date(exp.endDate), "PPP") : "Pick a date"}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar
                                          mode="single"
                                          selected={exp.endDate ? new Date(exp.endDate) : undefined}
                                          onSelect={(date) => {
                                            const newExperiences = [...formData.workExperience];
                                            newExperiences[index].endDate = date ? date.toISOString() : "";
                                            updateFormData("workExperience", newExperiences);
                                            togglePopover(`endDate-${index}`, false);
                                          }}
                                          captionLayout="dropdown"
                                          fromYear={1990}
                                          toYear={new Date().getFullYear()}
                                          disabled={(date) => date > new Date()}
                                          defaultMonth={exp.endDate ? new Date(exp.endDate) : new Date(2020, 0, 1)}
                                          className="rounded-md border"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    id={`currentlyWorking-${index}`}
                                    checked={exp.currentlyWorking}
                                    onCheckedChange={(checked) => {
                                      const newExperiences = [...formData.workExperience];
                                      newExperiences[index].currentlyWorking = checked;
                                      if (checked) {
                                        newExperiences[index].endDate = "";
                                      }
                                      updateFormData("workExperience", newExperiences);
                                    }}
                                  />
                                  <Label htmlFor={`currentlyWorking-${index}`} className="cursor-pointer font-normal">
                                    Currently working here
                                  </Label>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`description-${index}`}>Description</Label>
                                  <Textarea
                                    id={`description-${index}`}
                                    placeholder="Describe your responsibilities and achievements..."
                                    value={exp.description}
                                    onChange={(e) => {
                                      const newExperiences = [...formData.workExperience];
                                      newExperiences[index].description = e.target.value;
                                      updateFormData("workExperience", newExperiences);
                                    }}
                                    className="min-h-20"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </>
                )}

                {/* Languages Section - Collapsible */}
                <Collapsible 
                  open={openSection === "languages"} 
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "languages" : "")} 
                  className="border rounded-lg"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <h3 className="font-semibold text-lg">Languages</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newLanguages = [...formData.languages, {
                            language: "",
                            proficiency: ""
                          }];
                          updateFormData("languages", newLanguages);
                        }}
                      >
                        + Add Language
                      </Button>
                      <CollapsibleTrigger asChild className="group">
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CollapsibleContent className="p-4 pt-0">
                    <div className="space-y-4 mt-4">
                      {formData.languages.map((lang, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Language {index + 1}</h4>
                            {formData.languages.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  const newLanguages = formData.languages.filter((_, i) => i !== index);
                                  updateFormData("languages", newLanguages);
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`language-${index}`}>Language</Label>
                              <Input
                                id={`language-${index}`}
                                placeholder="English"
                                value={lang.language}
                                onChange={(e) => {
                                  const newLanguages = [...formData.languages];
                                  newLanguages[index].language = e.target.value;
                                  updateFormData("languages", newLanguages);
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
                              <Popover open={isPopoverOpen(`proficiency-${index}`)} onOpenChange={(isOpen) => togglePopover(`proficiency-${index}`, isOpen)}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between"
                                  >
                                    {lang.proficiency || "Select proficiency"}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                                  <div className="p-1">
                                    {["Beginner", "Intermediate", "Advanced", "Native"].map((proficiency) => (
                                      <div
                                        key={proficiency}
                                        className={cn(
                                          "flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100",
                                          lang.proficiency === proficiency && "bg-gray-100"
                                        )}
                                        onClick={() => {
                                          const newLanguages = [...formData.languages];
                                          newLanguages[index].proficiency = proficiency;
                                          updateFormData("languages", newLanguages);
                                          togglePopover(`proficiency-${index}`, false);
                                        }}
                                      >
                                        <CheckIcon
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            lang.proficiency === proficiency ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {proficiency}
                                      </div>
                                    ))}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Certifications Section - Collapsible */}
                <Collapsible 
                  open={openSection === "certifications"} 
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "certifications" : "")} 
                  className="border rounded-lg"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <h3 className="font-semibold text-lg">Certifications (Optional)</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCerts = [...formData.certifications, {
                            name: "",
                            issuingOrganization: "",
                            issueDate: "",
                            credentialURL: ""
                          }];
                          updateFormData("certifications", newCerts);
                        }}
                      >
                        + Add Certificate
                      </Button>
                      <CollapsibleTrigger asChild className="group">
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CollapsibleContent className="p-4 pt-0">
                    <div className="space-y-4 mt-4">
                      {formData.certifications.map((cert, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Certificate {index + 1}</h4>
                            {formData.certifications.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  const newCerts = formData.certifications.filter((_, i) => i !== index);
                                  updateFormData("certifications", newCerts);
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`certName-${index}`}>Certification Name</Label>
                                <Input
                                  id={`certName-${index}`}
                                  placeholder="AWS Certified Developer"
                                  value={cert.name}
                                  onChange={(e) => {
                                    const newCerts = [...formData.certifications];
                                    newCerts[index].name = e.target.value;
                                    updateFormData("certifications", newCerts);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`certOrg-${index}`}>Issuing Organization</Label>
                                <Input
                                  id={`certOrg-${index}`}
                                  placeholder="Amazon Web Services"
                                  value={cert.issuingOrganization}
                                  onChange={(e) => {
                                    const newCerts = [...formData.certifications];
                                    newCerts[index].issuingOrganization = e.target.value;
                                    updateFormData("certifications", newCerts);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`certDate-${index}`}>Issue Date</Label>
                                <Popover open={isPopoverOpen(`issueDate-${index}`)} onOpenChange={(isOpen) => togglePopover(`issueDate-${index}`, isOpen)}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !cert.issueDate && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {cert.issueDate ? format(new Date(cert.issueDate), "PPP") : "Pick a date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={cert.issueDate ? new Date(cert.issueDate) : undefined}
                                      onSelect={(date) => {
                                        const newCerts = [...formData.certifications];
                                        newCerts[index].issueDate = date ? date.toISOString() : "";
                                        updateFormData("certifications", newCerts);
                                        togglePopover(`issueDate-${index}`, false);
                                      }}
                                      captionLayout="dropdown"
                                      fromYear={1990}
                                      toYear={new Date().getFullYear()}
                                      disabled={(date) => date > new Date()}
                                      defaultMonth={cert.issueDate ? new Date(cert.issueDate) : new Date(2020, 0, 1)}
                                      className="rounded-md border"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`certURL-${index}`}>Credential URL (Optional)</Label>
                                <Input
                                  id={`certURL-${index}`}
                                  placeholder="https://..."
                                  value={cert.credentialURL}
                                  onChange={(e) => {
                                    const newCerts = [...formData.certifications];
                                    newCerts[index].credentialURL = e.target.value;
                                    updateFormData("certifications", newCerts);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 mt-8">Additional Information</h2>
              <p className="text-base text-gray-600 mb-6">Links and Job Preferences</p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="resumeFileURL">Resume</Label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="resumeFileURL"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Choose File</span>
                    </label>
                    <span className="text-sm text-gray-500">
                      {formData.resumeFileURL ? formData.resumeFileURL.name || 'File selected' : 'No file chosen'}
                    </span>
                  </div>
                  <Input
                    id="resumeFileURL"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateFormData("resumeFileURL", file);
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500">Upload your resume (PDF, DOC, or DOCX)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="border-t pt-5">
                  <h3 className="font-semibold text-lg mb-4">Job Preferences</h3>
                  
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <Label className="font-medium">Job Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                        {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map((type) => (
                          <div key={type} className="flex items-center gap-2">
                            <Checkbox
                              id={`jobType-${type}`}
                              checked={formData.jobType.includes(type)}
                              onCheckedChange={(checked) => {
                                const newTypes = checked
                                  ? [...formData.jobType, type]
                                  : formData.jobType.filter(t => t !== type);
                                updateFormData("jobType", newTypes);
                              }}
                            />
                            <Label htmlFor={`jobType-${type}`} className="cursor-pointer font-normal">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="font-medium">Work Mode</Label>
                      <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                        {["Remote", "On-site", "Hybrid"].map((mode) => (
                          <div key={mode} className="flex items-center gap-2">
                            <Checkbox
                              id={`workMode-${mode}`}
                              checked={formData.workMode.includes(mode)}
                              onCheckedChange={(checked) => {
                                const newModes = checked
                                  ? [...formData.workMode, mode]
                                  : formData.workMode.filter(m => m !== mode);
                                updateFormData("workMode", newModes);
                              }}
                            />
                            <Label htmlFor={`workMode-${mode}`} className="cursor-pointer font-normal">
                              {mode}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredLocations">Preferred Locations (comma-separated)</Label>
                      <Input
                        id="preferredLocations"
                        placeholder="Bangalore, Mumbai, Delhi"
                        value={formData.preferredLocations}
                        onChange={(e) => updateFormData("preferredLocations", e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="willingToRelocate"
                        checked={formData.willingToRelocate}
                        onCheckedChange={(checked) => updateFormData("willingToRelocate", checked)}
                      />
                      <Label htmlFor="willingToRelocate" className="cursor-pointer font-normal">
                        Willing to relocate
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Billing */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 mt-8">Select Plan</h2> {/* Added margin-top for spacing */}
              <p className="text-base text-gray-600 mb-6">Select Plan as per Your Requirements</p>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {pricingPlans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                    className={cn(
                      "p-6 rounded-lg border-2 text-left transition-all hover:border-gray-300",
                      selectedPlan === plan.name.toLowerCase()
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white"
                    )}
                  >
                    <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                          selectedPlan === plan.name.toLowerCase()
                            ? "border-black"
                            : "border-gray-300"
                        )}
                      >
                        {selectedPlan === plan.name.toLowerCase() && (
                          <div className="w-2 h-2 rounded-full bg-black" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Information */}
              <h3 className="text-xl font-bold mb-2">Payment Information</h3>
              <p className="text-base text-gray-600 mb-5">Enter Your Card Information</p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => updateFormData("cardNumber", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="John Doe"
                      value={formData.nameOnCard}
                      onChange={(e) => updateFormData("nameOnCard", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => updateFormData("expiryDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={(e) => updateFormData("cvc", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {currentStep > 0 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} className="flex items-center gap-2 bg-black hover:bg-black/90">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
