import ShoppingCart from '@/components/shadcn-studio/blocks/shopping-cart-02/shopping-cart-02'
import { Button } from '@/components/ui/button'

const products = [
  {
    id: 1,
    name: 'Polarised sunglasses',
    size: 'Free Style',
    price: 15,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-7.png'
  },
  {
    id: 2,
    name: 'Lyocell-blend bucket hat',
    size: 'M',
    price: 10,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-6.png'
  },
  {
    id: 3,
    name: 'Regular Fit Polo shirt',
    size: 'XL',
    price: 32,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-5.png'
  },
  {
    id: 4,
    name: 'Regular Fit Velvet overshirt',
    size: 'XL',
    price: 50,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-4.png'
  }
]

const sizes = [
  {
    value: 'XS',
    label: 'XS'
  },
  {
    value: 'S',
    label: 'S'
  },
  {
    value: 'M',
    label: 'M'
  },
  {
    value: 'L',
    label: 'L'
  },
  {
    value: 'XL',
    label: 'XL'
  },
  {
    value: '2XL',
    label: '2XL'
  }
]

const ShoppingCartPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <ShoppingCart
        defaultOpen
        trigger={
          <Button variant='outline'>
            <span>Select Plan</span>
          </Button>
        }
        cartItems={products}
        availableSizes={sizes}
      />
    </div>
  )
}

export default ShoppingCartPage
