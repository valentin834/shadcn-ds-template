// @ts-nocheck
import * as motion from 'motion/react-client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonGroupScaleDemo = () => {
  return (
    <div className='divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs'>
      <Button className='rounded-none rounded-l-md transition-none focus-visible:z-10' render={<motion.button whileTap={{ scale: 0.9 }} />}><ChevronLeftIcon />Previous
                  </Button>
      <Button className='rounded-none rounded-r-md transition-none focus-visible:z-10' render={<motion.button whileTap={{ scale: 0.9 }} />}>Next
                    <ChevronRightIcon /></Button>
    </div>
  )
}

export default ButtonGroupScaleDemo
