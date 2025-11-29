import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal } from "lucide-react";

export function JobFilters({ filters, onFilterChange, onReset }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/30 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Filters</h3>
      </div>
      
      <div className="p-5 space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="search" className="text-sm font-medium">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Job title, keywords..."
              className="pl-9"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="category" className="text-sm font-medium">Category</Label>
          <select
            id="category"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="type" className="text-sm font-medium">Job Type</Label>
          <select
            id="type"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={onReset}
          disabled={!filters.search && !filters.category && !filters.type}
        >
          <X className="w-4 h-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
