import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EducationSection({ 
  formData, 
  updateFormData, 
  openSection, 
  setOpenSection,
  openPopovers,
  togglePopover,
  isPopoverOpen 
}) {
  return (
    <div className="space-y-4">
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
                    <Button variant="outline" role="combobox" className="w-full justify-between">
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
                          <CheckIcon className={cn("mr-2 h-4 w-4", formData.tenthBoard === board ? "opacity-100" : "opacity-0")} />
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
                    <Button variant="outline" role="combobox" className="w-full justify-between">
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
                          <CheckIcon className={cn("mr-2 h-4 w-4", formData.juniorBoard === board ? "opacity-100" : "opacity-0")} />
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
                  <Button variant="outline" role="combobox" className="w-full justify-between">
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
                        <CheckIcon className={cn("mr-2 h-4 w-4", formData.juniorStream === stream ? "opacity-100" : "opacity-0")} />
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
  );
}
