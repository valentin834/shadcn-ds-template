'use client'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'

export type ProductItem = {
  image: string
  imgAlt: string
  name: string
  price: number
  salePrice?: number
  cardClassName?: string
}

type ProductProps = {
  products: ProductItem[]
}

const ProductList = ({ products }: ProductProps) => {
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <h2 className='text-center text-2xl font-semibold sm:text-3xl lg:text-4xl'>New Sneaker And Sport shoes</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product, index) => (
            <Card
              key={index}
              className={cn('group shadow-none ring-0', product.cardClassName, product.salePrice && 'relative')}
            >
              {/* Sale Badge */}
              {product.salePrice && (
                <Badge variant='destructive' className='absolute bottom-8 left-6'>
                  Sale
                </Badge>
              )}
              <CardContent className='flex items-start justify-between gap-6'>
                <a href='#' className='flex flex-col gap-1'>
                  <span className='text-muted-foreground text-lg font-medium'>{product.name}</span>
                  {!product.salePrice && <span className='text-2xl font-semibold'>${product.price.toFixed(2)}</span>}
                  {product.salePrice && (
                    <div className='flex items-center gap-2'>
                      <span className='text-2xl font-semibold'>${product.salePrice.toFixed(2)}</span>
                      <span className='text-muted-foreground text-sm line-through'>${product.price.toFixed(2)}</span>
                    </div>
                  )}
                </a>
                <Button
                  variant='outline'
                  size='icon-sm'
                  className={cn(
                    'bg-background focus-visible:ring-ring/50 dark:bg-background size-9.5 rounded-full border p-1.75 focus-visible:ring-2',
                    {
                      'bg-destructive! dark:bg-destructive! text-white': liked[index]
                    }
                  )}
                  aria-label='Add wishlist'
                  onClick={() => setLiked(prev => ({ ...prev, [index]: !prev[index] }))}
                >
                  <HeartIcon
                    className={cn('size-4', {
                      'stroke-white': liked[index]
                    })}
                  />
                </Button>
              </CardContent>
              <CardContent className='flex flex-1 flex-col justify-between'>
                <a href='#' className='py-5'>
                  <img
                    src={product.image}
                    alt={product.imgAlt}
                    className='mx-auto h-62.5 transition-transform duration-300 group-hover:scale-115'
                  />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList
