'use client'

import * as React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Picture } from './picture'


// export class E extends React.PureComponent<{
//   c: string,
//   k: string
// }, {}> {

//   render() {
//     return this.context.content[this.props.c as 'homepage'].fields[this.props.k]
//   }
// }

// export class RE extends React.PureComponent<{
//   c: string,
//   k: string
// }, {}> {

//   render() {
//     return documentToReactComponents(this.context.content[this.props.c as 'homepage'].fields[this.props.k])
//   }
// }

// export class PE extends React.PureComponent<{
//   c: string,
//   k: string,
//   small?: boolean
// }, {}> {

//   render() {
//     return <Picture src={this.context.content[this.props.c as 'homepage'].fields[this.props.k].fields.file.url} small={this.props.small} />
//   }
// }

export class LE extends React.PureComponent<{
  c: { fields: { [key:string]: any } },
  k: string
}, {}> {
  render() {
    return this.props.c.fields[this.props.k]
  }
}

export class LPE extends React.PureComponent<{
  c: { fields: { [key:string]: any } },
  k: string,
  small?: boolean
}, {}> {
  render() {
    return <Picture src={this.props.c.fields[this.props.k].fields.file.url} small={this.props.small} />
  }
}

export class LRE extends React.PureComponent<{
  c: { fields: { [key:string]: any } },
  k: string
}, {}> {

  render() {
    return documentToReactComponents(this.props.c.fields[this.props.k])
  }
}