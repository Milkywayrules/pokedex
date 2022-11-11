import { css } from '@emotion/css'
import ButtonLanguageSwitcher from './ButtonLanguageSwitcher'

export default function NavbarTop() {
  return (
    <div
      className={css`
        background: #f7f8f8;
        padding: 8px 192px;
        display: flex;
        flex-direction: row-reverse;
      `}
    >
      <ButtonLanguageSwitcher />
    </div>
  )
}
