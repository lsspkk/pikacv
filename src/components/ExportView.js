import React, { useState } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Input, Textarea, Radio } from 'react-bulma-components/lib/components/form'
import Container from 'react-bulma-components/lib/components/container'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import { Header } from './Header'
import { CvView } from './CvView'
import { useTranslation } from './useTranslation'

const small100 = {
  width: '90vw',
  fontSize: '0.6em',
  height: '20em'
}

export function ExportView({ layout, information }) {
  const t = useTranslation('fi')
  const [option, setOption] = useState('both')

  const fileNames = {
    both: 'cv_information_and_layout.json',
    information: 'cv_layout.json',
    layout: 'cv_information.json',
  }
  const fileName = () => fileNames[option]
  const downloadFile = () => {
    const element = document.createElement("a")
    const json = {
      layout: option !== 'information' ? layout : {},
      information: option !== 'layout' ? information : {}
    }
    const file = new Blob([JSON.stringify(json, '', 2)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = fileName()
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }


  return (
    <Container style={{margin:'1em'}}>
      <Columns>
        <Columns.Column >

          <Header>{t('information')}</Header><br/>
          <pre disabled="true" style={small100}>
            {JSON.stringify(information, '', 2)}
          </pre>

        </Columns.Column>
        <Columns.Column>


          <Header>{t('layout')}</Header><br/>
          <pre disabled="true" style={small100}>
            {JSON.stringify(layout, '', 2)}
          </pre>

        </Columns.Column>
      </Columns>
      <Header>{t('choose_what_to_export')}</Header>
      <Field className="is-horizontal" style={{maxWidth:'30em',margin:'1em 3em', display:'flex', alignContent:'flex-end',justifyItems:'center'}}>
        <Label className="field-label">{t('information')}</Label>
        <Radio  className="field-body"checked={option === 'information'} onClick={(e) => setOption('information')} />
        <Label className="field-label">{t('layout')}</Label>
        <Radio  className="field-body"checked={option === 'layout'} onClick={(e) => setOption('layout')} />
        <Label className="field-label">{t('both')}</Label>
        <Radio  className="field-body"checked={option === 'both'} onClick={(e) => setOption('both')} />
      </Field>
      <Button color='info' onClick={() => downloadFile()}>{t('save_to_file')}</Button>
      <div style={{ fontSize: '70%', margin: '0.5em 0 1em' }}>{t('saved_to_local_file')} - {fileName()} </div>

    </Container>
  )
}
