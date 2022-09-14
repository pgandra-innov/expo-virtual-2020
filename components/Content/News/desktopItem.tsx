import { NewsItem } from '../../../data/contentData'
import { ContentTemplate } from '../Template/Template'

export const NewsDesktopItem = (props: NewsItem): JSX.Element =>
  <ContentTemplate onExitRouteBack >
    <div className='d-flex align-items-center mb-5'>
      <h1 className='fs-2_4 pre-line font-weight-bold'>{props.heading}</h1>
    </div>
    <div>
      <img className='float-left mr-4 mb-4' height='120' src={props.image} alt={props.imageAlt} />
      <p className='fs-1_2 pre-line' dangerouslySetInnerHTML={{ __html: props.description.trim() }} />
    </div>
  </ContentTemplate>
