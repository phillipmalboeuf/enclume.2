import { FunctionComponent } from 'react'

interface Props {
  src: string,
  alt?: string,
  small?: boolean,
  onLoad?: (e: React.SyntheticEvent<HTMLElement>) => void
}

const url = (src: string, size: number): string => {
  return `https:${src.replace('images.ctfassets.net/esgvtsxg5drv', 'enclume.imgix.net')}?auto=format,compress&w=${size}`
}

export const Picture: FunctionComponent<Props> = props => {
	return <picture onLoad={props.onLoad}>
    {props.small
    ? <>
      <source srcSet={url(props.src, 300)} media="(max-width: 600px)" />
      <source srcSet={url(props.src, 450)} media="(max-width: 900px)" />
      <source srcSet={url(props.src, 600)} media="(max-width: 1200px)" />
      <img src={url(props.src, 750)} alt={props.alt} />
    </>
    : <>
      <source srcSet={url(props.src, 600)} media="(max-width: 600px)" />
      <source srcSet={url(props.src, 900)} media="(max-width: 900px)" />
      <source srcSet={url(props.src, 1200)} media="(max-width: 1200px)" />
      <img src={url(props.src, 1500)} alt={props.alt} />
    </>}
	</picture>
}

