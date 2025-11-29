'use client'

import { useState } from 'react'

import { CircleAlertIcon, XIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const AlertGradientDemo = ({ showSetupAlert = false }) => {
  const [isActive, setIsActive] = useState(true)

  if (!isActive) return null

  return (
    <Alert
      className='border-accent-foreground/20 from-accent text-accent-foreground flex justify-between bg-gradient-to-b to-transparent to-60%'>
      <CircleAlertIcon />
      <div className='flex flex-1 flex-col gap-1'>
        <AlertTitle>
          {showSetupAlert ? 'Complete your setup to start applying for jobs' : 'Verify your email to activate your account'}
        </AlertTitle>
        <AlertDescription className='text-accent-foreground/60'>
          {showSetupAlert ? (
            <>
              You need to complete your profile setup before applying. {' '}
              <a href='/candidate/setup' className='underline font-medium hover:text-accent-foreground'>
                Complete setup now
              </a>
            </>
          ) : (
            "We've sent a confirmation link to your inbox. Check your email to complete the sign-up."
          )}
        </AlertDescription>
      </div>
      <button className='cursor-pointer' onClick={() => setIsActive(false)}>
        <XIcon className='size-5' />
        <span className='sr-only'>Close</span>
      </button>
    </Alert>
  );
}

export default AlertGradientDemo
