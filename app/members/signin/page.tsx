import Link from 'next/link'
import { type Metadata } from 'next'
import Form from './components/Form'
import '../../styles/auth.css'

const Page: React.FC = () => (
  <div className="auth-page">
    <Link href="/" className="auth-logo-link">
      <div className="auth-logo">
        <span className="logo-icon">🎓</span>
        <span className="logo-text">Accelero Foundation</span>
      </div>
    </Link>

    <div className="auth-container">
      <div className="auth-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue your journey with Accelero Foundation.</p>
      </div>

      <Form />

      <div className="auth-footer">
        <p>
          Don&apos;t have an account? <Link href="/members/signup">Create one here</Link>
        </p>
      </div>
    </div>

    <div className="auth-back-home">
      <Link href="/">← Back to Home</Link>
    </div>
  </div>
)

const title = 'Sign In - Accelero Foundation'
const canonical = 'https://accelero.vercel.app/members/signin'
const description =
  'Sign in to your Accelero Foundation account and continue making a difference in education'

export const metadata: Metadata = {
  title,
  description,
  keywords: 'sign in, login, accelero foundation, education, volunteer, donate',
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'website',
    siteName: 'Accelero Foundation',
    images: '/logo192.png',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/logo192.png'],
  },
}

export default Page
