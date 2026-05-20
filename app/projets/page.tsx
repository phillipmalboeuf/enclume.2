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

    <style>{`
      /* ── SHARED ACTIVE STATE ───────────────────────────────────────
         Override whatever .header__link.active was doing before.
         We ONLY add an underline. No color change, no border-bottom line. */
      .projets-nav .header__link {
        color: inherit !important;
        border-bottom: none !important;
        text-decoration: none;
      }
      .projets-nav .header__link.active {
        color: inherit !important;
        text-decoration: underline !important;
        border-bottom: none !important;
      }

      /* ── DESKTOP + TABLET FIXED NAV ────────────────────────────────
         Visible on tablet landscape and above.
         Position matches the original left column location:
         - top: adjust to match your padded--big_top value
         - left: adjust to match your .padded left padding */
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

      /* ── MOBILE NAV ─────────────────────────────────────────────────
         Only visible on mobile (tablet portrait and below).
         "Tous" is alone on row 1.
         All categories wrap across the following rows side by side. */
      .projets-mobile-nav {
        display: none;
      }
      .projets-mobile-nav-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      /* ── BREAKPOINTS ────────────────────────────────────────────────
         tablet portrait = max 768px  → show mobile nav, hide fixed nav
         tablet landscape = 769px+    → show fixed nav, hide mobile nav
         Adjust these breakpoints if your grid uses different values   */
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
        /* On tablet landscape the fixed nav is narrower, widen its column */
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

          {/* LEFT COLUMN — pure spacer on desktop/tablet, holds mobile nav on mobile */}
          <div className='col col--2of12 col--tablet_landscape--3of12 col--tablet_portrait--12of12'>

            {/* MOBILE ONLY NAV */}
            <nav className='projets-nav projets-mobile-nav'>
              {/* Row 1: Tous alone */}
              <Link
                className={`header__link${current_category ? '' : ' active'}`}
                href='/projets'
              >
                Tous
              </Link>
              {/* Row 2+: all categories side by side, wrapping */}
              <div className='projets-mobile-nav-categories'>
                {about.fields.categories.map((category: any) => (
                  <Link
                    key={category.fields.title}
                    className={`header__link${current_category && current_category.fields.key === category.fields.key ? ' active' : ''}`}
                    href={`/projets?category=${category.fields.key}`}
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

    {/* DESKTOP + TABLET FIXED NAV
        Rendered outside <main> so zero parent transforms or position:relative
        can interfere with position:fixed */}
    <nav className='projets-nav projets-fixed-nav'>
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
