'use client'

import type { ReactElement, ReactNode } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronRightIcon, CircleSmallIcon } from 'lucide-react'

export type NavigationItem = {
  title: string
  href: string
}

export type NavigationSection = {
  title: string
  icon?: ReactNode
} & (
  | {
      items: NavigationItem[]
      href?: never
    }
  | {
      items?: never
      href: string
    }
)

type Props = {
  trigger: ReactElement
  navigationData: NavigationSection[]
  align?: 'center' | 'end' | 'start'
}

const MenuDropdown = ({ trigger, navigationData, align = 'start' }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger}></DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align={align}>
        {navigationData.map(navItem => {
          if (navItem.href) {
            return (
              <DropdownMenuItem key={navItem.title} render={<a href={navItem.href} />}>
                {navItem.icon}
                {navItem.title}
              </DropdownMenuItem>
            )
          }

          return (
            <Collapsible key={navItem.title} render={<DropdownMenuGroup />}>
              <CollapsibleTrigger
                nativeButton={false}
                render={<DropdownMenuItem closeOnClick={false} className='group justify-between' />}
              >
                {navItem.icon}
                <span className='flex-1'>{navItem.title}</span>
                <ChevronRightIcon className='shrink-0 transition-transform group-data-panel-open:rotate-90' />
              </CollapsibleTrigger>
              <CollapsibleContent className='pl-2'>
                {navItem.items?.map(item => (
                  <DropdownMenuItem key={item.title} render={<a href={item.href} />}>
                    <CircleSmallIcon />
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuDropdown
