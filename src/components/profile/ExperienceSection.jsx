import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ExperienceSection({ 
  formData, 
  updateFormData, 
  openSection, 
  setOpenSection,
  togglePopover,
  isPopoverOpen 
}) {
  return (
    <div className="space-y-5">
      {/* Fresher Checkbox */}
      <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
        <Checkbox
          id="isFresher"
          checked={formData.isFresher || false}
          onCheckedChange={(checked) => {
            updateFormData("isFresher", checked);
            if (checked) {
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
              <h3 className="font-semibold text-base">Work Experience Details</h3>
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
          <h3 className="font-semibold text-base">Languages</h3>
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
                        <Button variant="outline" role="combobox" className="w-full justify-between">
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
                              <CheckIcon className={cn("mr-2 h-4 w-4", lang.proficiency === proficiency ? "opacity-100" : "opacity-0")} />
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
          <h3 className="font-semibold text-base">Certifications (Optional)</h3>
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
  );
}
