"use client";

import { useState } from "react";
import { ChevronRight, User, CreditCard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    icon: Home,
    title: "Account Details",
    subtitle: "Setup Account Details",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Billing",
    subtitle: "Payment Details",
  },
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

  const [formData, setFormData] = useState({
    // Personal Information (Step 0)
    avatar: "",
    fullname: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    // Account Details (Step 1)
    currentRole: "",
    currentEmployer: "",
    companyURL: "",
    // Billing (Step 2)
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvc: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = () => {
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
                  <Label htmlFor="avatar">Avatar (Optional)</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateFormData("avatar", file);
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500">Upload your profile picture</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullname">Fullname</Label>
                  <Input
                    id="fullname"
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={(e) => updateFormData("fullname", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="New York, USA"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => updateFormData("age", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      placeholder="Male/Female/Other"
                      value={formData.gender}
                      onChange={(e) => updateFormData("gender", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Account Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 mt-8">Account Details</h2>
              <p className="text-base text-gray-600 mb-6">Setup Your Account Details</p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Your role / job title</Label>
                  <Input
                    id="currentRole"
                    placeholder="e.g. Senior Talent Acquisition Specialist"
                    value={formData.currentRole}
                    onChange={(e) => updateFormData("currentRole", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentEmployer">Company name</Label>
                  <Input
                    id="currentEmployer"
                    placeholder="e.g. Acme Corp"
                    value={formData.currentEmployer}
                    onChange={(e) => updateFormData("currentEmployer", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyURL">Company website (optional)</Label>
                  <Input
                    id="companyURL"
                    placeholder="https://acme.com"
                    value={formData.companyURL}
                    onChange={(e) => updateFormData("companyURL", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Billing */}
          {currentStep === 2 && (
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
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Previous
            </Button>
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
