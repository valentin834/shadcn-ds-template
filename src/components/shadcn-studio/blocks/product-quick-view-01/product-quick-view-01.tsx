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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Rating } from '@/components/ui/rating'
import { MinusIcon, PlusIcon } from 'lucide-react'

type ProductQuickViewProps = {
  trigger?: ReactElement
  defaultOpen?: boolean
  productImages: string[]
  sizes: { value: string; label: string }[]
  paymentMethods: { name: string; imageUrl: string }[]
}

const ProductQuickView = ({
  defaultOpen = false,
  trigger,
  productImages,
  paymentMethods,
  sizes
}: ProductQuickViewProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [selectedSize, setSelectedSize] = useState('m')

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
      <DialogContent className='flex max-h-[calc(100%-3rem)] justify-center overflow-hidden overflow-y-auto p-0 text-base shadow-lg **:data-[slot=dialog-close]:flex **:data-[slot=dialog-close]:size-7 **:data-[slot=dialog-close]:items-center **:data-[slot=dialog-close]:justify-center **:data-[slot=dialog-close]:rounded-full lg:w-[calc(100%-3rem)] lg:max-w-5xl lg:overflow-visible'>
        <div className='grid grid-cols-1 items-center lg:grid-cols-2'>
          {/* Image Carousel */}
          <div className='relative h-full w-full bg-linear-to-bl from-[#EB7EC5] to-[#433A71] lg:h-[110%] lg:rounded-3xl lg:shadow-lg lg:[clip-path:inset(0px_0px_0px_-100%)]'>
            <Carousel
              className='h-full w-full *:data-[slot=carousel-content]:overflow-visible'
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true
              }}
            >
              <CarouselContent>
                {productImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className={cn({
                      'lg:invisible': index !== current
                    })}
                  >
                    <div className='relative h-90 w-full lg:h-164'>
                      <img
                        src={image}
                        alt={`Product view ${index + 1}`}
                        className='mx-auto h-80 object-cover lg:absolute lg:top-1/2 lg:left-8 lg:h-138 lg:-translate-y-1/2 lg:rotate-30 xl:left-0'
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className='absolute inset-x-0 bottom-8 flex justify-center gap-2'>
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'size-2.5 cursor-pointer rounded-full transition-colors',
                      index === current ? 'bg-background' : 'bg-background/40'
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>

          {/* Product Details */}
          <div className='flex flex-col justify-center gap-6 p-6'>
            <Badge variant='destructive' className='h-auto text-sm'>
              Sale!
            </Badge>

            <div className='space-y-4'>
              <DialogTitle className='text-3xl font-semibold'>American Tourists Cute School Bag</DialogTitle>

              <div className='flex items-center gap-2'>
                <p className='text-2xl font-semibold'>$46.00</p>
                <p className='text-muted-foreground line-through'>$112.00</p>
                <p className='text-destructive font-medium'>($66 OFF)</p>
              </div>
            </div>

            <div className='flex items-center gap-1'>
              <Rating readOnly variant='yellow' size={24} value={4.5} precision={0.5} />
              <p className='text-muted-foreground'>145 customer reviews</p>
            </div>

            <DialogDescription className='text-base'>
              The American Tourister Trolley Suitcase is designed for the modern traveler, combining style, durability,
              and functionality. Crafted from high-quality, lightweight materials, this suitcase ensures easy
              maneuverability while providing ample space for your belongings.
            </DialogDescription>

            <div className='flex items-center gap-4'>
              <h4 className='shrink-0 text-lg font-semibold'>Bag Size :</h4>
              <RadioGroup className='flex gap-4' value={selectedSize} onValueChange={setSelectedSize}>
                {sizes.map(sizeItem => (
                  <label
                    key={sizeItem.value}
                    className='border-input group has-data-checked:bg-primary has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-sm border px-2 py-1 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50'
                  >
                    <RadioGroupItem
                      id={sizeItem.value}
                      value={sizeItem.value}
                      className='absolute inset-0 opacity-0'
                      aria-label={`size-radio-${sizeItem.value}`}
                    />
                    <p className='text-foreground group-has-data-checked:text-primary-foreground pointer-events-none text-sm leading-none font-medium uppercase'>
                      {sizeItem.label}
                    </p>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className='flex gap-4'>
              <AriaNumberField defaultValue={1} minValue={1} aria-label='Quantity'>
                <AriaGroup className='dark:bg-input/30 border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive input-lg relative inline-flex min-w-0 items-center overflow-hidden rounded-lg border bg-transparent text-sm whitespace-nowrap transition-[color] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring'>
                  <AriaButton
                    slot='decrement'
                    className='bg-primary/10 hover:bg-primary/20 ms-3 flex size-5 items-center justify-center rounded transition-[color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <MinusIcon className='size-3' />
                    <span className='sr-only'>Decrement</span>
                  </AriaButton>
                  <AriaInput className='selection:bg-primary selection:text-primary-foreground w-15 text-center tabular-nums outline-none' />
                  <AriaButton
                    slot='increment'
                    className='bg-primary/10 hover:bg-primary/20 me-3 flex size-5 items-center justify-center rounded transition-[color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <PlusIcon className='size-3' />
                    <span className='sr-only'>Increment</span>
                  </AriaButton>
                </AriaGroup>
              </AriaNumberField>

              <Button size='lg' className='grow'>
                Add to Cart
              </Button>
            </div>

            <div className='flex h-11.5 items-center justify-center gap-6 rounded-lg border p-1'>
              {paymentMethods.map((method, index) => (
                <img key={index} src={method.imageUrl} alt={method.name} className='h-6' />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductQuickView
