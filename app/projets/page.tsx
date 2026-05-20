import { OnScroll } from '@/components/animations'
import { LE, LPE } from '@/components/entry'
import { PageTransition } from '@/components/page_transition'
import { ContentService } from '@/services/content'
import Link from 'next/link'
import { Metadata } from 'next'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export async function generateMetadata(
  searchParams
): Promise<Metadata> {
  const [about] = await Promise.all([
    ContentService.aboutPage(),
  ])
  const search = await searchParams
  let current_category = about.fields.categories.find((category: any) => category.fields.key === search.category)
  return {
    title: current_category ? current_category.fields.title : 'Projets',
    description: current_category && current_category.fields.description
  }
}

export default async function Projets({
  searchParams
}) {
  const [about, projects] = await Promise.all([
    ContentService.aboutPage(),
    ContentService.projects()
  ])
  const search = await searchParams
  let current_category = about.fields.categories.find((category: any) => category.fields.key === search.category)
  let current_category_index = about.fields.categories.findIndex((category: any) => category.fields.key === search.category)

  return <>
    <PageTransition />
    <main className={`${current_category ? ({
      0: 'light_green_back',
      1: 'red_back',
      2: 'beige_back',
      3: 'orange_back',
      4: 'teal_back',
    } as any)[current_category_index] : ''}`} role='main'>
      <div className='padded padded--big_top'>
        <div className='grid grid--guttered'>

          {/* LEFT NAV COLUMN — hidden from flow on desktop, shown normally on tablet/mobile */}
          <div className='col col--2of12 col--tablet_landscape--3of12 col--tablet_portrait--12of12'>

            {/* Fixed nav: only visible on desktop. Uses inline style to pin position. */}
            <nav
              className='grid grid--tight_guttered grid--column'
              style={{
                position: 'fixed',
                top: '2rem',
                left: 'var(--nav-left, 2rem)',
                zIndex: 10,
              }}
            >
              {/* Hide on tablet portrait and below via a wrapping class */}
              <div className='hide--tablet_portrait'>
                <OnScroll className='col col--tablet_portrait--12of12'>
                  <Link className={`header__link${current_category ? '' : ' active'}`} href='/projets'>Tous</Link>
                </OnScroll>
                {about.fields.categories.map((category: any) => (
                  <OnScroll className='col' key={category.fields.title}>
                    <Link
                      className={`header__link${current_category === category.fields.key ? ' active' : ''}`}
                      href={`/projets?category=${category.fields.key}`}
                    >
                      <LE c={category} k='title' />
                    </Link>
                  </OnScroll>
                ))}
              </div>
            </nav>

            {/* Mobile/tablet nav: normal flow, only visible on tablet portrait and below */}
            <nav className='grid grid--tight_guttered grid--column show--tablet_portrait'>
              <OnScroll className='col col--tablet_portrait--12of12'>
                <Link className={`header__link${current_category ? '' : ' active'}`} href='/projets'>Tous</Link>
              </OnScroll>
              {about.fields.categories.map((category: any) => (
                <OnScroll className='col' key={`mobile-${category.fields.title}`}>
                  <Link
                    className={`header__link${current_category === category.fields.key ? ' active' : ''}`}
                    href={`/projets?category=${category.fields.key}`}
                  >
                    <LE c={category} k='title' />
                  </Link>
                </OnScroll>
              ))}
            </nav>

          </div>

          {/* RIGHT PROJECTS COLUMN */}
          <div className='col col--10of12 col--tablet_landscape--9of12 col--tablet_portrait--12of12'>
            <div className='grid grid--guttered'>
              {projects.items.filter(project =>
                !current_category
                || (project.fields.categories && project.fields.categories.length > 0 && project.fields.categories.filter((category: any) => category.fields).map((category: any) => category.fields.key).includes(current_category.fields.key))
                || (project.fields.category && project.fields.category.fields.key === current_category.fields.key)
              ).sort((a, b) => {
                return (a.fields.releaseDate ? new Date(a.fields.releaseDate) : new Date('1970-01-01')) > (b.fields.releaseDate ? new Date(b.fields.releaseDate) : new Date('1970-01-01')) ? -1 : 1
              }).map(project => (
                <div key={project.fields.url} className='col col--6of12 col--tablet_landscape--6of12 col--tablet_portrait--12of12'>
                  <Link href={`/projets/${project.fields.url}`}>
                    <OnScroll>
                      {project.fields.hero && <div className='small_bottom'><LPE c={project} k='hero' /></div>}
                      <p className='slight'>
                        <LE c={project} k='title' /><br />
                        {project.fields.subTitle && <span className='a__hide'><LE c={project} k='subTitle' /></span>}
                      </p>
                    </OnScroll>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className='medium_bottom' />
      </div>
    </main>
  </>
}
