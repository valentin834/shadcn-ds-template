import Blog from '@/components/shadcn-studio/blocks/blog-component-17/blog-component-17'

const blogPosts = [
  {
    title: 'Ship Faster with a Scalable UI Architecture',
    description: 'Reduce tech debt, accelerate release cycles,  keep your product consistent you grow.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-04.png',
    imageAlt: 'ship',
    date: 'May 23, 2025',
    category: 'Dev Productivity',
    author: 'Lea Potts',
    authorLink: '#',
    blogLink: '#',
    categoryLink: '#'
  },
  {
    title: 'SEO Playbook for SaaS Products That Scale',
    description: 'Turn search into compounding sign-ups with a strategy tailored for SaaS funnels.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-10.png',
    imageAlt: 'Seo',
    date: 'May 15, 2025',
    category: 'SEO',
    author: 'Bella Craig',
    authorLink: '#',
    blogLink: '#',
    categoryLink: '#'
  },
  {
    title: 'Automating Product Delivery with AI Workflows',
    description: 'Replace repetitive tasks with AI-powered and give teams more time to innovate.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-09.png',
    imageAlt: 'AI',
    date: 'February 28, 2025',
    category: 'AI Automation',
    author: 'Noah Ortega',
    authorLink: '#',
    blogLink: '#',
    categoryLink: '#'
  }
]

const BlogPage = () => {
  return <Blog blogPosts={blogPosts} />
}

export default BlogPage
