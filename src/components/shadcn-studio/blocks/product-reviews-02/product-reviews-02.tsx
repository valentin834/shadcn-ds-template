import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Rating } from '@/components/ui/rating'

type ProductReviewsProps = {
  reviewItems: {
    id: number
    name: string
    description: string
    rating: number
    image: string
    date: string
  }[]
}

const ProductReviews = ({ reviewItems }: ProductReviewsProps) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto px-4 sm:max-w-5xl sm:px-6 lg:px-8'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-5'>
          <div className='space-y-8 lg:col-span-3'>
            <h2 className='text-3xl font-semibold'>Customer Feedback</h2>
            {reviewItems.map(item => (
              <div key={`${item.name}-${item.id}`}>
                <Card className='w-full shadow-none'>
                  <CardContent className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-10'>
                        <AvatarImage src={item.image} alt={item.name} />
                        <AvatarFallback className='text-xs'>{item.name}</AvatarFallback>
                      </Avatar>
                      <div className='flex grow flex-col gap-1'>
                        <h5 className='text-lg font-semibold'>{item.name}</h5>
                        <span className='text-muted-foreground text-sm'>{item.date}</span>
                      </div>
                      <Rating readOnly variant='yellow' size={16} value={item.rating} precision={0.5} />
                    </div>
                    <p className='text-muted-foreground text-base'>{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className='space-y-8 lg:col-span-2'>
            <h2 className='text-3xl font-semibold'>Average Rating</h2>
            <Card className='w-full shadow-none'>
              <CardHeader>
                <CardTitle className='flex items-center gap-3 text-3xl font-semibold'>
                  4.5
                  <span>
                    <Rating readOnly variant='yellow' size={24} value={4.5} precision={0.5} />
                  </span>
                </CardTitle>
                <CardDescription>Average Positive rating on this year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold'>5</span>
                    </div>
                    <Progress
                      value={100}
                      className='w-full **:data-[slot=progress-indicator]:bg-amber-600 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                    />
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold'>4</span>
                    </div>
                    <Progress
                      value={75}
                      className='w-full **:data-[slot=progress-indicator]:bg-amber-600 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                    />
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold'>3</span>
                    </div>
                    <Progress
                      value={50}
                      className='w-full **:data-[slot=progress-indicator]:bg-amber-600 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                    />
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold'>2</span>
                    </div>
                    <Progress
                      value={25}
                      className='w-full **:data-[slot=progress-indicator]:bg-amber-600 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                    />
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold'>1</span>
                    </div>
                    <Progress
                      value={0}
                      className='w-full **:data-[slot=progress-indicator]:bg-amber-600 dark:**:data-[slot=progress-indicator]:bg-amber-400/60'
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent className='flex flex-col items-start gap-4'>
                <h5 className='text-lg font-semibold'>Write your Review</h5>
                <p className='text-muted-foreground text-base'>
                  Share your feedback and help create a better shopping experience for everyone
                </p>
                <Button type='submit' size='lg' className='w-full'>
                  Submit Reviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReviews
