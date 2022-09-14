import { Info } from '../../../data/contentData'
import { ContactButtons } from '../Product/ContactButtons'
import { ContentTemplate } from '../Template/Template'
import classes from './index.module.scss'

export const InfoContent = (props: Info):JSX.Element =>
  <ContentTemplate>
    <div className='d-flex flex-column pt-3'>
      <div>
        <img width='160' src={props.image} alt={props.imageAlt} />
      </div>
      <h2 className={`${classes.heading} font-weight-bold`}>
        {props.heading}
      </h2>
    </div>
    <p
      className={`${classes.description} pt-5 pb-4`}
      dangerouslySetInnerHTML={{ __html: props.description.trim() }}
    />
    <ContactButtons />
  </ContentTemplate>
