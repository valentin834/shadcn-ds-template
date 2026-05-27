import ProductOverview from '@/components/shadcn-studio/blocks/product-overview-02/product-overview-02'

const overviewData = [
  {
    name: 'Cricket Power Shoes for Men',
    breadcrumbData: [
      {
        label: 'Home',
        href: '#'
      },
      {
        label: 'Mens Footwear',
        href: '#'
      },
      {
        label: 'Adidas Cricket Shoes',
        href: '#'
      }
    ],
    brand: 'ADIDAS',
    itemSold: 1_475,
    description:
      'Designed for optimal performance on the field, these lightweight and comfortable shoes offer excellent support.',
    totalReview: 698,
    storeLink: '#',
    rating: 4.5,
    hasDiscount: true,
    address: 'New York, USA',
    shippingCharges: 4.99,
    price: 60,
    discountPercentage: 52,
    images: [
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-10.png',
        alt: 'image-10'
      },
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-9.png',
        alt: 'image-9'
      },
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-8.png',
        alt: 'image-8'
      },
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-6.png',
        alt: 'image-6'
      }
    ],
    defaultSize: '10',
    defaultColorOption: 'blue'
  }
]

const sizes = [
  {
    value: '6',
    label: '6'
  },
  {
    value: '7',
    label: '7'
  },
  {
    value: '8',
    label: '8'
  },
  {
    value: '9',
    label: '9'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '11',
    label: '11'
  }
]

const colors = [
  {
    value: 'blue',
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-10.png'
  },
  {
    value: 'white',
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-31.png'
  }
]

const ProductOverviewPage = () => {
  return <ProductOverview productItems={overviewData} sizesChart={sizes} colorsChart={colors} />
}

export default ProductOverviewPage
