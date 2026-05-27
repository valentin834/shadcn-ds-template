// @ts-nocheck
import { BadgeCheckIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

export type ProductItem = {
  productSrc: string
  productAlt: string
  name: string
  price: number
  avatarSrc: string
  avatarAlt: string
  avatarFallback: string
  sellerName: string
  category: string
}

type ProductProps = {
  products: ProductItem[]
}

const ProductList = ({ products }: ProductProps) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <h2 className='text-center text-2xl font-semibold sm:text-3xl lg:text-4xl'>All New Collection</h2>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {products.map((product, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide={{ direction: 'down', offset: 30 }}
              transition={{ duration: 0.45 }}
              delay={index * 0.05}
            >
              <Card className='border-none shadow-none'>
                <CardContent className='flex flex-col justify-between gap-6'>
                  <img src={product.productSrc} alt={product.productAlt} className='rounded-md' />

                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                      <span>{product.name}</span>
                      <span className='font-semibold'>${product.price}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <Breadcrumb>
                        <BreadcrumbList className='sm:gap-1.5'>
                          <BreadcrumbItem>
                            <BreadcrumbLink href='#' className='text-muted-foreground flex items-center gap-1.5'>
                              <Avatar className='size-5.5'>
                                <AvatarImage src={product.avatarSrc} alt={product.avatarAlt} />
                                <AvatarFallback className='text-xs'>{product.avatarFallback}</AvatarFallback>
                              </Avatar>
                              {product.sellerName}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className='text-card-foreground' />
                          <BreadcrumbItem>
                            <BreadcrumbLink href='#' className='text-muted-foreground'>
                              {product.category}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>

                      <BadgeCheckIcon className='stroke-card size-4 fill-green-600 dark:fill-green-400' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList