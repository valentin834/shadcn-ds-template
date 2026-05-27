// @ts-nocheck
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-01/multi-step-form'

const PersonalInformationStep = ({ stepper }: { stepper: StepperType }) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-start'>
        <h2 className='text-2xl font-semibold'>Personal Information</h2>
        <p className='text-muted-foreground'>Enter Your Personal Information</p>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-first-name'>First Name</Label>
          <Input id='multi-step-personal-info-first-name' placeholder='John' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-last-name'>Last Name</Label>
          <Input id='multi-step-personal-info-last-name' placeholder='Doe' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-mobile'>Mobile</Label>
          <Input id='multi-step-personal-info-mobile' placeholder='+1 (555) 123-4567' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-pincode'>Pincode</Label>
          <Input id='multi-step-personal-info-pincode' placeholder='Postal Code' />
        </div>
        <div className='flex flex-col items-start gap-1 sm:col-span-2'>
          <Label htmlFor='multi-step-personal-info-address'>Address</Label>
          <Input id='multi-step-personal-info-address' placeholder='123 Main St' />
        </div>
        <div className='flex flex-col items-start gap-1 sm:col-span-2'>
          <Label htmlFor='multi-step-personal-info-landmark'>Landmark</Label>
          <Input id='multi-step-personal-info-landmark' placeholder='Near Central Park, New York' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-city'>City</Label>
          <Input id='multi-step-personal-info-city' placeholder='New York' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-state'>State</Label>
          <Input id='multi-step-personal-info-state' placeholder='NY' />
        </div>
      </div>
      <div className='flex justify-between gap-4'>
        <Button
          variant='secondary'
          size='lg'
          onClick={() => stepper.navigation.prev()}
          disabled={stepper.state.isFirst}
        >
          <ArrowLeftIcon />
          Previous
        </Button>
        <Button size='lg' onClick={() => stepper.navigation.next()}>
          Next
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

export default PersonalInformationStep