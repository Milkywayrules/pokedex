import { amber, grey } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import LayoutMain from '../components/layout/LayoutMain'
import '../styles/globals.css'

import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/800.css'

export const theme = createTheme({
  palette: {
    primary: {
      main: amber[600],
      contrastText: '#fff',
    },
    secondary: {
      main: grey[500],
      light: grey[200],
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {},
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LayoutMain>
          <Component {...pageProps} />
        </LayoutMain>
      </CssBaseline>
    </ThemeProvider>
  )
}
