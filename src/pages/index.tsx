import axios, { AxiosResponse } from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeroHomepage from '../components/HeroHomepage'
import Pokedex from '../components/Pokedex'
import { useTranslations } from '../data/copywriting'

export type UrlString = string

export interface BaseProperty {
  name: string
  url: UrlString
}

export interface ResBasePagination<T> {
  count: number
  next: UrlString | null
  previous: UrlString | null
  results: T
}

/**
 *
 */
export default function HomePage() {
  const t = useTranslations('pokemon/id')

  return (
    <div>
      <Head>
        <title>Home - Pokédex App</title>
        <meta name="description" content="Pokédex App home page" />
      </Head>

      <HeroHomepage />

      <Pokedex />
    </div>
  )
}
