import { css } from '@emotion/css'
import Image from 'next/image'
import LogoPokemon from '../../public/logo_pokemon.png'
import LinkActive from './LinkActive'

export default function NavbarTopMenu() {
  return (
    <div
      className={css`
        padding: 14px 192px;
      `}
    >
      <div
        className={css(`
            display:flex;
            align-items:center;
            gap: 60px;
          `)}
      >
        <Image src={LogoPokemon} alt="Pokemon Logo" />
        <LinkActive href="/">Home</LinkActive>
        <LinkActive href="/pokemon-types">Pokemon Type</LinkActive>
      </div>
    </div>
  )
}
