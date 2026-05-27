import ProductReviews from '@/components/shadcn-studio/blocks/product-reviews-02/product-reviews-02'

const reviewsData = [
  {
    id: 1,
    image: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
    name: 'Zain Saris',
    rating: 4.5,
    date: '11-11-2023',
    description:
      'I absolutely love this smartwatch! It tracks my steps, heart rate, and even sleep patterns with great accuracy. The design is sleek and lightweight, making it comfortable to wear all day. The battery lasts several days, and the notifications from my phone come through perfectly.'
  },
  {
    id: 2,
    image: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
    name: 'Erin Torff',
    rating: 4.5,
    date: '11-11-2023',
    description:
      "This portable blender is a game changer! It's compact, easy to use, and powerful enough to blend smoothies, protein shakes, and even ice. The rechargeable battery lasts a long time, making it perfect for on-the-go use."
  },
  {
    id: 3,
    image: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    name: 'Wilson Workman',
    rating: 4.5,
    date: '11-11-2023',
    description:
      "I'm so impressed with this LED desk lamp! It has multiple brightness settings and an adjustable arm, making it perfect for reading, studying, or working late at night. The touch controls are super convenient, and the light is easy on the eyes."
  }
]

const ProductReviewPage = () => {
  return <ProductReviews reviewItems={reviewsData} />
}

export default ProductReviewPage
