import React, {useState, useRef, useEffect } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons'

export function Skill ({skill, change, remove}) {
  const color = (level) => level <= skill.level ? '#3298dc' : '#bdbdbd'
  return (
    <div style={{display: 'block', width: '40%', minWidth: '25rem', float: 'left'}}>
      <Columns style={{alignItems: 'flex-end'}}>
        <Columns.Column >
          <Field>
            <Label>Taito</Label>
            <Input type='text' placeholder='Java/React' value={skill.name}
              onChange={(e) => change({...skill, name: e.target.value})} />
          </Field>
        </Columns.Column>
        <Columns.Column >
          <Field>
            <Label>Taso</Label>
            <div style={{padding: '0.5em 0'}}>
              <FontAwesomeIcon icon={faStar}
                color={color(1)}
                style={{cursor: 'pointer'}}
                onClick={() => change({...skill, level: 1})}
              />
              <FontAwesomeIcon icon={faStar}
                color={color(2)}
                style={{cursor: 'pointer'}}
                onClick={() => change({...skill, level: 2})}
              />
              <FontAwesomeIcon icon={faStar}
                onClick={() => change({...skill, level: 3})}
                style={{cursor: 'pointer'}}
                color={color(3)}
              />
              <FontAwesomeIcon icon={faStar}
                color={color(4)}
                style={{cursor: 'pointer'}}
                onClick={() => change({...skill, level: 4})}
              />
              <FontAwesomeIcon icon={faStar}
                color={color(5)}
                style={{cursor: 'pointer'}}
                onClick={() => change({...skill, level: 5})}
              />
            </div>
          </Field>
        </Columns.Column>
        <Columns.Column>
          <Button color='danger' onClick={(e) => remove({skill})}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Columns.Column>
      </Columns>

    </div>
  )
}
