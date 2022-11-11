import { css } from '@emotion/css'
import { KeyboardArrowDown } from '@mui/icons-material'
import LanguageIcon from '@mui/icons-material/Language'
import { Button, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { Locale } from '../data/copywriting'

type LangMap = { [L in Locale]: { [L in Locale]: string } }

const getCurrentLangText = (currLocale: Locale, langToChoose: Locale) => {
  return langMap[currLocale][langToChoose]
}

const langMap: LangMap = {
  en: { en: 'English', id: 'Indonesian' },
  id: { en: 'Inggris', id: 'Indonesia' },
}

export default function ButtonLanguageSwitcher() {
  const router = useRouter()
  let { pathname, asPath, query, locale: _locale, locales: _locales } = router
  const locale = (_locale ?? 'en') as Locale
  const locales = _locales as Locale[]

  const pushToUseLocale = (locale: Locale) => {
    router.push({ pathname, query }, asPath, { locale })
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="text"
        size="small"
        color="secondary"
        className={css`
          gap: 4px;
          place-content: center;
        `}
      >
        <LanguageIcon />
        <span>{getCurrentLangText(locale, locale)}</span>
        <KeyboardArrowDown />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {locales &&
          locale &&
          locales.map((l, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                pushToUseLocale(l)
                handleClose()
              }}
              className={
                locale === l
                  ? css`
                      background: #f7f8f8;
                    `
                  : ''
              }
            >
              {getCurrentLangText(locale, l)}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}
