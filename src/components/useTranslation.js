const en = {
  header: 'Header',
  basic: 'Paragraph',
  title: 'Titles',
  skill: 'Skills',
  label: 'Labels',
  fontFamily: 'Font',
  fontWeight: 'Weight',
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
  textFields: 'Text Fields',
  introduction: 'Build a fast cv by entering your information, skills and studies. Customize the layout and print into PDF.',
  saved_to_local_storage: '(saved to local storage)',
  reset : 'Reset layout'
}
const fi = {
  header: 'Ylätunniste',
  basic: 'Leipäteksti',
  title: 'Otsikot',
  skill: 'Taidot',
  label: 'Avainsanat',
  fontFamily: 'Fontti',
  fontWeight: 'Paksuus',
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
  textFields: 'Vakiotekstit',
  introduction: 'Tee pika cv syöttämällä tiedot, taidot, opinnot. Säädä ulkoasu, ja tulosta PDF-tiedostoon.',
  saved_to_local_storage: '(tallentuu local storageen)',
  reset: 'Oletusvalinnat'

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