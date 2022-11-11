import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'
import { theme } from '../pages/_app'

interface Props {
  children: React.ReactNode
  href: string
}

export default function LinkActive({ children, href }: Props) {
  const router = useRouter()
  const style: CSSProperties = {
    padding: '4px 12px',
    color: router.asPath === href ? theme.palette.primary.main : 'black',
    fontWeight: router.asPath === href ? 800 : 400,
    borderBottom: router.asPath === href ? `2px solid ${theme.palette.secondary.light}` : undefined,
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
