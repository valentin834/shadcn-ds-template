import Download from '@/components/shadcn-studio/blocks/download-01/download-01'

const downloadPlatforms = [
  {
    name: 'App Store',
    icon: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/apple-icon.png',
    alt: 'App Store',
    href: '#'
  },
  {
    name: 'Google Play',
    icon: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-play-icon.png',
    alt: 'Google Play',
    href: '#'
  }
]

const DownloadPage = () => {
  return <Download downloadPlatforms={downloadPlatforms} />
}

export default DownloadPage
