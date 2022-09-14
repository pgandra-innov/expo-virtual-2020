import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { contentData, NewsList } from '../../../data/contentData'
import { getContentLink } from '../../../data/getContentLink'
import { getZone } from '../../../data/getNumberQuery'
import { CustomLink } from '../../CustomLink'
import { RoundedButton } from '../../RoundedButton'
import { ContentTemplate } from '../Template/Template'
import classes from './desktopList.module.scss'

export const NewsDesktopList = (props: NewsList): JSX.Element => {
  const zone = getZone(useRouter())
  return (
    <ContentTemplate>
      <div className='d-flex align-items-center'>
        <h1 className='pre-line font-weight-bold'>Notícias</h1>
      </div>
      {
        props.items.map((newsItem, index) => {
          const newsItemData = contentData[newsItem]
          return (
            <Fragment key={index}>
              <div className='d-flex pt-5 pb-2'>
                <div className='col-3 p-0'>
                  <img className='w-100' src={newsItemData.image} alt={newsItemData.imageAlt} />
                </div>
                <div className='d-flex flex-grow-1 flex-column pl-4' >
                  <h4 className='font-weight-bold'>{newsItemData.heading}</h4>
                  <p dangerouslySetInnerHTML={{ __html: newsItemData.description.trim().slice(0, 300) + '...' }}/>
                </div>
              </div>
              <div className='d-flex'>
                <div className='col-4 offset-md-3'>
                  <CustomLink href={getContentLink(newsItem, zone)} >
                    <RoundedButton text='Ler mais' className={classes.roundedButton} />
                  </CustomLink>
                </div>
              </div>
            </Fragment>
          )
        })
      }
    </ContentTemplate>
  )
}
