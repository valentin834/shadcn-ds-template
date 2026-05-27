import ProductList from '@/components/shadcn-studio/blocks/product-list-03/product-list-03'

const productList = [
  {
    productSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-13.png',
    productAlt: 'Bento Component',
    name: 'Bento Component',
    price: 29,
    avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    avatarAlt: 'UI 8',
    avatarFallback: 'U8',
    sellerName: 'UI 8',
    category: 'Illustration'
  },
  {
    productSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-14.png',
    productAlt: 'Health App',
    name: 'CarelQ: Health App UI Kit',
    price: 12,
    avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    avatarAlt: 'PixelCove',
    avatarFallback: 'PA',
    sellerName: 'PixelCove Agency',
    category: 'Figma'
  },
  {
    productSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-15.png',
    productAlt: 'Compass',
    name: 'Compass -  CRM Design Kit',
    price: 48,
    avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    avatarAlt: 'Fedir',
    avatarFallback: 'FL',
    sellerName: 'Fedir.live',
    category: 'Figma'
  },
  {
    productSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-16.png',
    productAlt: 'Flowin',
    name: 'Flowin',
    price: 72,
    avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    avatarAlt: 'Gravigo',
    avatarFallback: 'G',
    sellerName: 'Gravigo',
    category: 'Figma'
  }
]

const ProductListPage = () => {
  return <ProductList products={productList} />
}

export default ProductListPage
