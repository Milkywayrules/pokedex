import NavbarTop from '../NavbarTop'
import NavbarTopMenu from '../NavbarTopMenu'

interface Props {
  children: React.ReactNode
}

export default function LayoutMain({ children }: Props) {
  return (
    <>
      <NavbarTop />
      <NavbarTopMenu />

      {children}
    </>
  )
}
