// @ts-nocheck
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TooltipErrorDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant='outline' size='sm' />}>Error
                  </TooltipTrigger>
      <TooltipContent className='bg-destructive [&_svg]:bg-destructive [&_svg]:fill-destructive text-white'>
        <p>This is an error tooltip</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipErrorDemo
