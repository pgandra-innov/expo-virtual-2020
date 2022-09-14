import { contentData, ContentIdType, ContentIds, ContentTypes, brandImage, Brands, Brand, ContentData } from './contentData'

export interface VideoLinkData {
  /** CSS top position, in px */
  top: number
  /** CSS left position, in px */
  left: number
  /** Large text that appears under StepButton */
  labelText?: string
  /** Id of content to be loaded in Sidebar (through URL route) */
  contentId?: ContentIdType
  /** href link, if item is an external link */
  externalLink?: string
  /** If content should align to the right, text first, StepButton last */
  alignRight?: boolean,
  /** Small text on top of labelText */
  heading?: string
  /** If brand image should show beside hot-spot */
  brandImage?: string
  /** If a video should be loaded in the VideoModal */
  videoLink?: string
}

const verTodos = ({ ...props }: Omit<VideoLinkData, 'labelText' | 'zone'>): VideoLinkData => ({
  ...props,
  labelText: `
    Ver todos
    os modelos
  `
})

interface ProductProps extends Omit<VideoLinkData, 'labelText' | 'heading' | 'brandImage'> {
  contentId: ContentIdType
  withBrandImage?: boolean
}

/** Helper to create product content objects for zoneData */
const product = (props: ProductProps): VideoLinkData => {
  const data = contentData[props.contentId]
  if (data.type !== ContentTypes.Product) throw new Error('contentId not Product')
  return {
    ...props,
    labelText: data.name,
    heading: data.category,
    brandImage: props.withBrandImage ? brandImage(data.brand) : undefined
  }
}

export interface StepData {
  videoTime: number
  videoLinks: VideoLinkData[]
  brands?: Brand[]
  stepLabel?: string
}

const zone1to5Video = 'expo-montellano_corte-1'

/** Which videos belong to which zones */
export const zoneVideoMap: { [x: string]: string } = {
  1: zone1to5Video,
  2: zone1to5Video,
  3: zone1to5Video,
  4: zone1to5Video,
  5: zone1to5Video,
  6: 'expo-montellano_corte-4',
  7: 'expo-montellano_corte-3'
}

const sistemasFinanceiros = {
  labelText: 'Serviços e Sistemas Financeiros', heading: 'DIGITAL DENTAL SOLUTIONS', contentId: ContentIds.services
}

export const zoneTitles = [
  // 0
  { text: '' },
  // 1
  {
    text: `
      Sala
      de Reuniões
    `
  },
  // 2
  {
    text: `
      Equipamentos
      Dentários
    `
  },
  // 3
  {
    text: 'Consumíveis'
  },
  // 4
  {
    text: `
      Esterilização
      e Equipamentos
      Acessórios
    `
  },
  // 5
  {
    text: `
    Engenharia
    e Serviços
    `
  },
  // 6
  {
    text: `
      Equipamentos
      CAD/CAM    
    `,
    brandImage: brandImage(Brands.DigitalDentalSolutions),
    brandImageAlt: Brands.DigitalDentalSolutions
  },
  // 7
  {
    text: 'Imagiologia'
  }
]

const zone1to5Data: StepData[] = [
  {
    stepLabel: zoneTitles[1].text,
    videoTime: 24,
    videoLinks: [
      { top: 45, left: 48, labelText: 'Fale connosco', contentId: ContentIds.talkToUs01 }
    ]
  },
  {
    stepLabel: zoneTitles[2].text,
    videoTime: 17,
    videoLinks: [
      { top: 61, left: 15, labelText: 'Fale connosco', contentId: ContentIds.talkToUs02 },
      product({ top: 65, left: 30, contentId: ContentIds.A7 }),
      product({ top: 67, left: 44.5, contentId: ContentIds.A5 }),
      product({ top: 70, left: 60, contentId: ContentIds.A3Plus }),
      verTodos({ top: 80, left: 76, externalLink: 'https://www.anthos.it/', alignRight: true })
    ]
  },
  {
    stepLabel: zoneTitles[3].text,
    videoTime: 14,
    videoLinks: [
      {
        top: 35,
        left: 47,
        labelText: 'Conheça a nossa equipa',
        heading: '',
        videoLink: 'fa3oeEyNdRA'
      },
      {
        top: 73,
        left: 16,
        labelText: `
          Catálogos
          e Revista
          de Promoções
        `,
        contentId: ContentIds.catalogList01
      },
      {
        top: 84,
        left: 49,
        labelText: 'Fale connosco',
        contentId: ContentIds.talkToUs03
      }
    ]
  },
  {
    stepLabel: zoneTitles[4].text,
    videoTime: 8,
    videoLinks: [
      { top: 28.3, left: 33, contentId: ContentIds.NSK },
      { top: 30, left: 42.5, contentId: ContentIds.BienAir },
      { top: 32.4, left: 53.5, contentId: ContentIds.EMS },
      { top: 34.8, left: 65.3, contentId: ContentIds.Durr },
      { top: 33, left: 77, brandImage: brandImage(Brands.Anthos), contentId: ContentIds.Anthos },
      { top: 36.5, left: 72, labelText: 'Euronda', contentId: ContentIds.Euronda },
      { top: 78, left: 50, labelText: 'Fale connosco', contentId: ContentIds.talkToUs02 }
    ]
  },
  {
    stepLabel: zoneTitles[5].text,
    videoTime: 6,
    videoLinks: [
      { top: 13, left: 60, labelText: 'Check-up Gratuito', heading: 'CAMPANHA', contentId: ContentIds.checkupGratuito },
      { top: 31, left: 71, labelText: 'Retoma Equipamentos', heading: 'CAMPANHA', contentId: ContentIds.retomaEquipamentos },
      { top: 49, left: 71, labelText: 'Certificação CE', heading: 'INFORMAÇÕES', contentId: ContentIds.certificacaoCE },
      { top: 65, left: 65, labelText: 'Dicas e Sugestões', heading: 'VÍDEOS', contentId: ContentIds.dicasSugestoes },
      { top: 75, left: 45, labelText: 'Segurança Informática', heading: 'PARCERIA', contentId: ContentIds.segurancaInformatica },
      { top: 58, left: 50, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs04 }
    ]
  }
].map(data => ({ ...data, stepLabel: data.stepLabel.trim() }))

export const zoneData: StepData[][] = [
  // 0 Leave empty
  [],
  // 1
  zone1to5Data,
  // 2
  zone1to5Data,
  // 3
  zone1to5Data,
  // 4
  zone1to5Data,
  // 5
  zone1to5Data,
  // 6
  [
    {
      brands: [
        contentData.inLabMCXL.brand
      ],
      videoTime: 3,
      videoLinks: [
        product({ top: 68, left: 35, contentId: ContentIds.inLabMCXL }),
        product({ top: 58, left: 43, contentId: ContentIds.inEosX5 }),
        { top: 75, left: 55, ...sistemasFinanceiros },
        { top: 64, left: 64, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs05 }
      ]
    },
    {
      brands: [
        contentData.r5.brand
      ],
      videoTime: 9.2,
      videoLinks: [
        product({ top: 79, left: 51, contentId: ContentIds.r5 }),
        product({ top: 79, left: 28, contentId: ContentIds.z4 }),
        { top: 64, left: 10, ...sistemasFinanceiros },
        { top: 64, left: 64, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs05 }
      ]
    },
    {
      brands: [
        contentData.CS3600.brand
      ],
      videoTime: 10.7,
      videoLinks: [
        product({ top: 51, left: 47, contentId: ContentIds.CS3600 }),
        product({ top: 50, left: 58, contentId: ContentIds.CS3700 }),
        { top: 75, left: 50, ...sistemasFinanceiros },
        { top: 64, left: 30, labelText: 'Fale connosco', contentId: ContentIds.talkToUs05 }
      ]
    },
    {
      brands: [
        contentData.exocadSoftware.brand
      ],
      videoTime: 12.3,
      videoLinks: [
        product({ top: 57, left: 20, contentId: ContentIds.exocadSoftware }),
        { top: 75, left: 50, ...sistemasFinanceiros },
        { top: 60, left: 30, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs05 }
      ]
    },
    {
      brands: [
        contentData.ProgramatP510.brand,
        contentData.VACUMAT6000MP.brand
      ],
      videoTime: 13.5,
      videoLinks: [
        product({ top: 62, left: 10, contentId: ContentIds.VACUMAT6000MP, withBrandImage: true }),
        product({ top: 29, left: 21, contentId: ContentIds.ProgramatP510, withBrandImage: true }),
        { top: 76, left: 30, labelText: 'Impressão 3D', contentId: ContentIds.Impressao },
        { top: 80, left: 50, ...sistemasFinanceiros },
        { top: 68, left: 40, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs05 }
      ]
    }
  ],
  // 7
  [
    {
      brands: [
        contentData.CS82003D.brand
      ],
      videoTime: 2.5,
      videoLinks: [
        product({ top: 78, left: 42.5, contentId: ContentIds.CS82003D }),
        product({ top: 72, left: 31, contentId: ContentIds.CS9600 }),
        verTodos({ top: 77, left: 55, externalLink: 'https://www.carestreamdental.com/en-emea/', alignRight: true }),
        { top: 64, left: 15, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs02 }
      ]
    },
    {
      brands: [
        contentData.GianoHR2D3DCEPH.brand
      ],
      videoTime: 9,
      videoLinks: [
        product({ top: 70, left: 40, contentId: ContentIds.GianoHR2D3DCEPH, alignRight: true }),
        product({ top: 74, left: 60, contentId: ContentIds.Go2D3DCEPH, alignRight: true }),
        verTodos({ top: 37, left: 30, externalLink: 'https://www.newtom.it/en/products', alignRight: true }),
        { top: 85, left: 85, labelText: 'Fale connosco', heading: '', contentId: ContentIds.talkToUs02 }
      ]
    }
  ]
]

/** Seperate zone1to5 data into separate arrays (use in Mobile) */
const envelopedZones = [
  [],
  ...zone1to5Data.map(zone => [zone]),
  zoneData[6],
  zoneData[7]
]

export const zoneBrands = envelopedZones.map(zoneSteps => {
  const brands: { [x:string]: Brand } = {}
  for (const stepData of zoneSteps) {
    for (const videoLink of stepData.videoLinks) {
      if (videoLink.contentId) {
        const content = contentData[videoLink.contentId]
        if ('brand' in content) brands[content.brand] = content.brand
      }
    }
  }
  return Object.values(brands)
})

export interface ContentAndId {
  content: ContentData
  id: ContentIdType
}

type ZoneDataByBrand = Record<Brand | 'None', ContentAndId[]>

/** For use in Mobile zones */
export const zoneDataByBrand = envelopedZones.reduce<ZoneDataByBrand[]>((data, zone) => {
  const zoneDataByBrand = { None: [] } as unknown as ZoneDataByBrand
  for (const stepData of zone) {
    for (const videoLink of stepData.videoLinks) {
      if (videoLink.contentId) {
        const content = contentData[videoLink.contentId]
        const contentAndId = { content, id: videoLink.contentId }
        if ('brand' in content) {
          zoneDataByBrand[content.brand] = zoneDataByBrand[content.brand] ?? []
          zoneDataByBrand[content.brand].push(contentAndId)
        } else {
          zoneDataByBrand.None.push(contentAndId)
        }
      }
    }
  }
  return data.concat(zoneDataByBrand)
}, [])
