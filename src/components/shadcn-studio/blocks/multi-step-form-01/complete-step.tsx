// @ts-nocheck
import { Button } from '@/components/ui/button'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-01/multi-step-form'

const CompleteStep = ({ stepper }: { stepper: StepperType }) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-start'>
        <h2 className='text-2xl font-semibold'>Form Submitted</h2>
        <p className='text-muted-foreground'>Thank you for your submission!</p>
      </div>
      <div className='flex justify-end'>
        <Button size='lg' onClick={stepper.navigation.reset}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default CompleteStep