'use client'

import { useState, type ReactElement } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Trash2Icon } from 'lucide-react'

// Constants
const FREE_DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 60
const DEFAULT_DISCOUNT_PERCENTAGE = 5

type ShoppingCartProps = {
  trigger: ReactElement
  defaultOpen?: boolean
  discountPercentage?: number
  onSizeChange?: (itemId: number, newSize: string) => void
  cartItems: {
    id: number
    name: string
    size: string
    price: number
    image: string
  }[]
  availableSizes: {
    value: string
    label: string
  }[]
}

const quantityItems = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' }
]

const ShoppingCart = ({
  defaultOpen = false,
  trigger,
  cartItems,
  availableSizes,
  onSizeChange,
  discountPercentage = DEFAULT_DISCOUNT_PERCENTAGE
}: ShoppingCartProps) => {
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initialQuantities: Record<number, number> = {}

    cartItems.forEach(item => {
      initialQuantities[item.id] = 1
    })

    return initialQuantities
  })

  const handleQuantityChange = (itemId: number, value: string) => {
    const newQuantity = Math.max(1, parseInt(value) || 1)

    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }))
  }

  const [deletedItems, setDeletedItems] = useState<Set<number>>(new Set())
  const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({})

  const handleSizeChange = (itemId: number, newSize: string) => {
    if (onSizeChange) {
      onSizeChange(itemId, newSize)
    }
  }

  const handleDeleteItem = (itemId: number) => {
    setDeletedItems(prev => new Set([...prev, itemId]))
  }

  // Filter out deleted items
  const activeCartItems = cartItems.filter(item => !deletedItems.has(item.id))

  const subtotal = activeCartItems.reduce((total: number, item) => {
    return total + item.price * (quantities[item.id] || 1)
  }, 0)

  const discount = (subtotal * discountPercentage) / 100
  const delivery = activeCartItems.length === 0 || subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const deliveryLabel = delivery === 0 ? 'Free Delivery' : `$${delivery}`

  const total = subtotal - discount + delivery

  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger render={trigger} />
      <SheetContent
        side='left'
        className='gap-6 overflow-y-auto p-6 data-[side=left]:w-full data-[side=left]:sm:max-w-131 [&>button]:top-6 [&>button]:right-6 [&>button>svg]:size-6!'
      >
        <SheetHeader className='p-0'>
          <SheetTitle className='text-2xl font-semibold'>Cart</SheetTitle>
          <SheetDescription hidden />
        </SheetHeader>
        <div className='flex flex-col justify-between'>
          {activeCartItems.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <div className='text-muted-foreground text-lg font-medium'>Your cart is empty</div>
              <div className='text-muted-foreground mt-2 text-sm'>Refresh the page to restore items</div>
            </div>
          ) : (
            activeCartItems.map(item => (
              <div
                key={item.id}
                className='flex pt-7 pb-7 not-last:border-b first:pt-4 last:pb-4 max-sm:flex-col max-sm:gap-y-2 sm:items-center'
              >
                <div className='flex grow items-center gap-4'>
                  <div className='size-18.5 overflow-hidden rounded-lg border'>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h4 className='text-base font-medium'>{item.name}</h4>
                    <div className='flex items-center gap-2'>
                      {item.size === 'Free Style' ? (
                        <Input className='input-sm w-29' readOnly value={item.size} />
                      ) : (
                        <Select
                          items={availableSizes}
                          defaultValue={item.size}
                          onValueChange={(value: string | null) => value && handleSizeChange(item.id, value)}
                        >
                          <SelectTrigger className='input-sm w-29 shadow-none'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {availableSizes.map((sizeItem, index: number) => (
                                <SelectItem key={`${sizeItem.value}-${index}`} value={sizeItem.value}>
                                  {sizeItem.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                      <Select
                        items={quantityItems}
                        value={quantities[item.id]?.toString() || '1'}
                        onValueChange={(value: string | null) => value && handleQuantityChange(item.id, value)}
                      >
                        <SelectTrigger className='input-sm w-29 shadow-none'>
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
                    </div>
                  </div>
                </div>
                <div className='flex grow items-center gap-3 max-sm:justify-end sm:flex-col sm:items-end'>
                  <span className='text-lg font-semibold'>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</span>
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
        <SheetFooter className='gap-6 p-0'>
          <div className='space-y-3 text-base'>
            <div className='flex items-center justify-between gap-2.5'>
              <p className='text-muted-foreground'>Price</p>
              <p className='font-semibold'>${subtotal.toFixed(2)}</p>
            </div>
            <div className='flex items-center justify-between gap-2.5'>
              <p className='text-muted-foreground'>Discount</p>
              <p className='font-semibold'>-${discount.toFixed(2)}</p>
            </div>
            <div className='flex items-center justify-between gap-2.5'>
              <p className='text-muted-foreground'>Delivery Charges</p>
              <p className='font-semibold'>{deliveryLabel}</p>
            </div>
            <Separator />
            <div className='flex items-center justify-between gap-2.5'>
              <p className='grow text-lg font-semibold'>Total</p>
              <p className='text-lg font-semibold'>${total.toFixed(2)}</p>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <Button size='lg' className='w-full'>
              Checkout
            </Button>
            <Button size='lg' variant='outline' className='w-full'>
              Continue Shopping
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCart
