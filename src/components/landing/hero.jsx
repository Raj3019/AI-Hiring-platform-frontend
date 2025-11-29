import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Hire Smarter with AI
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Streamline your hiring process with our AI-powered platform. Screen resumes, match candidates, and find the perfect fit in seconds.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/signup">Post a Job</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/signup">Find a Job</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
