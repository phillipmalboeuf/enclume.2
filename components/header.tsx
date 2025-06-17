'use client'

import Link from 'next/link'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { Icon } from './icon'

interface Props {
  locale: string
}

export function Header({ locale }: Props) {
  const elementRef = useRef<HTMLElement>(null)
  const summaryRef = useRef<HTMLElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (elementRef.current) {
      const Headroom = require('headroom.js')
      const hr = new Headroom(elementRef.current, {
        offset: 66,
        tolerance: {
          up: 24
        }
      })
      hr.init()
    }
  }, [])

  return (
    <header ref={elementRef}>
      <nav className='grid grid--spaced grid--middle'>
        <Link className='a--no_hover a--no_underline' href='/'><Icon i='logo' /></Link>

        <div className='grid grid--guttered grid--middle'>
          <div className='col hide_on_tablet_portrait'>
            <Link className='header__link' href='/projets'>
              {locale === 'fr-CA' ? 'Projets' : 'Projects'}
            </Link>
          </div>
          <div className='col hide_on_tablet_portrait'>
            <Link className='header__link' href='/a-propos'>
              {locale === 'fr-CA' ? 'À propos' : 'About us'}
            </Link>
          </div>
          {/* <div className='col'>
            <Link className='header__link' href='/prix'>
              {locale === 'fr-CA' ? 'Prix Enclume' : 'Enclume awards'}
            </Link>
          </div> */}
          <div className='col hide_on_tablet_portrait'>
            <Link className='header__link' href='/contact'>
              {locale === 'fr-CA' ? 'Contact' : 'Contact'}
            </Link>
          </div>
          {/* <div className='col'>
            <a className='header__link' onClick={()=> {
              context.selectLocale(context.locale === 'fr-CA' ? 'en-US' : 'fr-CA')
              context.fetchContent()
            }}>{context.locale === 'fr-CA' ? 'En' : 'Fr'}</a>
          </div> */}

          <details className={`col menu ${isOpen ? 'menu--open' : ''}`}>
            <summary ref={summaryRef} onClick={e => {
              if (isOpen) {
                e.preventDefault()
                setIsOpen(false)

                setTimeout(() => {
                  (summaryRef.current?.parentElement as HTMLDetailsElement).removeAttribute('open')
                }, 666)
              } else {
                setIsOpen(!isOpen)
              }
            }}>
              <Icon i='plus' />
            </summary>

            <div className='menu__container grid grid--guttered grid--column grid--spaced'>
              <ol>
                <li className='menu__item'>
                  <Link className='header__link' href='/projets' onClick={e => summaryRef.current?.click()}>
                    {locale === 'fr-CA' ? 'Projets' : 'Projects'}
                  </Link>
                </li>
                <li className='menu__item'>
                  <Link className='header__link' href='/a-propos' onClick={e => summaryRef.current?.click()}>
                    {locale === 'fr-CA' ? 'À propos' : 'About us'}
                  </Link>
                </li>
                <li className='menu__item'>
                  <Link className='header__link' href='/engagements' onClick={e => summaryRef.current?.click()}>
                    {locale === 'fr-CA' ? 'Engagements' : 'Engagements'}
                  </Link>
                </li>
                <li className='menu__item'>
                  <Link className='header__link' href='/prix' onClick={e => summaryRef.current?.click()}>
                    {locale === 'fr-CA' ? 'Prix Enclume' : 'Enclume awards'}
                  </Link>
                </li>
                <li className='menu__item'>
                  <Link className='header__link' href='/contact' onClick={e => summaryRef.current?.click()}>
                    {locale === 'fr-CA' ? 'Contact' : 'Contact'}
                  </Link>
                </li>
              </ol>
              <ol>
                <li className='menu__item'>
                  <a href='https://www.facebook.com/enclume.ca/' target='_blank'>Facebook</a>
                </li>
                <li className='menu__item'>
                  <a href='https://instagram.com/Enclume_atelier' target='_blank'>Instagram</a>
                </li>
                <li className='menu__item'>
                  <a href="https://www.linkedin.com/company/l'enclume---atelier-de-d-veloppement-territorial/" target='_blank'>LinkedIn</a>
                </li>
              </ol>
              {/* <div className='col menu__item'>
                <a className='header__link' onClick={()=> {
                  context.selectLocale(context.locale === 'fr-CA' ? 'en-US' : 'fr-CA')
                  context.fetchContent()
                }}>{context.locale === 'fr-CA' ? 'En' : 'Fr'}</a>
              </div> */}
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}