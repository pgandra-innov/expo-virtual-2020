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
  text : string
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
