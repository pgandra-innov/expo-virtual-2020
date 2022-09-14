import { Campaign as ICampaign } from '../../../data/contentData'
import { ProductContentTemplate } from '../Product/Template'

export const Campaign = (props: ICampaign): JSX.Element =>
  <ProductContentTemplate {...props} />
