import { css } from '@emotion/css'
import { Card, CardActionArea, CardMedia, Chip, Grid, Typography } from '@mui/material'
import type { PokemonDetail } from '../data-access/api/pokemon'
import { theme } from '../pages/_app'
import ChipPokemonType from './ChipPokemonType'
import { pokemonTypeChipColorMap } from './Pokedex'

interface Props {
  pokemon: PokemonDetail
  handleOpenModal: (id: number) => void
  chipColorMap: typeof pokemonTypeChipColorMap
}

const getPokemonCardTag = (pokemonId: PokemonDetail['id']) => {
  return `#${pokemonId.toString().padStart(3, '0')}`
}

export default function PokedexCard({ pokemon, handleOpenModal, chipColorMap }: Props) {
  return (
    <Grid item xs={4} key={pokemon.id}>
      <Card
        sx={{
          'marginX': 'auto',
          'maxWidth': 345,
          'borderRadius': '24px',
          'backgroundColor': 'white',
          ':hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
          },
        }}
      >
        <CardActionArea
          sx={{
            padding: '10px 25px 10px 25px',
          }}
          onClick={() => handleOpenModal(pokemon.id)}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="275px"
            width="275px"
            image={pokemon.sprites.other['official-artwork'].front_default}
            sx={{
              marginTop: '24px',
              backgroundColor: 'grey',
            }}
          />

          <div
            className={css`
              margin-bottom: 24px;
            `}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              component="p"
              fontWeight={800}
              color={theme.palette.secondary.main}
            >
              {getPokemonCardTag(pokemon.id)}
            </Typography>
            <Typography variant="h4" color="text.secondary" fontWeight={800}>
              {pokemon.name}
            </Typography>

            <ChipPokemonType pokemonTypes={pokemon.types} chipColorMap={chipColorMap} />
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
