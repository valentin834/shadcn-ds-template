'use client'

import { Area, AreaChart, Bar, BarChart, XAxis } from 'recharts'
import { Separator } from '@/components/ui/separator'

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowUpIcon, ArrowRightIcon, ArrowDownIcon } from 'lucide-react'

const avatars: AvatarItem[] = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  }
]

const physicalProductsChartData: physicalProductsChartItem[] = [
  { month: 'Jan', sales: 280 },
  { month: 'Feb', sales: 400 },
  { month: 'Mar', sales: 280 },
  { month: 'Apr', sales: 590 },
  { month: 'May', sales: 360 },
  { month: 'Jun', sales: 460 },
  { month: 'Jul', sales: 400 }
]

const dailySalesChartData: dailySalesChartItem[] = [
  { month: 'Jan', sales: 120 },
  { month: 'Feb', sales: 240 },
  { month: 'Mar', sales: 190 },
  { month: 'Apr', sales: 270 },
  { month: 'May', sales: 210 },
  { month: 'Jun', sales: 320 },
  { month: 'Jul', sales: 270 }
]

const physicalProductsChartConfig = {
  sales: {
    label: 'Sales'
  }
} satisfies ChartConfig

// Custom dot for chart
// @ts-expect-error -- May throw an error
const CustomDot = props => {
  const { cx, cy, index } = props

  if (index !== physicalProductsChartData.length - 1) {
    return null
  }

  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <circle cx='10' cy='10' r='7.5' fill='var(--card)' stroke='var(--primary)' strokeWidth='5' />
    </svg>
  )
}

// Custom active dot for chart
// @ts-expect-error -- May throw an error
const CustomActiveDot = props => {
  const { cx, cy, index } = props

  if (index !== physicalProductsChartData.length - 1) {
    return (
      <svg
        x={cx - 6}
        y={cy - 5}
        width='11'
        height='10'
        viewBox='0 0 11 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='5.84033' cy='5' r='4' fill='var(--primary)' />
      </svg>
    )
  }

  return (
    <svg
      x={cx - 6}
      y={cy - 6}
      width='11'
      height='10'
      viewBox='0 0 11 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='5.84033' cy='5' r='2' fill='var(--primary)' />
    </svg>
  )
}

const dailySalesChartConfig = {
  sales: {
    label: 'Sales'
  }
} satisfies ChartConfig

export type AvatarItem = {
  src: string
  fallback: string
  name: string
}

export type physicalProductsChartItem = {
  month: string
  sales: number
}

export type dailySalesChartItem = {
  month: string
  sales: number
}

export type ChartCardProps = {
  className?: string
  avatars: AvatarItem[]
  productsChart: physicalProductsChartItem[]
  dailyChart: dailySalesChartItem[]
}

const PerformanceCard = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardContent>
        <Tabs defaultValue='new-users' className='flex-1 gap-3'>
          <TabsList className='w-full group-data-horizontal/tabs:h-8.5'>
            <TabsTrigger value='new-users' className='rounded-lg'>
              New Users
            </TabsTrigger>
            <TabsTrigger value='online-sales' className='rounded-lg'>
              Online Sales
            </TabsTrigger>
            <TabsTrigger value='daily-sales' className='rounded-lg'>
              Daily Sales
            </TabsTrigger>
          </TabsList>

          <TabsContent value='new-users' className='flex flex-col justify-between gap-3'>
            <div className='space-y-4 rounded-md border p-4'>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Avatar className='size-15'>
                    <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png' alt='Angel George' />
                    <AvatarFallback className='text-xs'>AG</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-lg font-medium'>Angel George</span>
                    <span className='text-muted-foreground text-sm'>Product Manager</span>
                  </div>
                </div>
                <Separator className='bg-border' />
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-start justify-between gap-2'>
                    <span className='text-muted-foreground text-sm font-medium'>Physical product</span>
                    <div className='flex items-center gap-1.5'>
                      <Avatar className='size-6 rounded-md after:border-none'>
                        <AvatarFallback className='shrink-0 rounded-md bg-green-600/10 text-green-600'>
                          <ArrowUpIcon className='size-3' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-base font-medium text-green-600'>14.78%</span>
                    </div>
                  </div>
                  <span className='text-2xl font-semibold'>$78,263</span>
                </div>
                <div className='flex items-center justify-between'>
                  <AvatarGroup className='flex-none'>
                    {avatars.map((avatar, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger
                          render={
                            <Avatar className='ring-background ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md' />
                          }
                        >
                          <AvatarImage src={avatar.src} alt={avatar.name} />
                          <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                        </TooltipTrigger>
                        <TooltipContent>{avatar.name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                  <Button
                    variant='secondary'
                    className='text-sm'
                    render={<a href='#' />}
                    size='sm'
                    nativeButton={false}
                  >
                    View all
                    <ArrowRightIcon className='size-3.5' />
                  </Button>
                </div>
              </div>
            </div>
            <p className='text-muted-foreground text-center'>
              <span className='text-foreground text-sm font-semibold'>Increase 24%</span>{' '}
              <span className='text-sm'>more email marketing to reach your user acquisition target.</span>
            </p>
          </TabsContent>

          <TabsContent value='online-sales' className='flex flex-col justify-between gap-3'>
            <div className='space-y-4 rounded-md border p-4'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-muted-foreground text-sm font-medium'>Digital product</span>
                    <div className='flex items-center gap-2'>
                      <Avatar className='size-6 rounded-md after:border-none'>
                        <AvatarFallback className='bg-destructive/10 text-destructive shrink-0 rounded-md'>
                          <ArrowDownIcon className='size-3' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-xl font-semibold'>7,589</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span className='text-muted-foreground text-sm font-medium'>Physical product</span>
                    <div className='flex items-center gap-2'>
                      <Avatar className='size-6 rounded-md after:border-none'>
                        <AvatarFallback className='shrink-0 rounded-md bg-green-600/10 text-green-600'>
                          <ArrowUpIcon className='size-3' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-xl font-semibold'>8,365</span>
                    </div>
                  </div>
                </div>
                <Separator className='bg-border' />
              </div>
              <div className='space-y-5'>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center justify-between gap-1.5'>
                    <span className='text-muted-foreground text-sm font-medium'>Physical product</span>
                    <Badge className='gap-0.5 rounded-md border-none bg-green-600/10 px-1.5 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:focus-visible:ring-green-600/40 [a&]:hover:bg-green-600/5'>
                      <ArrowUpIcon className='size-3' />
                      5.6%
                    </Badge>
                  </div>
                  <span className='text-2xl font-semibold'>$78,263</span>
                </div>

                <ChartContainer config={physicalProductsChartConfig} className='h-30 w-full'>
                  <AreaChart
                    data={physicalProductsChartData}
                    margin={{
                      top: 3,
                      bottom: 0,
                      left: 14,
                      right: 14
                    }}
                    className='stroke-3'
                  >
                    <defs>
                      <linearGradient id='fillSales' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='var(--primary)' stopOpacity={0.4} />
                        <stop offset='90%' stopColor='var(--primary)' stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey='month'
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={value => value.slice(0, 3)}
                      tick={{ fontSize: 14, fontWeight: '300' }}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Area
                      dataKey='sales'
                      type='monotone'
                      fill='url(#fillSales)'
                      stroke='var(--primary)'
                      strokeWidth={3}
                      dot={<CustomDot />}
                      activeDot={<CustomActiveDot />}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </div>

            <p className='text-muted-foreground text-center'>
              <span className='text-foreground text-sm font-semibold'>Increase 18%</span>{' '}
              <span className='text-sm'>until your target this months.</span>
            </p>
          </TabsContent>

          <TabsContent value='daily-sales' className='flex flex-col justify-between gap-3'>
            <div className='space-y-4 rounded-md border p-4'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-muted-foreground text-sm font-medium'>Digital product</span>
                    <div className='flex items-center gap-2'>
                      <Avatar className='size-6 rounded-md after:border-none'>
                        <AvatarFallback className='shrink-0 rounded-md bg-green-600/10 text-green-600'>
                          <ArrowUpIcon className='size-3' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-xl font-semibold'>8,365</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span className='text-muted-foreground text-sm font-medium'>Physical product</span>
                    <div className='flex items-center gap-2'>
                      <Avatar className='size-6 rounded-md after:border-none'>
                        <AvatarFallback className='bg-destructive/10 text-destructive shrink-0 rounded-md'>
                          <ArrowDownIcon className='size-3' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-xl font-semibold'>7,589</span>
                    </div>
                  </div>
                </div>
                <Separator className='bg-border' />
              </div>
              <div className='space-y-4'>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center justify-between gap-1.5'>
                    <span className='text-muted-foreground text-sm font-medium'>Average Daily Sales</span>
                    <Badge className='bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/5 gap-0.5 rounded-sm border-none px-1.5 focus-visible:outline-none'>
                      <ArrowUpIcon className='size-3' />
                      3.4%
                    </Badge>
                  </div>
                  <span className='text-2xl font-semibold'>$12,433</span>
                </div>

                <ChartContainer config={dailySalesChartConfig} className='h-32.5 w-full'>
                  <BarChart
                    accessibilityLayer
                    data={dailySalesChartData}
                    barSize={12}
                    margin={{
                      left: 0,
                      right: 0
                    }}
                  >
                    <Bar
                      dataKey='sales'
                      fill='var(--primary)'
                      background={{ fill: 'color-mix(in oklab, var(--primary) 10%, transparent)', radius: 12 }}
                      radius={12}
                    />
                    <XAxis
                      dataKey='month'
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={value => value.slice(0, 3)}
                      tick={{ fontSize: 14, fontWeight: '300' }}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            <p className='text-muted-foreground text-center'>
              <span className='text-foreground text-sm font-semibold'>Increase 12%</span>{' '}
              <span className='text-sm'>until your daily purchase target.</span>
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default PerformanceCard
