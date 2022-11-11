import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'

export default function HomePage() {
  const r = useRouter()

  useLayoutEffect(() => {
    r.replace('/')
  })

  return null
}
