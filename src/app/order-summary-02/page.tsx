import OrderSummary from '@/components/shadcn-studio/blocks/order-summary-02/order-summary-02'
import { Button } from '@/components/ui/button'

const products = [
  {
    id: 'runningShoes',
    name: 'Vokline Women sports shoes,Running shoes',
    size: '6',
    price: 100,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-5.png'
  },
  {
    id: 'purpleTShirt',
    name: 'Men Printed Round Neck Cotton Purple T-Shirt',
    size: 'M',
    price: 79,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-6.png'
  },
  {
    id: 'purpleSweater',
    name: 'Men Solid Hooded Neck Purple Sweater',
    size: 'M',
    price: 89,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-7.png'
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
        orderID={56489454284}
        customerName='Cristofer Schleifer'
        customerMail='cristofers@example.com'
        customerPhone='+1 (212)4 178 368'
        customerAddress='Street 91, Empire State, 350 Fifth Avenue, New York'
      />
    </div>
  )
}

export default OrderSummaryPage
