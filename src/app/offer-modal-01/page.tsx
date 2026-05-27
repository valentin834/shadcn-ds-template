import OfferModal from '@/components/shadcn-studio/blocks/offer-modal-01/offer-modal-01'
import { Button } from '@/components/ui/button'

const OfferModalPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <OfferModal defaultOpen trigger={<Button variant='outline'>Offer Modal</Button>} />
    </div>
  )
}

export default OfferModalPage
