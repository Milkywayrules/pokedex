import { css } from '@emotion/css'
import { Chip, Grid } from '@mui/material'
import type { PokemonDetail } from '../data-access/api'
import { pokemonTypeChipColorMap } from './Pokedex'

interface Props {
  pokemonTypes: PokemonDetail['types']
  chipColorMap: typeof pokemonTypeChipColorMap
}

export default function ChipPokemonType({ pokemonTypes, chipColorMap }: Props) {
  return (
    <Grid container direction="row" spacing={1} marginTop="4px" marginBottom="4px">
      {pokemonTypes.map((type, typeIndex) => {
        return (
          <Grid item xs={6} key={typeIndex}>
            <Chip
              label={type.type.name}
              className={css`
                background-color: ${chipColorMap[type.type.name] || 'black'};
                color: white;
                width: 100%;
                font-weight: 800;
              `}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
