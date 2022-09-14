import { DisplayType } from '../../../components/DisplayType'
import ZoneTemplate from '../../zone/[zone]'
import Home from '../index'

export default function HomeContent (): JSX.Element {
  return <DisplayType Mobile={ZoneTemplate} All={Home} />
}
