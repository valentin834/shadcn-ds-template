import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDaysIcon, ArrowUpRightIcon } from 'lucide-react'

export type BlogData = {
  img: string
  date: string
  blogTitle: string
  description: string
  author: string
  badge: string
  authorLink: string
  blogLink: string
  categoryLink: string
}

const HeroSection = ({ blogdata }: { blogdata: BlogData[] }) => {
  return (
    <section className='bg-muted pt-16 pb-12 sm:pb-16 lg:pb-24'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8'>
        {/* Hero Header */}
        <div className='flex max-w-4xl flex-col items-center gap-4 self-center text-center'>
          <Badge variant='outline' className='h-auto text-sm'>
            Trusted by 1,000,000+ professionals
          </Badge>
          <h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
            Build Better Products with Insights that Drive Real Impact.
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            Learn how to design, develop, launch, and grow digital products through practical knowledge and proven
            frameworks.
          </p>
          <div className='z-10 flex items-center gap-3 p-2'>
            <Input
              type='email'
              placeholder='Your email'
              required
              className='bg-background h-10 rounded-lg px-3 sm:w-70'
            />
            <Button
              className='relative h-10 w-fit overflow-hidden rounded-lg px-6 text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-size-[250%_250%,100%_100%] before:bg-position-[200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-position-[-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
              render={<a href='#' />}
              nativeButton={false}
            >
              Subscribe
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {blogdata.map((item, index) => (
            <Card key={`${item.author}-${index}`} className='group py-6 shadow-none'>
              <CardContent className='grid grid-cols-1 gap-6 px-6 xl:grid-cols-2'>
                <div>
                  <div className='h-59.5 w-full overflow-hidden rounded-lg'>
                    <img
                      src={item.img}
                      alt={item.author}
                      className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-3'>
                  <div className='flex items-center gap-1.5 py-1'>
                    <div className='text-muted-foreground flex grow items-center gap-1.5'>
                      <CalendarDaysIcon className='size-6' />
                      <p className='text-base'>{item.date}</p>
                    </div>
                    <a href={item.categoryLink}>
                      <Badge className='bg-primary/10 text-primary border-0 text-sm'>{item.badge}</Badge>
                    </a>
                  </div>
                  <a href={item.blogLink}>
                    <h3 className='text-xl font-medium'>{item.blogTitle}</h3>
                  </a>

                  <p className='text-muted-foreground text-base'>{item.blogTitle}</p>
                  <div className='flex w-full items-center justify-between gap-1 py-1'>
                    <a href={item.authorLink} className='text-sm font-medium'>
                      {item.author}
                    </a>
                    <Button
                      size='icon-lg'
                      variant='outline'
                      className='group-hover:bg-primary! hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground group-hover:border-transparent hover:border-transparent'
                      render={<a href={item.blogLink} />}
                      nativeButton={false}
                    >
                      <ArrowUpRightIcon />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
