'use client'
import Link from 'next/link'
import * as React from 'react'
import { Icon } from './icon'

interface Props {}
interface State {}

export class Footer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return <>
      <style>{`
        /* Chantier ES logo column */
        .footer-chantier {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
        .footer-chantier img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        /* On mobile: hide from social column, show aligned right on email row */
        .footer-chantier--desktop {
          display: flex;
        }
        .footer-chantier--mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .footer-chantier--desktop {
            display: none;
          }
          .footer-chantier--mobile {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-left: auto;
          }
        }
      `}</style>

      <footer>
        <div className='grid grid--spaced grid--middle'>

          <div className='grid grid--guttered grid--middle'>
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
              {/* Mobile: logo appears right-aligned on same row as email */}
              <span className='footer-chantier--mobile'>
                <img src='/chantier-es.png' alt='Chantier de l'économie sociale' />
              </span>
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
            {/* Desktop/tablet: logo in its own column to the right of social links */}
            <div className='col footer-chantier--desktop'>
              <img src='/chantier-es.png' alt='Chantier de l'économie sociale' />
            </div>
          </div>

        </div>
      </footer>
    </>
  }
}
