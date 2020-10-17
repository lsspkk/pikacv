import React, { useEffect, useState, useCallback } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Input, Textarea } from 'react-bulma-components/lib/components/form'
import Container from 'react-bulma-components/lib/components/container'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import { Header } from './Header'
import { CvView } from './CvView'
import { useTranslation } from './useTranslation'
import FontPicker from "font-picker-react"

export const defaultLayout = {
  header: { fontFamily: 'Open Sans', color: '#adbcaa', background: '#765f78', fontSize: '110%'},
  photo: { height: '200px'},
  basic: { fontFamily: 'Open Sans', color: '#222222' },
  title: { fontFamily: 'Open Sans', color: '#ad5463', fontSize: '2em' },
  label: { fontWeight: 'bold' },
  skill: { columnSize: 4, color: '#3298dc' },
  textFields: [
    {
      language: 'en', name: 'skillLevelsText',
      value: `Skill levels:
  1. Fundamental: Basic awareness, able to work but need guidance
  2. Novice: Fluent but with limited exprerience, might need some support
  3. Intermediate: Capable of working alone or guiding others, have practical experience
  4. Advanced: Deep knowledge, long practical experience
  5. Expert: Recognized authority with deep knowledge, capabable of solving even the most diffcult issues
  `},
    {
      language: 'fi', name: 'skillLevelsText',
      value: `Taitotasot:
  1. Alkeet: Pystyy työskentelemään, mutta tarvitsee opastusta
  2. Perusteet: Osaava, mutta vähän kokemusta ja saattaa tarvita tukea
  3. Keskinkertainen: Pärjää yksin ja voi opastaa muita, on käytännön kokemusta
  4. Edistynyt: Syvällistä tietoa ja paljon käytännön kokemusta
  5. Asiantuntija: Tunnustetusti syvällistä tietoa ja kykyä ratkaista hankalimmatkin haasteet
  `
    }]
}

let uniqueId = -100000


export function LayoutView({ layout, setLayout, information, save }) {
  const defaultFonts = {header: layout.header.fontFamily, basic: layout.basic.fontFamily, title: layout.title.fontFamily}
  const [font, setFont] = useState(defaultFonts)
  const { t } = useTranslation()



  const change = useCallback((group, key, value) => {
    let updatedGroup = { ...layout[group] }
    updatedGroup[key] = value
    let newLayout = { ...layout }
    newLayout[group] = updatedGroup
    setLayout(newLayout)
  },[layout, setLayout])

  useEffect(() => {
    const groupKeys = Object.keys(font).filter(key => key !== 'default')
    groupKeys.forEach(group => {
      if( layout[group].fontFamily !== font[group] ) {
        change(group, 'fontFamily', font[[group]])     
      }
    })
  }, [change, font, layout])

  const changeText = (name, language, newValue) => {
    const index = layout.textFields.findIndex(f => f.name === name && f.language === language)
    if (index === -1) {
      return
    }
    let updated = { ...layout.textFields[index], value: newValue }
    const updatedTextFields = [...layout.textFields.slice(0, index), updated, ...layout.textFields.slice(index + 1, information.workhistory.length)]
    setLayout({ ...layout, textFields: updatedTextFields })
  }

  const type = (field) => {
    return field === 'color' || field === 'background' ? 'color' : 'text'
  }
  const renderPicker = (group, field) => (
    <FontPicker
      pickerId={group}
      apiKey="***REMOVED***"
      activeFontFamily={font[group]}
      onChange={(nextFont) => {
        const newFont ={...font}       
        newFont[group] =  nextFont.family
        setFont(newFont)    
      }

      }
      sort="alphabet"
    />
  )

  return (
    <Container>
      <Columns>
        <Columns.Column style={{ flex: '1' }}>
          <Header>{t('layout')}</Header>
          <Button color='info' onClick={() => save()}>{t('save')}</Button>
          <div style={{ fontSize: '70%', margin: '0.5em 0 1em' }}>{t('saved_to_local_storage')}</div>


          {Object.keys(layout).filter(k => k !== 'textFields').map(group => (
            <div key={'layoutgroup' + group} style={{ paddingBottom: '1em' }}>
              <Header>{t(group)}</Header>
              { Object.keys(layout[group]).map(field => (

                <Field key={'layoutfield' + group + field} className="is-horizontal">
                  <Label className="is-small field-label">{t(field)}</Label>

                  { field === 'fontFamily' && renderPicker(group, field)}
                  { field !== 'fontFamily' &&
                    <Input className="is-small field-body" style={{ maxWidth: '6em' }} type={type(field)} value={layout[group][field]} onChange={(e) => change(group, field, e.target.value)} />}
                </Field>
              ))}
            </div>
          ))}
          <Header>{t('textFields')}</Header>
          {layout.textFields.map(field => (
            <Field key={'tf'+(uniqueId++)} >
              <Label>{t(field.name)} ({t(field.language)})</Label>
              <Textarea value={field.value} onChange={(e) => changeText(field.name, field.language, e.target.value)}></Textarea>
            </Field>
          ))}

          <Field style={{ margin: '4em 0em' }}>
            <Button color='danger' onClick={() => setLayout(defaultLayout)}>{t('reset')}</Button>
            <div style={{ fontSize: '70%', margin: '0.5em 0 1em' }}>{t('default_layout_and_textfields')}</div>

          </Field>
        </Columns.Column>
        <Columns.Column style={{ flex: '7' }}>
          <CvView layout={layout} information={information} />
        </Columns.Column>

      </Columns>
    </Container>
  )
}
