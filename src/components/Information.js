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
import Columns from 'react-bulma-components/lib/components/columns'

export const emptyInformation = {
  name: '',
  contact: '',
  photo: '',
  summary: '',
  workhistory: [],
  skills: []
}

export function Information ({information, setInformation}) {
  const photo = useRef(null)
  const [photoImage, setPhotoImage] = useState('')

  useEffect(() => {
    const loaded = window.localStorage.getItem('pikacv')
    loaded && setInformation(JSON.parse(loaded))
  }, [setInformation])

  const changeHistory = (historyitem) => {
    const updatedHistory = [...information.workhistory.filter(h => h.id !== historyitem.id), historyitem]
    setInformation({...information, workhistory: updatedHistory})
  }
  const removeHistory = (historyitem) => {
    const updatedHistory = information.workhistory.filter(h => h.id !== historyitem.id)
    setInformation({...information, workhistory: updatedHistory})
  }
  const changeSkill = (skillitem) => {
    const updatedSkills = [...information.skills.filter(h => h.id !== skillitem.id), skillitem]
    setInformation({...information, skills: updatedSkills})
  }
  const removeSkill = (skillitem) => {
    const updatedSkills = information.skills.filter(h => h.id !== skillitem.id)
    setInformation({...information, skills: updatedSkills})
  }

  return (
    <div>
      <Section>
        <Columns>
          <Columns.Column>
            <Header>Syötä tietosi</Header>
          </Columns.Column>
          <Columns.Column>

            <Button color='info' onClick={() => window.localStorage.setItem('pikacv', JSON.stringify(information))}>Tallenna</Button>
            <span style={{padding: '1em', lineHeight: '2.5em'}}>(tallentuu local storageen)</span>
          </Columns.Column>
        </Columns>
      </Section>
      <Section>
        <Columns>
          <Columns.Column>
            <Field>
              <Label>Nimi</Label>
              <Input type='text' placeholder='Etunimi Sukunimi' value={information.name} onChange={(e) => setInformation({...information, name: e.target.value})} />
            </Field>
          </Columns.Column>
          <Columns.Column>
            <Field>
              <Label>Osoite, puhelin, sähköposti</Label>
              <Textarea placeholder='Kotikatu 1&#10;00100 Helsinki&#10;puh.0401234567&#10;etunimi@gmailcom'
                value={information.contact} onChange={(e) => setInformation({...information, contact: e.target.value})}
              />
            </Field>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column >
            <Field>
              <Label>Valokuva (valitse tiedosto)</Label>
              <Control>
                <InputFile ref={photo} value={information.photo} onChange={(e) => {
                  const reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  reader.onload = () => { setPhotoImage(reader.result) }
                }
                }
                icon={<Icon icon='upload' />} boxed placeholder='Textarea' />
              </Control>
            </Field>
          </Columns.Column>
          <Columns.Column >
            <Image size={128} src={photoImage} />
          </Columns.Column>
        </Columns>
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>Työkokemus</Header>
          <Button onClick={() => setInformation({...information, workhistory: [...information.workhistory, { id: JSON.stringify(Date.now()), company: '', role: '', description: '' }] })}>Lisää</Button>
        </h1>
        { information.workhistory.map(history => <WorkHistory key={'h' + history.id} history={history} change={changeHistory} remove={removeHistory} />)}
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>Osaaminen</Header>
          <Button onClick={() => setInformation({...information, skills: [...information.skills, { id: JSON.stringify(Date.now()), name: '', level: -1 }] })}>Lisää</Button>
        </h1>
        { information.skills.map(s => <Skill key={'s' + s.id} skill={s} change={changeSkill} remove={removeSkill} />)}
      </Section>

    </div>
  )
}
