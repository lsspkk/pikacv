import React, {useState } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import Navbar from 'react-bulma-components/lib/components/navbar'
import {
  Link
} from 'react-router-dom'

export function Layout () {
  const [burger, setBurger] = useState(false)
  const [information, setInformation] = useState({})
  const [layout, setLayout] = useState({})
  return (
    <div className='App'>
      <Navbar
        color='primary'
        fixed='Fixed'
        active={burger}
        onClick={() => setBurger(!burger)}
      >
        <Navbar.Brand>
          <Navbar.Item renderAs='a' href='#'>
              PIKA CV
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
  )
}
