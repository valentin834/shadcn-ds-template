'use client'

import { useState } from 'react'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

const AnnouncementBannerPage = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='flex h-150 items-start justify-center'>
      <div className='relative mt-auto w-full overflow-hidden bg-linear-to-r from-cyan-900 via-cyan-800 to-cyan-900'>
        {/* Background Image */}
        <MotionPreset
          className='absolute inset-0 flex items-end justify-center overflow-hidden'
          slide={{ direction: 'down', offset: 100 }}
          fade
          delay={0}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-04.png'
            alt='Banner image'
            className='h-full w-auto object-cover'
          />
        </MotionPreset>

        {/* Decorative Background Elements - Top Left */}
        <MotionPreset
          className='absolute top-0 left-4 max-md:left-2'
          slide={{ direction: 'down', offset: 100 }}
          fade
          delay={0.8}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          motionProps={{
            animate: {
              y: [0, -8, 0],
              opacity: 1,
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                  delay: 1.5
                }
              }
            }
          }}
        >
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-05.png'
            alt='Decorative Element'
            className='w-18 max-md:w-12'
          />
        </MotionPreset>

        <div className='relative container mx-auto flex flex-wrap items-center justify-between gap-6 px-7 py-4 max-md:justify-center max-md:gap-4'>
          {/* Left Section - Spooky Deals Text */}
          <p
            className='text-3xl font-bold tracking-wide text-white uppercase max-md:text-3xl max-sm:text-2xl'
            style={{ fontFamily: 'Creepster' }}
          >
            <span className='inline-block text-center'>
              Spooky Deals <br /> Are Here!
            </span>
          </p>

          {/* Center Section - Pumpkins and decorations */}
          <div className='relative flex h-full flex-1 justify-center max-md:hidden'>
            <div className='relative'>
              {/* Center pumpkin */}
              <MotionPreset
                fade
                slide={{ direction: 'down' }}
                delay={0.8}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                motionProps={{
                  animate: {
                    y: [0, -12, 0],
                    rotate: [0, 5, -5, 0],
                    opacity: 1,
                    transition: {
                      y: {
                        duration: 1.5,
                        ease: 'easeInOut'
                      },
                      rotate: {
                        duration: 4,
                        ease: 'easeInOut',
                        delay: 1.5
                      }
                    }
                  }
                }}
                className='-mb-15 w-36'
              >
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-03.png'
                  alt='Spooky Deals'
                  className='w-full'
                />
              </MotionPreset>

              {/* Left bottom pumpkin */}
              <MotionPreset
                slide={{ direction: 'down' }}
                fade
                delay={0.9}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                motionProps={{
                  animate: {
                    y: 0,
                    rotate: [0, 5, -5, 0],
                    opacity: 1,
                    transition: {
                      y: {
                        duration: 2,
                        ease: 'easeInOut'
                      },
                      rotate: {
                        repeat: Infinity,
                        duration: 4.5,
                        ease: 'easeInOut',
                        delay: 1.6
                      }
                    }
                  }
                }}
                className='absolute -bottom-19 -left-1/2 -rotate-12'
              >
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-03.png'
                  alt='Spooky Deals'
                  className='w-36'
                />
              </MotionPreset>

              {/* Right bottom pumpkin */}
              <MotionPreset
                className='absolute -right-1/2 -bottom-19 rotate-12'
                slide={{ direction: 'down' }}
                fade
                delay={1}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                motionProps={{
                  animate: {
                    y: 0,
                    rotate: [0, 5, -5, 0],
                    opacity: 1,
                    transition: {
                      y: {
                        duration: 2,
                        ease: 'easeInOut'
                      },
                      rotate: {
                        repeat: Infinity,
                        duration: 4.2,
                        ease: 'easeInOut',
                        delay: 1.7
                      }
                    }
                  }
                }}
              >
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-03.png'
                  alt='Spooky Deals'
                  className='w-36'
                />
              </MotionPreset>
            </div>

            {/* Top decorations with bounce */}
            <MotionPreset
              slide={{ direction: 'down', offset: 100 }}
              fade
              delay={0.8}
              transition={{ type: 'spring', stiffness: 120, damping: 10 }}
              motionProps={{
                animate: {
                  y: [0, -8, 0],
                  opacity: 1,
                  transition: {
                    y: {
                      repeat: Infinity,
                      duration: 2,
                      ease: 'easeInOut',
                      delay: 1.5
                    }
                  }
                }
              }}
              className='absolute -top-2 left-[20%]'
            >
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-06.png'
                alt='Decorative Element'
                className='w-13'
              />
            </MotionPreset>

            <MotionPreset
              slide={{ direction: 'down', offset: 100 }}
              fade
              delay={0.8}
              transition={{ type: 'spring', stiffness: 120, damping: 10 }}
              motionProps={{
                animate: {
                  y: [0, -8, 0],
                  opacity: 1,
                  transition: {
                    y: {
                      repeat: Infinity,
                      duration: 2.2,
                      ease: 'easeInOut',
                      delay: 1.5
                    }
                  }
                }
              }}
              className='absolute -top-7 right-[20%] scale-x-[-1]'
            >
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/announcement-banner/image-05.png'
                alt='Decorative Element'
                className='w-13'
              />
            </MotionPreset>
          </div>

          {/* Right Section - Discount & CTA */}
          <div className='flex flex-col justify-center gap-1'>
            <p
              className='bg-linear-to-b from-yellow-100 to-yellow-400 bg-clip-text text-center text-4xl leading-[88%] text-transparent uppercase max-sm:text-3xl'
              style={{ fontFamily: 'Bebas Neue' }}
            >
              Up To 50% Off
            </p>
            <Button className='h-6.5 bg-linear-to-b from-yellow-100 to-yellow-400 text-xs text-black hover:from-yellow-200 hover:to-yellow-500'>
              Shop & Save Today
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-2 right-1 h-8 w-8 text-white hover:bg-cyan-700 hover:text-white xl:right-2'
          onClick={() => setIsVisible(false)}
        >
          <X className='size-5' />
          <span className='sr-only'>Close</span>
        </Button>
      </div>
    </div>
  )
}

export default AnnouncementBannerPage
