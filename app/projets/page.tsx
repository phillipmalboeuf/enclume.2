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

    {/*
      DESKTOP FIXED NAV
      - Only visible on desktop (hidden on tablet portrait and below via CSS)
      - position: fixed so it ignores will-change and position:relative on parents
      - top: matches padded--big_top (adjust the value to match your actual top padding)
      - left: matches your page left padding (adjust to match your actual .padded left padding)
      - width: matches col--2of12 width at your breakpoint
      - The inline style overrides the a { position: relative } issue entirely
    */}
    <style>{`
      .projets-fixed-nav {
        position: fixed;
        top: var(--big-top-padding, 8rem);
        left: var(--page-padding, 2rem);
        width: calc(2 / 12 * (100vw - 4rem));
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      @media (max-width: 1024px) {
        .projets-fixed-nav {
          display: none;
        }
      }
    `}</style>

    <main className={`${current_category ? ({
      0: 'light_green_back',
      1: 'red_back',
      2: 'beige_back',
      3: 'orange_back',
      4: 'teal_back',
    } as any)[current_category_index] : ''}`} role='main'>
      <div className='padded padded--big_top'>
        <div className='grid grid--guttered'>

          {/* LEFT COLUMN — on desktop this is just a spacer, the real nav is fixed above */}
          <div className='col col--2of12 col--tablet_landscape--3of12 col--tablet_portrait--12of12'>

            {/*
              MOBILE / TABLET NAV — normal flow, hidden on desktop
              On tablet portrait: links wrap side by side in max 2 rows (flex-wrap)
            */}
            <nav style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
              className='projets-mobile-nav'
            >
              <Link
                className={`header__link${current_category ? '' : ' active'}`}
                href='/projets'
              >
                Tous
              </Link>
              {about.fields.categories.map((category: any) => (
                <Link
                  key={category.fields.title}
                  className={`header__link${current_category && current_category.fields.key === category.fields.key ? ' active' : ''}`}
                  href={`/projets?category=${category.fields.key}`}
                >
                  <LE c={category} k='title' />
                </Link>
              ))}
            </nav>

            <style>{`
              /* Desktop: hide the mobile nav */
              @media (min-width: 1025px) {
                .projets-mobile-nav {
                  display: none;
                }
              }
            `}</style>

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

    {/* DESKTOP FIXED NAV — rendered outside main so no parent transforms affect it */}
    <nav className='projets-fixed-nav'>
      <Link
        className={`header__link${current_category ? '' : ' active'}`}
        href='/projets'
      >
        Tous
      </Link>
      {about.fields.categories.map((category: any) => (
        <Link
          key={category.fields.title}
          className={`header__link${current_category && current_category.fields.key === category.fields.key ? ' active' : ''}`}
          href={`/projets?category=${category.fields.key}`}
        >
          <LE c={category} k='title' />
        </Link>
      ))}
    </nav>
  </>
}
