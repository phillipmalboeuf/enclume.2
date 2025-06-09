import { Accordion } from '@/components/accordion'
import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { Picture } from '@/components/picture'
import { Slider } from '@/components/slider'
import { ContentService } from '@/services/content'
import { Asset } from 'contentful'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
  params,
  searchParams
): Promise<Metadata> {
  const [awards_page] = await Promise.all([
    ContentService.awardsPage(),
    // ContentService.awards(),
  ])

  return {
    title: 'Le prix Enclume',
    description: awards_page.fields.introduction
  }
}

export default async function Awards() {
  const [awards_page, awards] = await Promise.all([
    ContentService.awardsPage(),
    ContentService.awards(),
  ])
  return <>
    <PageTransition />
    <main className='' role='main'>

      <div className='padded padded--big_top'>
        <OnScroll className='grid medium_bottom'>
          <h2 className='col col--7of12 col--tablet_portrait--9of12 col--phone--12of12'>
            <LE c={awards_page} k='introduction' />
          </h2>
        </OnScroll>
      </div>

      <Accordion items={[
        ...awards.items.sort((a, b)=> parseInt(a.fields.year) > parseInt(b.fields.year) ? -1 : 1).map((award, index)=> ({
          title: <h1 className='h1--massive' style={{ display: 'block' }}>
            <OnScroll className='grid grid--middle grid--guttered'>
              <div className='col col--2of12 col--tablet_landscape--3of12 col--phone--12of12 no_underline'><LE c={award} k='year' /></div>
              <div className='col col--10of12 col--tablet_landscape--9of12 col--phone--12of12'><LE c={award} k='name' /></div>
            </OnScroll>
          </h1>,
          body: <OnScroll className='grid grid--guttered slight'>
            <div className='col col--2of12 col--tablet_landscape--3of12 col--tablet_portrait--6of12 hide_on_tablet_portrait'>
              {award.fields.photo && <LPE c={award} k='photo' />}
            </div>
            <div className='col col--7of12 col--tablet_landscape--6of12 col--tablet_portrait--10of12 col--tablet_portrait--last col--phone--12of12'>
              <div className='max_width'>
                <LRE c={award} k='description' />
              </div>
            </div>
            <div className='col col--3of12 col--tablet_landscape--3of12 col--tablet_portrait--8of12 col--phone--12of12'>
              <Slider draggable={true} adaptiveHeight={false} slides={award.fields.slider.map((slide: any, i: number)=>
                <div key={slide.sys.id}>
                  <div className='normal_bottom'><Picture src={slide.fields.file.url} /></div>
                  <div className='grid grid--guttered grid--middle'>
                    <div className='col col--12of12'>
                      <div className='grid grid--middle grid--spaced'>
                      <h3 className='flat_bottom'>{i + 1} / {award.fields.slider.length}</h3>
                      <button className='button--transparent medium'>→</button>
                      </div>
                    </div>
                    <div className='col max_width max_width--tight'>
                      <div className='small'>{slide.fields.description}</div>
                    </div>
                  </div>
                </div>
              )} />
            </div>
          </OnScroll>
        })),
        {
          title: <h1 className='h1--massive' style={{ display: 'block' }}>
            <OnScroll className='grid grid--middle grid--guttered'>
              <div className='col col--2of12 col--tablet_landscape--3of12 col--phone--12of12'>?</div>
              <div className='col col--10of12 col--tablet_landscape--9of12 col--phone--12of12'><LE c={awards_page} k='informationTitle' /></div>
            </OnScroll>
          </h1>,
          body: <OnScroll className='grid grid--guttered slight'>
            <div className='col col--2of12 col--tablet_landscape--3of12 col--phone--12of12'>
              {awards_page.fields.pdf && <a href={(awards_page.fields.pdf as Asset).fields.file.url as string} target='_blank' className='underline medium'>{(awards_page.fields.pdf as Asset).fields.title as string}</a>}
            </div>
            <div className='col col--10of12 col--tablet_landscape--9of12 col--phone--12of12 max_width'>
              <Slider draggable={false} progress={awards_page.fields.informationPage.map((slide: any)=>
                ({ label: <LE c={slide} k='title' /> })
              )} slides={awards_page.fields.informationPage.map((slide: any, index: number)=>
                <div key={slide.sys.id}>
                  <LRE c={slide} k='information' />
                </div>
              )} />
            </div>
          </OnScroll>
        }
      ]} />
    </main>
  </>
}
