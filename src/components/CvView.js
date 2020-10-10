import React from 'react'
import { Section } from 'react-bulma-components'
import Columns from 'react-bulma-components/lib/components/columns'
import { Skill } from './Skill'
import { Header } from './Header'
import { useTranslation } from './useTranslation'


const sumStyle = {
  padding: '0.5em 0 2em',
  whiteSpace: 'pre-line'
}

export function CvView ({layout, information}) {
  const { t } = useTranslation()
  const sortSkills = (a,b) => {
    const level = (b.level - a.level)
    return level != 0 ? level : b.name > a.name ? -1 : a.name > b.name ? 1 : 0
  }

  const skillLevelsText = layout.textFields.filter(field => field.name === 'skillLevelsText' && field.language === 'en')

  return (
    <div style={layout.basic}>
      <div className='cv-header' style={{...layout.header, height: '30%', minHeight: '300px', display: 'flex'}}>
        <img src={information.photoImage} style={{height: '300px'}} />
        <Section>
          <Header>{information.name}</Header>
          <p style={{whiteSpace: 'pre-line'}}>{information.contact}</p>
        </Section>
      </div>
      <div style={{margin: '1em 0 2em'}} className='cv-summary' >
        <div style={{...layout.title,marginTop:'1em'}}>{t('information')}</div>
        <div style={sumStyle}>{information.summary.split('\n').map(t => <>{t}<br/></>)}</div>
      </div>

      <div style={{margin: '1em 0 2em',breakAfter: 'page'}} className='cv-workhistory' >
      <div style={{...layout.title,margin:'1em 0 1em'}}>{t('workhistory')}</div>
        { information.workhistory.map(historyitem => (
          <Columns key={JSON.stringify(historyitem)}>
            <Columns.Column size={8} >
            <div className='company'>
              <span  style={{...layout.label}} >{t('company')}</span> {historyitem.company}
              </div>
              <div className='role'>
              <span  style={{...layout.label}} >{t('role')}</span> {historyitem.role}
              </div>
              <div className='description'>
              {historyitem.description}
              </div>

            </Columns.Column>
            <Columns.Column size={4}>
            <div className='dates' style={{ color: layout.title.color, textAlign: 'right',paddingRight:'3em'}}>
              {`${historyitem.startDate}${historyitem.endDate ? (' - ' + historyitem.endDate): ''}`}
              </div>
            
            </Columns.Column>
          </Columns>
        ))}
      </div>

      <div style={{margin: '1em 0 2em'}} className='cv-skills' >
        <div style={{...layout.title,margin:'1em 0 1em'}}>{t('skills')}</div>
        <Columns>
        { information.skills.sort(sortSkills).map(skill => 
        <Columns.Column size={layout.skill.columnSize}>
        <Skill key={JSON.stringify(skill)} skill={skill} layout={layout}/>
        </Columns.Column>
        ) }
        { skillLevelsText.length > 0 &&
        <Columns.Column size={12}>
        <p style={{whiteSpace: 'pre-line'}}>{skillLevelsText[0].value}</p>
        </Columns.Column>
        }
        </Columns>
        
      </div>

      <div style={{margin: '1em 0 2em'}} className='cv-education' >
      <div style={{...layout.title,margin:'1em 0 1em'}}>{t('education')}</div>
        { information.education.map(item => (
          <Columns key={JSON.stringify(item)}>
            <Columns.Column size={8} >
            <div className='school'>
              <span  style={{...layout.label}} >{item.school}</span>
              </div>
              <div className='degree'>
              {item.degree}
              </div>
              
            </Columns.Column>
            <Columns.Column size={4}>
            <div className='dates' style={{ color: layout.title.color, textAlign: 'right',marginRight:'3em'}}>
              {item.date}
              </div>
            
            </Columns.Column>
          </Columns>
        ))}
      </div>

      <Section className='' >
      </Section>


    </div>
  )
}
