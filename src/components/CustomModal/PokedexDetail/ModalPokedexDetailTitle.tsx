import { Typography } from '@mui/material'
import type { PokemonDetail } from '../../../data-access/api'
import { capsFirstCharEveryWord } from '../../../utils/characterFormatter'

interface Props {
  name: PokemonDetail['name']
}

export default function ModalPokedexDetailTitle(props: Props) {
  return (
    <Typography id="modal-modal-title" variant="h3" component="h2" fontWeight={800}>
      {capsFirstCharEveryWord(props.name)}
    </Typography>
  )
}
