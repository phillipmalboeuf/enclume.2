'use client'

import * as React from 'react'
// import { HashRouter, Switch, Route } from 'react-router-dom'

// declare class Flickity {
//   constructor(element: HTMLElement, options?: any);
//   destroy(): void;
//   reloadCells(): void;
//   reposition(): void;
//   select(index: number): void;
// }

interface Props {
  slides: React.JSX.Element[],
  progress?: { label: string | React.JSX.Element, disabled?: boolean }[],
  draggable?: boolean,
  wrapAround?: boolean,
  dots?: boolean,
  autoPlay?: boolean | number,
  cellAlign?: 'left' | 'center' | 'right',
  adaptiveHeight?: boolean,
  columns?: number,
  prevNextButtons?: boolean,
  fade?: boolean
}
interface State {
  loaded: boolean
}

export class Slider extends React.Component<Props, State> {

  private element: HTMLDivElement
  public slider: Flickity
  private slides: {[key: string]: HTMLDivElement} = {}
  private step: number = 0

  constructor(props: Props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    let Flickity = require('flickity')
    this.slider = new Flickity(this.element, {
      cellSelector: '.slide',
      cellAlign: this.props.cellAlign !== undefined ? this.props.cellAlign : 'left',
      autoPlay: this.props.autoPlay !== undefined ? this.props.autoPlay : false,
      pauseAutoPlayOnHover: this.props.autoPlay !== undefined ? !this.props.autoPlay : undefined,
      draggable: this.props.draggable !== undefined ? this.props.draggable : true,
      wrapAround: this.props.wrapAround !== undefined ? this.props.wrapAround : true,
      imagesLoaded: true,
      adaptiveHeight: this.props.adaptiveHeight !== undefined ? this.props.adaptiveHeight : true,
      prevNextButtons: this.props.prevNextButtons !== undefined ? this.props.prevNextButtons : false,
      pageDots: this.props.dots !== undefined ? this.props.dots : false,
      resize: true,
      selectedAttraction: 0.04,
      friction: 0.5,
      on: {
        change: (index: number) => {
          this.step = index
          // this.props.withHistory && history.pushState({}, '', `#/${index}`)
          // this.setState({})
        }
      }
    })
    this.slider.reloadCells()
    this.slider.reposition()
    window.dispatchEvent(new Event('resize'))
    
    this.setState({
      loaded: true
    })
  }

  componentDidUpdate() {
    window.dispatchEvent(new Event('resize'))
    this.slider.reposition()
  }

  componentWillUnmount() {
    this.slider.destroy()
  }

  public select(step: number) {
    this.slider.select(step)
  }

  public next() {
    this.select(this.step+1)
  }

  public previous() {
    this.select(this.step-1)
  }

  render() {
    return <div className={`slider${this.props.progress ? ' slider--progressbar' : ''}${this.props.fade ? ' slider--fade' : ''}`} ref={(element)=> { this.element = element }}>
      {this.props.slides.map((slide, index)=> <div className='slide' ref={element => { this.slides[index] = element }} style={this.props.columns && { width: `${100/this.props.columns}%` }} key={index} onClick={e => this.next()}>
        {slide}
      </div>)}

      {this.props.progress && <div className='grid medium_bottom'>
        {this.props.progress.map((dot, index)=> <div key={index} className='col col--tablet_portrait--12of12'>
          <button style={{ paddingRight: '2rem' }} className={`button--transparent medium${this.step === index ? ' underline' : ''}`}
            disabled={dot.disabled}
            onClick={e => this.select(index)}>{dot.label}</button>
          </div>)}
      </div>}
    </div>
  }
}