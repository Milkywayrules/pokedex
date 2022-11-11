import Head from 'next/head'
import { useRouter } from 'next/router'
import LinkActive from '../components/LinkActive'

export default function PokemonTypesPage() {
  const currLocale = useRouter().locale

  return (
    <>
      <Head>
        <title>Pokemon Types - Pokédex App - {currLocale}</title>
        <meta name="description" content="Pokédex App pokemon types page" />
      </Head>

      <LinkActive href="/">go to Home</LinkActive>
      <br />
      <span>pokemon types page</span>
    </>
  )
}
