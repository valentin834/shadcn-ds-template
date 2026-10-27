import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { TruckIcon, BadgePercentIcon } from 'lucide-react'

type PaymentMethod = {
  id: string
  name: string
  expiry: string
  logo: string
  alt: string
}[]

const Checkout = ({ paymentMethods }: { paymentMethods: PaymentMethod }) => {
  return (
    <section className='bg-muted px-6 py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold'>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
              <div className='space-y-6 lg:col-span-2'>
                <RadioGroup className='w-full' defaultValue='visa'>
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2' defaultValue='visa'>
                    {paymentMethods.map((paymentMethod, index) => (
                      <div
                        key={index}
                        className='border-input has-data-checked:border-primary/50 relative flex w-full flex-col gap-3 rounded-xl border p-4 outline-none'
                      >
                        <div className='flex gap-3'>
                          <RadioGroupItem
                            value={paymentMethod.id}
                            id={paymentMethod.id}
                            aria-label='plan-radio-basic'
                            aria-describedby={`${paymentMethod.id}-description`}
                            className='size-5 after:absolute after:inset-0 [&_svg]:size-3'
                          />
                          <div className='grid grow gap-1'>
                            <Label
                              htmlFor={paymentMethod.id}
                              className='text-base leading-6 font-semibold after:absolute after:inset-0'
                            >
                              {paymentMethod.name}
                            </Label>
                            <p id={`${paymentMethod.id}-description`} className='text-muted-foreground text-sm'>
                              Expiry {paymentMethod.expiry}
                            </p>
                          </div>
                        </div>
                        <div className='ml-8 flex items-center justify-between'>
                          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                            <a href='#'>Delete</a>
                            <span className='text-muted-foreground'>|</span>
                            <a href='#'>Edit</a>
                          </div>
                          <div className='h-6 w-auto'>
                            <img
                              src={paymentMethod.logo}
                              alt={paymentMethod.alt}
                              className='h-full w-auto object-contain'
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className='my-6 flex items-center justify-center'>
                  <Separator className='flex-1' />
                  <span className='text-muted-foreground px-6 text-lg'>or</span>
                  <Separator className='flex-1' />
                </div>

                {/* Add New Payment Method */}
                <h5 className='text-muted-foreground text-base'>Add a new payment method</h5>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div className='space-y-1.5'>
                    <Label htmlFor='full-name' className='text-base font-medium'>
                      Full name (as displayed on Card)*
                    </Label>
                    <Input type='text' placeholder='John Doe' id='full-name' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='card-number' className='text-base font-medium'>
                      Card Number*
                    </Label>
                    <Input type='text' placeholder='xxxx xxxx xxxx xxxx' id='card-number' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='card-expiration' className='text-base font-medium'>
                      Card expiration*
                    </Label>
                    <Input type='text' placeholder='MM/YY' id='card-expiration' />
                  </div>
                  <div className='space-y-1.5'>
                    <Label htmlFor='card-cvv' className='text-base font-medium'>
                      CVV*
                    </Label>
                    <Input type='number' placeholder='123' id='card-cvv' />
                  </div>
                </div>
                <Button className='w-full'>Pay Now</Button>
                <p className='text-muted-foreground text-base'>
                  Payment processed by{' '}
                  <a href='#' className='text-primary underline'>
                    Paddle
                  </a>{' '}
                  for{' '}
                  <a href='#' className='text-primary underline'>
                    ShadcnStudio
                  </a>{' '}
                  - United States Of America
                </p>
              </div>

              {/* Order Summary & Info */}
              <div className='flex flex-col gap-6'>
                {/* Summary */}
                <Card className='bg-muted rounded-md ring-0'>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-muted-foreground text-base'>Original price</span>
                      <span className='text-base font-semibold'>$6,592.00</span>
                    </div>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-muted-foreground text-base'>Savings</span>
                      <span className='text-base font-semibold text-green-600 dark:text-green-400'>-$299.00</span>
                    </div>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-muted-foreground text-base'>Store pickup</span>
                      <span className='text-base font-semibold'>$99</span>
                    </div>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-muted-foreground text-base'>Tax</span>
                      <span className='text-base font-semibold'>$799</span>
                    </div>
                  </CardContent>
                  <CardContent>
                    <Separator />
                  </CardContent>
                  <CardContent className='flex items-center justify-between gap-3'>
                    <span className='text-xl font-semibold'>Total</span>
                    <span className='text-xl font-semibold'>$1198.00</span>
                  </CardContent>
                </Card>

                {/* Free Shipping */}
                <div className='bg-muted flex gap-2 rounded-lg px-2.5 py-2'>
                  <TruckIcon className='mt-1 size-5 shrink-0' />
                  <div className='space-y-0.5'>
                    <h5 className='text-lg font-medium'>Free Shipping</h5>
                    <p className='text-primary/80 text-base'>
                      You have 3 months to try free shipping and exclusive Genius offers.
                    </p>
                  </div>
                </div>

                {/* 10% Extra */}
                <div className='bg-muted flex gap-2 rounded-lg px-2.5 py-2'>
                  <BadgePercentIcon className='mt-1 size-5 shrink-0' />
                  <div className='space-y-0.5'>
                    <h5 className='text-lg font-medium'>10% Extra</h5>
                    <p className='text-primary/80 text-base'>
                      You get 10% extra when purchasing this product, for orders of at least $100!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Checkout
