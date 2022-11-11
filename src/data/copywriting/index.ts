import { useRouter } from 'next/router'
import indexPageCw from './index.page'
import pokemonPageCw from './pokemon.page'
import typePageCw from './type.page'

const common = {
  en: {},
  id: {},
}

const copywriting = {
  common,
  indexPageCw,
  pokemonPageCw,
  typePageCw,
}

export type Locale = 'id' | 'en'

/**
 *
 * @param page page directory segment
 * @returns
 * @example
 * // "pokemon/id" will convert into
 * copywriting['pokemonPageCw']['idPageCw']['en']
 * copywriting['pokemonPageCw']['idPageCw']['id']
 */
export const useTranslations = (page: string) => {
  const arrOfSegment = page.split('/') // ['pokemon', 'id']

  let obj = copywriting as unknown as { id: {}; en: {} }

  arrOfSegment.forEach(s => {
    const key = `${s}PageCw` as const // pokemon - id

    // @ts-expect-error
    obj = obj[key]
  })

  const { locale, defaultLocale } = useRouter()

  let lang = (locale || defaultLocale || 'en') as Locale

  const langObject = obj[lang] as any

  /**
   * @example
   * // copywriting.indexPageCw.en
   * // copywriting.pokemonPageCw.idPageCw.en
   * // copywriting.pokemonPageCw.idPageCw.id
   */
  return (cw: string) => langObject[cw]
}

/**
 *
 * @param inLocale
 */
export const useLocale = (inLocale: Locale) => {
  const router = useRouter()
  const { pathname, asPath, query } = router

  // change just the locale and maintain all other route information including href's query
  router.push({ pathname, query }, asPath, { locale: inLocale })
}
