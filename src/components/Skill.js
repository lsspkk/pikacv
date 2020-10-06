import React, {  } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Label, Input } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons'


export function SkillInput({ skill, change, remove }) {
  const color = (level) => level <= skill.level ? '#3298dc' : '#bdbdbd'
  return (
    <div style={{ flex: '1', minWidth: '25rem', flexGrow: '0', margin: '1em 0' }}>
      <Columns style={{ alignItems: 'flex-end' }}>
        <Columns.Column >
          <Field>
            <Label>Taito</Label>
            <Input type='text' placeholder='Java/React' value={skill.name}
              onChange={(e) => change('skills', { ...skill, name: e.target.value })} />
          </Field>
        </Columns.Column>
        <Columns.Column >
          <Field>
            <Label>Taso</Label>
            <div style={{ padding: '0.5em 0' }}>
              <FontAwesomeIcon icon={faStar}
                color={color(1)}
                style={{ cursor: 'pointer' }}
                onClick={() => change('skills',{ ...skill, level: 1 })}
              />
              <FontAwesomeIcon icon={faStar}
                color={color(2)}
                style={{ cursor: 'pointer' }}
                onClick={() => change('skills',{ ...skill, level: 2 })}
              />
              <FontAwesomeIcon icon={faStar}
                onClick={() => change('skills',{ ...skill, level: 3 })}
                style={{ cursor: 'pointer' }}
                color={color(3)}
              />
              <FontAwesomeIcon icon={faStar}
                color={color(4)}
                style={{ cursor: 'pointer' }}
                onClick={() => change('skills',{ ...skill, level: 4 })}
              />
              <FontAwesomeIcon icon={faStar}
                color={color(5)}
                style={{ cursor: 'pointer' }}
                onClick={() => change({ ...skill, level: 5 })}
              />
            </div>
          </Field>
        </Columns.Column>
        <Columns.Column>
          <Button color='danger' onClick={() => remove('skills',skill)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Columns.Column>
      </Columns>

    </div>
  )
}

export function Skill({ skill, layout }) {
  const color = (level) => level <= skill.level ? layout.skill.color : '#bdbdbd'
  console.log(skill)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        {skill.name}
      </div>
      <div>
        <FontAwesomeIcon icon={faStar}
          color={color(1)}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon icon={faStar}
          color={color(2)}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon icon={faStar}
          style={{ cursor: 'pointer' }}
          color={color(3)}
        />
        <FontAwesomeIcon icon={faStar}
          color={color(4)}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon icon={faStar}
          color={color(5)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>)
}

