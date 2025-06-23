import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { ContentService } from '@/services/content'
import { TypeTeamMemberFields } from '@/services/types'
import { Metadata } from 'next'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export async function generateMetadata(
  params,
  searchParams
): Promise<Metadata> {
  const engagements = await ContentService.engagementsPage()

  return {
    title: 'Engagements',
    description: documentToPlainTextString(engagements.fields.introduction)
  }
}

export default async function About() {
  const engagements = await ContentService.engagementsPage()
  return <>
    <PageTransition />
    <main className='blue_back' role='main'>
      <Icon i='anvil_engagements_green' />

      <div className='padded padded--big_top'>
        <OnScroll className='grid medium_bottom'>
          <div className='col col--8of12 col--tablet_portrait--9of12 col--phone--12of12'>
            <LRE c={engagements} k='introduction' />
          </div>
        </OnScroll>

        <div className='big_bottom' />

        <OnScroll className='grid grid--tight_guttered'>
          {/* <div className='col col--12of12'
            data-parallax="-1.5"
          >
            <h6><LE c={about} k='engagementsTitle' /></h6>
          </div> */}
          {/* <div
            data-parallax="-3"
            className='col col--10of12 col--phone--12of12'><p className='big'><LE c={about} k='engagementsBody' /></p></div> */}

          <div className='col col--12of12'></div>
          {engagements.fields.engagements.map((engagement: { fields: any }, i: number) => <div key={i} className='col col--4of12 col--tablet_portrait--6of12 underline_links'
            data-parallax="-0.5"
          >
            {engagement.fields.title && <h3><LE c={engagement} k='title' /></h3>}
            <LRE c={engagement} k='body' />
          </div>)}
        </OnScroll>

        <div className='big_bottom' />
      </div>
    </main>
  </>
}
