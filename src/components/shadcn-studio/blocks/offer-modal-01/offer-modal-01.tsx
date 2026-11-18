'use client'

import { useState, type ReactElement } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { MailIcon } from 'lucide-react'

type OfferModalProps = {
  trigger: ReactElement
  defaultOpen?: boolean
}

const OfferModal = ({ defaultOpen = false, trigger }: OfferModalProps) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} onClick={() => setOpen(true)} />
      <DialogContent className='**:data-[slot=dialog-close]:bg-primary/10 flex justify-center gap-0 overflow-hidden p-0 shadow-lg ring-0 **:data-[slot=dialog-close]:top-5 **:data-[slot=dialog-close]:right-5 **:data-[slot=dialog-close]:flex **:data-[slot=dialog-close]:size-7 **:data-[slot=dialog-close]:items-center **:data-[slot=dialog-close]:justify-center **:data-[slot=dialog-close]:rounded-full lg:w-[calc(100%-3rem)] lg:max-w-5xl **:data-[slot=dialog-close]:**:[svg]:size-4'>
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
              <InputGroup className='input-lg'>
                <InputGroupInput id='email' type='text' placeholder='Enter address' required className='input-lg' />
                <InputGroupAddon align='inline-end' className='pr-3'>
                  <MailIcon className='size-4' />
                  <span className='sr-only'>Email</span>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Button type='submit' size='lg' className='uppercase'>
              Sign Up
            </Button>
          </form>

          <p className='text-muted-foreground text-base'>By subscribing, you agree to our privacy policy.</p>

          <div className='flex items-center gap-2'>
            <Checkbox id='accept-terms' className='size-6' />
            <Label htmlFor='accept-terms' className='leading-5'>
              Don&apos;t show this popup again
            </Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OfferModal
