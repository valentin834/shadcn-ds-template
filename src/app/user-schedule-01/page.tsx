import InternationalEvents, { type Event } from '@/components/shadcn-studio/blocks/user-schedule-01/user-schedule-01'

const eventsData: Event[] = [
  {
    id: '1',
    title: 'Forbes CEO Summit',
    description: 'Top executives and entrepreneurs share insights on leadership...',
    location: 'Singapore',
    price: 2500,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-01.png',
    category: ['Business', 'Technology'],
    language: 'English',
    date: new Date(2025, 5, 15)
  },
  {
    id: '2',
    title: 'AI Summit 2025',
    description: 'International Conference on Artificial Intelligence and Emerging...',
    location: 'London, United Kingdom',
    price: 289,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-02.png',
    category: ['Technology', 'AI related'],
    language: 'Spanish',
    date: new Date(2025, 5, 20)
  },
  {
    id: '3',
    title: 'World Economic Forum',
    description: 'Global leaders meet to discuss economic growth, sustainability...',
    location: 'Davos, Switzerland',
    price: 1850,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-03.png',
    category: ['Business', 'Finance'],
    language: 'French',
    date: new Date(2025, 5, 25)
  },
  {
    id: '4',
    title: 'CES Tech Expo',
    description: "The world's largest tech show featuring innovations in consumer...",
    location: 'Online',
    price: 0,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-04.png',
    category: ['Technology'],
    language: 'English',
    date: new Date(2025, 5, 10)
  },
  {
    id: '5',
    title: 'World Travel Market 2025',
    description: 'The World Travel Market WTM is an international event for travel and...',
    location: 'London, United Kingdom',
    price: 750,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-05.png',
    category: ['Travel', 'Business'],
    language: 'German',
    date: new Date(2025, 5, 18)
  },
  {
    id: '6',
    title: 'AI Summit London',
    description: 'Exploring the future of AI, strategy, automation, and ethics for...',
    location: 'London, United Kingdom',
    price: 450,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-06.png',
    category: ['Technology', 'AI related'],
    language: 'Hindi',
    date: new Date(2025, 9, 8)
  },
  {
    id: '7',
    title: 'NeurIPS Conference',
    description: 'A premier AI research event focusing on deep learning, generative...',
    location: 'Vancouver, Canada',
    price: 1200,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-07.png',
    category: ['Technology', 'AI related', 'Science'],
    language: 'Chinese',
    date: new Date(2025, 5, 5)
  },
  {
    id: '8',
    title: 'AI World Summit 2025',
    description: 'The Data Science & AI World Summit is gathering for professionals wor...',
    location: 'Online',
    price: 0,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-08.png',
    category: ['Technology', 'AI related'],
    language: 'Japanese',
    date: new Date(2025, 5, 12)
  },
  {
    id: '9',
    title: 'Venice Biennale',
    description: 'A leading art exhibition showcasing global contemporary works with...',
    location: 'Venice, Italy',
    price: 3200,
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/user-schedule/image-09.png',
    category: ['Art & culture'],
    language: 'Gujarati',
    date: new Date(2025, 5, 22)
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <InternationalEvents events={eventsData} />
      </div>
    </div>
  )
}

export default WidgetCardPreview
