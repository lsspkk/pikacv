import React, {useState, useRef, useEffect } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Icon from 'react-bulma-components/lib/components/icon'
import Image from 'react-bulma-components/lib/components/image'
import { Section } from 'react-bulma-components'
import { WorkHistory } from './WorkHistory'
import { Skill } from './Skill'
import { Header } from './Header'
import { PikaCV } from './PikaCV'
import Columns from 'react-bulma-components/lib/components/columns'

export const defaultLayout = {
  header: { fontFamily: 'Verdana', color: '#adbcaa', background: '#765f78' },
  basic: { fontFamily: 'Times', color: '#222222' },
  title: { fontFamily: 'Verdana', color: '#ad5463', fontSize: '2em' }
}

export function Layout ({layout, setLayout, information}) {
  const change = (group, key, value) => {
    let updatedGroup = {...layout[group]}
    updatedGroup[key] = value
    let newLayout = {...layout}
    newLayout[group] = updatedGroup
    setLayout(newLayout)
  }
  const t = {
    header: 'Ylätunniste',
    basic: 'Leipäteksti',
    title: 'Otsikot',
    fontFamily: 'Fontti',
    color: 'Väri',
    background: 'Taustaväri',
    fontSize: 'Koko'
  }
  return (

    <Columns style={{fontSize: '70%'}}>
      <Columns.Column style={{flex: '1'}}>
        { Object.keys(layout).map(group => (
          <div>
            <h1>{t[group]}</h1>
            { Object.keys(layout[group]).map(key => (
              <Field>
                <Label style={{fontSize: '80%'}} >{t[key]}</Label>
                <Input style={{fontSize: '80%'}} type='text' value={layout[group][key]} onChange={(e) => change(group, key, e.target.value)} />
              </Field>
            ))}
          </div>
        ))}
      </Columns.Column>
      <Columns.Column style={{flex: '7'}}>
        <PikaCV layout={layout} information={information} />
      </Columns.Column>

    </Columns>
  )
}
