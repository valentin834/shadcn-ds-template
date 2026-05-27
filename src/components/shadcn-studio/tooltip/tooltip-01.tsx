// @ts-nocheck
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TooltipDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant='outline' size='sm' />}>Default
                  </TooltipTrigger>
      <TooltipContent>
        <p>This is a simple tooltip</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipDemo
