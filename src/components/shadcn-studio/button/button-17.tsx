import { Button } from '@/components/ui/button'
import { LoaderCircleIcon } from 'lucide-react'

const ButtonLoadingDemo = () => {
  return (
    <Button disabled>
      <LoaderCircleIcon className='animate-spin' />
      Loading
    </Button>
  )
}

export default ButtonLoadingDemo
