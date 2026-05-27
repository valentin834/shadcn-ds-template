import Checkout from '@/components/shadcn-studio/blocks/checkout-page-02/checkout-page-02'

const paymentMethods = [
  {
    id: 'visa',
    name: 'Visa ending in 7658',
    expiry: '10/2024',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/visa.png',
    alt: 'Visa'
  },
  {
    id: 'mastercard',
    name: 'Mastercard ending in 8489',
    expiry: '10/2024',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/master.png',
    alt: 'Mastercard'
  },
  {
    id: 'paypal',
    name: 'Paypal ending in 8489',
    expiry: '10/2024',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/paypal-icon.png',
    alt: 'PayPal'
  },
  {
    id: 'amazon',
    name: 'Amazon Pay',
    expiry: '10/2024',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/amazon-pay.png',
    alt: 'Amazon Pay'
  }
]

const CheckoutPage = () => {
  return <Checkout paymentMethods={paymentMethods} />
}

export default CheckoutPage
