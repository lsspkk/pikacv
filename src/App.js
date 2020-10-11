import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import Navbar from 'react-bulma-components/lib/components/navbar'
import Container from 'react-bulma-components/lib/components/container'
import Footer from 'react-bulma-components/lib/components/footer'
import Columns from 'react-bulma-components/lib/components/columns'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import constants from 'react-bulma-components/lib/constants'
import { InformationView, emptyInformation } from './components/InformationView'
import { LayoutView, defaultLayout } from './components/LayoutView'
import { CvView } from './components/CvView'
import { useTranslation } from './components/useTranslation'
import { ExportView } from 'components/ExportView'
import { ImportView } from 'components/ImportView'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function App() {
  const { t, setLanguage, currentLanguage } = useTranslation()
  const [burger, setBurger] = useState(false)
  const [information, setInformation] = useState(emptyInformation)
  const [layout, setLayout] = useState(defaultLayout)
  useEffect(() => {
    const loaded = window.localStorage.getItem('pikacv')
    if (loaded) {
      const pikacv = JSON.parse(loaded)
      // add new information/layout fields from empty defaults
      pikacv.information && setInformation({ ...information, ...pikacv.information })
      pikacv.layout && setLayout({ ...layout, ...pikacv.layout })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = () => {
    window.localStorage.setItem('pikacv', JSON.stringify({ information: information, layout: layout }))
  }
  const otherLanguage = currentLanguage() === 'fi' ? 'en' : 'fi'
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/cv' />
          <Route>
            <Navbar
              color='info'
              active={burger}
              onClick={() => setBurger(!burger)}
            >
              <Navbar.Brand>
                <Link to="/" className="navbar-item" style={{ width: '10em' }} color={constants.COLORS.INFO} renderAs='a' href='#'>
                  <img src={logo} alt="pikacv logo" />
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingLeft: '0.4em' }}>pika CV</span>
                </Link>
                <Navbar.Burger />
              </Navbar.Brand>
              <Navbar.Menu color='info'>
                <Navbar.Container>
                  <Link className="navbar-item"
                    onClick={() => setLanguage(otherLanguage)}><FontAwesomeIcon size='2x' icon={faLanguage} /></Link>
                  <Link className="navbar-item" to='information'>{t('information')}</Link>
                  <Link className="navbar-item" to='/layout'>{t('layout')}</Link>
                  <Link className="navbar-item" to='/cv'>{t('make_cv')}</Link>
                </Navbar.Container>
                <Navbar.Container>
                </Navbar.Container>
                <Navbar.Container position='end'>
                  <Link className="navbar-item" to='/import'>
                    {t('import')}
                  </Link>
                  <Link className="navbar-item" to='/export'>
                    {t('export')}
                  </Link>
                </Navbar.Container>
              </Navbar.Menu>
            </Navbar>
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/'>
            <Container style={{ minHeight: '60vh', margin: '3em' }}>
              <p>{t('introduction')}</p>
            </Container>
          </Route>
          <Route path='/information'>
            <InformationView save={save} information={information} setInformation={setInformation} />
          </Route>
          <Route path='/layout'>
            <LayoutView save={save} layout={layout} setLayout={setLayout} information={information} />
          </Route>
          <Route path='/cv'>
            <CvView information={information} layout={layout} />
          </Route>
          <Route path='/import'>
            <Container>
              <ImportView setInformation={setInformation} setLayout={setLayout} />
            </Container>
          </Route>
          <Route path='/export'>
            <Container>
              <ExportView information={information} layout={layout} />
            </Container>
          </Route>
        </Switch>
        <Switch>
          <Route path='/cv' />
          <Route>
            <Footer>
              <Container>
                <Columns>
                  <Columns.Column size={6}>
                    <p>Clone customize to your needs</p>
                    <a href="https://github.com/lsspkk/pikacv">PikaCV - Github Repository</a>
                  </Columns.Column>
                  <Columns.Column size={6} style={{ textAlign: 'right' }}>
                    2020<br />
          10 hours of Autumn evenings
        </Columns.Column>
                </Columns>
              </Container>
            </Footer>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
