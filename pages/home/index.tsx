import { DisplayType } from '../../components/DisplayType'
import { HomeTemplate } from '../../components/PageContent/home'
import { HomeMobile } from '../../components/PageContent/home/mobile'

export default function Home (): JSX.Element {
  return <DisplayType Mobile={HomeMobile} All={HomeTemplate} />
}
