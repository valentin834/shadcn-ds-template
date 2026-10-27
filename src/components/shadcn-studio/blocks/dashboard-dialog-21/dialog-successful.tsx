'use client'

import { useState, type ReactElement } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  className?: string
}

const SuccessfulDialog = ({ defaultOpen = false, trigger, className }: Props) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} onClick={() => setOpen(true)} />
      <DialogContent className={cn('sm:max-w-145 [&>[data-slot=dialog-close]>svg]:size-5', className)}>
        <DialogHeader className='items-center gap-4'>
          <Avatar className='size-15 border border-green-600 bg-green-600/10 p-2 dark:border-green-400 dark:bg-green-400/10'>
            <AvatarFallback className='bg-transparent'>
              <div className='flex items-center justify-center'>
                <CheckIcon className='size-7 text-green-600 dark:text-green-400' />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className='space-y-3.5 text-center'>
            <DialogTitle className='text-lg leading-7 font-semibold'>Payment Successful</DialogTitle>
            <DialogDescription className='max-w-sm'>
              Your payment was successful 🎉 A confirmation email with your purchase details will be sent to you
              shortly.
            </DialogDescription>
          </div>
        </DialogHeader>

        <p className='text-center text-base font-medium'>Thank you for joining our community!</p>

        <div className='flex flex-row justify-center'>
          <DialogClose render={<Button size='lg' />}>Go to Dashboard</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessfulDialog
