// @ts-nocheck
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

interface DownloadPlatform {
  name: string
  icon: string
  alt: string
  href: string
}

const Download = ({ downloadPlatforms }: { downloadPlatforms: DownloadPlatform[] }) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <MotionPreset fade blur slide={{ direction: 'down' }} delay={0.6} transition={{ duration: 0.5 }}>
          <Card
            className={`overflow-hidden rounded-3xl border-none bg-black bg-[url('https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/download/image-09.png')] bg-cover bg-center p-0 pt-6 shadow-lg sm:pt-16 lg:pt-16 xl:pt-22.25`}
          >
            <CardContent className='flex gap-16 px-6 max-lg:flex-col max-lg:text-center sm:px-20 lg:px-12 xl:gap-24 xl:px-20'>
              <div className='space-y-4 lg:max-xl:pb-16 xl:flex-1'>
                <h2 className='text-2xl font-semibold text-white md:text-3xl lg:text-4xl'>
                  Start Saving Smarter Download the App Today.
                </h2>
                <p className='mb-4 text-white/70 sm:text-xl'>
                  Track expenses, build budgets, and set savings goals all in one powerful mobile app trusted by
                  millions worldwide.
                </p>
                <div className='flex items-center gap-4 max-lg:flex-wrap max-lg:justify-center'>
                  {downloadPlatforms.map(platform => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      className='flex w-40 items-center gap-2 rounded-md bg-white px-3 py-2.5 sm:w-50 sm:px-6'
                    >
                      <img src={platform.icon} alt={platform.alt} className='h-7 w-7' />
                      <div className='flex flex-col items-start'>
                        <p className='text-xs leading-4 text-black/70'>Download on the</p>
                        <p className='text-base leading-6 font-medium text-black/92'>{platform.name}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className='mt-auto flex items-end justify-center sm:min-w-90'>
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/download/image-03.png'
                  alt='Shadcn Studio App Interface'
                  className='w-auto sm:w-md lg:w-lg'
                />
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>
    </section>
  )
}

export default Download