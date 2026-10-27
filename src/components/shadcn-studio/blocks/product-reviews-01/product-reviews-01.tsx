'use client'

import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { StarIcon, TrendingUpIcon } from 'lucide-react'

type ProductReviewsProps = {
  reviewItems: {
    id: number
    name: string
    totalSpent: number
    totalReview: number
    description: string
    rating: number
    image: string
    date: string
    allReviewLink: string
  }[]
}

const ProductReviews = ({ reviewItems }: ProductReviewsProps) => {
  const [openFrom, setOpenFrom] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date('2025-03'))

  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto px-4 sm:max-w-4xl sm:px-6 lg:px-8'>
        <Card className='w-full'>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex justify-between gap-6'>
              <CardTitle className='grow text-3xl font-semibold'>Total Reviews</CardTitle>
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger
                  render={<Button variant='outline' id='date-from' className='w-fit justify-between font-medium' />}
                >
                  {dateFrom
                    ? dateFrom.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })
                    : 'Pick a date'}
                </PopoverTrigger>
                <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={dateFrom}
                    onSelect={date => {
                      setDateFrom(date)
                      setOpenFrom(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
              <CardDescription hidden />
            </div>

            <div className='flex h-full gap-8 max-md:flex-wrap sm:items-center'>
              <div className='grow'>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <StarIcon className='size-4 fill-amber-500/20 stroke-amber-500/20' />
                    <span className='text-sm font-semibold'>5</span>
                  </div>
                  <Progress
                    value={100}
                    className='w-40 **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-1.5 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <StarIcon className='size-4 fill-amber-500/20 stroke-amber-500/20' />
                    <span className='text-sm font-semibold'>4</span>
                  </div>
                  <Progress
                    value={75}
                    className='w-40 **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-1.5 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <StarIcon className='size-4 fill-amber-500/20 stroke-amber-500/20' />
                    <span className='text-sm font-semibold'>3</span>
                  </div>
                  <Progress
                    value={50}
                    className='w-40 **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-1.5 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <StarIcon className='size-4 fill-amber-500/20 stroke-amber-500/20' />
                    <span className='text-sm font-semibold'>2</span>
                  </div>
                  <Progress
                    value={25}
                    className='w-40 **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-1.5 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <StarIcon className='size-4 fill-amber-500/20 stroke-amber-500/20' />
                    <span className='text-sm font-semibold'>1</span>
                  </div>
                  <Progress
                    value={0}
                    className='w-40 **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-1.5 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                  />
                </div>
              </div>
              <Separator orientation='vertical' className='bg-border h-25! max-sm:hidden' />
              <Separator className='sm:hidden' />
              <div className='mb-1 grow'>
                <h5 className='mb-3 text-lg font-semibold'>Review Analytics</h5>
                <div className='flex items-center gap-3'>
                  <h4 className='text-3xl font-semibold'>10.0K</h4>
                  <Badge className='gap-1 border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'>
                    <TrendingUpIcon className='fill-success size-3' />
                    21%
                  </Badge>
                </div>
                <p className='text-muted-foreground text-sm'>Growth in reviews on this month</p>
              </div>
              <Separator orientation='vertical' className='bg-border h-25! max-md:hidden' />
              <Separator className='md:hidden' />
              <div className='grow'>
                <h5 className='mb-3 text-lg font-semibold'>Average Rating</h5>
                <div className='mb-1 flex items-center gap-3'>
                  <h4 className='text-3xl font-semibold'>4.5</h4>
                  <Rating readOnly variant='yellow' size={24} value={4.5} precision={0.5} />
                </div>
                <p className='text-muted-foreground text-sm'>Average Positive rating on this year</p>
              </div>
            </div>
          </CardContent>
          <Separator />
          {reviewItems.map((item, index) => (
            <Fragment key={`${item.name}-${item.id}`}>
              <CardContent>
                <div className='flex gap-5 max-sm:flex-wrap'>
                  <div className='flex shrink-0 flex-col items-start gap-4'>
                    <Avatar className='size-25 rounded-sm after:border-none'>
                      <AvatarImage src={item.image} alt={item.name} className='rounded-sm' />
                      <AvatarFallback className='text-xs'>{item.name}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start gap-1'>
                      <h5 className='text-lg font-semibold'>{item.name}</h5>
                      <p className='text-muted-foreground text-sm font-medium'>
                        Total Spent :
                        <span className='text-card-foreground ml-0.5 text-base font-semibold'>${item.totalSpent}</span>
                      </p>
                      <p className='text-muted-foreground text-sm font-medium'>
                        Total Review :
                        <span className='text-card-foreground ml-0.5 text-base font-semibold'>{item.totalReview}</span>
                      </p>
                    </div>
                  </div>
                  <div className='space-y-4 sm:grow'>
                    <div className='flex items-center justify-between'>
                      <Rating readOnly variant='yellow' size={24} value={item.rating} precision={0.5} />
                      <div className='text-muted-foreground font-medium'>{item.date}</div>
                    </div>
                    <p className='text-muted-foreground text-base'>{item.description}</p>
                    <Button
                      variant='secondary'
                      className='bg-primary/10 text-foreground hover:bg-primary/20'
                      render={
                        <a href={item.allReviewLink} className='w-fit'>
                          View all Reviews
                        </a>
                      }
                      nativeButton={false}
                    />
                  </div>
                </div>
              </CardContent>
              {index < reviewItems.length - 1 && <Separator />}
            </Fragment>
          ))}
        </Card>
      </div>
    </section>
  )
}

export default ProductReviews
