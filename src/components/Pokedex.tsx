import { css } from '@emotion/css'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useEffect, useLayoutEffect, useState } from 'react'
import type { PokemonDetail, ResPokemonList } from '../data-access/api'
import api from '../data-access/api'
import { colorPicker } from '../utils/colorPicker'
import CustomModal from './CustomModal'
import PokedexCard from './PokedexCard'

export let pokemonTypeChipColorMap = {} as { [s in string]: string }

export default function Pokedex() {
  const [totalPokemon, setTotalPokemon] = useState(0)
  const [pokemons, setPokemons] = useState<ResPokemonList['results']>([])
  const [pokemonsDetail, setPokemonsDetail] = useState<PokemonDetail[]>([])

  // const [, setTypeList] = useState<ResTypeList['results']>([])

  useLayoutEffect(() => {
    api.pokemon.getList(23).then(p => {
      if (p) {
        setPokemons(p.results)
        setTotalPokemon(p.count)
      }
    })

    api.pokemonType.getList().then(type => {
      if (!type) return

      // setTypeList(type.results)

      // map color for pokemon's type chip
      if (Object.keys(pokemonTypeChipColorMap).length === 0) {
        pokemonTypeChipColorMap = type.results.reduce(
          (prev, curr) => ({ ...prev, [curr.name]: colorPicker() }),
          {},
        )
      }
    })
  }, [])

  useEffect(() => {
    const pokemonIds = api.pokemon.buildPokemonDetailPromise(pokemons)
    api.pokemon.getDetailMany(pokemonIds).then(pd => {
      setPokemonsDetail(pd)
    })
  }, [pokemons])

  const [modalOpen, setModalOpen] = useState(false)
  const [pokemonForModal, setPokemonForModal] = useState<PokemonDetail>()

  const handleOpenModal = (id: number) => {
    const pd = pokemonsDetail.find(pd => pd.id === id)
    setPokemonForModal(pd)
    setModalOpen(true)
  }

  return (
    <div
      className={css`
        padding: 96px 192px;
      `}
    >
      <Grid
        justifyContent="center"
        alignItems="center"
        gap={2}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h1" fontSize={40} fontWeight={800} color="#42494D" lineHeight={'78px'}>
          <span id="pokedex">Pokédex</span>
        </Typography>
        <Typography
          paragraph
          fontSize={24}
          color="#7B8082"
          letterSpacing={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <span>All Generation totaling</span>
          <span>{totalPokemon} Pokemon</span>
        </Typography>

        <Grid container display="flex" justifyContent="center" alignItems="center" spacing={4}>
          {pokemonsDetail.length > 0 ? (
            pokemonsDetail.map(pokemon => (
              <PokedexCard
                key={pokemon.id}
                pokemon={pokemon}
                handleOpenModal={handleOpenModal}
                chipColorMap={pokemonTypeChipColorMap}
              />
            ))
          ) : (
            <div
              className={css`
                margin: 48px auto;
              `}
            >
              <CircularProgress />
            </div>
          )}
        </Grid>

        <CustomModal.PokedexDetail
          pokemon={{ ...pokemonForModal! }}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </Grid>
    </div>
  )
}
