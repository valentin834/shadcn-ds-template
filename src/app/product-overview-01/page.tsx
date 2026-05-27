import ProductOverview from '@/components/shadcn-studio/blocks/product-overview-01/product-overview-01'

const overviewData = [
  {
    name: 'Classic Leather Jacket',
    breadcrumbData: [
      {
        label: 'Fashion',
        href: '#'
      },
      {
        label: 'Menswear',
        href: '#'
      },
      {
        label: 'Classic leather jacket',
        href: '#'
      }
    ],
    description:
      'Elevate your style with our Classic Leather Jacket! Crafted from premium leather, this timeless piece combines durability with a sleek design, perfect for any occasion.',
    totalReview: 210,
    rating: 4.3,
    hasDiscount: true,
    price: 599,
    discountPercentage: 20,
    images: [
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-5.png',
        alt: 'image-5'
      },
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-2.png',
        alt: 'image-2'
      },
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-3.png',
        alt: 'image-3'
      },
      {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-overview/image-1.png',
        alt: 'image-1'
      }
    ],
    defaultSize: 'L',
    defaultColorOption: 'black'
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
  }
]

const colors = [
  {
    value: 'black',
    colorOption:
      'has-data-[state=checked]:outline-solid has-data-[state=checked]:outline has-data-[state=checked]:outline-offset-2 has-data-[state=checked]:outline-black bg-black'
  },
  {
    value: 'green',
    colorOption:
      'has-data-[state=checked]:outline-solid has-data-[state=checked]:outline has-data-[state=checked]:outline-offset-2 has-data-[state=checked]:outline-green-600 bg-green-600'
  },
  {
    value: 'orange',
    colorOption:
      'has-data-[state=checked]:outline-solid has-data-[state=checked]:outline has-data-[state=checked]:outline-offset-2 has-data-[state=checked]:outline-amber-600 bg-amber-600'
  },
  {
    value: 'gray',
    colorOption:
      'has-data-[state=checked]:outline-solid has-data-[state=checked]:outline has-data-[state=checked]:outline-offset-2 has-data-[state=checked]:outline-gray-200 bg-gray-200 '
  },
  {
    value: 'blue',
    colorOption:
      'has-data-[state=checked]:outline-solid has-data-[state=checked]:outline has-data-[state=checked]:outline-offset-2 has-data-[state=checked]:outline-blue-500 bg-blue-500 '
  }
]

const ProductOverviewPage = () => {
  return <ProductOverview productItems={overviewData} sizesChart={sizes} colorsChart={colors} />
}

export default ProductOverviewPage
