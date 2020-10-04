import React, {useRef } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Control, Label, Input, Textarea, InputFile } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Icon from 'react-bulma-components/lib/components/icon'
import Image from 'react-bulma-components/lib/components/image'
import { Section } from 'react-bulma-components'
import { WorkHistory } from './WorkHistory'
import { SkillInput } from './Skill'
import { Header } from './Header'
import Columns from 'react-bulma-components/lib/components/columns'

export const emptyInformation = {
  name: '',
  contact: '',
  photo: '',
  photoimage: {},
  summary: '',
  workhistory: [],
  skills: []
}

export function Information ({information, setInformation, save}) {
  const photo = useRef()
  const changeHistory = (historyitem) => {
    const index = information.workhistory.findIndex(h => h.id === historyitem.id)
    if( index === -1 ) {
      return
    }
    const updatedHistory = [...information.workhistory.slice(0,index), historyitem, ...information.workhistory.slice(index+1, information.workhistory.length)]
    setInformation({...information, workhistory: updatedHistory})
  }
  const removeHistory = (historyitem) => {
    const updatedHistory = information.workhistory.filter(h => h.id !== historyitem.id)
    setInformation({...information, workhistory: updatedHistory})
  }
  const updateSkill = (skillitem) => {
    const index = information.skills.findIndex(h => h.id === skillitem.id)
    if( index === -1 ) {
      return
    }
    const updatedSkills = [...information.skills.slice(0,index), skillitem, ...information.skills.slice(index+1, information.skills.length)]
    setInformation({...information, skills: updatedSkills})
  }
  const removeSkill = (skillitem) => {
    const updatedSkills = information.skills.filter(h => {
      console.log(h.id, skillitem.id, h.id !== skillitem.id)
      return h.id !== skillitem.id
    })

    setInformation({...information, skills: updatedSkills})
  }

  return (
    <div>
      <Section>
        <Columns>
          <Columns.Column>
            <Header>Syötä tietosi</Header>
          </Columns.Column>
          <Columns.Column style={{textAlign:'right'}}>

            <Button color='info' onClick={() => save()}>Tallenna</Button>
            <div style={{fontSize:'70%', margin: '0.5em 0 1em'}}>(tallentuu local storageen)</div>
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
            <Field>
              <Label>Osoite, puhelin, sähköposti</Label>
              <Textarea placeholder='Kotikatu 1&#10;00100 Helsinki&#10;puh.0401234567&#10;etunimi@gmailcom'
                value={information.contact} onChange={(e) => setInformation({...information, contact: e.target.value})}
              />
            </Field>
          </Columns.Column>
          <Columns.Column>
          <Field>
              <Label>Yleistiedot</Label>
              <Textarea rows={8} placeholder='Olennaisin tieto on&#10;siinä ja tässä&#10;sekä tuossa&#10;lisäksi on mainittava tämä'
                value={information.summary} onChange={(e) => setInformation({...information, summary: e.target.value})}
              />
            </Field>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column style={{display: 'flex', justifyItems:'flex-start'}}>
            <Field>
              <Label>Valokuva (valitse tiedosto)</Label>
              <Control>
                <InputFile ref={photo} value={information.photo} onChange={(e) => {
                  const reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  reader.onload = () => setInformation({...information, photoImage: reader.result })
                }}
                icon={<Icon icon='upload' />} boxed placeholder='Textarea' />
              </Control>
            </Field>
            <Image size={128} src={information.photoImage} style={{marginLeft:'3em'}}/>
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
        <Columns style={{padding: '0 1.5em'}}>
        { information.skills.map(s => <SkillInput key={'s' + s.id} skill={s} change={updateSkill} remove={removeSkill} />)}
        </Columns>
      </Section>

    </div>
  )
}
