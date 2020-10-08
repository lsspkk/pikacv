import React, {useRef } from 'react'
import '../App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Control, Label, Input, Textarea, InputFile } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Icon from 'react-bulma-components/lib/components/icon'
import Image from 'react-bulma-components/lib/components/image'
import Container from 'react-bulma-components/lib/components/container'
import Columns from 'react-bulma-components/lib/components/columns'
import { Section } from 'react-bulma-components'
import { WorkHistory } from './WorkHistory'
import { SkillInput } from './Skill'
import { Header } from './Header'
import { emptyEducation, Education } from './Education'

export const emptyInformation = {
  name: '',
  contact: '',
  photo: '',
  photoimage: {},
  summary: '',
  workhistory: [],
  skills: [],
  education: []
}

export function InformationView ({information, setInformation, save}) {
  const photo = useRef()
  
  const change = (field, item) => {
    const index = information[field].findIndex(h => h.id === item.id)
    if( index === -1 ) {
      return
    }
    const newValue = [...information[field].slice(0,index), item, ...information[field].slice(index+1, information.workhistory.length)]
    let newInformation = {...information}
    newInformation[field] = newValue
    setInformation(newInformation)
  }
  const remove = (field, item) => {
    const newValue = information[field].filter(h => h.id !== item.id)
    let newInformation = {...information}
    newInformation[field] = newValue
    setInformation(newInformation)
  }

  return (
    <Container>
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
              <Label for={photo}>Valokuva (valitse tiedosto)</Label>
              <Control>
                <input ref={photo} type="file" value={information.photo} onChange={(e) => {
                  e.preventDefault()
                  const reader = new FileReader()
                  reader.readAsDataURL(photo.current.files[0])
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
        { information.workhistory.map(history => <WorkHistory key={'h' + history.id} history={history} change={change} remove={remove} />)}
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>Osaaminen</Header>
          <Button onClick={() => setInformation({...information, skills: [...information.skills, { id: JSON.stringify(Date.now()), name: '', level: -1 }] })}>Lisää</Button>
        </h1>
        <Columns style={{padding: '0 1.5em'}}>
        { information.skills.map(s => <SkillInput key={'s' + s.id} skill={s} change={change} remove={remove} />)}
        </Columns>
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>Koulutus</Header>
          <Button onClick={() => setInformation({...information, education: [...information.education, emptyEducation()] })}>Lisää</Button>
        </h1>
        { information.education.map(e => <Education key={'e' + e.id} education={e} change={change} remove={remove} />)}
      </Section>


    </Container>
  )
}
