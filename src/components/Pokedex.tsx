import { css } from '@emotion/css'
import {
  Autocomplete,
  CircularProgress,
  Grid,
  Pagination,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import type { PokemonDetail, ResPokemonList } from '../data-access/api'
import api from '../data-access/api'
import { theme } from '../pages/_app'
import { colorPicker } from '../utils/colorPicker'
import CustomModal from './CustomModal'
import PokedexCard from './PokedexCard'

export let pokemonTypeChipColorMap = {} as { [s in string]: string }

export default function Pokedex() {
  const [isLoading, setIsLoading] = useState(true)

  const [totalPokemon, setTotalPokemon] = useState(0)
  const [pokemons, setPokemons] = useState<ResPokemonList['results']>([])
  const [pokemonsDetail, setPokemonsDetail] = useState<PokemonDetail[]>([])

  const [perPage, setPerPage] = useState(9)
  const [currPage, setCurrPage] = useState(1)

  const handleChangePage = (_: any, pageClicked: number) => {
    console.log('page changed')
    setCurrPage(pageClicked)
  }

  const handleChangePerPage = (v: string) => {
    let perPage = Number(v)

    setPokemonsDetail([])
    setPerPage(perPage)
  }

  useEffect(() => {
    setIsLoading(true)

    api.pokemon
      .getList(perPage, currPage)
      .then(p => {
        if (p) {
          // empty the pokemon detail first
          setPokemonsDetail([])

          setPokemons(p.results)
          setTotalPokemon(p.count)
        }
      })
      .finally(() => setIsLoading(false))

    api.pokemonType
      .getList()
      .then(type => {
        if (!type) return

        // map color for pokemon's type chip
        if (Object.keys(pokemonTypeChipColorMap).length === 0) {
          pokemonTypeChipColorMap = type.results.reduce(
            (prev, curr) => ({ ...prev, [curr.name]: colorPicker() }),
            {},
          )
        }
      })
      .finally(() => setIsLoading(false))
  }, [perPage, currPage])

  useEffect(() => {
    setIsLoading(true)

    const pokemonIds = api.pokemon.buildPokemonDetailPromise(pokemons)
    api.pokemon
      .getDetailMany(pokemonIds)
      .then(pd => {
        setPokemonsDetail(pd)
      })
      .finally(() => setIsLoading(false))
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
        background-color: ${theme.palette.primary.light};
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
          {isLoading || pokemonsDetail.length === 0 ? (
            <div
              className={css`
                margin: 48px auto;
              `}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            pokemonsDetail.map(pokemon => (
              <PokedexCard
                key={pokemon.id}
                pokemon={pokemon}
                handleOpenModal={handleOpenModal}
                chipColorMap={pokemonTypeChipColorMap}
              />
            ))
          )}
        </Grid>

        <CustomModal.PokedexDetail
          pokemon={{ ...pokemonForModal! }}
          open={modalOpen}
          setOpen={setModalOpen}
        />

        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 8px;
            `}
          >
            <span>Per Page:</span>

            <Autocomplete
              disablePortal
              options={['3', '9', '15', '21', '30']}
              renderInput={params => <TextField {...params} />}
              onChange={(_, v) => handleChangePerPage(v ?? '9')}
            />
          </div>

          <Pagination
            count={Math.ceil(totalPokemon / perPage)}
            page={currPage}
            siblingCount={0}
            variant="outlined"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              color: 'white',
            }}
            onChange={handleChangePage}
          />
        </div>
      </Grid>
    </div>
  )
}
