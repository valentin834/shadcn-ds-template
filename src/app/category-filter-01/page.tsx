import CategoryFilter from '@/components/shadcn-studio/blocks/category-filter-01/category-filter-01'

const brandItems = ['Apple', 'Samsung', 'Xiaomi', 'Blackberry', 'Realme', 'Poco', 'Huawei']

const CategoryFilterPage = () => {
  return <CategoryFilter brandItems={brandItems} />
}

export default CategoryFilterPage
