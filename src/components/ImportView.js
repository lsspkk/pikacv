import React, { useState, useRef, useEffect } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Control, InputFile, Radio } from 'react-bulma-components/lib/components/form'
import Container from 'react-bulma-components/lib/components/container'
import Button from 'react-bulma-components/lib/components/button'
import Icon from 'react-bulma-components/lib/components/icon'
import Columns from 'react-bulma-components/lib/components/columns'
import { Header } from './Header'
import { useTranslation } from './useTranslation'
import {
  useHistory
} from 'react-router-dom'

const small100 = {
  width: '100%',
  fontSize: '0.6em',
  height: '20em'
}

export function ImportView({ setLayout, setInformation }) {
  const history = useHistory()
  const { t } = useTranslation()
  const [option, setOption] = useState('both')
  const [error, setError] = useState('')
  const [readLayout, setReadLayout] = useState({})
  const [readInformation, setReadInformation] = useState({})
  const [canImport, setCanImport] = useState(false)
  const importInput = useRef(null)


  const readFile = (file) => {
    try {
      setError('')
      setReadLayout({})
      setReadInformation({})
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => readContent(reader.result)
    } catch (error) {
      setCanImport(false)
      console.log(error)
      showError(error)
    }
  }
  const readContent = (fileContent) => {
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
  }
  const showError = (error) => {
    setError(error)
    window.setTimeout(() => setError(''), 4000)
  }
  const setChangedOption = (newValue) => {
    if (option !== newValue) {
      setOption(newValue)
      setCanImport(false)
      setReadInformation({})
      setReadLayout({})
    }
  }
  const onImport = async () => {
    if (option !== 'information') {
      await setLayout({ ...readLayout })
    }
    if (option !== 'layout') {
      await setInformation({ ...readInformation })
    }
    setCanImport(false)
    setReadInformation({})
    setReadLayout({})
    history.push('/layout')
  }
  const readLayoutEmpty = Object.keys(readLayout).length === 0
  const readInformationEmpty = Object.keys(readInformation).length === 0

  return (
    <Container style={{ margin: '1em' }}>
      <Field>
        <Label>{t('load_from_file')}</Label>
        <Control>
          <InputFile ref={importInput} onChange={(e) => readFile(e.target.files[0])}
            label={t('choose_a_file')} icon={<Icon icon='upload' />} boxed placeholder='Textarea' />
        </Control>
      </Field>


      <Columns>
        {error.length > 0 &&
          <Columns.column size={12} className="is-warning">
            {error}
          </Columns.column>
        }
        {(!readLayoutEmpty || !readInformationEmpty) && <>
          <Columns.Column size={option === 'both' ? 6 : 12}>

            <Header>{t('read_information')}</Header><br />
            <pre style={small100}>
              {JSON.stringify(readInformation, '', 2)}
            </pre>



          </Columns.Column>
          <Columns.Column size={option === 'both' ? 6 : 12}>


            <Header>{t('read_layout')}</Header><br />
            <pre style={small100}>
              {JSON.stringify(readLayout, '', 2)}
            </pre>

          </Columns.Column>
        </>

        }
        {canImport &&
          <>
            <Columns.Column size={12}>
              <Header>{t('choose_what_to_import')}</Header>
            </Columns.Column>
            <Columns.Column>
              <Control className="" style={{ maxWidth: '30em', margin: '1em 3em', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <Radio name='option' className="field-body" checked={option === 'information'} onClick={(e) => setOption('information')}>
                  {t('information')}
                </Radio>
                <Radio name='option' className="field-body" checked={option === 'layout'} onClick={(e) => setOption('layout')}>
                  {t('layout')}
                </Radio>
                <Radio name='option' className="field-body" checked={option === 'both'} onClick={(e) => setOption('both')}>
                  {t('both')}
                </Radio>
              </Control>
            </Columns.Column>
            <Columns.Column>
              <Field >
                <Button color='info' onClick={() => onImport()}>{t('import')}</Button>
              </Field>
            </Columns.Column>
          </>
        }
      </Columns>

    </Container>
  )
}
