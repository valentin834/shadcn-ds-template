// @ts-nocheck
import { ShieldCheckIcon, MapPinIcon, PhoneCallIcon, MailIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

import Logo from '@/components/shadcn-studio/logo'

const MegaFooter = () => {
  return (
    <footer>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8'>
          <div className='flex flex-col gap-8'>
            <a href='#'>
              <Logo className='gap-3' />
            </a>
            <div className='space-y-3'>
              <div className='flex items-start gap-2'>
                <MapPinIcon className='size-5 shrink-0' />
                <span>Shop 009A, Level 4, Block A Demo Park, Ottawa</span>
              </div>
              <div className='flex items-center gap-2'>
                <PhoneCallIcon className='size-5 shrink-0' />
                <span>+1-613-598-6981</span>
              </div>
              <div className='flex items-center gap-2'>
                <MailIcon className='size-5 shrink-0' />
                <span>johndoe@gmail.com</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-xl font-semibold'>My Account</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='#'>My Profile</a>
              </li>
              <li>
                <a href='#'>My Order History</a>
              </li>
              <li>
                <a href='#'>Order Tracking</a>
              </li>
              <li>
                <a href='#'>Shopping Cart</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-xl font-semibold'>Shop Departments</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='#'>Computer & Accessories</a>
              </li>
              <li>
                <a href='#'>Smartphones & Tablets</a>
              </li>
              <li>
                <a href='#'>TV, Video & Audio</a>
              </li>
              <li>
                <a href='#'>Cameras, Photo & Video</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='text-xl font-semibold'>Download App</div>
            <div className='flex flex-col items-center gap-6'>
              <Button className='rounded-sm bg-black px-6 py-3 hover:bg-black' render={<a href='#' className='flex h-16 w-full max-w-87 items-center gap-4' />} nativeButton={false}><img
                                              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/apple-icon.png'
                                              className='size-8.5 invert'
                                              alt='App Store'
                                            /><div>
                                              <div className='text-xs font-normal text-white'>Download on the</div>
                                              <div className='text-base font-medium text-white'>App Store</div>
                                            </div></Button>
              <Button className='rounded-sm bg-black px-6 py-3 hover:bg-black' render={<a href='#' className='flex h-16 w-full max-w-87 items-center gap-4' />} nativeButton={false}><img
                                              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-play-icon.png'
                                              className='size-8.5'
                                              alt='Google Play Store'
                                            /><div>
                                              <div className='text-xs font-normal text-white'>Download on the</div>
                                              <div className='text-base font-medium text-white'>Google Play</div>
                                            </div></Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className='flex flex-wrap items-center justify-center gap-4 px-24 py-6'>
          <Badge variant='outline' className='text-base font-normal'>
            <ShieldCheckIcon className='!size-4.5 text-green-600' /> Secure Payment
          </Badge>
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/lemon-squeezy.png'
            alt='Lemon Squeezy'
            className='h-6'
          />
          <img src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/visa.png' alt='Visa' className='h-5' />
          <img src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/paypal.png' alt='Paypal' className='h-5' />
          <img src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/master.png' alt='Mastercard' className='h-5' />
        </div>
      </div>

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`} <a href='#'>shadcn/studio</a>, Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  )
}

export default MegaFooter