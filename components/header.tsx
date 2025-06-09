'use client'

import Link from 'next/link'
import * as React from 'react'

import { Icon } from './icon'

interface Props {
  locale: string
}
interface State {
}

export class Header extends React.Component<Props, State> {
  public element: HTMLElement
  public summary: HTMLElement

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    let Headroom = require('headroom.js')
    let hr = new Headroom(this.element, {
      offset : 66,
      tolerance: {
        up: 24
      }
    })
    hr.init()
  }

  render() {
    return <>
      <header ref={element => { this.element = element }}>
        <div className='grid grid--spaced grid--center_on_tablet_portrait grid--middle'>
          <Link className='a--no_hover a--no_underline' href='/'><Icon i='logo' /></Link>

          <div className='grid grid--thick_guttered hide_on_tablet_portrait'>
            <div className='col'>
              <Link className='header__link' href='/projets'>
                {this.props.locale === 'fr-CA' ? 'Projets' : 'Projects'}
              </Link>
            </div>
            <div className='col'>
              <Link className='header__link' href='/a-propos'>
                {this.props.locale === 'fr-CA' ? 'À propos' : 'About us'}
              </Link>
            </div>
            <div className='col'>
              <Link className='header__link' href='/prix'>
                {this.props.locale === 'fr-CA' ? 'Prix Enclume' : 'Enclume awards'}
              </Link>
            </div>
            <div className='col'>
              <Link className='header__link' href='/contact'>
                {this.props.locale === 'fr-CA' ? 'Contact' : 'Contact'}
              </Link>
            </div>
            {/* <div className='col'>
              <a className='header__link' onClick={()=> {
                this.context.selectLocale(this.context.locale === 'fr-CA' ? 'en-US' : 'fr-CA')
                this.context.fetchContent()
              }}>{this.context.locale === 'fr-CA' ? 'En' : 'Fr'}</a>
            </div> */}
          </div>
        </div>
      </header>
      <details className='menu tablet_portrait_only'>
        <summary ref={summary => { this.summary = summary }} />

        <div className='menu__container grid grid--vertically_spaced'>
          <div className='col menu__item'>
            <Link className='header__link' href='/projets' onClick={e => this.summary.click()}>
              {this.props.locale === 'fr-CA' ? 'Projets' : 'Projects'}
            </Link>
          </div>
          <div className='col menu__item'>
            <Link className='header__link' href='/a-propos' onClick={e => this.summary.click()}>
              {this.props.locale === 'fr-CA' ? 'À propos' : 'About us'}
            </Link>
          </div>
          <div className='col menu__item'>
            <Link className='header__link' href='/prix' onClick={e => this.summary.click()}>
              {this.props.locale === 'fr-CA' ? 'Prix Enclume' : 'Enclume awards'}
            </Link>
          </div>
          <div className='col menu__item'>
            <Link className='header__link' href='/contact' onClick={e => this.summary.click()}>
              {this.props.locale === 'fr-CA' ? 'Contact' : 'Contact'}
            </Link>
          </div>
          {/* <div className='col menu__item'>
            <a className='header__link' onClick={()=> {
              this.context.selectLocale(this.context.locale === 'fr-CA' ? 'en-US' : 'fr-CA')
              this.context.fetchContent()
            }}>{this.context.locale === 'fr-CA' ? 'En' : 'Fr'}</a>
          </div> */}
        </div>
      </details>
    </>
  }
}