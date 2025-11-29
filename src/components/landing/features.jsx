import { Brain, Users, Zap, BarChart } from "lucide-react"

const features = [
  {
    name: "AI Resume Screening",
    description: "Automatically parse and rank resumes based on job requirements, saving you hours of manual review.",
    icon: Brain,
  },
  {
    name: "Smart Matching",
    description: "Our AI connects the right talent to the right job opportunities with high precision.",
    icon: Users,
  },
  {
    name: "Instant Feedback",
    description: "Candidates receive immediate feedback on their applications, improving the candidate experience.",
    icon: Zap,
  },
  {
    name: "Analytics Dashboard",
    description: "Track your hiring pipeline and performance with our comprehensive analytics dashboard.",
    icon: BarChart,
  },
]

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why Choose Our Platform?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We leverage cutting-edge AI technology to make hiring faster, fairer, and more efficient.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-bold">{feature.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
