import { OnScroll } from '@/components/animations'
import { LE, LPE, LRE } from '@/components/entry'
import { Icon } from '@/components/icon'
import { PageTransition } from '@/components/page_transition'
import { ContentService } from '@/services/content'
import { TypeTeamMemberFields } from '@/services/types'
import { Metadata } from 'next'

export async function generateMetadata(
  params,
  searchParams
): Promise<Metadata> {
  const about = await ContentService.aboutPage()

  return {
    title: 'À propos',
    description: about.fields.intro
  }
}

export default async function About() {
  const about = await ContentService.aboutPage()
  return <>
    <PageTransition />
    <main className='blue_back' role='main'>
      <Icon i='anvil_blue' />

      <div className='padded padded--big_top'>
        <OnScroll className='grid medium_bottom'>
          <h2 className='col col--7of12 col--tablet_portrait--9of12 col--phone--12of12'>
            <LE c={about} k='intro' />
          </h2>
        </OnScroll>

        {/* <OnScroll className='grid grid--guttered'>
          <div className='col col--3of12 col--tablet_landscape--4of12 col--tablet_portrait--6of12 col--phone--12of12'
            data-parallax="2"
          >
            <LRE c={about} k='introBodyLeft' />
          </div>
          <div className='col col--3of12 col--tablet_landscape--4of12 col--tablet_portrait--6of12 col--phone--12of12'
            data-parallax="1"
          >
            <LRE c={about} k='introBodyRight' />
          </div>
        </OnScroll> */}

        <div className='big_bottom' />

        <OnScroll className='grid grid--thick_guttered'>
          <div className='col col--12of12'
            data-parallax="1.5"
          >
            <LE c={about} k='categoriesTitle' />
          </div>
          {about.fields.categories.map((category: any, index: number)=> <div key={category.sys.id} className='col col--4of12 col--tablet_landscape--4of12 col--tablet_portrait--6of12 col--phone--12of12'
            data-parallax="1.5"
          >
            <h2><LE c={category} k='title' /></h2>
            <p className='slight'><LE c={category} k='description' /></p>
          </div>)}
        </OnScroll>

        <div className='big_bottom' />

        <OnScroll className='grid grid--guttered'>
          <div className='col col--12of12'
            data-parallax="1.5"
          >
            <h6><LE c={about} k='teamTitle' /></h6>
          </div>
          <div className='col col--8of12 col--tablet_portrait--10of12 col--phone--12of12'
            data-parallax="3"
          ><p className='big'><LE c={about} k='teamBody' /></p></div>

          <div className='col col--12of12'></div>
          {about.fields.teamMembers.filter((member: any)=> member.fields).map((member: { fields: any, sys: { id: string } })=> <div key={member.sys.id} className='col col--3of12 col--tablet_landscape--6of12'>
            <button className='button--transparent'>
              <div className='relative'>
                <LPE c={member} k='photo' />
                <div className='img_hover padded padded--tight teal_back'>
                  <h3 className='small_bottom hide_on_tablet_portrait'><LE c={member} k='name' /></h3>
                  <h3><LE c={member} k='description' /></h3>
                  {member.fields.credentials && <div className='grid grid--tight_guttered hide_on_tablet_portrait'>{Object.entries(member.fields.credentials as TypeTeamMemberFields['credentials']).map(([key, value])=> <div key={key} className='col col--6of12 col--phone--12of12' style={{ lineHeight: 1.33 }}>
                    <strong>{key}</strong><br />
                    <span>{value as string}</span>
                  </div>)}</div>}

                  <div className='img_hover_hover padded padded--tight grid grid--bottom beige_back'>
                    <div>
                    {member.fields.phone && <h3 className='small_bottom'><a href={`tel:${member.fields.phone}`} target='_blank'><LE c={member} k='phone' /></a></h3>}
                    {member.fields.emailAddress && <h3 className='small_bottom'><a href={`mailto:${member.fields.emailAddress}`} target='_blank'>{member.fields.emailAddress.replace('@','\n@')}</a></h3>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='tablet_portrait_only'>
                <h4><LE c={member} k='name' /></h4>
              </div>
            </button>
          </div>)}
        </OnScroll>

        {about.fields.collaborators && about.fields.collaborators.length && <>
        <div className='big_bottom' />

        <OnScroll className='grid grid--tight_guttered'>
          <div className='col col--12of12'
            data-parallax="-1.5"
          >
            <h6><LE c={about} k='collaboratorsTitle' /></h6>
          </div>
          <div
            data-parallax="-3"
            className='col col--8of12 col--tablet_portrait--10of12 col--phone--12of12'><p className='big'><LE c={about} k='collaboratorsBody' /></p></div>

          <div className='col col--12of12'></div>
          {about.fields.collaborators && about.fields.collaborators.map((collaborator: { fields: any }) => <div key={collaborator.fields.name} className='col col--12of12'
            data-parallax="-0.5"
            >
            <hr />
            
            <div className='grid grid--guttered grid--middle'>
              <div className='col col--4of12 col--tablet_landscape--4of12 col--tablet_portrait--9of12 col--phone--12of12'>
                <h2><a href={`${collaborator.fields.url}`} target='_blank'><LE c={collaborator} k='name' /></a></h2>
              </div>
              <div className='col col--5of12 col--tablet_landscape--4of12 col--tablet_portrait--9of12 col--phone--12of12'>
                <LE c={collaborator} k='description' />
              </div>
              {collaborator.fields.emailAddress && <div className='col col--3of12 col--tablet_landscape--3of12 col--tablet_portrait--9of12 col--phone--12of12'>
                <a href={`mailto:${collaborator.fields.emailAddress}`} target='_blank'><LE c={collaborator} k='emailAddress' /></a>
              </div>}
            </div>
          </div>)}
        </OnScroll>
        </>}

        <div className='big_bottom' />

        <OnScroll className='grid medium_bottom'>
          <div className='col col--5of12 col--tablet_portrait--9of12 col--phone--12of12'>
            <LRE c={about} k='conclusion' />
          </div>
        </OnScroll>

        {/* <OnScroll className='grid grid--tight_guttered'>
          <div className='col col--12of12'
            data-parallax="-1.5"
          >
            <h6><LE c={about} k='engagementsTitle' /></h6>
          </div>
          <div
            data-parallax="-3"
            className='col col--10of12 col--phone--12of12'><p className='big'><LE c={about} k='engagementsBody' /></p></div>

          <div className='col col--12of12'></div>
          {about.fields.engagements.map((engagement: { fields: any }, i: number) => <div key={i} className='col col--4of12 col--tablet_portrait--6of12 underline_links'
            data-parallax="-0.5"
          >
            <LRE c={engagement} k='body' />
          </div>)}
        </OnScroll>

        <div className='big_bottom' /> */}
      </div>
    </main>
  </>
}
