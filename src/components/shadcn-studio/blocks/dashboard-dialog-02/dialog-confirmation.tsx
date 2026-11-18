'use client'

import { useState, type ReactElement } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
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

const ConfirmationDialog = ({ defaultOpen = false, trigger, className }: Props) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} onClick={() => setOpen(true)} />
      <DialogContent className={cn('sm:max-w-145 [&>[data-slot=dialog-close]>svg]:size-5', className)}>
        <DialogHeader className='items-center gap-4'>
          <Avatar className='size-15 border bg-transparent p-2 after:hidden'>
            <AvatarFallback>
              <div className='bg-muted text-foreground flex items-center justify-center'>
                <CheckIcon className='size-7' />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className='space-y-3.5 text-center'>
            <DialogTitle className='text-lg leading-7 font-semibold'>Congratulations!</DialogTitle>
            <DialogDescription className='max-w-sm'>
              You have successfully subscribed! 🎉 You will never miss our updates, latest news, and exclusive offers.
            </DialogDescription>
          </div>
        </DialogHeader>

        <p className='text-center text-base font-medium'>Thank you for joining our community!</p>

        <div className='flex flex-row justify-center gap-4'>
          <Button size='lg'>Subscribe</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog
