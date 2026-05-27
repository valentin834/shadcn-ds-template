import Checkout from '@/components/shadcn-studio/blocks/checkout-page-01/checkout-page-01'

const cartItemsData = [
  {
    id: 1,
    name: 'MacBook Pro 14" M2 Pro',
    variant: 'Green : M',
    price: 105,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/checkout/image-1.png'
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max 256GB',
    variant: 'Green : M',
    price: 120,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/checkout/image-2.png'
  },
  {
    id: 3,
    name: 'Magic Keyboard for iPad Pro 11"',
    variant: 'Green : M',
    price: 99,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/checkout/image-3.png'
  }
]

const CheckoutPage = () => {
  return <Checkout checkoutItems={cartItemsData} />
}

export default CheckoutPage
