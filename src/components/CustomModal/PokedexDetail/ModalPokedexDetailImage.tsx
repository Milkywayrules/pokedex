import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  width: number
  height: number
}

export default function ModalPokedexDetailImage(props: Props) {
  return (
    <Grid
      item
      className={css`
        border: 2px solid black;
        background-color: lightgray;
      `}
    >
      <Image {...props} />
    </Grid>
  )
}
