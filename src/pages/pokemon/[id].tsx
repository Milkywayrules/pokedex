import { CircularProgress } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api, { PokemonDetail } from '../../data-access/api'
import { capsFirstChar } from '../../utils/characterFormatter'

export default function pokemonPokemonIdPage() {
  const router = useRouter()
  const q = router.query
  const pokemonId = Number(q.id as unknown as string)

  const [pokemon, setPokemon] = useState<PokemonDetail>()

  useEffect(() => {
    if (!pokemonId) return

    api.pokemon.getDetail(pokemonId).then(pd => setPokemon(pd))
  }, [pokemonId])

  if (!pokemon) return <CircularProgress />

  return (
    <div>
      <Head>
        <title>{capsFirstChar(pokemon.name)} Detail - Pokédex App</title>
        <meta name="description" content="Pokédex App home page" />
      </Head>

      <p>
        ID:{pokemon.id} - {pokemon.name}
      </p>

      <Link href="/pokemon">back</Link>
    </div>
  )
}
