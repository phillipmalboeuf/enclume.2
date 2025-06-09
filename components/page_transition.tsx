'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { Transition } from './animations'
import { Icon } from './icon'

interface Props {}
export const PageTransition: FunctionComponent<Props> = props => {
  const [isBrowser, setIsBrowser] = useState(false)
  
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) return null

  const random = Math.floor(Math.random() * 3)
  return <Transition keys={['anvil']} className={`grid grid--full grid--middle grid--center hero hero--transition hero--transition--${random} relative`}>
    <Icon key={'anvil'} i={['anvil_transition_red', 'anvil_transition_green', 'anvil_transition_orange'][random]} />
  </Transition>
}