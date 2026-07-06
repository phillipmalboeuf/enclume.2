import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { ContentService } from '@/services/content'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { Slider } from '@/components/slider'
import { Picture } from '@/components/picture'
export const revalidate = 0
export async function generateMetadata(
): Promise<Metadata> {
  const homepage = await ContentService.homepage()
  return {
    title: homepage.fields.title,
    description: homepage.fields.description
  }
}
export default async function Home() {
  const homepage = await ContentService.homepage()
  return <>
    <PageTransition />
    <main role='main'>
      <div className='padded padded--big_top padded--flat_bottom relative nooverflow'>
        <Icon i='anvil_homepage' />
        <div>
          <LRE c={homepage} k='introduction' />
        </div>
        <style>{`
          .slide-crop {
            aspect-ratio: 3 / 2;
            overflow: hidden;
          }
          .slide-crop img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          @media (max-width: 768px) {
            .home-col-text { order: 2; }
            .home-col-image { order: 1; }
            .home-grid { display: flex; flex-direction: column; }
          }
        `}</style>
        <div className='grid grid--guttered grid--bottom home-grid'>
          <div className='col col--4of12 col--tablet_portrait--12of12 home-col-text'>
            <p style={{ lineHeight: 1.2 }><LE c={homepage} k='description' /></p>
            <div className='normal_bottom' />
          </div>
          <div className='col col--8of12 col--tablet_portrait--12of12 home-col-image'>
            <Slider draggable={false} fade={true} adaptiveHeight={false} autoPlay={6666} slides={homepage.fields.gallerie.map((slide: any)=>
              <figure className='figure--caption' key={slide.sys.id}>
                <div className='slide-crop'>
                  <Picture src={slide.fields.file.url} alt={slide.fields.title} />
                </div>
                {slide.fields.description && <figcaption className='teal_back'>{slide.fields.description}</figcaption>}
              </figure>
            )} />
          </div>
        </div>
      </div>
    </main>
  </>
}
