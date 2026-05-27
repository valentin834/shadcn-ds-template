'use client'

import { useEffect, useState } from 'react'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const AnnouncementBannerPage = () => {
  const [isVisible, setIsVisible] = useState(true)

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 11,
    minutes: 43,
    seconds: 6
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev

        // Countdown logic
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className='flex h-150 items-start justify-center'>
      <div className='relative mt-auto w-full overflow-hidden bg-black'>
        <div className='relative container mx-auto flex items-center justify-between gap-4 px-5 py-4 max-xl:flex-col max-xl:justify-center sm:gap-6 lg:gap-8 xl:h-27.5'>
          {/* Left Section - Exclusive Deals */}
          <div className='flex items-center max-md:w-full max-md:justify-center'>
            <div className='mr-7 rounded-sm bg-white/16 px-4 py-2'>
              <p className='text-sm font-semibold text-white max-sm:font-medium sm:text-xl'>
                Shop Our Exclusive Deals With Up to <span className='text-lime-500'>50% OFF</span>
              </p>
            </div>
          </div>

          {/* Center Section - Black Friday & Countdown */}
          <div className='flex justify-center max-md:w-full'>
            <div className='flex flex-col items-end'>
              <h2
                className='-tracking-5 overflow-hidden bg-[linear-gradient(160deg,#bef264_17.53%,#65a30d_85.03%,#000000_113.64%)] bg-clip-text text-center text-[52px] leading-[88%] font-normal text-ellipsis whitespace-nowrap text-transparent uppercase'
                style={{ fontFamily: 'Bebas Neue' }}
              >
                Black Friday
              </h2>
              <p className='text-sm font-medium tracking-wide text-white uppercase'>Last Chance</p>
            </div>
          </div>

          {/* Right Section - CTA Button */}
          <div className='flex flex-wrap items-center justify-center gap-6 md:gap-7'>
            <div className='flex flex-wrap items-center gap-6'>
              <div className='flex gap-1.5'>
                <div className='pr-1.5 text-center'>
                  <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-white/16'>
                    <span className='text-xl font-normal text-white'>{String(timeLeft.days).padStart(2, '0')}</span>
                  </div>
                  <p className='mt-1 text-xs font-medium text-white'>Days</p>
                </div>
                <div className='pr-1.5 text-center'>
                  <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-white/16'>
                    <span className='text-xl font-normal text-white'>{String(timeLeft.hours).padStart(2, '0')}</span>
                  </div>
                  <p className='mt-1 text-xs font-medium text-white'>Hours</p>
                </div>
                <div className='text-center'>
                  <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-white/16'>
                    <span className='text-xl font-normal text-white'>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  </div>
                  <p className='mt-1 text-xs font-medium text-white'>Minutes</p>
                </div>
                <div className='text-center'>
                  <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-white/16'>
                    <span className='text-xl font-normal text-white'>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                  <p className='mt-1 text-xs font-medium text-white'>Seconds</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <Button className='h-6.5 w-full rounded-md bg-[linear-gradient(177deg,#bef264_-13.06%,#65a30d_60.64%,#000000_127.51%)] px-2 text-xs font-medium text-white hover:opacity-90'>
                Shop & Save Today
              </Button>
              <Button
                variant='link'
                className='px-2 py-1 text-sm font-medium text-white'
                onClick={() => setIsVisible(false)}
              >
                No thanks, I don’t want to save
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant='ghost'
            size='icon'
            className='absolute top-2 right-2 h-8 w-8 text-white hover:bg-zinc-800 hover:text-white xl:-right-[2.5%]'
            onClick={() => setIsVisible(false)}
          >
            <X className='h-5 w-5' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBannerPage
