import React, { useState, useRef } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Control, InputFile, Radio } from 'react-bulma-components/lib/components/form'
import Container from 'react-bulma-components/lib/components/container'
import Button from 'react-bulma-components/lib/components/button'
import Icon from 'react-bulma-components/lib/components/icon'
import Columns from 'react-bulma-components/lib/components/columns'
import { Header } from './Header'
import { useTranslation } from './useTranslation'

const small100 = {
  width: '90vw',
  fontSize: '0.6em',
  height: '20em'
}

export function ImportView({ setLayout, setInformation }) {
  const t = useTranslation('fi')
  const [option, setOption] = useState('both')
  const [error, setError] = useState('')
  const [readLayout, setReadLayout] = useState('')
  const [readInformation, setReadInformation] = useState('')
  const [canImport, setCanImport] = useState(false)
  const importInput = useRef()

  const readFile = (fileContent) => {
    try {
      setError('')
      setReadLayout('')
      setReadInformation('')
      const data = JSON.parse(fileContent)
      if (option !== 'information') {
        if (data.layout === undefined) throw new Error(t('error_on_read_file_field') + 'layout')
        setReadLayout(data.layout)
      }
      if (option !== 'layout') {
        if (data.information === undefined) throw new Error(t('error_on_read_file_field') + 'layout')
        setReadInformation(data.information)
      }
      setCanImport(true)
    } catch (error) {
      setCanImport(false)
      console.log(error)
      showError(error)
    }
  }
  const showError = (error) => {
    setError(error)
    window.setTimeout(() => setError(''), 4000)
  }
  const setChangedOption = (newValue) => {
    if (option !== newValue) {
      setOption(newValue)
      setCanImport(false)
      setReadInformation('')
      setReadLayout('')
    }
  }
  const onImport = () => {
    if (option !== 'information') {
      setLayout(readLayout)
    }
    if (option !== 'layout') {
      setInformation(readInformation)
    }
    setCanImport(false)
    setReadInformation('')
    setReadLayout('')
  }
  console.log(importInput)
  return (
    <Container style={{ margin: '1em' }}>
      <Header>{t('choose_what_to_import')}</Header>
      <Field className="is-horizontal" style={{ maxWidth: '30em', margin: '1em 3em', display: 'flex', alignContent: 'flex-end', justifyItems: 'center' }}>
        <Label className="field-label">{t('information')}</Label>
        <Radio name='option' className="field-body" checked={option === 'information'} onChange={() => setChangedOption('information')} />
        <Label className="field-label">{t('layout')}</Label>
        <Radio name='option' className="field-body" checked={option === 'layout'} onChange={() => setChangedOption('layout')} />
        <Label className="field-label">{t('both')}</Label>
        <Radio name='option' className="field-body" checked={option === 'both'} onChange={() => setChangedOption('both')} />
      </Field>
      <Field>
        <form onSubmit={()=> console.log(importInput.current.files[0].name)}>
        <Label onClick={(e) => importInput.current.click()}>{t('load_from_file')}</Label>
        <Control>
          <input ref={importInput} value='' type="file" onChange={(e) => {
            console.log(e.target)
            e.preventDefault()
            const reader = new FileReader()
            reader.readAsDataURL(importInput.current.files[0])
            reader.onload = (e) => readFile(e.target.result)
          }}
            />
            <Button type="submit">Yea</Button>
        </Control>
        </form>
      </Field>


      <Columns>
        {error.length > 0 &&
          <Columns.column size={12} className="is-warning">
            {error}
          </Columns.column>
        }
        {option !== 'layout' &&
          <Columns.Column size={option === 'both' ? 6 : 12}>

            <Header>{t('imported_information')}</Header><br />
            <pre style={small100}>
              {JSON.stringify(readInformation, '', 2)}
            </pre>



          </Columns.Column>
        }
        {option !== 'information' &&
          <Columns.Column size={option === 'both' ? 6 : 12}>


            <Header>{t('imported_layout')}</Header><br />
            <pre style={small100}>
              {JSON.stringify(readLayout, '', 2)}
            </pre>

          </Columns.Column>
        }
      </Columns>

      { canImport &&
        <Button color='info' onClick={() => onImport()}>{t('import') + t(option)}</Button>
      }
    </Container>
  )
}
