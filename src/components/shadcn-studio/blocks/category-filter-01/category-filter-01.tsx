'use client'

import { useEffect, useState } from 'react'

import { useMedia } from 'react-use'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { StarIcon, FilterIcon } from 'lucide-react'

type CategoryFilterProps = {
  className?: string
  brandItems: string[]
}

const batteryItems = ['> 6000 mAh', '5000 - 6000 mAh', '4000 - 5000 mAh']

const CategoryFilter = ({ className, brandItems }: CategoryFilterProps) => {
  const [value, setValue] = useState([2, 4])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false)
  const [selectedBatteries, setSelectedBatteries] = useState<string[]>(['> 6000 mAh', '5000 - 6000 mAh'])
  const [minPrice, setMinPrice] = useState(10000)
  const [maxPrice, setMaxPrice] = useState(22000)
  const [open, setOpen] = useState(false)
  const isCompactScreen = useMedia('(max-width: 767px)', false)

  useEffect(() => {
    if (!isCompactScreen) {
      setOpen(false)
    }
  }, [isCompactScreen])

  const filterContent = (
    <>
      {/* Rating */}
      <CardContent className='flex flex-col gap-3'>
        <Label className='text-xl font-medium'>Rating</Label>
        <div>
          <Slider
            value={value}
            onValueChange={value => setValue(Array.isArray(value) ? value : [value])}
            min={1}
            max={5}
            aria-label='Rating slider'
          />
          <span className='mt-3 flex w-full items-center justify-between gap-1' aria-hidden='true'>
            <span className='flex items-center gap-1'>
              1 <StarIcon className='mb-1.25 size-4 text-amber-600 dark:text-amber-400' />
            </span>
            <span className='flex items-center gap-1'>
              2 <StarIcon className='mb-1.25 size-4 text-amber-600 dark:text-amber-400' />
            </span>
            <span className='flex items-center gap-1'>
              3 <StarIcon className='mb-1.25 size-4 text-amber-600 dark:text-amber-400' />
            </span>
            <span className='flex items-center gap-1'>
              4 <StarIcon className='mb-1.25 size-4 text-amber-600 dark:text-amber-400' />
            </span>
            <span className='flex items-center gap-1'>
              5 <StarIcon className='mb-1.25 size-4 text-amber-600 dark:text-amber-400' />
            </span>
          </span>
        </div>
      </CardContent>

      <Separator />

      {/* Price Range */}
      <CardContent className='flex flex-col gap-4'>
        <Label className='text-xl font-medium'>Price</Label>
        <Input
          type='number'
          placeholder='Min'
          className='w-full'
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
        />
        <Input
          type='number'
          placeholder='Max'
          className='w-full'
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
        />
      </CardContent>

      <Separator />

      {/* Brand */}
      <CardContent className='flex flex-col gap-4'>
        <Label className='text-xl font-medium'>Brand</Label>

        {brandItems.slice(0, 3).map(brand => (
          <div key={brand} className='flex items-center gap-2'>
            <Checkbox
              id={brand}
              className='size-5 **:[svg]:size-4!'
              checked={selectedBrands.includes(brand)}
              onCheckedChange={checked => {
                if (checked) {
                  setSelectedBrands([...selectedBrands, brand])
                } else {
                  setSelectedBrands(selectedBrands.filter(b => b !== brand))
                }
              }}
            />
            <Label htmlFor={brand}>{brand}</Label>
          </div>
        ))}

        <Collapsible open={isTrackOrderOpen} onOpenChange={setIsTrackOrderOpen} className='flex flex-col gap-2'>
          <CollapsibleContent className='flex flex-col gap-4'>
            {brandItems.slice(3, brandItems.length).map(brand => (
              <div key={brand} className='flex items-center gap-2'>
                <Checkbox
                  id={brand}
                  className='size-5 **:[svg]:size-4!'
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={checked => {
                    if (checked) {
                      setSelectedBrands([...selectedBrands, brand])
                    } else {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand))
                    }
                  }}
                />
                <Label htmlFor={brand}>{brand}</Label>
              </div>
            ))}
          </CollapsibleContent>
          <CollapsibleTrigger className='w-fit'>
            <span className='font-medium underline'>{isTrackOrderOpen ? 'See less' : 'See more'}</span>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>

      <Separator />

      {/* Battery */}
      <CardContent className='flex flex-col gap-4'>
        <Label className='text-xl font-medium'>Battery</Label>

        {batteryItems.map(battery => (
          <div key={battery} className='flex items-center gap-2'>
            <Checkbox
              id={battery}
              className='size-5 **:[svg]:size-4!'
              checked={selectedBatteries.includes(battery)}
              onCheckedChange={checked => {
                if (checked) {
                  setSelectedBatteries([...selectedBatteries, battery])
                } else {
                  setSelectedBatteries(selectedBatteries.filter(b => b !== battery))
                }
              }}
            />
            <Label htmlFor={battery}>{battery}</Label>
          </div>
        ))}
      </CardContent>
    </>
  )

  return (
    <section className='bg-background py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Mobile Filter Trigger */}
        <div className='mb-4 md:hidden'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant='outline' className='w-full md:hidden' />}>
              <FilterIcon className='mr-2' />
              Filter
            </SheetTrigger>
            <SheetContent
              side='left'
              className='gap-6 overflow-y-auto data-[side=left]:w-75 data-[side=left]:sm:w-100 data-[side=left]:sm:max-w-none'
            >
              <SheetHeader className='pb-0'>
                <SheetTitle className='text-2xl font-semibold'>Filter</SheetTitle>
              </SheetHeader>
              {filterContent}
            </SheetContent>
          </Sheet>
        </div>

        <div className='grid grid-cols-6 gap-2.5'>
          {/* Desktop Filter Card */}
          <Card
            className={cn('col-span-2 hidden text-base shadow-none md:inline-flex md:max-lg:col-span-3', className)}
          >
            <CardHeader className='gap-0'>
              <CardTitle className='text-2xl font-semibold'>Filter</CardTitle>
            </CardHeader>
            {filterContent}
          </Card>
          <Card className='col-span-6 min-h-100 border border-dashed shadow-none ring-0 md:col-span-4 md:max-lg:col-span-3'></Card>
        </div>
      </div>
    </section>
  )
}

export default CategoryFilter
