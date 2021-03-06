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
import { useTranslation } from './useTranslation'

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
  const {t} = useTranslation()

  const change = (field, item) => {
    const newValue = information[field].map(h => h.id === item.id ? item : h)
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
            <Header>{t('insert_your_information')}</Header>
          </Columns.Column>
          <Columns.Column style={{textAlign:'right'}}>

            <Button color='info' onClick={() => save()}>{t('save')}</Button>
            <div style={{fontSize:'70%', margin: '0.5em 0 1em'}}>{t('saved_to_local_storage')}</div>
          </Columns.Column>
        </Columns>
      </Section>
      <Section>
        <Columns>
          <Columns.Column>
            <Field>
              <Label>{t('name')}</Label>
              <Input type='text' placeholder={t('firstname_lastname')} value={information.name} onChange={(e) => setInformation({...information, name: e.target.value})} />
            </Field>
            <Field>
              <Label>{t('address_phone_email')}</Label>
              <Textarea placeholder={t('address_phone_email')}
                value={information.contact} onChange={(e) => setInformation({...information, contact: e.target.value})}
              />
            </Field>
          </Columns.Column>
          <Columns.Column>
          <Field>
              <Label>{t('summary')}</Label>
              <Textarea rows={8} placeholder={t('summary_placeholder')}
                value={information.summary} onChange={(e) => setInformation({...information, summary: e.target.value})}
              />
            </Field>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column style={{display: 'flex', justifyItems:'flex-start'}}>
            <Field>
              <Label>{t('photo')}</Label>
              {information.photo}
              <Control>
                <InputFile ref={photo} type="file" onChange={(e) => {
                  const reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  reader.onload = () => setInformation({...information, photoImage: reader.result })
                }}
                label={t('choose_a_file')}
                icon={<Icon icon='upload' />} 
                boxed placeholder='Textarea' />
              </Control>
            </Field>
            <Image size={128} src={information.photoImage} style={{marginLeft:'3em'}}/>
          </Columns.Column>
        </Columns>
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>{t('workhistory')}</Header>
          <Button onClick={() => setInformation({...information, workhistory: [...information.workhistory, { id: JSON.stringify(Date.now()), company: '', role: '', description: '' }] })}>{t('add')}</Button>
        </h1>
        { information.workhistory.map(history => <WorkHistory key={'h' + history.id} history={history} change={change} remove={remove} />)}
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>{t('skills')}</Header>
          <Button onClick={() => setInformation({...information, skills: [...information.skills, { id: JSON.stringify(Date.now()), name: '', level: -1 }] })}>{t('add')}</Button>
        </h1>
        <Columns style={{padding: '0 1.5em'}}>
        { information.skills.map(s => <SkillInput key={'s' + s.id} skill={s} change={change} remove={remove} />)}
        </Columns>
      </Section>

      <Section>
        <h1 style={{display: 'flex', alignItems: 'center', width: '100%', paddingBottom: '1em'}}>
          <Header>{t('education')}</Header>
          <Button onClick={() => setInformation({...information, education: [...information.education, emptyEducation()] })}>{t('add')}</Button>
        </h1>
        { information.education.map(e => <Education key={'e' + e.id} education={e} change={change} remove={remove} />)}
      </Section>


    </Container>
  )
}
