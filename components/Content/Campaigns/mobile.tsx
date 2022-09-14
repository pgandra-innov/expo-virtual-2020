import Link from 'next/link'
import { Campaign } from '../../../data/contentData'
import { Centered } from '../../MobileCentered'
import { RoundedButton } from '../../RoundedButton'
import { ContactButtons } from '../Product/ContactButtons'
import classes from '../../PageTemplates/Zone/mobile.module.scss'

export const CampaignMobile = (props: Campaign): JSX.Element =>
  <>
    <Centered wide className='pt-2 pb-4'>
      <img
        className={`${classes.contentImage} mw-100`}
        src={props.image}
        alt={props.imageAlt}
      />
    </Centered>
    <Centered>
      <h2 className={classes.contentCategory}>
        {props.heading}
      </h2>
      <h4 className='pt-2 pb-2'>
        {props.description}
      </h4>
      <p
        className='pre-line fs-1_2'
        dangerouslySetInnerHTML={{ __html: props.description.trim() }}
      />
      {
        props.actionButtons?.map(actionButton =>
          <Link key={actionButton.link} href={actionButton.link}>
            <RoundedButton className='mt-4' actionButton text={actionButton.text} />
          </Link>)
      }
      <ContactButtons column />
    </Centered>
  </>
