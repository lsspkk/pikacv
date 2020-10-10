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
  make_cv: 'Print',
  import: 'Import',
  export: 'Export',
  skillLevelsText: 'Description of Skill Levels',
  textFields: 'Text Fields',
  introduction: 'Build a fast cv by entering your information, skills and studies. Customize the layout and print into PDF.',
  saved_to_local_storage: '(saved to local storage)',
  reset : 'Reset',
  default_layout_and_textfields: 'Use default layout and text fields',
  choose_what_to_export: 'What to export',
  both: 'Both',
  school_organization : 'School/Organization',
  degree_description : 'Degree/Description',
  date: 'Date',
  save_to_file: 'Export',
  saved_to_local_file: 'Will be saved into a local file',
  read_information: 'Read Information',
  read_layout: 'Read Layout',
  choose_what_to_import: 'What to import',
  load_from_file: 'Read local file',
  choose_a_file: 'Choose a file',
  insert_your_information : 'Insert your information',
  name : 'Name',
  photo: 'Photo',
  firstname_lastname: 'John Doe',
  address_phone_email : 'Address, Phone, Email',
  address_phone_email_placeholder : 'SomeSt 1&#10;20100 Turku&#10;045 11002200&#10;some@email.com',
  summary : 'Summary',
  summary_placeholder: 'Your most essential abilities, achievements, current activity etc.',
  workhistory: 'Exprerience',
  skills: 'Skills',
  single_skill : 'Skill',
  education: 'Education',
  save: 'Save',
  add: 'Add',
  company: 'Company',
  role: 'Role',
  start_date : 'Startdate',
  end_date_or_empty : 'Enddate (or empty)',
  workdescription : 'Work description',
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
  make_cv: 'Tulosta',
  import: 'Tuo',
  export: 'Vie',
  skillLevelsText: 'Taitotasojen kuvaus',
  textFields: 'Vakiotekstit',
  introduction: 'Tee pika cv syöttämällä tiedot, taidot, opinnot. Säädä ulkoasu, ja tulosta PDF-tiedostoon.',
  saved_to_local_storage: '(tallentuu local storageen)',
  reset: 'Oletusvalinnat',
  default_layout_and_textfields : 'Palauttaa oletusarvot ulkoasuun ja vakioteksteihin',
  choose_what_to_export: 'Mitkä viedään',
  both: 'Molemmat',
  school_organization: 'Koulu/Järjestäjä',
  degree_description : 'Tutkinto/Kuvaus',
  date: 'Aika',
  save_to_file: 'Vie',
  saved_to_local_file: 'Tallennetaan tiedostoon',
  read_information: 'Luetut Tiedot',
  read_layout: 'Luettu Ulkoasu',
  choose_what_to_import: 'Mitkä tuodaan',
  load_from_file: 'Lue tiedosto',
  choose_a_file: 'Valitse tiedosto',
  insert_your_information : 'Syötä tietosi',
  name : 'Nimi',
  photo: 'Valokuva',
  firstname_lastname: 'Etunimi Sukunimi',
  address_phone_email : 'Osoite, puhelin sähköposti',
  address_phone_email_placeholder : 'Kotikatu 1&#10;00100 Helsinki&#10;puh.0401234567&#10;etunimi@gmailcom',
  summary : 'Tiivistelmä',
  summary_placeholder: 'Olennaisin tai yleistiedot sinusta&#10;ja saavutuksista&#10;sekä nykytilanteesta jne...',
  workhistory: 'Kokemus',
  skills: 'Taidot',
  single_skill : 'Taito',
  education: 'Koulutus',
  save: 'Tallenna',
  add: 'Lisää',
  company: 'Työnantaja',
  role: 'Tehtävä',
  start_date : 'Aloituspvm',
  end_date_or_empty : 'Lopetuspvm (tai tyhjä)',
  workdescription : 'Tehtäväkuvaus',
}

let currentLanguage = 'fi'
export function translate(text) {
  if( 'en' === currentLanguage && Object.keys(en).includes(text) ) {
    return en[text]
  }
  if( 'fi' === currentLanguage && Object.keys(fi).includes(text) ) {
    return fi[text]
  }
  return text
}
export function setLanguage(language) {
  if( language !== 'fi' && language !== 'en') {
    throw new Error(`Language ${language} not supported`)
  }
  currentLanguage = language
}
export function useTranslation() {
  return { 
    t : translate, 
    setLanguage: setLanguage,
    currentLanguage: () => currentLanguage
  }
}