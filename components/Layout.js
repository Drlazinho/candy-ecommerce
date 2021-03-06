import React, { useContext } from 'react'
import Head from 'next/head'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Badge
} from '@material-ui/core'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
// import { Switch } from '@mui/material'
import Cookies from 'js-cookie'
import MaterialUISwimych from './Switch'

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store)
  const { darkMode, cart } = state
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      body1: {
        fontWeight: 'normal'
      }
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000'
      },
      secondary: {
        main: '#208080'
      }
    }
  })
  const styles = useStyles()

  // Função de trocar os modos dakr/light e guarda o status através dos Cookies
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
  }

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Candy Next` : `Candy Next`}</title>{' '}
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={styles.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={styles.brand}>Candy Next</Typography>
              </Link>
            </NextLink>
            <div className={styles.grow}></div>
            <div>
              <MaterialUISwimych
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></MaterialUISwimych>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>Carrinho</Badge>
                  ) : (
                    'Carrinho'
                  )}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={styles.main}>{children}</Container>
        <footer className={styles.footer}>
          <Typography>
            Todos os direitos reservados. Candy Next &copy; 2022
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  )
}
