// @ts-nocheck
import { ExternalLinkIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonGroupPreviewDemo = () => {
  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Button variant='outline' className='rounded-none rounded-l-md shadow-none focus-visible:z-10' render={<a href='#' />} nativeButton={false}>Live preview</Button>
      <Button variant='outline' size='icon' className='rounded-none rounded-r-md shadow-none focus-visible:z-10' render={<a href='#' target='_blank' rel='noopener noreferrer' />} nativeButton={false}><ExternalLinkIcon /><span className='sr-only'>External link</span></Button>
    </div>
  )
}

export default ButtonGroupPreviewDemo
