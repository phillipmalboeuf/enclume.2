import { Icon } from '@/components/icon'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='main blue_back relative' role='main'>
      <Icon i='anvil_404' />
      <div className='grid grid--full grid--middle grid--center text_center'>
        <div>
          <h1 className='h1--giant'>404</h1>
          <Link href='/'>Retour à l'acceuil</Link>
        </div>
      </div>
    </main>
  )
}