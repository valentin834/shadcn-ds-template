import OrderSummary from '@/components/shadcn-studio/blocks/order-summary-01/order-summary-01'
import { Button } from '@/components/ui/button'

const products = [
  {
    id: 'fitJacket',
    name: 'Regular Fit Jacket',
    color: 'Black',
    size: 'M',
    price: 99,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-1.png'
  },
  {
    id: 'printedTshirt',
    name: 'Printed T-shirt',
    color: 'White',
    size: 'M',
    price: 30,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-2.png'
  },
  {
    id: 'shoulderBag',
    name: 'Fringed shoulder bag',
    color: 'Black',
    size: 'M',
    price: 120,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-3.png'
  }
]

const OrderSummaryPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <OrderSummary
        defaultOpen
        trigger={
          <Button variant='outline'>
            <span>Order Now</span>
          </Button>
        }
        data={products}
        orderID={5648945}
      />
    </div>
  )
}

export default OrderSummaryPage
