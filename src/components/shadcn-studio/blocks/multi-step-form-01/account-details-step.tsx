// @ts-nocheck
'use client'

import { useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-01/multi-step-form'

const AccountDetailsStep = ({ stepper }: { stepper: StepperType }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-start'>
        <h2 className='text-2xl font-semibold'>Account Information</h2>
        <p className='text-muted-foreground'>Enter Your Account Details</p>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-account-username'>Username</Label>
          <Input id='multi-step-account-username' placeholder='John Doe' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-account-email'>Email</Label>
          <Input id='multi-step-account-email' type='email' placeholder='john.doe@example.com' />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-account-password'>Password</Label>
          <div className='relative w-full'>
            <Input
              id='multi-step-account-password'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='Password'
              className='w-full pr-9'
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsPasswordVisible(prevState => !prevState)}
              className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
            >
              {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-account-confirm-password'>Confirm Password</Label>
          <div className='relative w-full'>
            <Input
              id='multi-step-account-confirm-password'
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder='Confirm Password'
              className='w-full pr-9'
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsConfirmPasswordVisible(prevState => !prevState)}
              className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
            >
              {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-start gap-1 sm:col-span-2'>
          <Label htmlFor='multi-step-account-profile-link'>Profile Link</Label>
          <Input id='multi-step-account-profile-link' type='url' placeholder='https://example.com' />
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

export default AccountDetailsStep