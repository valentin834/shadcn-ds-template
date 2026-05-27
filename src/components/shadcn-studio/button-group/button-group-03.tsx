// @ts-nocheck
import { CopyIcon, CropIcon, EllipsisVerticalIcon, MousePointerIcon, SquareIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const ButtonGroupTooltipDemo = () => {
  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Tooltip>
        <TooltipTrigger render={<Button className='rounded-none rounded-l-md shadow-none focus-visible:z-10' variant='outline' />}><MousePointerIcon /><span className='sr-only'>Select</span></TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>Select</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button className='rounded-none shadow-none focus-visible:z-10' variant='outline' />}><SquareIcon /><span className='sr-only'>Shapes</span></TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>Shapes</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button className='rounded-none shadow-none focus-visible:z-10' variant='outline' />}><CropIcon /><span className='sr-only'>Crop</span></TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>Crop</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button className='rounded-none shadow-none focus-visible:z-10' variant='outline' />}><CopyIcon /><span className='sr-only'>Duplicate</span></TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>Duplicate</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button className='rounded-none rounded-r-md shadow-none focus-visible:z-10' variant='outline' />}><EllipsisVerticalIcon /><span className='sr-only'>More</span></TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>More</TooltipContent>
      </Tooltip>
    </div>
  )
}

export default ButtonGroupTooltipDemo
