import React, { useEffect } from 'react'

const en = {
  header: 'Header',
  basic: 'Paragraph',
  title: 'Titles',
  skill: 'Skills',
  fontFamily: 'Font',
  color: 'Color',
  background: 'Background',
  fontSize: 'Size',
  columnSize: 'Column Size',
  information: 'Information',
  layout: 'Layout',
  make_cv: 'Make CV',
  import: 'Import',
  export: 'Export',
  skillLevelsText: 'Description of Skill Levels',
  textFields: 'Text Fields'
}
const fi = {
  header: 'Ylätunniste',
  basic: 'Leipäteksti',
  title: 'Otsikot',
  skill: 'Taidot',
  fontFamily: 'Fontti',
  color: 'Väri',
  background: 'Tausta',
  fontSize: 'Koko',
  columnSize: 'Palstan koko',
  information: 'Tiedot',
  layout: 'Ulkoasu',
  make_cv: 'Tee CV',
  import: 'Tuo',
  export: 'Vie',
  skillLevelsText: 'Taitotasojen kuvaus',
  textFields: 'Vakiotekstit'

}
export function useTranslation(language) {
  return (text) => {
    if( 'en' === language && Object.keys(en).includes(text) ) {
      return en[text]
    }
    if( 'fi' === language && Object.keys(en).includes(text) ) {
      return fi[text]
    }
    return text
  }
}