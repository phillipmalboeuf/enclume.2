import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { ContentService } from '@/services/content'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
  params,
  searchParams
): Promise<Metadata> {
  const contact = await ContentService.contact()

  return {
    title: 'Contact',
    description: documentToPlainTextString(contact.fields.information)
  }
}

export default async function Contact() {
  const contact = await ContentService.contact()
  return <>
    <PageTransition />
    <main className='teal_back relative' role='main'>
      <span className='hide_on_tablet_portrait'><Icon i='anvil_orange' /></span>
      <span className='tablet_portrait_only'><Icon i='anvil_orange_long' /></span>

      <div className='grid grid--full grid--middle'>
        <OnScroll className='padded'>
          <p className='big'>
            <a href={`tel:${contact.fields.phoneNumber}`} target='_blank'><LE c={contact} k='phoneNumber' /></a><br />
            <a href={`mailto:${contact.fields.emailAddress}`} target='_blank'><LE c={contact} k='emailAddress' /></a>
          </p>

          <p className='big'>
            <a href='https://goo.gl/maps/jPr4tvzm1AB2' target='_blank'>
              <LE c={contact} k='address' />
            </a>
          </p>

          <div className='max_width max_width--tight underline_links'>
            <LRE c={contact} k='information' />
          </div>
        </OnScroll>
        
      </div>
    </main>
  </>
}
