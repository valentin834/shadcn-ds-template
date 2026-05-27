// @ts-nocheck
import * as motion from 'motion/react-client'

import { Button } from '@/components/ui/button'

const ButtonTapAnimationDemo = () => {
  return (
    <Button className='transition-none' render={<motion.button whileTap={{ scale: 0.85 }} />}>Tap Animation</Button>
  )
}

export default ButtonTapAnimationDemo
