import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import type { PokemonDetail } from '../../../data-access/api'

interface Props {
  pokemonId: PokemonDetail['id']
}

export default function ModalPokedexDetailButton({ pokemonId }: Props) {
  return (
    <>
      <Link href={`pokemon/${pokemonId}`}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: '10px, 25px, 10px, 25px',
            borderRadius: '14px',
            width: '167px',
            height: '50px',
          }}
        >
          <Typography fontWeight={800} fontSize={16}>
            More Detail
          </Typography>
        </Button>
      </Link>
    </>
  )
}
