import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Revolutionize Your Hiring?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
              Join thousands of companies and candidates using our AI-powered platform today.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
