import keymirror from 'keymirror'

export const ContentTypes = keymirror({
  Product: '',
  Campaign: '',
  VideoList: '',
  ProductList: '',
  TalkToUs: '',
  Contact: '',
  CatalogList: '',
  DiscountList: '',
  Info: '',
  Message: '',
  OfferList: '',
  NewsList: '',
  NewsItem: ''
})

export const Brands = keymirror({
  Carestream: '',
  NewTom: '',
  DentsplySirona: '',
  Exocad: '',
  vhf: '',
  IvoclarVivadent: '',
  Vita: '',
  FormLabs: '',
  Anthos: '',
  NSK: '',
  BienAir: '',
  EMS: '',
  Durr: '',
  Euronda: '',
  Montellano: '',
  DigitalDentalSolutions: ''
})

export type Brand = keyof typeof Brands

const ContactIds = keymirror({
  VitorFerro: '',
  VitorSantos: '',
  AnaTeles: '',
  NunoDias: '',
  PatriciaPenela: '',
  LuisCoelhoMNT: '',
  LuisCoelhoDDS: '',
  CarlaCaixinhas: '',
  MariaCarvalho: '',
  AntonioSantos: '',
  SilviaBarbosa: '',
  JorgeRocha: '',
  AnaOliveira: '',
  GinaBernardes: '',
  CristinaRodrigues: '',
  JoseSabio: '',
  EduardoCorreia: '',
  FredericoLopes: '',
  AndreOliveira: '',
  FilipeFerreira: '',
  EngenhariaGeral: '',
  TiagoSantos: ''
})

export type ContactId = keyof typeof ContactIds

export interface Content {
  heading: string
  description: string
}

interface ActionButton {
  text: string
  link: string
}

const CTAButtonTypes = keymirror({
  VisitSite: ''
})

interface CTAButton {
  type: keyof typeof CTAButtonTypes,
  value: string
}

interface WithImage {
  image: string
  imageAlt: string
}

interface WithNewItem {
  newItem: boolean
}

interface WithMobileImage {
  mobileImage: string
  mobileImageAlt: string
}

export interface Offer extends WithImage, WithMobileImage {
  heading: string
  topDescription?: string
  bottomDescription?: string
  mobileBlueBackground?: boolean
}

export interface OfferList extends Content, WithImage, WithNewItem {
  type: typeof ContentTypes.OfferList
  offers: Offer[]
}

export interface LinksImageContent extends WithImage, Content, WithNewItem {
  linkSite?: string
  linkVideo?: string
  linkBrochure?: string
  actionButtons?: ActionButton[]
  ctaButton?: CTAButton
}

const ProductIds = keymirror({
  CS9600: '',
  CS82003D: '',
  GianoHR2D3DCEPH: '',
  Go2D3DCEPH: '',
  inEosX5: '',
  inLabMCXL: '',
  exocadSoftware: '',
  r5: '',
  z4: '',
  CS3600: '',
  CS3700: '',
  ProgramatP510: '',
  VACUMAT6000MP: '',
  Impressao: '',
  A7: '',
  A5: '',
  A3Plus: '',
  AutoclavesAnthos: '',
  Seladora: '',
  Cuba: '',
  Termodesinfetadora: '',
  AerosolDefender: '',
  SurgicPro: '',
  SMax: '',
  iClave: '',
  Chiropro: '',
  CA15: '',
  Airflow: '',
  Tornado: '',
  E9: ''
})

export type ProductId = keyof typeof ProductIds

export interface Product extends LinksImageContent {
  type: typeof ContentTypes.Product,
  brand: keyof typeof Brands
  name: string
  category: string
}

export interface ProductList extends Omit<Content, 'heading'> {
  type: typeof ContentTypes.ProductList
  brand: Brand
  productsIds: ProductId[]
}

export interface Campaign extends LinksImageContent {
  type: typeof ContentTypes.Campaign
}

export interface Video extends WithImage {
  src: string
  description: string
}

export interface VideoList extends Content {
  type: typeof ContentTypes.VideoList
  videos: Video[]
}

export interface Contact {
  type: typeof ContentTypes.Contact
  name: string,
  image: string,
  position: string,
  description: string,
  location?: string,
  phoneNumber: string
  email: string
  brand: Brand
  /** Don't show Teams CTA button */
  noTeams?: boolean
}

export interface TalkToUs extends Content {
  type: typeof ContentTypes.TalkToUs
  contacts: ContactId[]
}

export interface Catalog {
  image: string
  imageAlt: string
  description: string
  downloadLink: string
}

export interface CatalogGroup {
  heading: string
  catalogs: Catalog[]
}

export interface CatalogList extends Content {
  type: typeof ContentTypes.CatalogList
  heading: string
  description: string
  brandImage: string
  brandImageAlt: string
  storeLink: string
  phoneNumber: string
  catalogGroups: CatalogGroup[]
}

export interface DiscountGroup {
  image: string
  imageAlt: string
  description: string
  discounts: Content[]
}

export interface DiscountList extends Content {
  type: typeof ContentTypes.DiscountList
  brandImage: string
  brandImageAlt: string
  secondHeading: string
  footnote: string
  phoneNumber: string
  storeLink: string
  discountGroups: DiscountGroup[]
}

export interface Info extends Content, WithImage {
  type: typeof ContentTypes.Info
}

export interface Message extends Content, WithNewItem {
  type: typeof ContentTypes.Message
  /** The base URL for loading message iframe,
   *  which query strings can be added with custom values */
  baseSrc: string
  defaultEmailTo: string
}

export interface NewsItem extends Content, WithImage {
  type: typeof ContentTypes.NewsItem
}

const NewsItemIds = keymirror({
  news_expoVirtual: '',
  news_congressoOMD: '',
  news_expodental2020: ''
})

type NewsItemId = keyof typeof NewsItemIds

export interface NewsList {
  type: typeof ContentTypes.NewsList
  items: NewsItemId[]
}

export type ContentData =
  | Product
  | Campaign
  | VideoList
  | ProductList
  | TalkToUs
  | Contact
  | CatalogList
  | DiscountList
  | Info
  | Message
  | OfferList
  | NewsList
  | NewsItem

const contentPath = (path: string) => `/content/${path}`
const catalogImage = (file: string) => contentPath(`catalogs/${file}`)
const productImage = (id: ProductId) => contentPath(`products/${id}.png`)
export const brandImage = (id: Brand): string => contentPath(`brands/${id}.png`)
export const brandImageDark = (id: Brand): string => contentPath(`brands/${id}-dark.png`)
const campaignImage = (file: string) => contentPath(`campaigns/${file}`)
const videoImage = (file: string) => contentPath(`videos/${file}`)
const offerImage = (file: string) => contentPath(`offers/${file}`)
const newsImage = (file: string) => contentPath(`news/${file}`)

export const contentData = {

  // Products

  [ProductIds.CS9600]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Carestream,
    name: 'CS 9600',
    category: 'CBCT',
    image: productImage(ProductIds.CS9600),
    imageAlt: 'CS 9600',
    badge: 'badge.png',
    heading: 'Intelligence drives precision.',
    description: `      
Intelligence drives precision.

Mais inteligente e melhor do que nunca.
Com o seu novo m??dulo Scan Ceph e outras inova????es, o sistema CBCT mais inteligente do mundo est?? ainda mais inteligente e vers??til do que nunca. O <strong>CS 9600</strong> redefine a qualidade e a utiliza????o vers??til, tornando-o no sistema de imagem perfeito para profissionais e especialistas odontol??gicos que desejam um novo n??vel de precis??o.
    `,
    linkSite: 'https://www.carestreamdental.com/en-emea/csd-products/extraoral-imaging/cs-9600/',
    linkVideo: 'AWvPV7Fwkxw',
    linkBrochure: 'https://www.montellano.pt/PDF/CS_9600_Full_Brochure.pdf'
  },
  [ProductIds.CS82003D]: {
    type: ContentTypes.Product,
    newItem: true,
    brand: Brands.Carestream,
    name: 'CS 8200 3D',
    category: 'NOVO CBCT',
    image: productImage(ProductIds.CS82003D),
    imageAlt: 'CS 8200 3D',
    badge: 'badge.png',
    heading: 'See more. Do more.',
    description: `      
Expanda a sua vis??o. Expanda a sua clinica.

O <strong>NOVO CS8200 3D</strong> ?? um sistema CBCT comprovado e vers??til com um campo de vis??o estendido ?? ideal para cl??nicas que desejam expandir as suas capacidades de diagn??stico e tratamento. Equipado com tecnologias e software de imagem premium, o CS 8200 3D oferece excelente qualidade de imagem em todas as modalidades e ajuda a diferenciar a sua clinica, oferecendo mais servi??os.
    `,
    linkSite: 'https://www.carestreamdental.com/en-emea/csd-products/extraoral-imaging/cs-8200/',
    linkVideo: 'P7Z5uPMP_nE',
    linkBrochure: 'https://www.montellano.pt/PDF/CBCT_CS82003D.pdf'
  },
  [ProductIds.GianoHR2D3DCEPH]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.NewTom,
    name: 'Giano HR 2D/3D CEPH',
    category: 'CBCT',
    image: productImage(ProductIds.GianoHR2D3DCEPH),
    imageAlt: 'Giano HR 2D/3D CEPH',
    badge: 'badge.png',
    heading: 'Complete vision.',
    description: `      
Excel??ncia de imagem combinada com a versatilidade de um sistema completo, seguro e tecnologicamente avan??ado.
Imagens de alta qualidade que atendem a uma ampla gama de necessidades de diagn??stico cl??nico, tudo num dispositivo compacto.
<strong>GO 2D / 3D CEPH</strong> capaz de fornecer imagens de alta resolu????o, a plataforma d?? prioridade ?? sa??de do paciente gra??as aos protocolos de baixa exposi????o e ?? exclusiva tecnologia SafeBeam ???, que permite aos utilizadores adaptar a dose ??s suas necessidades de diagn??stico e ao tamanho da ??rea anat??mica examinada.
`,
    linkSite: 'https://www.newtom.it/en/dentale/imaging-extraoral/giano-hr/',
    linkVideo: 'WaXdS-cC4G4',
    linkBrochure: 'https://www.newtom.it/media/products/product/brochure/NEWTOM_GianoHR_2018_GB.pdf'
  },
  [ProductIds.Go2D3DCEPH]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.NewTom,
    name: 'Go 2D/3D CEPH',
    category: 'CBCT',
    image: productImage(ProductIds.Go2D3DCEPH),
    imageAlt: 'Go 2D/3D CEPH',
    badge: 'badge.png',
    heading: 'Perfect vision.',
    description: `      
O CBCT h??brido mais completo para imagens 2D / 3D.
Tecnologia inovadora e efici??ncia excepcional reunidas num dispositivo poderoso e vers??til. O <strong>GiANO HR</strong> garante um desempenho excelente em todas as situa????es com sensor m??vel, novo conceito de sistema telerradiogr??fico e tr??s configura????es 3D f??ceis de atualizar que atendem a todas as necessidades.
<strong>GiANO HR</strong> oferece uma ampla gama de exames 2D e 3D que s??o ideais para diagn??sticos de denti????o completa ou parcial, arcadas dent??rias simples e todas as regi??es maxilofaciais. Volumes 3D com FOV de 4 x 4 cm a 16 x 18 cm e resolu????o de at?? 68 ??m, a maior resolu????o dispon??vel no mercado, permitem avaliar SPNs, ATM, vias a??reas e ouvido interno.
`,
    linkSite: 'https://www.newtom.it/en/dentale/imaging-extraoral/go/',
    linkVideo: 'bPEg2jnfeQc',
    linkBrochure: 'https://www.newtom.it/media/products/product/brochure/NT_GO2D3DCeph_Ott20_GB.pdf'
  },
  [ProductIds.inEosX5]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.DentsplySirona,
    name: 'inEos X5',
    category: 'SCANNER EXTRAORAL',
    image: productImage(ProductIds.inEosX5),
    imageAlt: 'inEos X5',
    badge: 'badge.png',
    heading: 'Impressive precision: 0.0021 mm.',
    description: `
Desenvolvido de acordo com os mais altos padr??es de qualidade para sistemas de medi????o ??tica o <strong>inEos X5</strong> rapidamente se estabeleceu no mercado como o scanner de refer??ncia. O <strong>inEos X5</strong> garante a maior precis??o para todo o trabalho de digitaliza????o de um t??cnico em Pr??tese.
Tecnologia de scaneamento inteligente, com seu bra??o rob??tico, tecnologia exclusiva de scanner em 5 eixos e ampla ??rea de trabalho. Incr??vel precis??o e a maior captura de profundidade. Interface claro do software e opera????o intuitiva resultam em modelos digitais prontos em apenas alguns cliques.
    `,
    linkSite: 'https://www.dentsplysirona.com/pt-br/explore/lab/equipamento-cad-cam-para-lab-de-protese/escaner.html',
    linkVideo: 'Y10WNPNoyeg',
    linkBrochure: 'https://assets.dentsplysirona.com/flagship/de-de/produkte/cad-cam/cad-cam-fuer-das-labor/design/pdfs/dentsply-sirona-inlab-brochure_EN.pdf'
  },
  [ProductIds.inLabMCXL]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.DentsplySirona,
    name: 'inLab MC XL',
    category: 'FRESADORA',
    image: productImage(ProductIds.inLabMCXL),
    imageAlt: 'inLab MC XL',
    badge: 'badge.png',
    heading: 'Universal, accurate and fast.',
    description: `
A fresadora <strong>inLab MC XL</strong> ?? flex??vel, eficiente e r??pida, para processos molhados de fresagem e moagem com muitas op????es de produ????o para seu laborat??rio de Pr??tese. Voc?? se beneficia com alta velocidade e precis??o e pode trocar de moagem para fresagem em apenas alguns passos. A ampla sele????o de materiais e usos traz op????es de produ????o particularmente flex??veis e eficientes.
    `,
    linkSite: 'https://www.dentsplysirona.com/pt-br/explore/lab/equipamento-cad-cam-para-lab-de-protese/producao/inlab-mc-xl.html',
    linkVideo: '6cBC-lCSrbM',
    linkBrochure: 'https://assets.dentsplysirona.com/flagship/de-de/produkte/cad-cam/cad-cam-fuer-das-labor/design/pdfs/dentsply-sirona-inlab-brochure_EN.pdf'
  },
  [ProductIds.exocadSoftware]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Exocad,
    name: 'Exocad',
    category: 'SOFTWARE',
    image: productImage(ProductIds.exocadSoftware),
    imageAlt: 'Exocad',
    badge: 'badge.png',
    heading: 'Your freedom is our passion.',
    description: `
Software de Planeamento e Comunica????o Exocad: Design, planejamento de implantes, ortodontia, produ????o, digitaliza????o e comunica????o - A nossa miss??o ?? criar a solu????o de software completa para a medicina dent??ria digital.    
    `,
    linkSite: 'https://exocad.com/',
    linkVideo: 'A3Ksh8qVl7o',
    linkBrochure: ''
  },
  [ProductIds.r5]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.vhf,
    name: 'R5',
    category: 'FRESADORA',
    image: productImage(ProductIds.r5),
    imageAlt: 'R5',
    badge: 'badge.png',
    heading: 'The gold standard for lab and practice.',
    description: `
Provavelmente a melhor fresadora do mercado. A mais recente gera????o de fresadoras para laborat??rios dent??rios. Design e performance sem paralelo.
`,
    linkSite: 'https://www.vhf.de/en/products/dental/dental-milling-machines/r5/',
    linkVideo: 'bBS671qztVw',
    linkBrochure: 'https://www.vhf.de/wp-content/uploads/HB1222-EN_R5-Folder.pdf'
  },
  [ProductIds.z4]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.vhf,
    name: 'Z4',
    category: 'FRESADORA CHAIRSIDE',
    image: productImage(ProductIds.z4),
    imageAlt: 'Z4',
    badge: 'badge.png',
    heading: 'The Future of Digital Dentistry.',
    description: `
    Open Chairside is the Future.
    Descubra como a fresadora chairside <strong>Z4</strong>, com sua flexibilidade de materiais e scanners intraorais, sua precis??o e facilidade de uso intuitiva, aumentar?? a capacidade de resposta na sua cl??nica.    
`,
    linkSite: 'https://www.vhf.de/en/products/dental/dental-milling-machines/z4/',
    linkVideo: 'qekCDwYwigA',
    linkBrochure: 'https://www.vhf.de/wp-content/uploads/HB1221-EN_Z4-Folder.pdf'
  },
  [ProductIds.CS3600]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Carestream,
    name: 'Dexis CS 3600',
    category: 'SCANNER INTRAORAL',
    image: productImage(ProductIds.CS3600),
    imageAlt: 'Dexis CS 3600',
    badge: 'badge.png',
    heading: 'Take your intraoral scanning to new heights.',
    description: `
Teste um dos melhores scanners intraorais do mundo e receba uma coroa de oferta! 

Marque uma demonstra????o gratuita do <strong>Scanner Dexis CS 3600</strong>
e receba uma coroa cimentada <strong>GR??TIS</strong>
efetuada num dos mais prestigiados laborat??rios de pr??tese dent??ria de Portugal.        
`,
    linkSite: 'https://www.carestreamdental.com/en-emea/csd-products/intraoral-scanners/cs-3600-and-cs-scanflow-software/',
    linkVideo: 'hKgjFB4J8JU',
    linkBrochure: ''
  },
  [ProductIds.CS3700]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Carestream,
    name: 'Dexis CS 3800',
    category: 'SCANNER INTRAORAL',
    image: productImage(ProductIds.CS3700),
    imageAlt: '',
    badge: 'Dexis CS 3800',
    heading: 'Scanning uncompromised.',
    description: `
Teste um dos melhores scanners intraorais do mundo e receba uma coroa de oferta! 

Marque uma demonstra????o gratuita do Scanner Dexis CS 3800
e receba uma coroa cimentada GR??TIS
efetuada num dos mais prestigiados laborat??rios de pr??tese dent??ria de Portugal.        
    `,
    linkSite: 'https://www.carestreamdental.com/en-emea/csd-products/intraoral-scanners/cs-3700/',
    linkVideo: 'fV01LngERl8',
    linkBrochure: ''
  },
  [ProductIds.ProgramatP510]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.IvoclarVivadent,
    name: 'Programat P510',
    category: 'FORNO',
    image: productImage(ProductIds.ProgramatP510),
    imageAlt: '',
    badge: 'Programat P510',
    heading: 'Combines high-tech and modern design.',
    description: `
O <strong>P510</strong> ?? um forno eficiente e muito f??cil de usar em todas as situa????es do dia-a-dia de um laborat??rio dent??rio.
    `,
    linkSite: 'https://www.ivoclarvivadent.com/en/productcategories/process/programat-p510',
    linkVideo: 'V69b08AJYTI',
    linkBrochure: ''
  },
  [ProductIds.VACUMAT6000MP]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Vita,
    name: 'VACUMAT?? 6000 MP',
    category: 'FORNO',
    image: productImage(ProductIds.VACUMAT6000MP),
    imageAlt: 'VACUMAT?? 6000 MP',
    badge: 'badge.png',
    heading: 'Reliable firing and pressing for all commercially-available materials.',
    description: `
Uma mufla de queima com a m??xima durabilidade com eletr??nica confi??vel para resultados de queima consistentemente excelentes!
Queima e prensagem confi??veis para todos os materiais dispon??veis no mercado.
Made in Germany    
    `,
    linkSite: 'https://www.vita-zahnfabrik.com/pdb_DD1D10D113_pt.html',
    linkVideo: 'bCd5grQ6daU',
    linkBrochure: ''
  },
  [ProductIds.Impressao]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.FormLabs,
    name: '3D',
    category: 'IMPRESS??O',
    image: productImage(ProductIds.Impressao),
    imageAlt: '',
    badge: '3D',
    heading: 'Powerful, Affordable 3D Printers for Professionals.',
    description: `
Dimensione a prototipagem e a produ????o com impressoras acess??veis e de qualidade industrial.   
    `,
    linkSite: '',
    linkVideo: '',
    linkBrochure: ''
  },
  [ProductIds.A7]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'A7',
    category: 'EQUIPAMENTO DENT??RIO',
    image: productImage(ProductIds.A7),
    imageAlt: 'A7',
    badge: 'badge.png',
    heading: 'Enjoy the difference.',
    description: `
Versatilidade, ?? esquerda ou ?? direita. Com o seu movimento de transi????o inovador: Quickswitch, o equipamento <strong>Classe A7</strong> pode ser convertido de uso para destros ou para canhotos em apenas alguns passos. O mecanismo que permite o reposicionamento da unidade foi projetado para simplificar a convers??o, que pode ser conclu??da em segundos, sem a necessidade de ferramentas ou t??cnicos.
    `,
    linkSite: 'https://www.anthos.it/en/dental-units/a7/',
    linkVideo: 'uOWCRys4Mz0',
    linkBrochure: 'https://www.anthos.it/en/download/document/438/product/download/'
  },
  [ProductIds.A5]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'A5',
    category: 'EQUIPAMENTO DENT??RIO',
    image: productImage(ProductIds.A5),
    imageAlt: 'A5',
    badge: 'badge.png',
    heading: 'Enjoy the comfort and performance.',
    description: `
Conforto e perfomance!
O Equipamento Dent??rio <strong>Classe A5</strong> t??m uma performance superior. Fornecido com uma ampla gama de recursos e tecnologias que permitem ao M??dico Dentista alcan??ar os melhores resultados.
Liberdade de escolha para uma ergonomia de trabalho perfeita.
    `,
    linkSite: 'https://www.anthos.it/en/dental-units/a5/',
    linkVideo: 'uOWCRys4Mz0',
    linkBrochure: 'https://www.anthos.it/en/download/document/433/product/download/'
  },
  [ProductIds.A3Plus]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'A3 Plus',
    category: 'EQUIPAMENTO DENT??RIO',
    image: productImage(ProductIds.A3Plus),
    imageAlt: 'A3 Plus',
    badge: 'badge.png',
    heading: 'Enjoy the simplicity.',
    description: `
Tudo, simples!
O Novo Equipamento Dent??rio <strong>Classe A3 Plus</strong> ?? o seu equipamento standard com a mesma seguran??a, confiabilidade, flexibilidade e robustez de um topo de gama. 
Fabricados com uma excelente qualidade de materiais de constru????o, tecnologicamento avan??ado e com uma excelente ergonomia, que d?? total conforto a si e o seu paciente.
Classe A3 Plus, um investimento inteligente que lhe oferece uma ampla gama de caracter??sticas ?? sua escolha que elevam a sua pr??tica clinica.
    `,
    linkSite: 'https://www.anthos.it/en/dental-units/a3/',
    linkVideo: 'IQL6EfUVbF8',
    linkBrochure: 'https://www.anthos.it/en/download/document/628/product/download/'
  },
  [ProductIds.AutoclavesAnthos]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'Autoclaves ANTHOS',
    category: 'GAMA DE',
    image: productImage(ProductIds.AutoclavesAnthos),
    imageAlt: 'Autoclaves ANTHOS',
    badge: 'badge.png',
    heading: 'Safety first.',
    description: `
  Os <strong>autoclaves ANTHOS de classe B</strong> com capacidade de 17 e 24 litros s??o fornecidos com teclado, que apresentam um interface com ??cones user-friendly. A tarefa do operador ?? mais f??cil e r??pida gra??as ?? disponibilidade no display de todos os programas e dados. F??ceis de instalar, um simples procedimento guiado ajuda-o na configura????o inicial.
    `,
    linkSite: 'https://www.anthos.it/en/sterilization/',
    linkVideo: 'YAULSMoQad8',
    linkBrochure: ''
  },
  [ProductIds.Seladora]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'Millseal+ Manual',
    category: 'Seladora de fita',
    image: productImage(ProductIds.Seladora),
    imageAlt: 'Seladora de fita Millseal+ Manual',
    badge: 'badge.png',
    heading: 'Seladora t??rmica de fita',
    description: `
  <strong>Millseal Rolling</strong> Este termosealer de alimenta????o autom??tica proporciona uma forma ideal de acelerar o procedimento de selagem em sacos que s??o pr??-cortados e selados em tr??s lados. A temperatura e a press??o de selagem s??o ajustadas atrav??s de um teclado e os par??metros de opera????o s??o mostrados no display LCD. Millseal Rolling pode ser usado juntamente com uma impressora para imprimir as datas de ensacamento e validade e os s??mbolos exigidos pelas normas em vigor.
    `,
    linkSite: 'https://www.anthos.it/en/sterilization/',
    linkVideo: '',
    linkBrochure: ''
  },
  [ProductIds.Cuba]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'Highea a??o inox',
    category: 'CUBA Ultrassom',
    image: productImage(ProductIds.Cuba),
    imageAlt: 'CUBA ultrassons Highea a??o inox',
    badge: 'badge.png',
    heading: '',
    description: `
    Projetada para fornecer a ma??xima confianc??a e extrema flexibilidade. Permite remover a sujidade das superfi??cies dos objetos imersos, limpando totalmente mesmo as zonas mais inacessi??veis e orifi??cios ocultos. Conjuga tecnologia inovadora e os melhores materiais.
    
    Dimenso??es: 300 x 179 x 214 mm
    Medidas do tanque: 240 x 137 x 100 mm
    Medidas da ca??mara: 198 x 106 x 50 mm
    Ma??ximo volume a??gua: 2,75 Litros
    Ma??xima capacidade: 1 Kg
    Peso: 3,2 Kg
    `,
    linkSite: 'https://www.anthos.it/en/sterilization/',
    linkVideo: '',
    linkBrochure: ''
  },
  [ProductIds.Termodesinfetadora]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'Tethys H10',
    category: 'Termodesinfetadora',
    image: productImage(ProductIds.Termodesinfetadora),
    imageAlt: 'Termodesinfetadora Tethys H10',
    badge: 'badge.png',
    heading: 'O mundo da desinfec????o n??o ser?? mais o mesmo.',
    description: `
  O <strong>Tethys H10 Plus</strong> integra em um ??nico processo exclusivo o poder da ??gua, a energia t??rmica e o poder do ultrassom, para garantir a m??xima seguran??a, alta velocidade de processo e facilidade de uso.
    `,
    linkSite: 'https://www.anthos.it/en/sterilization/',
    linkVideo: '',
    linkBrochure: ''
  },
  [ProductIds.AerosolDefender]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Anthos,
    name: 'WS Aerosol Defender',
    category: 'SISTEMA',
    image: productImage(ProductIds.AerosolDefender),
    imageAlt: 'WS Aerosol Defender',
    badge: 'badge.png',
    heading: 'Safeguarding your health.',
    description: `
      O <strong>Aerosol Defender System</strong> aumenta consideravelmente o n??vel de prote????o dos profissionais de sa??de oral, diminuindo os riscos da transmiss??o de agentes patog??nicos. O sistema tem a capacidade de aspirar os aeross??is libertados durante os tratamentos dent??rios atrav??s de um dispositivo de suc????o que pode ser ligado a qualquer equipamento dent??rio, desde que possua uma c??nula de aspira????o de 17mm de di??metro.
      
      Pack composto por dois sistemas: Cada sistema resiste at?? 200 ciclos de autoclave a 121??C (Quer dizer que o custo m??dio por cada paciente ?? de aprox: 0,75???). Qualquer profissional de sa??de pode instalar sozinho o kit com facilidade e rapidez. O Sistema pode ser instalado com ou sem o suporte dos diques de borracha.
    `,
    linkSite: 'https://www.anthos.it/en/tools/prevention/',
    linkVideo: 'juWcbz4Xgrs',
    linkBrochure: 'https://www.anthos.it/media/filer_public/de/4d/de4d0ed9-4d76-494a-b368-306a36748961/defender_flyer_gb_2.pdf'
  },
  [ProductIds.SurgicPro]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.NSK,
    name: 'Surgic Pro',
    category: 'MOTOR DE IMPLANTES',
    image: productImage(ProductIds.SurgicPro),
    imageAlt: 'Surgic Pro',
    badge: 'badge.png',
    heading: 'The professional choice.',
    description: `
  <strong>Surgic Pro</strong> ?? um sistema de micromotor cir??rgico sem escovas e de elevado rendimento com controlo de torque.
    `,
    linkSite: 'https://www.uk.nsk-dental.com/products/surgical/surgical-surgicproplus/',
    linkVideo: 'apR2wos4k9s',
    linkBrochure: ''
  },
  [ProductIds.SMax]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.NSK,
    name: 'S-Max M95L 1:5',
    category: 'CONTRA-??NGULO',
    image: productImage(ProductIds.SMax),
    imageAlt: 'S-Max M95L 1:5',
    badge: 'badge.png',
    heading: 'Aerosol less.',
    description: `
  Robustez e precis??o.
  Os contra-??ngulos da s??rie <strong>S-Max M</strong> melhoraram drasticamente a durabilidade e apresentam um design de corpo interno atualizado e um novo mecanismo de mandril.
  S??o o padr??o da nova gera????o da NSK - um casamento de sofistica????o ergon??mica e sensa????o de corte suave.
  Experimente voc?? mesmo.
    `,
    linkSite: 'https://www.nsk-dental.com/products/contra-angles/contra-s-max_m/',
    linkVideo: 'WVztm7WzONY',
    linkBrochure: ''
  },
  [ProductIds.iClave]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.NSK,
    name: 'iClave plus',
    category: 'AUTOCLAVE',
    image: productImage(ProductIds.iClave),
    imageAlt: 'iClave plus',
    badge: 'badge.png',
    heading: 'Safety first.',
    description: `
  O <strong>autoclave dent??rio iCLAVE da NSK</strong> classe B de 18 litros com uma cuba de cobre niquelado de alta condutividade t??rmica que mant??m uma temperatura uniforme em toda a c??mara e controla constantemente a temperatura em toda a sua superf??cie. O seu ecr?? LCD com painel de controlo t??ctil mostra toda a informa????o do ciclo de esteriliza????o, atrav??s de c??digos de cores e gr??ficos. Entrada USB integrado: registo de dados dos ciclos de esteriliza????o, sem necessidade de instalar um software especial para ver e imprimir relat??rios. O sistema regista todos os par??metros relevantes do ciclo e garante a sua rastreabilidade. Pode ligar-se a um PC para uma gest??o mais precisa do processo de esteriliza????o. 
    `,
    linkSite: 'https://www.uk.nsk-dental.com/products/hygiene_and_maintenance/maintenace-iclave/',
    linkVideo: '',
    linkBrochure: ''
  },
  [ProductIds.Chiropro]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.BienAir,
    name: 'New ChiroPro Plus',
    category: 'MOTOR DE IMPLANTES',
    image: productImage(ProductIds.Chiropro),
    imageAlt: 'New ChiroPro Plus',
    badge: 'badge.png',
    heading: 'Pure simplicity.',
    description: `
  Simplicidade ?? esta a palavra-chave da nova gama de sistemas de implantologia e de cirurgia oral desenvolvida pela Bien-Air Dental.
  Durante a conce????o destes dois sistemas, tudo foi pensado ao pormenor, com o objetivo de facilitar a sua utiliza????o.
  O <strong>ChiroPro</strong> ?? a solu????o ideal para colocar implantes de forma precisa e suave. 
    `,
    linkSite: 'https://dental.bienair.com/en_pt/products/oral-surgery-implantology/classic/new-chiropro-plus.html',
    linkVideo: 'GciqwB5lBTg',
    linkBrochure: 'https://www.montellano.pt/PDF/Brochure_Implantology_2018_New_Chiropro.pdf'
  },
  [ProductIds.CA15]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.BienAir,
    name: '1:5 L',
    category: 'CONTRA-??NGULO',
    image: productImage(ProductIds.CA15),
    imageAlt: '1:5 L',
    badge: 'badge.png',
    heading: 'Aerosol less.',
    description: `
  Durante muito tempo. Mesmo o melhor dentista nada consegue sem um bom instrumento. Os contra-??ngulos e as pe??as de m??o da Bien-Air oferecem-lhe o melhor da microtecnologia su????a. Concebidos e produzidos no cora????o do Watch Valley, cada instrumento ?? uma obra-prima da metalurgia, uma verdadeira uni??o de compet??ncias, cujo resultado ?? um dispositivo robusto, silencioso e extremamente preciso. Desde a endodontia e a cirurgia at?? ?? implantologia e ao restauro, a Bien-Air tem o instrumento de que necessita. Com a sua gama <strong>Micro-Series</strong>, a Bien-Air ?? o primeiro fabricante a oferecer instrumentos e micromotores que s??o mais curtos, mais leves e mais ergon??micos.
  Os contra-??ngulos e as pe??as de m??o Bien-Air respondem a todas as suas necessidades e muito mais.
    `,
    linkSite: 'https://dental.bienair.com/en_pt/products/contra-angles-straight-handpieces/restorative-classic-line/ca-1-5.html',
    linkVideo: 'LzMXVXj3oJo',
    linkBrochure: ''
  },
  [ProductIds.Airflow]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.EMS,
    name: 'AIRFLOW?? Prophylaxis Master',
    category: '',
    image: productImage(ProductIds.Airflow),
    imageAlt: 'AIRFLOW?? Prophylaxis Master',
    badge: 'badge.png',
    heading: 'Make me smile.',
    description: `
  <strong>AIRFLOW?? Prophylaxis Master</strong> ?? a mais recente inova????o EMS para a "Guided Biofilm Therapy". uma solu????o ??nica para c??rie, preven????o e manuten????o peri??dica.
  Criado para uso profissional intensivo, o dispositivo ?? caracterizado por uma ergonomia ??nica, alta precis??o, f??cil manuten????o e conformidade com os mais altos padr??es de higiene.
  O <strong>AIRFLOW?? Prophylaxis Master</strong> foi projetado com os mais altos padr??es de desempenho, seguran??a e conforto em mente, sendo especificamente constru??do para atender aos 3 principais tratamentos da "Guided Biofilm Therapy".
    `,
    linkSite: 'https://www.ems-dental.com/en/products/airflow-prophylaxis-master',
    linkVideo: 'N88PWkLJ414',
    linkBrochure: 'https://www.ems-dental.com/_flowpaper/php/ems.php?subfolder=/media-pool/&doc=FA-612_EN_rev_E_EMS%20GBT%20Brochure.pdf'
  },
  [ProductIds.Tornado]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Durr,
    name: 'Tornado 1',
    category: 'COMPRESSOR',
    image: productImage(ProductIds.Tornado),
    imageAlt: 'Tornado 1',
    badge: 'badge.png',
    heading: 'Super silence.',
    description: `
  Os <strong>compressores D??rr</strong> com secador garantem ?? sua cl??nica um ar comprimido higi??nico, seco e isento de ??leo.
  Os instrumentos rotat??rios foram concebidos para terem uma vida ??til muito longa, sem risco de corros??o nem res??duos causados pela condensa????o do ??leo.
    `,
    linkSite: 'https://www.duerrdental.com/en/products/compressed-air/tornado-1-super-silent/',
    linkVideo: 'GOYjCeuCBnA',
    linkBrochure: ''
  },
  [ProductIds.E9]: {
    type: ContentTypes.Product,
    newItem: false,
    brand: Brands.Euronda,
    name: 'E9 Next',
    category: 'AUTOCLAVE',
    image: productImage(ProductIds.E9),
    imageAlt: 'E9 Next',
    badge: 'badge.png',
    heading: 'Safety first.',
    description: `
    O <strong>E9 NEXT</strong> ?? um autoclave da EURONDA de classe B com capacidade de 18 litros. Garante a m??xima efic??cia na esteriliza????o de todos os instrumentos, incluindo os corpos ocos e porosos. Impressora incorporada; Conex??o a PC; Conex??o ?? rede h??drica; Programa????o t??cnica exclusiva capaz de realizar um ciclo de teste no final de cada repara????o. Compre os requisitos da norma EN13060 e garante um consumo m??nimo de ??gua e eletricidade. Pode esterilizar 5 bandejas ou 3 cassetes. Executa 5 ciclos do tipo B (121 ??, 134 ??, 134 ?? Prion, 134 ?? Rapid, 134 ?? Prion Rapid) e 3 ciclos de teste (Vacuum, Helix, Bowie & Dick). 
    `,
    linkSite: 'https://prosystem.euronda.com/sterilization/',
    linkVideo: 'nuHxygVwzkQ',
    linkBrochure: 'https://www.montellano.pt/PDF/ProSystem_All_Download_Web_EN.pdf'
  },

  // Campaigns

  checkupGratuito: {
    type: ContentTypes.Campaign,
    newItem: false,
    image: campaignImage('checkupGratuito.png'),
    imageAlt: '',
    heading: 'Marque j?? o seu Check-Up Gratuito!',
    description: `
      O check-Up ?? v??lido apenas para instrumentos rotat??rios das marcas Bien-Air e NSK, e inclui a verifica????o dos seguintes pontos cr??ticos:

      Canais de irriga????o (Ar e ??gua);
      Pin??as de fixa????o das brocas;
      Desgaste dos rolamentos;
      O-Rings;
      Fibras ??pticas.

      N??o deixe a sua cl??nica parar por causa da sua Turbina ou Contra ??ngulo!
    `,
    linkSite: 'https://www.montellano.pt/2020/06/04/repair-service-manutencao-gratuita/',
    linkVideo: '',
    linkBrochure: 'https://www.montellano.pt/PDF/check-up-gratuito.pdf'
  },
  retomaEquipamentos: {
    type: ContentTypes.Campaign,
    newItem: false,
    image: campaignImage('retomaEquipamentos.png'),
    imageAlt: '',
    heading: 'Sabe quanto vale o seu equipamento?',
    description: `
      A OSTEOARTROSE ?? O DESGASTE DAS ARTICULA????ES EM GERAL QUE ACONTECE A 70% DOS EQUIPAMENTOS IDOSOS.

      Pode acometer a aspira????o cir??rgica, as falhas constantes do sistema el??trico, motor da cadeira, m?? ilumina????o e estofos sujos e rasgados. A principal manifesta????o ?? a dor cr??nica (faturas de elevado valor em assist??ncia t??cnica); n??o tem cura mas pode ser prevenida com a nossa aven??a de assist??ncia t??cnica, que fortalece todos os elementos que a doen??a acomete.
    `,
    linkSite: 'https://www.montellano.pt/servicos/especial-retoma/',
    linkVideo: '',
    linkBrochure: 'https://www.montellano.pt/PDF/troca-equipamentos.pdf'
  },
  certificacaoCE: {
    type: ContentTypes.Campaign,
    newItem: false,
    image: campaignImage('certificacaoCE.png'),
    imageAlt: '',
    heading: 'Sabia que os seus Equipamentos precisam de manter a MARCA????O CE?',
    description: `
      Para garantir a conformidade dos seus equipamentos, com a legisla????o aplic??vel, precisa de assegurar que o seu equipamento ?? vistoriado anualmente por t??cnicos credenciados pelo fabricante.

      Clique nos bot??es para obter mais informa????o sobre os contratos de manuten????o dos diferentes tipos de equipamentos:
    `,
    actionButtons: [
      {
        text: 'Anthos',
        link: 'https://www.montellano.pt/servicos/contratos-de-manutencao-equipamentos-anthos/'
      },
      {
        text: 'NewTom e Carestream',
        link: 'https://www.montellano.pt/servicos/contratos-de-manutencao-equipamentos-radiologicos/'
      }
    ]
  },
  segurancaInformatica: {
    type: ContentTypes.Campaign,
    newItem: false,
    image: campaignImage('dicasSugestoes.png'),
    imageAlt: '',
    heading: 'As suas imagens e dados est??o protegidos? N??s ajudamos!',
    description: `
      Todos os anos milhares de cl??nicas em todo o mundo veem os seus sistemas inform??ticos serem afetados por ciber ataques ou avarias graves. Como consequ??ncia, perdem todas as informa????es e imagens por falta de preven????o e prote????o.

      De forma a colmatar estas vulnerabilidades efetu??mos recentemente uma parceria com a Assisprotech para que os nossos clientes possam usufruir de um servi??o de gest??o e prote????o inform??tica, de forma a obter redes mais r??pidas e com uma maior capacidade de resposta ??s exig??ncias do dia-a-dia.

      A empresa foi fundada em 2003 e apresenta um conjunto de servi??os de Gest??o, Administra????o, Manuten????o de Redes Inform??ticas e suporte aos Utilizadores. Conta ainda com uma equipa de profissionais que a tua a n??vel nacional, din??mica e muito focada no cliente e na supera????o dos desafios que apresentam.
    `,
    ctaButton: {
      type: CTAButtonTypes.VisitSite,
      newItem: false,
      value: 'https://assisprotech.com.pt/os-nossos-servicos'
    }
  },

  // Video Lists

  dicasSugestoes: {
    type: ContentTypes.VideoList,
    newItem: false,
    heading: 'Dicas e Sugest??es',
    description: `
Consulte v??rios v??deos de especialistas da nossa equipa de Engenharia e Servi??os, com dicas ??teis sobre manuten????o dos equipamentos da sua cl??nica.
    `,
    videos: [
      {
        image: videoImage('autoclaves_contaminacao.jpg'),
        imageAlt: '',
        description: 'Autoclaves: perigo de contamina????o por Legionella!',
        src: '2JbdFDGl0E8'
      },
      {
        image: videoImage('contaminacao_cruzada.jpg'),
        imageAlt: '',
        description: 'Evite a contamina????o cruzada do ar da sua cl??nica!',
        src: 'YgYF1q2fHno'
      },
      {
        image: videoImage('instrumentos_corte.jpg'),
        imageAlt: '',
        description: 'Os seus Instrumentos de Corte est??o bem lubrificados e armazenados?',
        src: 'xySNSL-9y14'
      },
      {
        image: videoImage('ligue_rx.jpg'),
        imageAlt: '',
        description: 'N??o ligue o seu RX sem ouvir a nossa recomenda????o!',
        src: 'zYdYeZS9pKA'
      },
      {
        image: videoImage('motores_aspiracao.jpg'),
        imageAlt: '',
        description: 'Motores de Aspira????o: Para um ambiente limpo, reforce os cuidados com a esteriliza????o do ar',
        src: '8_ddYvQx7vk'
      },
      {
        image: videoImage('equipamentos_contaminacao.jpg'),
        imageAlt: '',
        description: 'Equipamentos Dent??rios: Perigo de contamina????o!',
        src: '2HDjex0tgIk'
      }
    ]
  },

  // Product Lists

  [Brands.Anthos]: {
    type: ContentTypes.ProductList,
    newItem: false,
    brand: Brands.Anthos,
    description: 'Descubra os modelos da <strong>Anthos</strong> em destaque.',
    productsIds: [
      ProductIds.AutoclavesAnthos,
      ProductIds.Seladora,
      ProductIds.Cuba,
      ProductIds.Termodesinfetadora,
      ProductIds.AerosolDefender
    ]
  },
  [Brands.NSK]: {
    type: ContentTypes.ProductList,
    newItem: false,
    brand: Brands.NSK,
    description: 'Descubra os modelos da <strong>NSK</strong> em destaque.',
    productsIds: [
      ProductIds.SurgicPro,
      ProductIds.SMax,
      ProductIds.iClave
    ]
  },
  [Brands.BienAir]: {
    type: ContentTypes.ProductList,
    newItem: false,
    brand: Brands.BienAir,
    description: 'Descubra os modelos da <strong>Bien Air</strong> em destaque.',
    productsIds: [
      ProductIds.Chiropro,
      ProductIds.CA15
    ]
  },
  [Brands.EMS]: {
    type: ContentTypes.ProductList,
    newItem: false,
    brand: Brands.EMS,
    description: 'Descubra os modelos da <strong>EMS</strong> em destaque.',
    productsIds: [
      ProductIds.Airflow
    ]
  },
  [Brands.Durr]: {
    type: ContentTypes.ProductList,
    newItem: false,
    brand: Brands.Durr,
    description: 'Descubra os modelos da <strong>D??rr Dental</strong> em destaque.',
    productsIds: [
      ProductIds.Tornado
    ]
  },
  [Brands.Euronda]: {
    type: ContentTypes.ProductList,
    newItem: false,
    brand: Brands.Euronda,
    description: 'Descubra os modelos da <strong>Euronda</strong> em destaque.',
    productsIds: [
      ProductIds.E9
    ]
  },

  // Talk To Us

  talkToUs01: {
    type: ContentTypes.TalkToUs,
    newItem: false,
    heading: 'Fale connosco',
    description: 'A Montellano possui uma equipa dedicada a si. Estamos prontos para esclarecer todas as suas quest??es relacionadas com a nossa empresa.',
    contacts: [
      ContactIds.VitorFerro,
      ContactIds.NunoDias,
      ContactIds.AnaTeles
    ]
  },
  talkToUs02: {
    type: ContentTypes.TalkToUs,
    newItem: false,
    heading: 'Fale com um dos nossos especialistas',
    description: 'A Montellano possui uma equipa dedicada a si. Estamos prontos para esclarecer todas as suas quest??es relativas aos nossos equipamentos e produtos. Seleccione o especialista mais pr??ximo da sua cl??nica.',
    contacts: [
      ContactIds.LuisCoelhoMNT,
      ContactIds.CarlaCaixinhas,
      ContactIds.MariaCarvalho,
      ContactIds.AntonioSantos,
      ContactIds.SilviaBarbosa,
      ContactIds.JorgeRocha,
      ContactIds.AnaOliveira,
      ContactIds.GinaBernardes,
      ContactIds.VitorSantos
    ]
  },
  talkToUs03: {
    type: ContentTypes.TalkToUs,
    newItem: false,
    heading: 'Fale com um dos nossos especialistas',
    description: 'A Montellano possui uma equipa dedicada a si. Estamos prontos para esclarecer todas as suas quest??es relativas aos nossos equipamentos e produtos. Seleccione o especialista mais pr??ximo da sua cl??nica.',
    contacts: [
      ContactIds.CristinaRodrigues,
      ContactIds.CarlaCaixinhas,
      ContactIds.MariaCarvalho,
      ContactIds.AntonioSantos,
      ContactIds.SilviaBarbosa,
      ContactIds.JorgeRocha,
      ContactIds.AnaOliveira,
      ContactIds.GinaBernardes,
      ContactIds.VitorSantos
    ]
  },
  talkToUs04: {
    type: ContentTypes.TalkToUs,
    newItem: false,
    heading: 'Fale com um dos nossos Engenheiros T??cnicos',
    description: 'A Montellano possui uma equipa dedicada a si. Estamos prontos para esclarecer todas as suas quest??es t??cnicas relacionadas com os nossos equipamentos. Seleccione o engenheiro mais pr??ximo da localiza????o da sua cl??nica.',
    contacts: [
      ContactIds.EngenhariaGeral,
      ContactIds.JoseSabio,
      ContactIds.EduardoCorreia,
      ContactIds.FredericoLopes,
      ContactIds.AndreOliveira
    ]
  },
  talkToUs05: {
    type: ContentTypes.TalkToUs,
    newItem: false,
    heading: `
      Fale com um dos
      nossos especialistas
      em workflow digital
    `,
    description: 'A Montellano possui uma equipa dedicada a si. Estamos prontos para esclarecer todas as suas quest??es relativas aos nossos equipamentos CAD/CAM. Seleccione um dos nossos especialistas:',
    contacts: [
      ContactIds.LuisCoelhoDDS,
      ContactIds.TiagoSantos
    ]
  },

  // Contacts

  [ContactIds.VitorFerro]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'V??tor Ferro',
    image: 'VitorFerro.png',
    position: 'Director de Marketing',
    location: '',
    description: `      
O <strong>V??tor Ferro</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. 

Utilize os bot??es em baixo para contact??-lo.
`,
    phoneNumber: '+351967066985',
    email: 'vitor.ferro@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.VitorSantos]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'V??tor Santos',
    image: 'VitorSantos.png',
    position: 'Gestor de clientes',
    location: 'Braga',
    description: `      
    Deseja mais informa????es sobre os nossos dispositivos m??dicos?
    
    O <strong>V??tor Santos</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
    `,
    phoneNumber: '+351966472478',
    email: 'vitor.santos@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.AnaTeles]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Ana Teles',
    image: 'AnaTeles.png',
    position: 'Assistente Comercial',
    location: '',
    description: `      
A <strong>Ana Teles</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. 

Utilize os bot??es em baixo para contact??-la.
`,
    phoneNumber: '+351963407936',
    email: 'ana.teles@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.NunoDias]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Nuno Dias',
    image: 'NunoDias.png',
    position: 'Director Comercial',
    location: '',
    description: `      
O <strong>Nuno Dias</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. 

Utilize os bot??es em baixo para contact??-lo.
`,
    phoneNumber: '+351962597774',
    email: 'nuno@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.PatriciaPenela]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Patr??cia Penela',
    image: 'PatriciaPenela.png',
    position: 'Diretora T??cnica Farmac??utica',
    location: '',
    description: `      
A <strong>Patr??cia Penela</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. 

Utilize os bot??es em baixo para contact??-la.
`,
    phoneNumber: '+351967854647',
    email: 'patricia.penela@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.LuisCoelhoMNT]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Lu??s Coelho',
    image: 'LuisCoelho.png',
    position: 'Comercial',
    location: 'Lisboa',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

O <strong>Lu??s Coelho</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351965056251',
    email: 'luis.coelho@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.CarlaCaixinhas]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Carla Caixinhas',
    image: 'CarlaCaixinhas.png',
    position: 'Promotora',
    location: 'Lisboa',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

A <strong>Carla Caixinhas</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351964608307',
    email: 'carla.caixinhas@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.MariaCarvalho]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Maria Jo??o Carvalho',
    image: 'MariaCarvalho.png',
    position: 'Comercial',
    location: 'Porto',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

A <strong>Maria Jo??o Carvalho</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351961518479',
    email: 'maria.joao@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.AntonioSantos]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Ant??nio Santos',
    image: 'AntonioSantos.png',
    position: 'Product Manager Anthos',
    location: 'Viseu',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

O <strong>Ant??nio Santos</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351968643489',
    email: 'antonio.santos@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.SilviaBarbosa]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'S??lvia Barbosa',
    image: 'SilviaBarbosa.png',
    position: 'Comercial',
    location: 'Aveiro',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

A <strong>S??lvia Barbosa</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351962245461',
    email: 'silvia.barbosa@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.JorgeRocha]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Jorge Rocha',
    image: 'JorgeRocha.png',
    position: 'Promotor',
    location: 'Guarda',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

O <strong>Jorge Rocha</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351925204692',
    email: 'jorge.rocha@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.AnaOliveira]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Ana Oliveira',
    image: 'AnaOliveira.png',
    position: 'Promotora',
    location: 'Leiria',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

A <strong>Ana Oliveira</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351924069866',
    email: 'ana.oliveira@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.GinaBernardes]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Gina Bernardes',
    image: 'GinaBernardes.png',
    position: 'Comercial',
    location: 'Algarve',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

A <strong>Gina Bernardes</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351964081740',
    email: 'gina.bernardes@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.CristinaRodrigues]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Cristina Rodrigues',
    image: 'CristinaRodrigues.png',
    position: 'Servi??o de Apoio ao Cliente',
    location: '',
    description: `      
Deseja mais informa????es sobre os nossos dispositivos m??dicos?

A <strong>Cristina Rodrigues</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
`,
    phoneNumber: '+351218208889',
    email: 'encomendas@montellano.pt',
    brand: Brands.Montellano,
    noTeams: true
  },
  [ContactIds.EngenhariaGeral]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Departamento',
    image: 'talkToUsIcon.png',
    position: 'Engenharia & Servi??os',
    location: '',
    description: `      
Contacte o nosso <strong>Departamento de Engenharia e Servi??os</strong> atrav??s dos contactos em baixo.
`,
    phoneNumber: '+351219018341',
    email: 'josesabio@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.JoseSabio]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Jos?? S??bio',
    image: 'JoseSabio.png',
    position: 'Director T??cnico Engenharia e Servi??os',
    location: '',
    description: `      
O <strong>Jos?? S??bio</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. Utilize os bot??es em baixo para contact??-lo.
`,
    phoneNumber: '+351965658174',
    email: 'josesabio@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.EduardoCorreia]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Eduardo Correia',
    image: 'EduardoCorreia.png',
    position: 'Engenharia e Servi??os',
    location: 'Zona Norte',
    description: `      
O <strong>Eduardo Correia</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. Utilize os bot??es em baixo para contact??-lo.
`,
    phoneNumber: '+351962044935',
    email: 'eduardo.correia@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.FredericoLopes]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Frederico Lopes',
    image: 'FredericoLopes.png',
    position: 'Engenharia e Servi??os',
    location: 'Zona Centro',
    description: `      
O <strong>Frederico Lopes</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. Utilize os bot??es em baixo para contact??-lo.
`,
    phoneNumber: '+351969570449',
    email: 'frederico.lopes@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.AndreOliveira]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Andr?? Oliveira',
    image: 'AndreOliveira.png',
    position: 'Engenharia e Servi??os',
    location: 'Zona Sul',
    description: `      
O <strong>Andr?? Oliveira</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita. Utilize os bot??es em baixo para contact??-lo.
`,
    phoneNumber: '+351969570445',
    email: 'andre.oliveira@montellano.pt',
    brand: Brands.Montellano
  },
  [ContactIds.FilipeFerreira]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Filipe Ferreira',
    image: 'FilipeFerreira.png',
    position: 'Product Manager',
    location: '',
    description: `      
Deseja mais informa????es sobre os nossos equipamentos CAD/CAM?

O <strong>Filipe Ferreira</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
    
`,
    phoneNumber: '+351969238390',
    email: 'filipe.ferreira@montellano.pt',
    brand: Brands.DigitalDentalSolutions
  },
  [ContactIds.LuisCoelhoDDS]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Lu??s Coelho',
    image: 'LuisCoelho.png',
    position: 'Product Manager',
    location: '',
    description: `      
Deseja mais informa????es sobre os nossos equipamentos CAD/CAM?

O <strong>Lu??s Coelho</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
    
`,
    phoneNumber: '+351965056251',
    email: 'luis.coelho@montellano.pt',
    brand: Brands.DigitalDentalSolutions
  },
  [ContactIds.TiagoSantos]: {
    type: ContentTypes.Contact,
    newItem: false,
    name: 'Tiago Santos',
    image: 'TiagoSantos.png',
    position: 'Business Manager',
    location: '',
    description: `      
Deseja mais informa????es sobre os nossos equipamentos CAD/CAM?

O <strong>Tiago Santos</strong> poder?? ajud??-lo e fornecer-lhe todas as informa????es que necessita.
    
`,
    phoneNumber: '+351962126264',
    email: 'tiago.santos@montellano.pt',
    brand: Brands.DigitalDentalSolutions
  },

  // Catalog Lists
  catalogList01: {
    type: ContentTypes.CatalogList,
    newItem: false,
    heading: 'Your first choice.',
    storeLink: 'https://www.montellano.pt/loja/',
    phoneNumber: '',
    brandImage: contentPath(`${Brands.Montellano}.png`),
    brandImageAlt: 'Logo Montellano',
    description: `
      Descubra a nossa gama, agora mais completa do que nunca! Crescemos em qualidade e variedade de produtos da marca Proclinic e Proclinic Expert.
      
      Gra??as ?? sua confian??a, continuamos a renovar e a expandir o portf??lio dos nossos produtos para lhe oferecer as solu????es de que necessita na sua pr??tica clinica. Do produto mais simples ao mais exigente. 
      
      Tudo o que voc?? precisa para responder ??s suas necessidades, sempre com a melhor qualidade a um pre??o competitivo.
    `,
    catalogGroups: [
      {
        heading: 'Cat??logos Gerais',
        catalogs: [
          {
            image: catalogImage('CG-MONTELLANO_2020.png'),
            imageAlt: 'Cat??logo Geral Cl??nica',
            description: 'Cat??logo Geral Cl??nica',
            downloadLink: 'https://www.montellano.pt/PDF/CG_MONTELLANO_2020v1.pdf'
          },
          {
            image: catalogImage('CG-ORTO_2020-760x800.png'),
            imageAlt: 'Cat??logo Geral Ortodontia',
            description: 'Cat??logo Geral Ortodontia',
            downloadLink: 'https://www.montellano.pt/PDF/CG_ORTO_2021.pdf'
          },
          {
            image: catalogImage('CG-LABBORATORIO-760x800.png'),
            imageAlt: 'Cat??logo Geral Laborat??rio',
            description: 'Cat??logo Geral Laborat??rio',
            downloadLink: 'https://www.montellano.pt/PDF/CG_LAB_2021.pdf'
          }
        ]
      },
      {
        heading: 'Revistas de Promo????es',
        catalogs: [
          {
            image: catalogImage('magazine-cover.png'),
            imageAlt: 'Revista de Promo????es',
            description: `
              Revista de Promo????es
              JAN-FEV 2022
            `,
            downloadLink: 'https://montellano.pt/PDF/Promo_MNT_JAN_FEV_2022.pdf'
          },
          {
            image: catalogImage('orto.png'),
            imageAlt: 'Revista de Promo????es',
            description: `
              Revista de Promo????es
              Ortodontia JAN-FEV 2022
            `,
            downloadLink: 'https://www.montellano.pt/PDF/MNT_JAN-FEV_ORTO.pdf'
          }
        ]
      }
    ]
  },

  // Discounts

  discountList01: {
    type: ContentTypes.DiscountList,
    newItem: true,
    brandImage: contentPath(`${Brands.Montellano}.png`),
    brandImageAlt: 'Logo Montellano',
    heading: 'Your first choice.',
    phoneNumber: '',
    storeLink: 'https://www.montellano.pt/loja/',
    description: `
      Saiba aqui quais os descontos especiais para a
      <strong>EXPODENT??RIA VIRTUAL OMD 2020<strong>.
    `,
    footnote: `
      <strong>INFORMA????O ADICIONAL</strong>
      
      *Descontos V??lidos de 23/11 a 04/12/2020 para encomendas ??? 250??? + IVA (Ap??s descontos). Exceto quando n??o aplic??vel a algumas marcas/dispositivos m??dicos, EPIs, medicamentos e equipamentos. 
    `,
    secondHeading: 'Descontos Consum??veis',
    discountGroups: [
      {
        image: catalogImage('CG-MONTELLANO_2020.png'),
        imageAlt: 'Cl??nica',
        description: 'Cl??nica',
        discounts: [
          {
            heading: '-45%',
            description: `
              desconto em todas as
              <strong>Proclinic Brands*<strong>
            `
          },
          {
            heading: '-30%',
            description: `
              desconto em todas as
              <strong>Outras Marcas*</strong>
            `
          }
        ]
      },
      {
        image: catalogImage('OrtodontiaLaboratorio.png'),
        imageAlt: 'Ortodontia e Laborat??rio',
        description: `
          Ortodontia e
          Laborat??rio
        `,
        discounts: [
          {
            heading: '-25%',
            description: 'desconto*'
          }
        ]
      },
      {
        image: catalogImage('magazine-cover.png'),
        imageAlt: 'Revista de Promo????es',
        description: `
          Revista de
          Promo????es
        `,
        discounts: [
          {
            heading: '-15%',
            description: `
              desconto em todas as
              <strong>Proclinic Brands*</strong>
            `
          },
          {
            heading: '-10%',
            description: `
              desconto em todas as
              <strong>Outras Marcas*</strong>
            `
          }
        ]
      }
    ]
  },

  // Offers - TODO

  // Info

  services: {
    type: ContentTypes.Info,
    newItem: false,
    image: brandImage(Brands.DigitalDentalSolutions),
    imageAlt: Brands.DigitalDentalSolutions,
    heading: `
      Servi??os
      e Sistemas Financeiros
    `,
    description: `
      <strong>Aluguer de scanner</strong>
      J?? pensou em alugar um scanner intraoral?
      A equipa Digital Dental Solutions da Montellano, ir?? ajuda-lo a encontrar a melhor solu????o para si e o aluguer de um scanner pode ser a solu????o mais indicada para as necessidades do seu dia-a-dia.
      Contate-nos para juntos encontrarmos a solu????o!
      
      <strong>Laborat??rio m??vel</strong>
      Com esta solu????o DDS, o laborat??rio de pr??tese ir?? ter consigo, nos dias que combinarmos. Levamos at?? si todo o equipamento necess??rio para fazer os seus trabalhos na sua cl??nica.
      Quer saber mais? Fale com um dos nossos especialistas.
      
      <strong>Pack de forma????o</strong>
      Sabia que disponibilizamos aos nossos clientes forma????o em CAD (desenho assistido por computador) assim como, acabamento e pigmenta????o de trabalhos cer??micos e preparamos forma????es ?? medida das necessidades da sua equipa?
      Fale connosco! 
      
      <strong>N??veis de suporte</strong>
      Se comprou algum dos nossos sistemas CAD/CAM, poder?? escolher o n??vel de suporte t??cnico que mais se adequa ao seu equipamento.
      Quer saber mais? Contate um dos nossos especialistas em workflow digital.    
    `
  },

  message: {
    type: ContentTypes.Message,
    newItem: false,
    defaultEmailTo: 'montellano@montellano.pt',
    heading: `
      Envie-nos uma
      mensagem
    `,
    description: 'Deseja mais informa????es? Envie-nos uma mensagem e entraremos em contacto consigo com a maior brevidade.',
    baseSrc: 'https://showroom-wp.montellano.pt/'
  },

  // Offer List

  offerList: {
    newItem: false,
    type: ContentTypes.OfferList,
    heading: '',
    description: '',
    image: brandImage(Brands.Montellano),
    imageAlt: Brands.Montellano,
    offers: [
      {
        image: offerImage('mascarasKN95.png'),
        imageAlt: 'Oferta M??scaras KN95',
        mobileImage: offerImage('mascarasKN95-mobile.png'),
        mobileImageAlt: 'Oferta M??scaras KN95',
        heading: 'TEMOS UMA OFERTA PARA SI!',
        bottomDescription: `
          Visite, registe-se no nosso stand Virtual e ganhe uma <strong>OFERTA</strong>:
          <h3><strong>
            VALE 1 caixa 
            M??scaras KN95
          </strong></h3><small>
            <strong>INFORMA????O ADICIONAL</strong>            
            A utilizar em compras ??? 250???+IVA de 07/12 a 31/12/2020. 
            Acumula com outros descontos e campanhas em vigor. 
          </small>
        `
      },
      {
        image: offerImage('passatempo.png'),
        imageAlt: 'Oferta Passatempo Montellano',
        mobileImage: offerImage('passatempo-mobile.png'),
        mobileImageAlt: '1?? pr??mio 500???, 2?? pr??mio 250???, 3?? pr??mio 150???',
        mobileBlueBackground: true,
        heading: `
          PARTICIPE NO NOSSO PASSATEMPO 
          E GANHE PR??MIOS!
        `,
        topDescription: `
          Publique uma fotografia divertida na <strong><u><a target="_blank" rel="noreferrer" href="https://www.facebook.com/montellano.pt">nossa p??gina de Facebook</a></u></strong> com a sua equipa e identifique 3 colegas. As melhores participa????es ganham:
        `,
        bottomDescription: `
          Participe* at?? dia 04/12/2020! Os vencedores ser??o revelados no dia 18 de Dezembro de 2020 na nossa p??gina Facebook. <u><a href="https://www.montellano.pt/regulamento-do-passatempo-expodentaria-omd-2020/" target="_blank" rel="noreferrer" >Consulte aqui o Regulamento do Passatempo.</a></u>
          <small>*Passatempo exclusivo a profissionais de sa??de oral.</small>
        `
      }
    ]
  },

  // News

  news: {
    type: ContentTypes.NewsList,
    items: [
      NewsItemIds.news_expoVirtual,
      NewsItemIds.news_congressoOMD,
      NewsItemIds.news_expodental2020
    ]
  },

  [NewsItemIds.news_expoVirtual]: {
    type: ContentTypes.NewsItem,
    image: newsImage('news01.png'),
    imageAlt: 'Congresso OMD',
    heading: 'Congresso OMD e Expodent??ria 2020 em formato virtual',
    description: `
      O 29?? Congresso da Ordem dos M??dicos Dentistas (OMD) vai realizar-se, pela primeira vez, em formato online, nos dias 27 e 28 de novembro. Ap??s o adiamento do evento, inicialmente previsto para a Exponor, em Matosinhos, de 5 a 7 de novembro, e face ??s condi????es associadas ?? pandemia Covid-19, o conselho diretivo da OMD decidiu apostar num evento virtual e imersivo na ??ltima sexta-feira e s??bado do m??s de novembro. 

      Um dos maiores eventos do setor da sa??de na Pen??nsula Ib??rica, que re??ne habitualmente todos os anos cerca de seis mil participantes, ir?? viver esta edi????o centralizado numa plataforma online desenvolvida de raiz para o efeito e acess??vel por desktop e mobile, disponibilizando conte??dos gen??ricos, bem como conte??dos exclusivos para os participantes inscritos. 

      A m??dica dentista C??lia Coutinho Alves preside ?? comiss??o organizadora deste evento que adota na sua 29?? edi????o um inovador formato online ??? possibilitando a participa????o de todos a partir de qualquer local e em seguran??a, e de forma a continuar a mostrar, debater e valorizar a medicina dent??ria em Portugal. 

      A tradicional Expodent??ria Portugal, a decorrer em simult??neo com o congresso virtual, foi tamb??m ela reinventada. Os stands ganham vida num showroom virtual que proporcionar?? aos visitantes uma experi??ncia imersiva e aos expositores a possibilidade de idealizar um espa??o de contacto com os m??dicos dentistas e de apresenta????o das suas novidades, numa sec????o dedicada que estar?? acess??vel para visita at?? ao final de janeiro do pr??ximo ano. 

      <a target="_blank" rel="noreferrer">Saiba mais aqui.</a>
    `
  },
  [NewsItemIds.news_congressoOMD]: {
    type: ContentTypes.NewsItem,
    image: newsImage('news02.png'),
    imageAlt: 'Congresso OMD',
    heading: 'Congresso OMD e Expodent??ria 2020 em formato virtual',
    description: 'Congresso OMD e Expodent??ria 2020 em formato virtual...'
  },
  [NewsItemIds.news_expodental2020]: {
    type: ContentTypes.NewsItem,
    image: newsImage('news03.png'),
    imageAlt: 'EXPODENTAL',
    heading: 'EXPODENTAL 2020 ser?? a edi????o mais abrangente at?? agora',
    description: 'EXPODENTAL 2020 ser?? a edi????o mais abrangente at?? agora...'
  }
}

export const ContentIds = keymirror(contentData)

export type ContentIdType = keyof typeof ContentIds

/**
 * Used to type-check contentData,
 * only during compile-time, or running command `yarn type-check`
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: Record<ContentIdType, ContentData> = contentData
