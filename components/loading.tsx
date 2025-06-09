import { Icon } from './icon'
import { LPE } from './entry'
import { Fade, FadeOut } from './animations'
import { FunctionComponent } from 'react'
import { ContentService } from '@/services/content'

interface Props {
}

export const Loading: FunctionComponent<Props> = async (props) => {
  const homepage = await ContentService.homepage()
  return <>
    <FadeOut className='grid grid--full grid--middle grid--center hero hero--landing'>
      <LPE c={homepage} k='hero' />
      <Icon i='anvil_hero' />
      <Icon i='logo' />
    </FadeOut>
  </>
}