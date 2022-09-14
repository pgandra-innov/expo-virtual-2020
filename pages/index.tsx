import { DisplayType } from '../components/DisplayType'
import { MobileTemplate } from '../components/PageTemplates/Mobile/'
import IndexTemplate from '../components/PageTemplates/Index'
import { ZonesOverview } from '../components/ZonesOverview'
import { WelcomeOverlay, WelcomeOverlayContent } from '../components/WelcomeOverlay'

export const IndexAllTemplate = (): JSX.Element =>
  <IndexTemplate
    centerContent={
      <ZonesOverview />
    }
    rightContent={
      <WelcomeOverlay />
    }
    leftContent={
      <></>
    }
    footerContent={
      false
    }
  />

const Mobile = (): JSX.Element =>
  <MobileTemplate withoutMenu>
      <WelcomeOverlayContent fullWidth />
  </MobileTemplate>

export default function Index (): JSX.Element {
  return <DisplayType Mobile={Mobile} All={IndexAllTemplate} />
}
