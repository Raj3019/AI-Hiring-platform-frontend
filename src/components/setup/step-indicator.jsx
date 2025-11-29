import { Check } from 'lucide-react';

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="w-full py-8">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center relative flex-1">
              {/* Connecting Line - Before */}
              {index !== 0 && (
                <div className="absolute top-6 right-1/2 w-full h-[2px] -z-10">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted || isCurrent ? 'bg-foreground' : 'bg-border'
                    }`}
                  />
                </div>
              )}

              {/* Connecting Line - After */}
              {index !== steps.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-[2px] -z-10">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? 'bg-foreground' : 'bg-border'
                    }`}
                  />
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-foreground bg-foreground text-background'
                    : isCurrent
                    ? 'border-foreground bg-background text-foreground'
                    : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 stroke-[3]" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-3 text-center">
                <p
                  className={`text-sm font-medium transition-colors ${
                    isCurrent || isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
