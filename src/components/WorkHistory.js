import React from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Input } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const mw40 = { maxWidth : '60%'}

export function WorkHistory ({history, change, remove}) {
  return (
    <div style={{margin:'0 0 4em'}}>
      <Columns>
        <Columns.Column size={3}>
          <Field className="is-horizontal">
            <Label className="field-label">Yritys</Label>
            <Input className="field-body" style={mw40} type='text' placeholder='Yritysnimi/Freelancer/Yrittäjä' value={history.company}
              onChange={(e) => change('workhistory', {...history, company: e.target.value})} />
          </Field>
          <Field className="is-horizontal">
            <Label className="field-label">Rooli</Label>
            <Input className="field-body" style={mw40} type='text' placeholder='Tallentaja' value={history.role}
              onChange={(e) => change('workhistory', {...history, role: e.target.value})} />
          </Field>
        </Columns.Column>
        <Columns.Column  size={3}>
          <Field className="is-horizontal">
            <Label className="field-label">Ajankohta: alkupvm</Label>
            <Input className="field-body" style={mw40} type='text' placeholder='5.6.2020' value={history.startDate}
              onChange={(e) => change('workhistory', {...history, startDate: e.target.value})} />
          </Field>
          <Field className="is-horizontal">
            <Label className="field-label">loppupvm (tai tyhjä)</Label>
            <Input className="field-body" style={mw40} type='text' placeholder='3.10.2020' value={history.endDate}
              onChange={(e) => change('workhistory', {...history, endDate: e.target.value})} />
          </Field>
        </Columns.Column>
        <Columns.Column size={6} >
          <div style={{display: 'flex', alignItems: 'flex-end'}}>
           <Field style={{justifyContent: 'flex-end',marginBottom:'0em',flex:'2'}}>
            <Label>Tehtäväkuvaus</Label>
            <Input className="field-body" type='text' placeholder='Kirjoitin koneella sitä sun tätä' value={history.description}
              onChange={(e) => change({...history, description: e.target.value})} />
          </Field>
          <Field className="is-horizontal" style={{marginLeft: '2em', justifyContent: 'flex-end'}}>
          <Button color='danger' onClick={() => remove('workhistory', history)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          </Field>
          </div>
        </Columns.Column>
      </Columns>


    </div>
  )
}
