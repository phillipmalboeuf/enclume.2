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
  let current_category = (about.fields as any).projectFilters.find((category: any) => category.fields.key === search.category)
  return {
    title: current_category ? current_category.fields.title : 'Projets',
    description: current_category && current_category.fields.description
  }
}

const FILTER_COLOR: Record<string, string> = {
  urbanisme: '#205a65',
  accompagnement: '#badddf',
  planification: '#3a5233',
  recherche: '#274569',
}

export default async function Projets({
  searchParams
}) {
  const [about, projects] = await Promise.all([
    ContentService.aboutPage(),
    ContentService.projects()
  ])
  const search = await searchParams
  let current_category = (about.fields as any).projectFilters.find((category: any) => category.fields.key === search.category)
  let current_category_index = (about.fields as any).projectFilters.findIndex((category: any) => category.fields.key === search.category)

  const navColor = current_category ? (FILTER_COLOR[current_category.fields.key] ?? '#111') : '#111'

  return <>
    <PageTransition />

    <style>{`
      .projets-nav .header__link {
        border-bottom: none !important;
        text-decoration: none !important;
        font-size: 1rem !important;
        line-height: 1.4 !important;
      }
      .projets-nav .header__link.active {
        border-bottom: none !important;
        text-decoration: underline !important;
      }
      .projets-fixed-nav {
        position: fixed;
        top: var(--big-top-padding, 8rem);
        left: var(--page-padding, 2rem);
        width: calc(1.5 / 12 * (100vw - 4rem));
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .projets-mobile-nav {
        display: none;
      }
      .projets-mobile-nav-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
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
      @media (min-width: 769px) {
        .projets-mobile-nav {
          display: none !important;
        }
        .projets-fixed-nav {
          width: calc(1.5 / 12 * (100vw - 4rem));
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

          <div className='col col--2of12 col--tablet_landscape--3of12 col--tablet_portrait--12of12'>
            <nav className='projets-nav projets-mobile-nav' style={{ color: navColor }}>
              <Link
                className={`header__link${current_category ? '' : ' active'}`}
                href='/projets'
                style={{ color: navColor }}
              >
                Tous
              </Link>
              <div className='projets-mobile-nav-categories'>
                {(about.fields as any).projectFilters.map((category: any) => (
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
                      <p className='slight' style={{ color: navColor }}>
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

    <nav className='projets-nav projets-fixed-nav' style={{ color: navColor }}>
      <Link
        className={`header__link${current_category ? '' : ' active'}`}
        href='/projets'
        style={{ color: navColor }}
      >
        Tous
      </Link>
      {(about.fields as any).projectFilters.map((category: any) => (
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
