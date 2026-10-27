import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CookieIcon } from 'lucide-react'

const CookiesConsent = () => {
  return (
    <div className='bg-muted min-h-screen'>
      <Card className='fixed shadow-none max-md:top-1/2 max-md:-translate-y-1/2 max-sm:mx-4 sm:max-md:left-1/2 sm:max-md:-translate-x-1/2 md:right-10 md:bottom-10 md:max-w-xl'>
        <CardContent className='flex gap-4 max-sm:flex-col'>
          <CookieIcon className='size-10.5 shrink-0 grow' />
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-medium'>We are using cookies to improve your experience!</h2>
            <p className='text-muted-foreground text-base font-medium'>
              By clicking &quot;Allow all&quot;, you agree to use of all cookies. Visit our{' '}
              <a href='#' className='text-primary'>
                Cookies Policy
              </a>{' '}
              to learn more.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Button size='lg' className='rounded-lg text-base'>
                Allow all
              </Button>
              <Button
                size='lg'
                className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 rounded-lg text-base'
              >
                Manage cookies
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CookiesConsent
