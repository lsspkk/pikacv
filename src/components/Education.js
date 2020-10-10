import React from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Input } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from './useTranslation'

const mw40 = { maxWidth: '60%' }
export const emptyEducation = () => ({ id: JSON.stringify(Date.now()), school: '', degree: '', date: '' })

export function Education({ education, change, remove }) {
  const { t } = useTranslation()
  return (
    <Columns style={{ padding: '1em 0 ' }}>
      <Columns.Column size={8}>
        <Field className="is-horizontal">
          <Label className="field-label">{t('school_organization')}School/Organization</Label>
          <Input className="field-body" style={mw40} type='text' placeholder='School Name/Udemy/etc.' value={education.school}
            onChange={(e) => change('education', { ...education, school: e.target.value })} />
        </Field>
        <Field className="is-horizontal">
          <Label className="field-label">{t('degree_description')}Degree/Description</Label>
          <Input className="field-body" style={mw40} type='text' placeholder='Intermediate React/Master of Science' value={education.degree}
            onChange={(e) => change('education', { ...education, degree: e.target.value })} />
        </Field>
      </Columns.Column>
      <Columns.Column size={2} style={{justifySelf:'center'}}>
        <Field className="is-horizontal">
          <Label className="field-label">{t('date')}Aika</Label>
          <Input className="field-body" style={mw40} type='text' placeholder='5.6.2020' value={education.date}
            onChange={(e) => change('education', { ...education, date: e.target.value })} />
        </Field>
      </Columns.Column>
      <Columns.Column size={1}>
        <Field className="is-horizontal" style={{ justifyContent: 'flex-end' }}>
          <Button color='danger' onClick={() => remove('education', education)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Field>
      </Columns.Column>
    </Columns>
  )
}
