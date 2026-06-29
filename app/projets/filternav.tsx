'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function FilterNav({ categories }: { categories: any[] }) {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  return (
<nav style={{
  position: 'fixed',
  top: '8rem',
  left: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  zIndex: 9
}}>
      <div>
        <Link className={`header__link${!currentCategory ? ' active' : ''}`} href='/projets'>
          Tous
        </Link>
      </div>
      {categories.map((category: any) => (
        <div key={category.fields.title}>
          <Link
            className={`header__link${currentCategory === category.fields.key ? ' active' : ''}`}
            href={`/projets?category=${category.fields.key}`}
          >
            {category.fields.title}
          </Link>
        </div>
      ))}
    </nav>
  )
}
