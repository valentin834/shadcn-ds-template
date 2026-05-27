// @ts-nocheck
'use client'

import { useId, useState } from 'react'

import { GiftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const countries = [
  { value: '1', label: 'India' },
  { value: '2', label: 'China' },
  { value: '3', label: 'Monaco' },
  { value: '4', label: 'Serbia' },
  { value: '5', label: 'Romania' },
  { value: '6', label: 'Mayotte' },
  { value: '7', label: 'Iraq' },
  { value: '8', label: 'Syria' },
  { value: '9', label: 'Korea' },
  { value: '10', label: 'Zimbabwe' }
]

const cities = [
  { value: '1', label: 'New York' },
  { value: '2', label: 'Los Angeles' },
  { value: '3', label: 'London' },
  { value: '4', label: 'Paris' },
  { value: '5', label: 'Tokyo' },
  { value: '6', label: 'Sydney' },
  { value: '7', label: 'Dubai' },
  { value: '8', label: 'Singapore' },
  { value: '9', label: 'Mumbai' },
  { value: '10', label: 'Berlin' }
]

const GiftCard = () => {
  const id = useId()
  const [selectedAmount, setSelectedAmount] = useState('50')
  const [currency, setCurrency] = useState('usd')
  const [deliveryMethod, setDeliveryMethod] = useState('immediately')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [deliveryType, setDeliveryType] = useState('email')
  const [customAmount, setCustomAmount] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const currencySymbols = {
    usd: '$',
    eur: '€',
    gbp: '£'
  }

  return (
    <Card className='w-full max-w-228.75'>
      <CardContent>
        <div className='bg-muted mb-6 flex items-center overflow-hidden rounded-sm p-4 max-sm:flex-col sm:max-md:gap-6 lg:h-50'>
          <div className='space-y-2'>
            <h4 className='text-2xl font-semibold'>Give the Perfect Gift Anytime, Anywhere</h4>
            <p className='text-muted-foreground word-wrap max-w-lg'>
              Surprise someone special with the freedom to choose what they really want.
            </p>
            <Button size='lg' className='text-base'>
              Explore Gift Cards
              <GiftIcon />
            </Button>
          </div>
          <div className='-mb-8 ml-auto max-sm:mx-auto'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/gift-card/image-11.png'
              alt='Gift Card'
              className='h-49 w-auto min-w-43.5 object-cover'
            />
          </div>
        </div>
        <form className='space-y-8' onSubmit={e => e.preventDefault()}>
          <div>
            <h4 className='mb-4 text-xl font-semibold'>Choose a delivery method</h4>
            <RadioGroup
              className='flex w-full gap-4 max-sm:flex-col'
              value={deliveryType}
              onValueChange={setDeliveryType}
            >
              <div className='border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-muted relative flex w-full items-start gap-2 rounded-lg border p-3 shadow-xs outline-none'>
                <RadioGroupItem
                  value='email'
                  id={`${id}-email`}
                  aria-describedby={`${id}-email-description`}
                  className='mt-1 size-4 after:absolute after:inset-0 [&_svg]:size-2.5'
                />
                <div className='grid grow gap-2'>
                  <Label htmlFor={`${id}-email`} className='text-base'>
                    Email
                  </Label>
                  <p id={`${id}-email-description`} className='text-muted-foreground text-sm'>
                    The gift card is delivered to the recipient’s email address.
                  </p>
                </div>
              </div>

              <div className='border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-muted relative flex w-full items-start gap-2 rounded-lg border p-3 shadow-xs outline-none'>
                <RadioGroupItem
                  value='physical'
                  id={`${id}-physical`}
                  aria-describedby={`${id}-physical-description`}
                  className='mt-1 size-4 after:absolute after:inset-0 [&_svg]:size-2.5'
                />
                <div className='grid grow gap-2'>
                  <Label htmlFor={`${id}-physical`} className='text-base'>
                    Physical
                  </Label>
                  <p id={`${id}-physical-description`} className='text-muted-foreground text-sm'>
                    A printed gift card is shipped to the recipient’s address.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <div className='mb-4 flex items-center gap-2 max-sm:flex-col max-sm:items-start'>
              <h4 className='text-xl font-semibold'>Choose your amount</h4>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className='h-7! w-18 px-2 py-1 text-xs leading-4' size='sm'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align='start'>
                  <SelectItem value='usd'>USD</SelectItem>
                  <SelectItem value='eur'>EUR</SelectItem>
                  <SelectItem value='gbp'>GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-wrap gap-3'>
              {['50', '100', '200', '300'].map(amount => (
                <Button
                  key={amount}
                  type='button'
                  variant={selectedAmount === amount ? 'default' : 'secondary'}
                  className='h-6.5 px-2 text-xs'
                  onClick={() => setSelectedAmount(amount)}
                >
                  {currencySymbols[currency as keyof typeof currencySymbols]} {amount}
                </Button>
              ))}
              <Button
                type='button'
                variant={selectedAmount === 'custom' ? 'default' : 'secondary'}
                className='h-6.5 px-2'
                onClick={() => setSelectedAmount('custom')}
              >
                Custom
              </Button>
            </div>
            {selectedAmount === 'custom' && (
              <div className='mt-3'>
                <Input
                  type='number'
                  placeholder='Enter custom amount'
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  className='h-9 max-w-82'
                />
              </div>
            )}
          </div>

          <div>
            <h4 className='mb-4 text-xl font-semibold'>Send the giftcard</h4>
            <div className='flex gap-3'>
              <Button
                variant={deliveryMethod === 'immediately' ? 'default' : 'secondary'}
                className='h-6.5 px-2 text-xs'
                onClick={() => setDeliveryMethod('immediately')}
              >
                Immediately
              </Button>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger render={<Button variant={deliveryMethod === 'schedule' ? 'default' : 'secondary'} className='h-6.5 px-2 text-xs' onClick={() => setDeliveryMethod('schedule')} />}>Schedule
                                                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='center'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={selectedDate => {
                      setDate(selectedDate)
                      setIsCalendarOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className='mb-4'>
            <h4 className='mb-4 text-xl font-semibold'>Recipient information</h4>
            <div className='space-y-6'>
              <div className='grid gap-6 sm:grid-cols-2'>
                <div className='space-y-1.5'>
                  <Label htmlFor='fullname' className='text-base'>
                    Full Name*
                  </Label>
                  <Input id='fullname' placeholder='John Doe' required />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='email' className='text-base'>
                    Email Address*
                  </Label>
                  <Input id='email' type='email' placeholder='john@gmail.com' required />
                </div>
              </div>
              {deliveryType === 'physical' && (
                <>
                  <div className='grid gap-6 sm:grid-cols-2'>
                    <div className='space-y-1.5'>
                      <Label htmlFor='country' className='text-base'>
                        Country
                      </Label>
                      <Select defaultValue='1' required>
                        <SelectTrigger
                          id='country'
                          className='w-full [&>span]:flex [&>span]:items-center [&>span]:gap-2'
                        >
                          <SelectValue placeholder='Select Country' />
                        </SelectTrigger>
                        <SelectContent className='max-h-100 [&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2'>
                          {countries.map(country => (
                            <SelectItem key={country.value} value={country.value}>
                              <span className='truncate'>{country.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-1.5'>
                      <Label htmlFor='city' className='text-base'>
                        City
                      </Label>
                      <Select defaultValue='1' required>
                        <SelectTrigger id='city' className='w-full [&>span]:flex [&>span]:items-center [&>span]:gap-2'>
                          <SelectValue placeholder='Select Country' />
                        </SelectTrigger>
                        <SelectContent className='max-h-100 [&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2'>
                          {cities.map(city => (
                            <SelectItem key={city.value} value={city.value}>
                              <span className='truncate'>{city.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='grid gap-6 sm:grid-cols-2'>
                    <div className='space-y-1.5'>
                      <Label htmlFor='street-address' className='text-base'>
                        Street Address*
                      </Label>
                      <Input id='street-address' placeholder='13th Street' required />
                    </div>
                    <div className='space-y-1.5'>
                      <Label htmlFor='zip-code' className='text-base'>
                        Zip-code*
                      </Label>
                      <Input id='zip-code' type='number' placeholder='63955' required />
                    </div>
                  </div>
                </>
              )}
              <div className='space-y-1.5'>
                <Label htmlFor='message' className='text-base'>
                  Add Message*
                </Label>
                <Textarea id='message' placeholder='Type here' className='min-h-35.25 px-3.5' required />
              </div>
            </div>
          </div>

          <Button className='w-full' type='submit' size='lg'>
            Buy now
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default GiftCard