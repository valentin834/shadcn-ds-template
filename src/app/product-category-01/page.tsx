import ProductCategory from '@/components/shadcn-studio/blocks/product-category-01/product-category-01'

const productCards = [
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-2.png',
    badge: 'Enjoy',
    misc: 'With',
    title: 'HEADPHONE',
    mainClass: 'bg-purple-400 h-84 overflow-hidden flex items-end',
    imgClass: 'absolute size-63 -top-15 -right-10',
    productLink: '#'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-1.png',
    badge: 'New',
    misc: 'Smart',
    title: 'WATCH',
    mainClass: 'bg-amber-400 h-84 overflow-hidden flex items-end',
    imgClass: 'absolute size-64 -top-14 -right-20',
    productLink: '#'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-3.png',
    badge: 'Productivity',
    misc: 'Smart',
    title: 'LAPTOP',
    mainClass: 'bg-sky-400 sm:h-84 overflow-hidden max-sm:flex-col flex sm:items-end xl:col-span-2 gap-2',
    imgClass: 'sm:absolute sm:w-82 sm:h-60 sm:top-13 sm:right-13',
    productLink: '#'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-4.png',
    badge: 'Play',
    misc: 'Gaming',
    title: 'CONSOLE',
    mainClass: 'bg-primary sm:h-84 overflow-hidden max-sm:flex-col flex xl:col-span-2 gap-2',
    imgClass: 'sm:absolute sm:w-78 sm:h-70 sm:top-10 sm:right-8',
    productLink: '#'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-5.png',
    badge: 'Play',
    misc: 'Game',
    title: 'OCULUS',
    mainClass: 'bg-green-600 h-84 overflow-hidden ',
    imgClass: 'absolute w-63 h-43 bottom-0 right-0',
    productLink: '#'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-6.png',
    badge: 'New',
    misc: 'Amazon',
    title: 'SPEAKER',
    mainClass: 'bg-blue-500 h-84 overflow-hidden ',
    imgClass: 'absolute size-50 -bottom-5 -right-2',
    productLink: '#'
  }
]

const ProductCategoryPage = () => {
  return <ProductCategory productCards={productCards} />
}

export default ProductCategoryPage
