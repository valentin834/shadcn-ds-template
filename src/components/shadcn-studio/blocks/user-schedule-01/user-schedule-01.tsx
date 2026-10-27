'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import ScheduleMeetingDialog from '@/components/shadcn-studio/blocks/user-schedule-01/create-event'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Calendar } from '@/components/ui/calendar'
import { ChevronUpIcon, PlusIcon, MapPinIcon } from 'lucide-react'

export type Event = {
  id: string
  title: string
  description: string
  location: string
  price: number
  image: string
  category: string[]
  language: string
  date: Date
}

type InternationalEventsProps = {
  events: Event[]
}

const InternationalEvents: React.FC<InternationalEventsProps> = ({ events }) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [showAllCategories, setShowAllCategories] = useState(true)
  const [showAllLanguages, setShowAllLanguages] = useState(true)
  const [showAllPrices, setShowAllPrices] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    'All',
    'Technology',
    'AI related',
    'Art & culture',
    'Business',
    'Science',
    'Travel',
    'Education',
    'Healthcare',
    'Finance'
  ]

  const languages = ['English', 'Gujarati', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic']

  const priceRanges = ['Free', '0$-500$', '500$-2000$', 'Above 2000$']

  const handleCategoryToggle = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All'])
    } else {
      let newCategories = selectedCategories.filter(c => c !== 'All')

      if (newCategories.includes(category)) {
        newCategories = newCategories.filter(c => c !== category)
      } else {
        newCategories.push(category)
      }

      setSelectedCategories(newCategories.length === 0 ? ['All'] : newCategories)
    }
  }

  const handleToggle = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const isPriceMatch = (eventPrice: number, range: string): boolean => {
    if (range === 'Free') return eventPrice === 0
    if (range === '0$-500$') return eventPrice > 0 && eventPrice <= 500
    if (range === '500$-2000$') return eventPrice > 500 && eventPrice <= 2000
    if (range === 'Above 2000$') return eventPrice > 2000

    return false
  }

  const filterEvents = () => {
    return events.filter(event => {
      const categoryMatch =
        selectedCategories.includes('All') || event.category.some(cat => selectedCategories.includes(cat))

      const languageMatch = selectedLanguages.length === 0 || selectedLanguages.includes(event.language)

      const priceMatch = selectedPrices.length === 0 || selectedPrices.some(range => isPriceMatch(event.price, range))

      return categoryMatch && languageMatch && priceMatch
    })
  }

  const renderCheckboxItem = (item: string, selectedItems: string[], onToggle: () => void, idPrefix: string) => (
    <div key={item} className='flex items-center space-x-3'>
      <Checkbox
        id={`${idPrefix}-${item}`}
        checked={selectedItems.includes(item)}
        onCheckedChange={onToggle}
        className='size-5'
      />
      <label
        htmlFor={`${idPrefix}-${item}`}
        className='cursor-pointer text-sm leading-5 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {item}
      </label>
    </div>
  )

  const renderFilterSection = (title: string, isExpanded: boolean, toggleExpanded: () => void) => (
    <div
      className='mb-4 flex cursor-pointer items-center justify-between border-0 border-b px-4 py-2'
      onClick={toggleExpanded}
    >
      <h3 className='text-lg font-medium'>{title}</h3>
      <Button variant='ghost' size='icon'>
        <ChevronUpIcon className={cn('size-5 transition-transform', !isExpanded && 'rotate-180')} />
      </Button>
    </div>
  )

  const filteredEvents = filterEvents()

  return (
    <div className='grid grid-cols-1 gap-2.5 md:grid-cols-[240px_1fr] lg:grid-cols-[248px_1fr]'>
      <Sheet defaultOpen={false}>
        {/* Sidebar */}
        <div className='relative min-w-62 border-0 p-3 py-3.5 max-md:hidden md:border-r'>
          <div className='sticky top-1.5 space-y-3.5'>
            <div className='border-0 border-b px-4 py-2'>
              <p className='text-lg font-medium'>Choose the Date</p>
            </div>

            {mounted && (
              <Calendar
                mode='single'
                defaultMonth={date}
                selected={date}
                onSelect={setDate}
                className='w-full p-0'
                buttonVariant='outline'
              />
            )}

            {/* Categories */}
            {renderFilterSection('Categories', showAllCategories, () => setShowAllCategories(!showAllCategories))}
            {showAllCategories && (
              <>
                <div className='mb-4 space-y-4 px-4'>
                  {categories
                    .slice(0, 4)
                    .map(category =>
                      renderCheckboxItem(category, selectedCategories, () => handleCategoryToggle(category), 'category')
                    )}
                </div>
                <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen} className='space-y-4'>
                  <CollapsibleContent className='space-y-4 px-4'>
                    {categories
                      .slice(4)
                      .map(category =>
                        renderCheckboxItem(
                          category,
                          selectedCategories,
                          () => handleCategoryToggle(category),
                          'category'
                        )
                      )}
                  </CollapsibleContent>
                  <div className='flex justify-between px-4'>
                    <CollapsibleTrigger>
                      <span className='text-sm font-medium underline-offset-2 hover:underline'>
                        {isCategoryOpen ? 'See less' : `+${categories.length - 4} more`}
                      </span>
                    </CollapsibleTrigger>
                    <Button onClick={() => setSelectedCategories(['All'])} variant='destructive' size='xs'>
                      Clear
                    </Button>
                  </div>
                </Collapsible>
              </>
            )}

            {/* Languages */}
            {renderFilterSection('Languages', showAllLanguages, () => setShowAllLanguages(!showAllLanguages))}
            {showAllLanguages && (
              <>
                <div className='mb-4 space-y-4 px-4'>
                  {languages
                    .slice(0, 3)
                    .map(language =>
                      renderCheckboxItem(
                        language,
                        selectedLanguages,
                        () => handleToggle(language, selectedLanguages, setSelectedLanguages),
                        'language'
                      )
                    )}
                </div>
                <Collapsible open={isLanguageOpen} onOpenChange={setIsLanguageOpen} className='space-y-4'>
                  <CollapsibleContent className='space-y-4 px-4'>
                    {languages
                      .slice(3)
                      .map(language =>
                        renderCheckboxItem(
                          language,
                          selectedLanguages,
                          () => handleToggle(language, selectedLanguages, setSelectedLanguages),
                          'language'
                        )
                      )}
                  </CollapsibleContent>
                  {/* <div className='px-4'> */}
                  <CollapsibleTrigger>
                    <span className='px-4 text-sm font-medium underline-offset-2 hover:underline'>
                      {isLanguageOpen ? 'See less' : `+${languages.length - 3} more`}
                    </span>
                  </CollapsibleTrigger>
                  {/* </div> */}
                </Collapsible>
              </>
            )}

            {/* Price */}
            {renderFilterSection('Price', showAllPrices, () => setShowAllPrices(!showAllPrices))}
            {showAllPrices && (
              <div className='mb-4 space-y-4 px-4'>
                {priceRanges.map(price =>
                  renderCheckboxItem(
                    price,
                    selectedPrices,
                    () => handleToggle(price, selectedPrices, setSelectedPrices),
                    'price'
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar for responsive screen */}
        <div className='pl-3 md:hidden'>
          <SheetContent
            className='max-w-64 gap-0 [&>button]:top-2.75 [&>button>svg]:size-5'
            side='left'
            aria-describedby='Filters'
          >
            <ScrollArea className='h-full'>
              <SheetTitle className='sr-only'>Filters</SheetTitle>
              <SheetDescription className='sr-only'>
                Choose the date, category, language and price range to find events that suit your preferences.
              </SheetDescription>
              <div className='mr-auto ml-2 border-0 p-3'>
                <div className='space-y-3.5'>
                  <div className='border-0 border-b px-4 py-2'>
                    <p className='text-lg font-medium'>Choose the Date</p>
                  </div>
                  {mounted && (
                    <Calendar
                      mode='single'
                      defaultMonth={date}
                      selected={date}
                      onSelect={setDate}
                      className='bg-transparent p-0'
                      buttonVariant='outline'
                    />
                  )}
                  {/* Categories */}
                  {renderFilterSection('Categories', showAllCategories, () => setShowAllCategories(!showAllCategories))}
                  {showAllCategories && (
                    <>
                      <div className='space-y-4 px-4'>
                        {categories
                          .slice(0, 4)
                          .map(category =>
                            renderCheckboxItem(
                              category,
                              selectedCategories,
                              () => handleCategoryToggle(category),
                              'category'
                            )
                          )}
                      </div>
                      <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen} className='space-y-4'>
                        <CollapsibleContent className='space-y-4 px-4'>
                          {categories
                            .slice(4)
                            .map(category =>
                              renderCheckboxItem(
                                category,
                                selectedCategories,
                                () => handleCategoryToggle(category),
                                'category'
                              )
                            )}
                        </CollapsibleContent>
                        <div className='flex justify-between px-4'>
                          <CollapsibleTrigger>
                            <span className='text-sm font-medium underline-offset-2 hover:underline'>
                              {isCategoryOpen ? 'See less' : `+${categories.length - 4} more`}
                            </span>
                          </CollapsibleTrigger>
                          <Button
                            className='bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 h-6.5 px-2'
                            onClick={() => setSelectedCategories(['All'])}
                          >
                            Clear
                          </Button>
                        </div>
                      </Collapsible>
                    </>
                  )}
                  {/* Languages */}
                  {renderFilterSection('Languages', showAllLanguages, () => setShowAllLanguages(!showAllLanguages))}
                  {showAllLanguages && (
                    <>
                      <div className='space-y-4 px-4'>
                        {languages
                          .slice(0, 3)
                          .map(language =>
                            renderCheckboxItem(
                              language,
                              selectedLanguages,
                              () => handleToggle(language, selectedLanguages, setSelectedLanguages),
                              'language'
                            )
                          )}
                      </div>
                      <Collapsible open={isLanguageOpen} onOpenChange={setIsLanguageOpen} className='space-y-4'>
                        <CollapsibleContent className='space-y-4 px-4'>
                          {languages
                            .slice(3)
                            .map(language =>
                              renderCheckboxItem(
                                language,
                                selectedLanguages,
                                () => handleToggle(language, selectedLanguages, setSelectedLanguages),
                                'language'
                              )
                            )}
                        </CollapsibleContent>
                        <CollapsibleTrigger>
                          <span className='px-4 text-sm font-medium underline-offset-2 hover:underline'>
                            {isLanguageOpen ? 'See less' : `+${languages.length - 3} more`}
                          </span>
                        </CollapsibleTrigger>
                      </Collapsible>
                    </>
                  )}
                  {/* Price */}
                  {renderFilterSection('Price', showAllPrices, () => setShowAllPrices(!showAllPrices))}
                  {showAllPrices && (
                    <div className='space-y-4 px-4'>
                      {priceRanges.map(price =>
                        renderCheckboxItem(
                          price,
                          selectedPrices,
                          () => handleToggle(price, selectedPrices, setSelectedPrices),
                          'price'
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </div>

        {/* Main Content */}
        <div className='p-3'>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
            <h1 className='text-xl font-medium lg:text-3xl'>Upcoming International Events</h1>
            <div className='flex gap-4'>
              <div className='md:hidden'>
                <SheetTrigger render={<Button size='lg' variant='outline' />}>Filter</SheetTrigger>
              </div>
              <ScheduleMeetingDialog
                trigger={
                  <Button size='lg'>
                    Create event
                    <PlusIcon />{' '}
                  </Button>
                }
              />
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {filteredEvents.map(event => (
              <Card key={event.id} className='cursor-pointer overflow-hidden pt-0 transition-shadow hover:shadow-lg'>
                <div className='w-full overflow-hidden'>
                  <img src={event.image} alt={event.title} className='object-cover max-sm:w-full' />
                </div>
                <CardContent>
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='text-foreground flex items-center gap-1 text-sm'>
                      <MapPinIcon className='size-4' />
                      <span>{event.location}</span>
                    </div>
                    <span className='text-sm font-semibold'>${event.price}</span>
                  </div>
                  <h3 className='mb-1 text-lg font-semibold'>{event.title}</h3>
                  <p className='text-muted-foreground text-sm'>{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className='text-muted-foreground py-12 text-center'>
              <p>No events found matching your filters.</p>
            </div>
          )}
        </div>
      </Sheet>
    </div>
  )
}

export default InternationalEvents
