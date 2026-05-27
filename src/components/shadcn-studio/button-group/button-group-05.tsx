// @ts-nocheck
import { Gamepad2, Globe, Camera, Tv2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonGroupSocialDemo = () => {
  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Button variant='outline' className='rounded-none rounded-l-md shadow-none hover:!bg-[#9146ff]/10 focus-visible:z-10' render={<a href='#' target='_blank' rel='noopener noreferrer' />} nativeButton={false}><Tv2 className='stroke-[#9146ff]' /><span className='sr-only'>Twitch</span></Button>
      <Button variant='outline' className='rounded-none shadow-none hover:!bg-[#EA4C89]/10 focus-visible:z-10' render={<a href='#' target='_blank' rel='noopener noreferrer' />} nativeButton={false}><Gamepad2 className='stroke-[#EA4C89]' /><span className='sr-only'>Dribbble</span></Button>
      <Button variant='outline' className='rounded-none shadow-none hover:!bg-[#fb169a]/10 focus-visible:z-10' render={<a href='#' target='_blank' rel='noopener noreferrer' />} nativeButton={false}><Camera className='stroke-[#fb169a]' /><span className='sr-only'>Instagram</span></Button>
      <Button variant='outline' className='rounded-none rounded-r-md shadow-none hover:!bg-[#0866ff]/10 focus-visible:z-10' render={<a href='#' target='_blank' rel='noopener noreferrer' />} nativeButton={false}><Globe className='stroke-[#0866ff]' /><span className='sr-only'>Facebook</span></Button>
    </div>
  )
}

export default ButtonGroupSocialDemo
