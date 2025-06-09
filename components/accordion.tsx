'use client'

import * as React from 'react'
import { Height } from './animations'


interface Props {
  items: {
    title: string | React.JSX.Element,
    body: string | React.JSX.Element
  }[]
}
interface State {
  selected: number
}

export class Accordion extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      selected: undefined
    }
  }

  public render() {
    return <div className=''>
      {this.props.items.map((item, index)=> {
        return <div key={index} className={`padded ${index === this.props.items.length-1 ? 'orange_back' : [
          'light_green_back',
          'blue_back',
          'beige_back',
          'teal_back'
        ][index % 3]}`}>
          <button className='button--transparent button--full' onClick={()=> this.setState({selected: this.state.selected === index ? undefined : index })}>
            {item.title}
          </button>
          <Height open={this.state.selected === index}><div className='padded padded--flat_horizontal normal_top'>
            {item.body}
          </div></Height>
        </div>
      })}
    </div>
  }
}