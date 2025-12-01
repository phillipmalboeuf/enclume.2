'use client'

import Link from 'next/link'
import * as React from 'react'


import { Icon } from './icon'

interface Props {
}
interface State {
}

export class Footer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return <>
      <footer>
        <div className='grid grid--spaced grid--middle'>
          
          <div className='grid grid--guttered grid--middle'>
            {/* <div className='col hide_on_phone'><Link className='a--no_hover' href='/'><Icon i='logo' /></Link></div> */}
            <div className='col'><h4>coopérative en<br />aménagement<br />du territoire</h4></div>
            <div className='col col--tablet_portrait--12of12 phone_only' />
          </div>
          

          <div className='grid grid--thick_guttered'>
            <div className='col col--tablet_portrait--12of12 hide_on_phone' />
            <div className='col'>
              <a href='tel:514-756-4113' target='_blank'>514-756-4113</a><br />
            </div>
            <div className='col'>
              <a href='mailto:info@enclume.ca' target='_blank'>info@enclume.ca</a>
            </div>
          </div>
          <div className='grid grid--thick_guttered'>
            <div className='col'>
              <a href='https://goo.gl/maps/NpgUxc6ewHBePHk88' target='_blank'>4529 rue Clark,<br />
              Bureau #404<br />
              Montréal, Québec<br />
              H2T 2T3</a>
            </div>
            <div className='col'>
              <a href='https://www.facebook.com/enclume.ca/' target='_blank'>Facebook</a><br />
              <a href='https://instagram.com/Enclume_atelier' target='_blank'>Instagram</a><br />
              <a href="https://www.linkedin.com/company/l'enclume---atelier-de-d-veloppement-territorial/" target='_blank'>LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  }
}