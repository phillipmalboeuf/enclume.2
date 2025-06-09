'use client'

import { usePathname } from 'next/navigation'
import { FunctionComponent, useEffect } from 'react'

interface Props {
}

export const Parallax: FunctionComponent<Props> =  (props) => {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>('[data-parallax]')
    let position: number
    let animation: number

    window.cancelAnimationFrame(animation)
    
    function scroll() {
      if(position != window.scrollY) {
        elements.forEach(element => {
          element.style.transform = `translateY(-${window.scrollY/parseFloat(element.getAttribute('data-parallax'))/8}px)`
        })
        animation = window.requestAnimationFrame(scroll)
        position = window.scrollY
      } else {
        animation = window.requestAnimationFrame(scroll)
      }
    }

    scroll()
    position = 0
    animation = window.requestAnimationFrame(scroll)

    return () => window.cancelAnimationFrame(animation)
  }, [pathname])

  return null
}