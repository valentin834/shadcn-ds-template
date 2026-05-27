// @ts-nocheck
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TooltipRoundedDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant='outline' size='sm' />}>Rounded
                  </TooltipTrigger>
      <TooltipContent className='rounded-full'>
        <p>This tooltip is rounded</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipRoundedDemo
