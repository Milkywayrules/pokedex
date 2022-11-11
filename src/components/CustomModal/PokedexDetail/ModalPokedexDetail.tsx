import { css } from '@emotion/css'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Grid, IconButton, Modal } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'
import type { PokemonDetail } from '../../../data-access/api'
import ModalPokedexDetailButton from './ModalPokedexDetailButton'
import ModalPokedexDetailContent from './ModalPokedexDetailContent'
import ModalPokedexDetailImage from './ModalPokedexDetailImage'
import ModalPokedexDetailTitle from './ModalPokedexDetailTitle'

type PokedexDetailModal = Pick<
  PokemonDetail,
  'id' | 'name' | 'weight' | 'height' | 'abilities' | 'types' | 'sprites'
>

interface Props {
  pokemon: PokedexDetailModal
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalPokedexDetail({ open, setOpen, pokemon }: Props) {
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          bgcolor: 'background.paper',
          borderRadius: '24px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <div
          className={css`
            display: flex;
          `}
        >
          <IconButton
            onClick={handleClose}
            className={css`
              margin-left: auto;
            `}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Grid container direction="row" gap={2} alignItems="center" justifyContent="center">
          <ModalPokedexDetailImage
            src={pokemon.sprites?.other['official-artwork'].front_default}
            alt={`${pokemon.name} official artwork`}
            height={400}
            width={400}
          />

          <Grid item display="flex" flexDirection="column" gap={4}>
            <ModalPokedexDetailTitle name={pokemon.name} />

            <ModalPokedexDetailContent
              height={pokemon.height}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
              types={pokemon.types}
            />

            <ModalPokedexDetailButton pokemonId={pokemon.id} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
