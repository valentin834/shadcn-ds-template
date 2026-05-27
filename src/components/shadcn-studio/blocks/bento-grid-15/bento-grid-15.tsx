// @ts-nocheck
import {
  BusIcon,
  ChartSplineIcon,
  CircleDollarSignIcon,
  CoffeeIcon,
  DollarSignIcon,
  HandCoinsIcon,
  HouseIcon,
  PlaneIcon,
  ShoppingCartIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import UpdatedBalanceCard from '@/components/shadcn-studio/blocks/bento-grid-15/updated-balanced-card'
import type { TransactionItem } from '@/components/shadcn-studio/blocks/bento-grid-15/updated-balanced-card'
import AccountingOfTransaction from '@/components/shadcn-studio/blocks/bento-grid-15/accounting-of-transaction'
import type { TransactionRow } from '@/components/shadcn-studio/blocks/bento-grid-15/accounting-of-transaction'
import ExchangeCurrencyCard from '@/components/shadcn-studio/blocks/bento-grid-15/exchange-currency-card'

const transactions: TransactionItem[] = [
  {
    id: '1',
    amount: 68,
    type: 'credit'
  },
  {
    id: '2',
    amount: 37,
    type: 'debit'
  },
  {
    id: '4',
    amount: 43,
    type: 'debit'
  },
  {
    id: '3',
    amount: 62,
    type: 'credit'
  },
  {
    id: '5',
    amount: 50,
    type: 'debit'
  }
]

const spendingCategories = ['Personal', 'Food', 'Entertainment', 'Traveling', 'Shopping', 'Rent']

const accountTransactions: TransactionRow[] = [
  {
    reverse: false,
    transactions: [
      {
        title: 'Shopping',
        amount: 30980,
        icon: <ShoppingCartIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Consulting',
        amount: 25000,
        icon: <CircleDollarSignIcon />,
        difference: 568,
        type: 'credit',
        isBordered: true
      },
      {
        title: 'Coffee',
        amount: 40780,
        icon: <CoffeeIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Stocks',
        amount: 12500,
        icon: <ChartSplineIcon />,
        difference: 568,
        type: 'credit',
        isBordered: true
      },
      {
        title: 'Ticket Booking',
        amount: 30980,
        icon: <BusIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Salary',
        amount: 12500,
        icon: <HandCoinsIcon />,
        difference: 568,
        type: 'credit',
        isBordered: true
      },
      {
        title: 'Rent',
        amount: 21432,
        icon: <HouseIcon />,
        difference: 568,
        type: 'debit',
        isBordered: true
      }
    ]
  },
  {
    reverse: true,
    transactions: [
      {
        title: 'Consulting',
        amount: 25000,
        icon: <CircleDollarSignIcon />,
        difference: 568,
        type: 'credit',
        isBordered: true
      },
      {
        title: 'Shopping',
        amount: 30980,
        icon: <ShoppingCartIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Traveling',
        amount: 32000,
        icon: <PlaneIcon />,
        difference: 1200,
        type: 'debit',
        isBordered: true
      },
      {
        title: 'Salary',
        amount: 18500,
        icon: <HandCoinsIcon />,
        difference: 568,
        type: 'credit'
      },
      {
        title: 'Subscriptions',
        amount: 12500,
        icon: <DollarSignIcon />,
        difference: 568,
        type: 'debit',
        isBordered: true
      },
      {
        title: 'Rent',
        amount: 21432,
        icon: <HouseIcon />,
        difference: 568,
        type: 'debit'
      },
      {
        title: 'Other',
        amount: 21432,
        icon: <DollarSignIcon />,
        difference: 568,
        type: 'debit',
        isBordered: true
      }
    ]
  },
  {
    reverse: false,
    transactions: [
      {
        title: 'Shopping',
        amount: 30980,
        icon: <ShoppingCartIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Other',
        amount: 21432,
        icon: <DollarSignIcon />,
        difference: 568,
        type: 'debit',
        isBordered: true
      },
      {
        title: 'Coffee',
        amount: 40780,
        icon: <CoffeeIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Payment',
        amount: 12500,
        icon: <CircleDollarSignIcon />,
        difference: 568,
        type: 'credit',
        isBordered: true
      },
      {
        title: 'Ticket Booking',
        amount: 30980,
        icon: <BusIcon />,
        difference: 1200,
        type: 'debit'
      },
      {
        title: 'Consulting',
        amount: 25000,
        icon: <CircleDollarSignIcon />,
        difference: 568,
        type: 'credit',
        isBordered: true
      },
      {
        title: 'Rent',
        amount: 21432,
        icon: <HouseIcon />,
        difference: 568,
        type: 'debit',
        isBordered: true
      }
    ]
  }
]

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Grid Section */}
        <div className='space-y-6'>
          {/* Grid Row 1 */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Card 1 */}
            <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} transition={{ duration: 0.5 }}>
              <UpdatedBalanceCard balance={21432} transactions={transactions} categories={spendingCategories} />
            </MotionPreset>

            {/* Card 2 */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              delay={0.6}
              transition={{ duration: 0.5 }}
            >
              <AccountingOfTransaction transactions={accountTransactions} />
            </MotionPreset>
          </div>

          {/* Grid Row 2 */}
          <div className='grid gap-6 xl:grid-cols-5'>
            {/* Card 3 */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              delay={1.2}
              transition={{ duration: 0.5 }}
              className='min-h-140 sm:min-h-130 md:min-h-97.5 xl:col-span-3'
            >
              <Card className='group bg-muted relative h-full overflow-hidden border-0 shadow-none'>
                <CardContent className='flex h-full items-center justify-between gap-6 max-md:flex-col'>
                  <div className='flex flex-col gap-4 md:max-w-70.25'>
                    <MotionPreset
                      component='h3'
                      fade
                      blur
                      slide={{ direction: 'down', offset: 15 }}
                      delay={1.35}
                      className='text-5xl font-medium max-md:text-2xl max-md:font-semibold md:leading-15'
                    >
                      Introducing FlowLedger
                    </MotionPreset>
                    <MotionPreset
                      component='p'
                      fade
                      blur
                      slide={{ direction: 'down', offset: 15 }}
                      delay={1.5}
                      className='text-muted-foreground text-lg'
                    >
                      Manage balances, expenses, and global payments in one secure app built to simplify your entire
                      financial life.
                    </MotionPreset>
                  </div>

                  <MotionPreset
                    fade
                    blur
                    slide={{ direction: 'down', offset: 15 }}
                    delay={1.65}
                    className='relative size-full'
                  >
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-64.png'
                      alt='Mobile image'
                      className='absolute -bottom-6 h-86.25 transition-transform duration-300 group-hover:scale-105 max-md:left-1/2 max-md:-translate-x-1/2 md:right-10 dark:hidden'
                    />
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-64-dark.png'
                      alt='Mobile image dark'
                      className='absolute -bottom-6 hidden h-86.25 transition-transform duration-300 group-hover:scale-105 max-md:left-1/2 max-md:-translate-x-1/2 md:right-10 dark:block'
                    />
                  </MotionPreset>
                </CardContent>
              </Card>
            </MotionPreset>

            {/* Card 4 */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              delay={1.8}
              transition={{ duration: 0.5 }}
              className='xl:col-span-2'
            >
              <ExchangeCurrencyCard />
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
