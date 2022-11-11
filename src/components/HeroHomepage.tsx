import { css } from '@emotion/css'
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import HeroPokemon from '../../public/hero_pokemons.png'

export default function HeroHomepage() {
  return (
    <div
      className={css`
        padding: 96px 192px;
      `}
    >
      <Grid display="flex" gap={24}>
        <Grid
          justifyContent="center"
          alignItems="start"
          gap={4}
          display="flex"
          flexDirection="column"
          item
          xs={12}
        >
          <Typography
            variant="h1"
            fontSize={52}
            fontWeight={800}
            color="#42494D"
            lineHeight={'78px'}
          >
            All the Pokémon data you'll ever need in one place!
          </Typography>
          <Typography paragraph fontSize={20} color="#7B8082" letterSpacing={1}>
            Thousands of data compiled into one place
          </Typography>
          <Link href="#pokedex">
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '8px 16px',
                borderRadius: '14px',
                width: '240px',
                height: '56px',
              }}
            >
              <Typography fontWeight={800} fontSize={16}>
                Check Pokédex
              </Typography>
            </Button>
          </Link>
        </Grid>

        <Grid justifyContent="center" alignItems="center" xs={6} item>
          <Image priority src={HeroPokemon} alt="Pokemons Hero Image" width={534} height={632} />
        </Grid>
      </Grid>
    </div>
  )
}
