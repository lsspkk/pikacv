import React, {useState } from 'react'
import logo from './logo.svg'
import { Information, emptyInformation } from 'components/Information'
import { Layout } from 'components/Layout'
import './App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import Navbar from 'react-bulma-components/lib/components/navbar'
import Container from 'react-bulma-components/lib/components/container'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import constants from 'react-bulma-components/lib/constants'

function App () {
  const [burger, setBurger] = useState(false)
  const [information, setInformation] = useState(emptyInformation)
  const [layout, setLayout] = useState({})
  return (
    <Router>
      <div className='App'>
        <Navbar
          color='info'
          active={burger}
          onClick={() => setBurger(!burger)}
        >
          <Navbar.Brand>
            <Navbar.Item color={constants.COLORS.INFO} renderAs='a' href='#'>
              -<FontAwesomeIcon size='2x' icon={faBriefcase} />...
              <FontAwesomeIcon size='2x' icon={faBriefcase} />-
              <span style={{fontWeight: 'bold', fontSize: '2rem'}}>PIKA CV</span>
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu >
            <Navbar.Container>
              <Navbar.Item href='#'>
                <Link to='/information'>Tiedot</Link>
              </Navbar.Item>
              <Navbar.Item href='#'>
                <Link to='/layout'>Ulkoasu</Link>
              </Navbar.Item>
            </Navbar.Container>
            <Navbar.Item href='#'>
              <Link to='/cv'>Tee CV</Link>
            </Navbar.Item>
            <Navbar.Container position='end'>
              <Navbar.Item href='#'>
                <Link to='/import'>Tuo</Link>
              </Navbar.Item>
              <Navbar.Item href='#'>
                <Link to='/export'>Vie</Link>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      </div>
      <Container>
        <Switch>
          <Route exact path='/'>
            <div>
              Syötä tiedot ja ulkoasu, tee pika cv
            </div>
          </Route>
          <Route path='/information'>
            <Information information={information} setInformation={setInformation} />
          </Route>
          <Route path='/layout'>
            <Layout />
          </Route>
          <Route path='/cv'>
            Ei tehty
          </Route>
          <Route path='/import'>
            Kesken
          </Route>
          <Route path='/export'>
            Kesken
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
