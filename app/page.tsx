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
        <div className='grid grid--guttered grid--bottom'>
          <div className='col col--4of12 col--tablet_portrait--12of12'>
            <h4><LE c={homepage} k='description' /></h4>
            <div className='normal_bottom' />
          </div>
          <div className='col col--8of12 col--tablet_portrait--12of12'>
            <Slider draggable={false} fade={true} adaptiveHeight={true} autoPlay={6666} slides={homepage.fields.gallerie.map((slide: any)=>
              <figure className='figure--caption' key={slide.sys.id}>
                <Picture src={slide.fields.file.url} alt={slide.fields.title} />
              </figure>
            )} />
          </div>
        </div>
      </div>
    </main>
  </>
}
