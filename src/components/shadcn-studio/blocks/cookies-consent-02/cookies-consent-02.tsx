import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CookieIcon } from 'lucide-react'

const CookiesConsent = () => {
  return (
    <div className='bg-muted min-h-screen'>
      <Card className='fixed items-center shadow-none max-md:top-1/2 max-md:-translate-y-1/2 max-sm:mx-4 sm:max-md:left-1/2 sm:max-md:-translate-x-1/2 md:right-10 md:bottom-10 md:max-w-xl'>
        <CardContent>
          <Avatar className='size-12 border'>
            <AvatarFallback className='bg-transparent'>
              <CookieIcon className='text-foreground size-8' />
            </AvatarFallback>
          </Avatar>
        </CardContent>
        <CardContent>
          <h2 className='text-center text-2xl font-medium'>
            We use third-party cookies in order to personalize your site experience.
          </h2>
        </CardContent>
        <CardContent className='flex gap-4'>
          <Button className='rounded-full' size='lg'>
            Allow
          </Button>
          <Button
            size='lg'
            className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 rounded-full'
          >
            Decline
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CookiesConsent
