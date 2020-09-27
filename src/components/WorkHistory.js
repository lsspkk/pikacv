import React, {useState, useRef, useEffect } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash, faBriefcase } from '@fortawesome/free-solid-svg-icons'

export function WorkHistory ({history, change, remove}) {
  return (
    <div>
      <Columns style={{alignItems: 'flex-end'}}>
        <Columns.Column >
          <Field>
            <Label>Yritys</Label>
            <Input type='text' placeholder='Yritysnimi/Freelancer/Yrittäjä' value={history.company}
              onChange={(e) => change({...history, company: e.target.value})} />
          </Field>
        </Columns.Column>
        <Columns.Column >
          <Field>
            <Label>Rooli</Label>
            <Input type='text' placeholder='Tallentaja' value={history.role}
              onChange={(e) => change({...history, role: e.target.value})} />
          </Field>
        </Columns.Column>
        <Columns.Column >
          <Field>
            <Label>Tehtäväkuvaus</Label>
            <Input type='text' placeholder='Kirjoitin koneella sitä sun tätä' value={history.description}
              onChange={(e) => change({...history, description: e.target.value})} />
          </Field>
        </Columns.Column>
        <Columns.Column>
          <Button color='danger' onClick={(e) => remove({history})}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Columns.Column>
      </Columns>

    </div>
  )
}
