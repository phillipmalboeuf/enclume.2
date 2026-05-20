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

      {/*
        Icon is position:absolute in the CSS and bleeds to the right edge.
        Wrapping in a div with overflow:hidden clips it without adding padding.
      */}
      <div style={{ overflow: 'hidden' }}>
        <Icon i='anvil_engagements_green' />
      </div>

      <div className='padded padded--big_top'>

        {/*
          Intro text — narrower column so it doesn't extend wider than the background shape.
          col--5of12 keeps it roughly aligned with the left portion of the green anvil shape.
        */}
        <OnScroll className='grid medium_bottom'>
          <div className='col col--5of12 col--tablet_portrait--9of12 col--phone--12of12 slight'>
            <LRE c={engagements} k='introduction' />
          </div>
        </OnScroll>

        <div className='big_bottom' />

        <OnScroll className='grid grid--guttered'>
          <div className='col col--12of12'></div>
          {engagements.fields.engagements.map((engagement: { fields: any }, i: number) => (
            <div
              key={i}
              className='col col--5of12 col--tablet_portrait--6of12 col--phone--12of12 underline_links slight'
              data-parallax="-0.5"
            >
              {engagement.fields.title && <h2><LE c={engagement} k='title' /></h2>}
              <LRE c={engagement} k='body' />
              <div className='normal_bottom phone_only' />
            </div>
          ))}
        </OnScroll>

        <div className='big_bottom' />
      </div>

    </main>
  </>
}
