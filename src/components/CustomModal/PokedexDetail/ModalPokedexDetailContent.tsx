import { css } from '@emotion/css'
import type { PokemonDetail } from '../../../data-access/api'
import ChipPokemonType from '../../ChipPokemonType'
import { pokemonTypeChipColorMap } from '../../Pokedex'

interface Props {
  weight: PokemonDetail['weight']
  height: PokemonDetail['height']
  abilities: PokemonDetail['abilities']
  types: PokemonDetail['types']
}

export default function ModalPokedexDetailContent(pokemon: Props) {
  return (
    <table className={css``}>
      <tr>
        <td
          className={css`
            font-weight: 600;
          `}
        >
          Weight:
        </td>
        <td>{pokemon.weight}</td>
        <td
          className={css`
            font-weight: 600;
          `}
        >
          Height:
        </td>
        <td>{pokemon.height}</td>
      </tr>
      <tr>
        <td
          className={css`
            font-weight: 600;
          `}
        >
          Abilities:
        </td>
        <td colSpan={3}>
          <ul
            className={css`
              margin: 0 0 0 16px;
              padding: 0;
            `}
          >
            {pokemon &&
              pokemon.abilities &&
              pokemon.abilities.map(row => {
                return <li>{row.ability.name}</li>
              })}
          </ul>
        </td>
      </tr>
      <tr>
        <td
          className={css`
            font-weight: 600;
          `}
        >
          Types
        </td>
        <td colSpan={3}>
          <div className="">
            <ChipPokemonType pokemonTypes={pokemon.types} chipColorMap={pokemonTypeChipColorMap} />
          </div>
        </td>
      </tr>
    </table>
  )
}
