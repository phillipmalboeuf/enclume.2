import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { PageTransition } from '@/components/page_transition'
import { Picture } from '@/components/picture'
import { ContentService } from '@/services/content'
import Link from 'next/link'
import { Metadata } from 'next'
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

      <style>{`
        .hero-image-wrapper { width: 60%; margin-left: auto; margin-right: auto; margin-bottom: 2,5rem; }
        @media (max-width: 768px) { .hero-image-wrapper { width: 100%; } }
      `}</style>

      <div className='padded padded--big_top'>

        {/* HERO — 60% centered desktop, 100% mobile, original ratio */}
        <div className='hero-image-wrapper'>
          <LPE c={project} k={'hero'} />
        </div>

        {/* TITLE — left column, aligned with content below, no parallax, no extra padding */}
        <div className='grid grid--guttered'>
          <div className='col col--6of12 col--tablet_portrait--12of12'>
            <h1 style={{ margin: 0, marginBottom: '2rem' }}>
              <LE c={project} k={'title'} />
            </h1>
          </div>
        </div>

        {/* SUBTITLE + DESCRIPTION — no parallax so it never scrolls over title */}
        <div className='grid grid--thick_guttered grid--spaced_around'>
          <div className='col col--6of12 col--tablet_portrait--12of12 medium_bottom'>
            {project.fields.subTitle && (
              <OnScroll>
                <hr />
                <p className='slight'><LE c={project} k='subTitle' /></p>
              </OnScroll>
            )}
            {project.fields.table && (
              <OnScroll><LRE c={project} k={'table'} /></OnScroll>
            )}
          </div>
          <div className='col col--6of12 col--tablet_portrait--12of12 medium_bottom'>
            <OnScroll><LRE c={project} k={'description'} /></OnScroll>
          </div>
        </div>

        {/* GALLERY */}
        <div className='grid grid--thick_guttered grid--spaced_around grid--middle'>
          {project.fields.gallery?.map((photo: any, index: number) => (
            <OnScroll
              key={photo.fields.file.url}
              className={`col col--${project.fields.galleryGridSizes && project.fields.galleryGridSizes[index]}of12 col--tablet_portrait--12of12`}
            >
              <figure>
                <Picture src={photo.fields.file.url} />
                {photo.fields.description && (
                  <figcaption><small>{photo.fields.description}</small></figcaption>
                )}
              </figure>
              <div className='normal_bottom hide_on_tablet_portrait' />
            </OnScroll>
          ))}
        </div>

      </div>
    </main>

    {/* PREV / NEXT */}
    <div className='grid'>
      {previous && (
        <Link
          href={`/projets/${previous.fields.url}`}
          className='col col--6of12 col--tablet_portrait--12of12 grid grid--spaced grid--nowrap grid--middle light_green_back padded'
        >
          <span className='big padded padded--flat_top padded--flat_bottom' style={{ transform: 'rotate(90deg)' }}>↓</span>
          <h3 className='flat_bottom'><LE c={previous} k={'title'} /></h3>
        </Link>
      )}
      {next && (
        <Link
          href={`/projets/${next.fields.url}`}
          className='col col--6of12 col--tablet_portrait--12of12 grid grid--spaced grid--nowrap grid--middle blue_back padded'
        >
          <h3 className='flat_bottom'><LE c={next} k={'title'} /></h3>
          <span className='big padded padded--flat_top padded--flat_bottom' style={{ transform: 'rotate(-90deg)' }}>↓</span>
        </Link>
      )}
    </div>
  </>
}
