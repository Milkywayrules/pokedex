import { useRouter } from 'next/router'

export default function HomePage() {
  useRouter().replace('/')

  return null
}
