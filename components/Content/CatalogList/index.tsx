import {
  CatalogList as ICatalogList,
  Catalog as ICatalog,
  CatalogGroup as ICatalogGroup,
  ContentIds
} from '../../../data/contentData'
import { RoundedButton, RoundedButtonProps } from '../../RoundedButton'
import { ClearAnchor } from '../../CustomLink'
import { ContentTemplate } from '../Template/Template'
import classes from './index.module.scss'
import { TalkToUsButton } from '../../TalkToUsButton'

const CatalogButton = ({ className = '', ...props }: RoundedButtonProps): JSX.Element =>
  <RoundedButton
    className={`${classes.catalogButton} ${className} w-100 justify-content-center pt-2 pb-2 mt-2`}
    {...props}
  />

const CatalogListButton = ({ className = '', ...props }: RoundedButtonProps): JSX.Element =>
  <CatalogButton className={`${className} mt-2`} {...props} />

const Catalog = (props: ICatalog): JSX.Element =>
  <div className={`${classes.catalog} d-flex flex-column align-items-center`}>
    <div className='w-100 overflow-hidden'>
      <img className={`${classes.catalogImage} w-100`} src={props.image} alt={props.imageAlt} />
    </div>
    <p className={`${classes.catalogDescription} pt-3`}>
      {props.description.trim()}
    </p>
    <ClearAnchor className='w-100' href={props.downloadLink} target="_blank">
      <CatalogButton text='Download' outlined />
    </ClearAnchor>
  </div>

const CatalogGroup = (props: ICatalogGroup): JSX.Element =>
  <div className={`${classes.catalogGroup} pb-5`}>
    <h3 className='pb-3'>
      {props.heading}
    </h3>
    <div className='d-flex'>
      {
        props.catalogs.map((content, index) =>
          <Catalog key={index} {...content} />)
      }
    </div>
  </div>

export const CatalogList = (props: ICatalogList): JSX.Element =>
  <ContentTemplate>
  <div className='d-flex flex-wrap'>
    <div className='d-flex align-items-center pt-3'>
      <div>
        <img width='160' src={props.brandImage} alt={props.brandImageAlt} />
      </div>
      <h3 className='pl-4 font-weight-bold'>
        {props.heading}
      </h3>
    </div>
    <p
      className='pt-4 pb-4'
      dangerouslySetInnerHTML={{ __html: props.description.trim() }}
    />
    {
      props.catalogGroups.map((content, index) =>
        <CatalogGroup key={index} {...content} />)
    }
    <div className={`${classes.onlineStoreContainer} pb-5`}>
      <h3 className='pb-3'>
        Loja Online
      </h3>
      <div className={`${classes.catalogContainer} w-100`}>
        <div className={`${classes.catalog} d-flex flex-column align-items-center`}>
          <div className='w-100 overflow-hidden'>
            <img className={`${classes.catalogImage} w-100`} src='/content/icons/lojaOnline.png' alt='Loja Online' />
          </div>
          <ClearAnchor className='w-100' href={props.storeLink} target="_blank">
            <CatalogListButton text='Loja Online' />
          </ClearAnchor>
          <TalkToUsButton talkToUsId={ContentIds.talkToUs03} ButtonComponent={CatalogListButton} />
        </div>
      </div>
    </div>
  </div>
</ContentTemplate>
