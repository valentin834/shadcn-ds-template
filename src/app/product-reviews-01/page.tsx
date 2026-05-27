import ProductReviews from '@/components/shadcn-studio/blocks/product-reviews-01/product-reviews-01'

const reviewsData = [
  {
    id: 1,
    image: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
    name: 'Kierra Bergson',
    totalSpent: 53,
    totalReview: 4,
    rating: 4.5,
    date: '11-03-2024',
    description:
      "I just received my first mala from Etsy, and I couldn't be happier! I customized it with two specific stones, and the final piece is absolutely stunning. The entire process of bringing it to life was such a joy!",
    allReviewLink: '#'
  },
  {
    id: 2,
    image: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
    name: 'Kierra Bergson',
    totalSpent: 32,
    totalReview: 2,
    rating: 4.5,
    date: '11-03-2024',
    description:
      "I recently ordered my very first mala from Esty, and I couldn't be happier! I requested a custom design featuring two specific stones. It felt like a calling to bring this unique creation to life. The joy and excitement I experienced throughout the process were truly genuine!",
    allReviewLink: '#'
  },
  {
    id: 3,
    image: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
    name: 'Kierra Bergson',
    totalSpent: 165,
    totalReview: 10,
    rating: 4.5,
    date: '11-03-2024',
    description:
      "I just received my first mala from Etsy, and I couldn't be more thrilled! I requested a custom design with two specific stones, and the result exceeded my expectations. The entire process of creating it was such an enjoyable experience!",
    allReviewLink: '#'
  }
]

const ProductReviewPage = () => {
  return <ProductReviews reviewItems={reviewsData} />
}

export default ProductReviewPage
