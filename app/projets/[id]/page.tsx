import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { Picture } from '@/components/picture'
import { ContentService } from '@/services/content'
import Link from 'next/link'

import { Metadata, ResolvingMetadata } from 'next'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export async function generateMetadata(
  params,
  searchParams
): Promise<Metadata> {
  const project = await ContentService.project({ 'fields.url': params.params.id })

  return {
    title: project.fields.title,
    description: documentToPlainTextString(project.fields.description),
    openGraph: {
      images: [
        {
          url: project.fields.hero && `https:${project.fields.hero.fields.file.url}`
        }
      ]
    }
  }
}

export default async function Projet({
  params,
  searchParams
}) {
  const project = await ContentService.project({ 'fields.url': params.id })
  const [previous, next] = await Promise.all([
    ContentService.project({ 'fields.url': project.fields.previous }),
    ContentService.project({ 'fields.url': project.fields.next })
  ])

  return <>
    <PageTransition />
    <main className='relative' role='main'>
      {({
        planning: <Icon i='anvil_project_green' />,
        participation: <Icon i='anvil_project_red' />,
        research: <Icon i='anvil_project_beige' />
      } as any)[project.fields.category && project.fields.category.fields.key]}

      <div className='padded padded--big_top'>
        <OnScroll className='padded big_bottom max_width max_width--center max_width--wide'>
          <div className='fixed_ratio_img'><LPE c={project} k={'hero'} /></div>
        </OnScroll>

        <h1
          data-parallax="1.5"
        ><OnScroll><LE c={project} k={'title'} /></OnScroll></h1>

        <div
          data-parallax="1.5"
          className='medium_bottom max_width'>
          {project.fields.subTitle && <OnScroll><p className='slight'><LE c={project} k='subTitle' /></p></OnScroll>}
          <OnScroll><LRE c={project} k={'description'} /></OnScroll>
        </div>

        <div
          data-parallax="2"
          className='grid grid--thick_guttered grid--spaced_around grid--middle'>
          {project.fields.gallery?.map((photo: any, index: number)=> <OnScroll key={photo.fields.file.url} className={`col col--${project.fields.galleryGridSizes && project.fields.galleryGridSizes[index]}of12 col--tablet_portrait--12of12`}>
            <figure>
              <Picture src={photo.fields.file.url} />
              {photo.fields.description && <figcaption><small>{photo.fields.description}</small></figcaption>}
            </figure>

            <div className='normal_bottom hide_on_tablet_portrait' />
          </OnScroll>)}
        </div>
      </div>
    </main>
    <div className='grid'>
      {previous && <Link href={`/projets/${previous.fields.url}`} className='col col--6of12 col--tablet_portrait--12of12 grid grid--spaced grid--middle orange_back padded'>
        <span className='big' style={{ transform: 'rotate(90deg)' }}>↓</span>
        <h3 className='flat_bottom'><LE c={previous} k={'title'} /></h3>
      </Link>}
      {next && <Link href={`/projets/${next.fields.url}`} className='col col--6of12 col--tablet_portrait--12of12 grid grid--spaced grid--middle teal_back padded'>
        <h3 className='flat_bottom'><LE c={next} k={'title'} /></h3>
        <span className='big' style={{ transform: 'rotate(-90deg)' }}>↓</span>
      </Link>}
    </div>
  </>
}
