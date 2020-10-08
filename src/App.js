import React, {useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import Navbar from 'react-bulma-components/lib/components/navbar'
import Container from 'react-bulma-components/lib/components/container'
import Footer from 'react-bulma-components/lib/components/footer'
import Columns from 'react-bulma-components/lib/components/columns'
import {
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom'
import constants from 'react-bulma-components/lib/constants'
import { InformationView, emptyInformation } from './components/InformationView'
import { LayoutView, defaultLayout } from './components/LayoutView'
import { CvView } from './components/CvView'
import { useTranslation } from './components/useTranslation'
import { ExportView } from 'components/ExportView'
import { ImportView } from 'components/ImportView'

const fullScreenStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  minWidth: '100vw',
  maxWidth: '100vw',
  width: '100vw',
  minHeight: '100vh',
  zIndex: 30
}

function App () {
  const t = useTranslation('fi')
  const [burger, setBurger] = useState(false)
  const [information, setInformation] = useState(emptyInformation)
  const [layout, setLayout] = useState(defaultLayout)
  useEffect(() => {
    const loaded = window.localStorage.getItem('pikacv')
    if( loaded ) {
      const pikacv = JSON.parse(loaded)
      // add new information/layout fields from empty defaults
      pikacv.information && setInformation({...information, ...pikacv.information})
      pikacv.layout && setLayout({...layout, ...pikacv.layout})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = () => {
    window.localStorage.setItem('pikacv', JSON.stringify({information: information, layout: layout}))
  }
  return (
    <Router>
      <div>
        <Navbar
          color='info'
          active={burger}
          onClick={() => setBurger(!burger)}
        >
          <Navbar.Brand>
            <Navbar.Item style={{width: '10em'}} color={constants.COLORS.INFO} renderAs='a' href='#'>
              <img src={logo} />
              <span style={{fontWeight: 'bold', fontSize: '1.5rem', paddingLeft: '0.4em'}}>pika CV</span>
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu color='info'>
            <Navbar.Container>
              <Navbar.Item href='/information'>
                {t('information')}
              </Navbar.Item>
              <Navbar.Item href='/layout'>
                {t('layout')}
              </Navbar.Item>
              <Navbar.Item href='/cv'>
              {t('make_cv')}
            </Navbar.Item>
            </Navbar.Container>
            <Navbar.Container>
            </Navbar.Container>
            <Navbar.Container position='end'>
              <Navbar.Item href='/import'>
              {t('import')}
              </Navbar.Item>
              <Navbar.Item href='/export'>
              {t('export')}
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
        <Switch>
          <Route exact path='/'>
          <Container style={{height: '72vh'}}>
              <p>{t('introduction')}
              </p>
          </Container>
          </Route>
          <Route path='/information'>
            <InformationView save={save} information={information} setInformation={setInformation} />
          </Route>
          <Route path='/layout'>
            <LayoutView save={save} layout={layout} setLayout={setLayout} information={information} />
          </Route>
          <Route path='/cv'>
            <div style={fullScreenStyle}>
              <CvView information={information} layout={layout} />
            </div>
          </Route>
          <Route path='/import'>
          <Container>
            <ImportView setInformation={setInformation} setLayout={setLayout} />
            </Container>
          </Route>
          <Route path='/export'>
          <Container>
            <ExportView information={information} layout={layout}/>
            </Container>
          </Route>
        </Switch>
      <Footer>
      <Container>
        <Columns>
        <Columns.Column size={6}>
          <p>Clone customize to your needs</p>
        <a href="https://github.com/lsspkk/pikacv">PikaCV - Github Repository</a>
        </Columns.Column>
        <Columns.Column size={6} style={{textAlign: 'right'}}>
          2020<br/>
          10 hours of Autumn evenings
        </Columns.Column>
        </Columns>
      </Container>
      </Footer>
      </div>
    </Router>
  )
}

export default App
