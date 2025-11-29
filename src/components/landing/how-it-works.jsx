import { CheckCircle2 } from "lucide-react"

const recruiterSteps = [
  "Post a job description",
  "AI analyzes and ranks applicants",
  "Review top matches",
  "Schedule interviews",
]

const candidateSteps = [
  "Create your profile",
  "Upload your resume",
  "Get matched with relevant jobs",
  "Apply with one click",
]

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Simple, transparent, and effective for everyone.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:gap-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold text-center">For Recruiters</h3>
            <ul className="grid gap-4">
              {recruiterSteps.map((step, index) => (
                <li key={index} className="flex items-center space-x-3 rounded-lg border p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold text-center">For Candidates</h3>
            <ul className="grid gap-4">
              {candidateSteps.map((step, index) => (
                <li key={index} className="flex items-center space-x-3 rounded-lg border p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
