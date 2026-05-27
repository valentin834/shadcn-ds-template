import ProductQuickView from '@/components/shadcn-studio/blocks/product-quick-view-01/product-quick-view-01'
import { Button } from '@/components/ui/button'

const productImages = [
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-6.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-10.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-11.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-12.png'
]

const paymentMethods = [
  { name: 'PayPal', imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/american-express.png' },
  { name: 'Visa', imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/visa.png' },
  { name: 'Mastercard', imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/master.png' },
  { name: 'Bank Of america', imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/boa.png' }
]

const sizes = [
  {
    value: 's',
    label: 's'
  },
  {
    value: 'm',
    label: 'm'
  },
  {
    value: 'l',
    label: 'l'
  }
]

const ProductQuickViewPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <ProductQuickView
        productImages={productImages}
        paymentMethods={paymentMethods}
        sizes={sizes}
        defaultOpen
        trigger={<Button variant='outline'>Quick View</Button>}
      />
    </div>
  )
}

export default ProductQuickViewPage
