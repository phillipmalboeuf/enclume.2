import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { ContentService } from '@/services/content'
import { TypeTeamMemberFields } from '@/services/types'
import { Metadata } from 'next'
import Link from 'next/link'
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
    <main className='' role='main'>

      {/* Background shape — overflow hidden fixes the right side gap */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <Icon i='anvil_engagements_green' />
      </div>

      <div className='padded padded--big_top'>

        {/* Intro text — narrower column */}
        <OnScroll className='grid medium_bottom'>
          <div className='col col--5of12 col--tablet_portrait--9of12 col--phone--12of12 slight'>
            <LRE c={engagements} k='introduction' />
          </div>
        </OnScroll>

        <div className='big_bottom' />

        {/* Engagement items — col--3of12 keeps them narrow but in same grid positions */}
        <OnScroll className='grid grid--guttered'>
          <div className='col col--12of12'></div>
          {engagements.fields.engagements.map((engagement: { fields: any }, i: number) => (
            <div
              key={i}
              className='col col--5of12 col--tablet_portrait--6of12 col--phone--12of12'
              data-parallax="-0.5"
            >
              <div className='underline_links slight' style={{ maxWidth: '75%' }}>
                {engagement.fields.title && <h2><LE c={engagement} k='title' /></h2>}
                <LRE c={engagement} k='body' />
              </div>
              <div className='normal_bottom phone_only' />
            </div>
          ))}
        </OnScroll>

        <div className='big_bottom' />
      </div>

    </main>
  </>
}
