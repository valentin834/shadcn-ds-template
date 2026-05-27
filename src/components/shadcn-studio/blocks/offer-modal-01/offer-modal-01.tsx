// @ts-nocheck
'use client'

import { useState, type ReactNode } from 'react'

import { MailIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type OfferModalProps = {
  trigger?: ReactNode
  defaultOpen?: boolean
}

const OfferModal = ({ defaultOpen = false, trigger }: OfferModalProps) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} onClick={() => setOpen(true)} />
      <DialogContent className='[&_[data-slot=dialog-close]]:bg-primary/10 flex justify-center gap-0 overflow-hidden border-0 p-0 lg:w-[calc(100%-3rem)] lg:max-w-5xl [&_[data-slot=dialog-close]]:flex [&_[data-slot=dialog-close]]:size-7 [&_[data-slot=dialog-close]]:items-center [&_[data-slot=dialog-close]]:justify-center [&_[data-slot=dialog-close]]:rounded-full'>
        <div className='h-125 max-lg:hidden lg:basis-2/5'>
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/offer-modal/image-1.png'
            alt='Offer Modal'
            className='h-full w-auto'
          />
        </div>

        {/* Content section */}
        <div className='flex flex-col items-center justify-center gap-6 px-6 py-14 text-center lg:basis-3/5'>
          <DialogTitle className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Join our newsletter and get 20% off your first order
          </DialogTitle>
          <DialogDescription className='text-muted-foreground max-w-sm text-base'>
            Be the first to know about our new arrivals, exclusive offers and the latest fashion updates
          </DialogDescription>

          <form onSubmit={e => e.preventDefault()} className='flex w-full max-w-md justify-center gap-1.5'>
            <div className='w-full max-w-72 space-y-2'>
              <div className='relative'>
                <Input type='email' placeholder='Email address' className='peer h-10 pr-9' required />
                <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
                  <MailIcon className='size-4' />
                  <span className='sr-only'>Email</span>
                </div>
              </div>
            </div>
            <Button type='submit' size='lg' className='uppercase'>
              Sign Up
            </Button>
          </form>

          <p className='text-muted-foreground'>By subscribing, you agree to our privacy policy.</p>

          <div className='flex items-center gap-3'>
            <Checkbox id='accept-terms' className='size-6' />
            <Label htmlFor='accept-terms'>Don&apos;t show this popup again</Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OfferModal