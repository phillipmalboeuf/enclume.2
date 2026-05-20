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

/*
  Color for ALL nav links depending on which filter is active.
  When no filter (Tous), all links are black.
*/
const FILTER_COLOR: Record<string, string> = {
  horizontalite: '#205a65',
  curiosite:     '#badddf',
  integrite:     '#3a5233', // dark forest green
  audace:        '#274569', // dark blue (was intégrité)
  engagement:    '#b4e0bb',
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

  // All nav links share this one color based on the active filter
  const navColor = current_category ? (FILTER_COLOR[current_category.fields.key] ?? '#111') : '#111'

  return <>
    <PageTransition />

    <style>{`
      /* All nav links: same size as project titles (.slight p), underline on active only */
      .projets-nav .header__link {
        border-bottom: none !important;
        text-decoration: none !important;
        font-size: 1.25rem !important;
        line-height: 1.5006002401rem !important;
      }
      .projets-nav .header__link.active {
        border-bottom: none !important;
        text-decoration: underline !important;
      }

      /* DESKTOP + TABLET fixed nav */
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

      /* MOBILE nav — hidden by default */
      .projets-mobile-nav {
        display: none;
      }
      .projets-mobile-nav-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      /* <= 768px : mobile nav, no fixed nav */
      @media (max-width: 768px) {
        .projets-fixed-nav {
          display: none !important;
        }
        .projets-mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
      }

      /* >= 769px : fixed nav, no mobile nav */
      @media (min-width: 769px) {
        .projets-mobile-nav {
          display: none !important;
        }
        .projets-fixed-nav {
          width: calc(3 / 12 * (100vw - 4rem));
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

          {/* LEFT COLUMN — spacer on desktop/tablet, holds mobile nav on mobile */}
          <div className='col col--2of12 col--tablet_landscape--3of12 col--tablet_portrait--12of12'>

            {/* MOBILE ONLY NAV — all links share navColor */}
            <nav className='projets-nav projets-mobile-nav' style={{ color: navColor }}>
              <Link
                className={`header__link${current_category ? '' : ' active'}`}
                href='/projets'
                style={{ color: navColor }}
              >
                Tous
              </Link>
              <div className='projets-mobile-nav-categories'>
                {about.fields.categories.map((category: any) => (
                  <Link
                    key={category.fields.title}
                    className={`header__link${current_category && current_category.fields.key === category.fields.key ? ' active' : ''}`}
                    href={`/projets?category=${category.fields.key}`}
                    style={{ color: navColor }}
                  >
                    <LE c={category} k='title' />
                  </Link>
                ))}
              </div>
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

    {/* DESKTOP + TABLET FIXED NAV — outside <main>, immune to any parent transforms */}
    <nav className='projets-nav projets-fixed-nav' style={{ color: navColor }}>
      <Link
        className={`header__link${current_category ? '' : ' active'}`}
        href='/projets'
        style={{ color: navColor }}
      >
        Tous
      </Link>
      {about.fields.categories.map((category: any) => (
        <Link
          key={category.fields.title}
          className={`header__link${current_category && current_category.fields.key === category.fields.key ? ' active' : ''}`}
          href={`/projets?category=${category.fields.key}`}
          style={{ color: navColor }}
        >
          <LE c={category} k='title' />
        </Link>
      ))}
    </nav>
  </>
}
