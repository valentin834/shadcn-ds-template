import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

type ProductCard = {
  img: string
  misc: string
  badge: string
  title: string
  mainClass?: string
  imgClass?: string
  contextClass?: string
  productLink: string
}[]

const ProductCategory = ({ productCards }: { productCards: ProductCard }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <p className='text-primary text-sm font-medium uppercase'>Category</p>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Shop By <span className='border-primary border-b'>Category</span>
          </h2>
          <p className='text-muted-foreground text-xl'>
            Explore our gallery to learn more about our amazing products and their features.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {productCards.map(item => (
            <Card key={item.title} className={cn('relative flex-row rounded-lg shadow-none ring-0', item.mainClass)}>
              <CardContent className={cn('space-y-3', item.contextClass)}>
                <div className='space-y-1.5'>
                  <Badge className='h-auto rounded-sm bg-red-500 text-white'>{item.badge}</Badge>
                  <p className='font-heading text-2xl font-bold text-white capitalize'>{item.misc}</p>
                  <p className='font-heading text-4xl font-bold text-white uppercase'>{item.title}</p>
                </div>
                <Button render={<a href={item.productLink} />} nativeButton={false} variant='secondary' size='lg'>
                  Browse
                </Button>
              </CardContent>
              <div className={item.imgClass}>
                <img src={item.img} alt={item.title} className='size-full object-contain' />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCategory
