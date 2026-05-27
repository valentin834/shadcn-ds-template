import ProductQuickView from '@/components/shadcn-studio/blocks/product-quick-view-02/product-quick-view-02'
import { Button } from '@/components/ui/button'

const productImages = [
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-7.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-13.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-quick-view/image-14.png'
]

const ProductQuickViewPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <ProductQuickView
        productImages={productImages}
        defaultOpen
        trigger={<Button variant='outline'>Quick View</Button>}
      />
    </div>
  )
}

export default ProductQuickViewPage
