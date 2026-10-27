'use client'

import { type ReactElement, useEffect, useState } from 'react'

import {
  Button as AriaButton,
  Group as AriaGroup,
  Input as AriaInput,
  NumberField as AriaNumberField
} from 'react-aria-components'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { MinusIcon, PlusIcon } from 'lucide-react'

type ProductQuickViewProps = {
  trigger?: ReactElement
  defaultOpen?: boolean
  productImages: string[]
}

const ProductQuickView = ({ defaultOpen = false, trigger, productImages }: ProductQuickViewProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const handleResize = () => {
      setCount(api.scrollSnapList().length)
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    window.addEventListener('resize', handleResize)
    api.on('select', handleSelect)

    queueMicrotask(() => {
      handleResize()
      handleSelect()
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      api.off('select', handleSelect)
    }
  }, [api])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className='flex justify-center overflow-hidden p-0 **:data-[slot=dialog-close]:flex **:data-[slot=dialog-close]:size-7 **:data-[slot=dialog-close]:items-center **:data-[slot=dialog-close]:justify-center **:data-[slot=dialog-close]:rounded-full lg:w-[calc(100%-3rem)] lg:max-w-3xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          {/* Image Carousel */}
          <Carousel
            className='relative h-full w-full *:data-[slot=carousel-content]:h-full'
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true
            }}
          >
            <CarouselContent className='h-full'>
              {productImages.map((image, index) => (
                <CarouselItem key={index} className='h-full'>
                  <div className='h-full overflow-hidden bg-gray-100'>
                    <img src={image} alt={`Product view ${index + 1}`} className='h-full w-full object-cover' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <Badge className='absolute top-8 left-5 h-auto rounded-sm text-sm'>Sale!</Badge>

            <div className='absolute inset-x-0 bottom-8 flex justify-center gap-2'>
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'size-2.5 cursor-pointer rounded-full transition-colors',
                    index === current ? 'bg-primary' : 'bg-background'
                  )}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>

          {/* Product Details */}
          <div className='flex flex-col justify-between gap-6 p-6 lg:mt-6'>
            <div className='space-y-1.5'>
              <DialogTitle className='text-2xl font-semibold'>Mac Mini</DialogTitle>
              <div className='flex items-center gap-1'>
                <Rating readOnly variant='yellow' size={20} value={4.5} precision={0.5} />
                <p className='text-base'>15 customer reviews</p>
              </div>
            </div>

            <div className='flex items-end gap-2'>
              <p className='text-muted-foreground text-base line-through'>$599</p>
              <p className='text-xl font-semibold'>$499</p>
            </div>

            <DialogDescription className='text-base'>
              At just 12.7x12.7 centimetres and 0.73 kilograms, Mac mini fits perfectly under a monitor or is mini
              enough to move or mount just about anywhere
            </DialogDescription>

            <AriaNumberField defaultValue={1} minValue={1} aria-label='Quantity'>
              <AriaGroup className='dark:bg-input/30 border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive input-lg relative inline-flex min-w-0 items-center overflow-hidden rounded-lg border bg-transparent text-sm whitespace-nowrap transition-[color] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring'>
                <AriaButton
                  slot='decrement'
                  className='bg-primary/10 hover:bg-primary/20 ms-3 flex size-5 items-center justify-center rounded transition-[color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <MinusIcon className='size-3' />
                  <span className='sr-only'>Decrement</span>
                </AriaButton>
                <AriaInput className='selection:bg-primary selection:text-primary-foreground w-15 px-3 py-2 text-center tabular-nums outline-none' />
                <AriaButton
                  slot='increment'
                  className='bg-primary/10 hover:bg-primary/20 me-3 flex size-5 items-center justify-center rounded transition-[color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <PlusIcon className='size-3' />
                  <span className='sr-only'>Increment</span>
                </AriaButton>
              </AriaGroup>
            </AriaNumberField>

            <div className='flex flex-1 gap-3 lg:items-end'>
              <Button size='lg' className='grow'>
                Add to Cart
              </Button>
              <Button size='lg' variant='secondary' className='grow'>
                More Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductQuickView
