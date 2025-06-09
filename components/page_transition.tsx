'use client'

import { FunctionComponent } from 'react'
import { Transition } from './animations'
import { Icon } from './icon'

interface Props {}
export const PageTransition: FunctionComponent<Props> = props => {
  const random = Math.floor(Math.random() * 3)
  return <Transition keys={[]} className={`grid grid--full grid--middle grid--center hero hero--transition hero--transition--${random} relative`}>
    <Transition keys={['anvil']} className='grid grid--full grid--middle grid--center'>
      <Icon key={'anvil'} i={['anvil_transition_red', 'anvil_transition_green', 'anvil_transition_orange'][random]} />
    </Transition>
  </Transition>
}