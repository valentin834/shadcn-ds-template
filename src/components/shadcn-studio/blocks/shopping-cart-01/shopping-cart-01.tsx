'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ClockIcon, Trash2Icon } from 'lucide-react'

const FREE_DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 60
const DEFAULT_TAX_PERCENTAGE = 10

type ShoppingCartProps = {
  cartItems: {
    id: number
    name: string
    size: string
    price: number
    image: string
  }[]
  taxPercentage?: number
}

const quantityItems = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' }
]

const ShoppingCart = ({ cartItems, taxPercentage = DEFAULT_TAX_PERCENTAGE }: ShoppingCartProps) => {
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initialQuantities: Record<number, number> = {}

    cartItems.forEach(item => {
      initialQuantities[item.id] = 1
    })

    return initialQuantities
  })

  const [deletedItems, setDeletedItems] = useState<Set<number>>(new Set())
  const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({})

  const handleQuantityChange = (itemId: number, value: string) => {
    const newQuantity = Math.max(1, parseInt(value) || 1)

    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }))
  }

  const handleDeleteItem = (itemId: number) => {
    setDeletedItems(prev => new Set([...prev, itemId]))
  }

  // Filter out deleted items
  const activeCartItems = cartItems.filter(item => !deletedItems.has(item.id))

  const subtotal = activeCartItems.reduce((total: number, item) => {
    return total + item.price * (quantities[item.id] || 1)
  }, 0)

  const tax = (subtotal * taxPercentage) / 100
  const delivery = activeCartItems.length === 0 || subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const deliveryLabel = delivery === 0 ? 'Free Delivery' : `$${delivery}`

  const total = subtotal + tax + delivery

  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Column - cartItems */}
          <div className='space-y-3 px-6 lg:col-span-2'>
            <div className='flex w-full items-center justify-between'>
              <h2 className='text-2xl font-semibold'>Your Cart</h2>
              <div className='text-muted-foreground'>{activeCartItems.length} Items in cart</div>
            </div>
            {activeCartItems.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <div className='text-muted-foreground text-lg font-medium'>Your cart is empty</div>
                <div className='text-muted-foreground mt-2 text-sm'>Refresh the page to restore items</div>
              </div>
            ) : (
              activeCartItems.map(item => (
                <div key={item.id} className='flex gap-6 border-t pt-7 pb-4 max-sm:flex-col sm:items-center'>
                  <div className='flex grow items-center gap-4'>
                    <Label className='group relative cursor-pointer'>
                      <Checkbox
                        defaultChecked
                        className='absolute top-2 left-2 hidden size-4 group-hover:block hover:border-black data-checked:block **:[svg]:size-3!'
                      />
                      <div className='size-25'>
                        <img src={item.image} alt={item.name} className='rounded-md object-cover' />
                      </div>
                    </Label>

                    <div className='flex flex-col justify-between gap-4'>
                      <div className='flex flex-col gap-2'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <p className='text-muted-foreground'>Size: {item.size}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <ClockIcon className='size-5' />
                        <p className='text-muted-foreground text-sm'>7 days return Available</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-12'>
                    <Select
                      items={quantityItems}
                      value={quantities[item.id]?.toString() || '1'}
                      onValueChange={(value: string | null) => value && handleQuantityChange(item.id, value)}
                    >
                      <SelectTrigger className='w-25 shadow-none'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {quantityItems.map(q => (
                            <SelectItem key={q.value} value={q.value}>
                              {q.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <p className='text-lg font-semibold'>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</p>
                    <Popover
                      open={openPopovers[item.id] || false}
                      onOpenChange={open => setOpenPopovers(prev => ({ ...prev, [item.id]: open }))}
                    >
                      <PopoverTrigger render={<Button variant='ghost' size='icon' className='cursor-pointer' />}>
                        <Trash2Icon className='size-6' />
                        <span className='sr-only'>Delete Item</span>
                      </PopoverTrigger>
                      <PopoverContent className='w-80'>
                        <div className='flex flex-col items-center gap-4'>
                          <div className='flex aspect-square size-12 items-center justify-center rounded-full bg-red-500/10'>
                            <Trash2Icon className='text-destructive size-6' />
                          </div>
                          <div className='text-center font-semibold text-balance'>
                            Are you sure you want to remove this item
                          </div>
                          <div className='grid w-full grid-cols-2 gap-2'>
                            <Button
                              variant='secondary'
                              size='sm'
                              onClick={() => setOpenPopovers(prev => ({ ...prev, [item.id]: false }))}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant='destructive'
                              size='sm'
                              className='bg-destructive! dark:bg-destructive! text-white'
                              onClick={() => {
                                handleDeleteItem(item.id)
                                setOpenPopovers(prev => ({ ...prev, [item.id]: false }))
                              }}
                            >
                              Delete Item
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Right Column - Payment */}
          <div className='space-y-6'>
            <Card className='w-full max-w-md shadow-none ring-0'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-xl font-semibold'>Apply Coupon</CardTitle>
                <CardDescription className='text-base'>Using a Promo Code ?</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className='flex grow gap-2.5 sm:justify-end'>
                    <Input type='text' placeholder='Coupon Code' className='input-lg w-full' />
                    <Button type='submit' size='lg'>
                      Apply
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className='w-full max-w-md text-base shadow-none ring-0'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold'> Price Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-5'>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span className='font-medium'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Tax<span className='text-muted-foreground ms-0.5 text-xs'>{taxPercentage}%</span>
                  </span>
                  <span className='font-medium'>+${tax.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className='font-medium'>{deliveryLabel}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between text-lg font-semibold'>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardContent className='flex flex-col items-start gap-3.5'>
                <Button type='submit' size='lg' className='w-full'>
                  Confirm Payment
                </Button>
                <div className='flex items-center gap-2'>
                  <p>We Accept:</p>
                  <div className='flex items-center gap-4'>
                    <img src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/visa.png' alt='Visa' className='h-4' />
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/paypal-icon.png'
                      alt='PayPal'
                      className='h-4'
                    />
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/master.png'
                      alt='Mastercard'
                      className='h-4'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShoppingCart
