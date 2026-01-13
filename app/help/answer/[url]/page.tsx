'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Master from '@components/Layout/Master'
import '../../../styles/help.css'

interface Answer {
  id: string
  question: string
  category: string
  categoryId: string
  icon: string
  answer: string[]
  relatedQuestions: { id: string; question: string }[]
}

const answers: Record<string, Answer> = {
  '1': {
    id: '1',
    question: 'What is Accelero?',
    category: 'About Us',
    categoryId: 'about',
    icon: '🏢',
    answer: [
      'Accelero is a platform dedicated to connecting donors and volunteers with meaningful causes and projects. Our mission is to accelerate positive change in communities by making it easier for people to contribute their time, resources, and expertise.',
      'Founded on the principle that everyone has something valuable to give, we provide a transparent and secure platform where you can discover projects aligned with your values, track the impact of your contributions, and be part of a community working toward positive change.',
      'Whether you want to make a one-time donation, set up recurring contributions, or volunteer your time and skills, Accelero makes it simple and rewarding to make a difference.',
    ],
    relatedQuestions: [
      { id: '2', question: 'How does Accelero work?' },
      { id: '3', question: 'Where does Accelero operate?' },
    ],
  },
  '2': {
    id: '2',
    question: 'How does Accelero work?',
    category: 'About Us',
    categoryId: 'about',
    icon: '🏢',
    answer: [
      "Accelero works as a bridge between donors, volunteers, and organizations working on impactful projects. Here's how it works:",
      '1. **Discover Projects**: Browse through our curated list of verified projects and causes. Each project includes detailed information about goals, progress, and impact.',
      '2. **Choose How to Help**: Decide whether you want to donate money, volunteer your time, or both. You can make one-time or recurring contributions.',
      '3. **Track Your Impact**: After contributing, you can track the progress of projects you support and see the real-world impact of your contributions.',
      '4. **Stay Connected**: Receive updates from the projects you support and be part of a community committed to positive change.',
      'All transactions are secure, and we ensure transparency by requiring regular updates from project organizers about how funds are being used.',
    ],
    relatedQuestions: [
      { id: '1', question: 'What is Accelero?' },
      { id: '7', question: 'How can I donate?' },
    ],
  },
  '3': {
    id: '3',
    question: 'Where does Accelero operate?',
    category: 'About Us',
    categoryId: 'about',
    icon: '🏢',
    answer: [
      'Accelero currently operates primarily in Indonesia, with a focus on connecting local communities with resources and support for impactful projects.',
      'We partner with verified organizations and initiatives across various regions, ensuring that your contributions reach communities that need them most.',
      'While our initial focus is on Indonesia, we have plans to expand to other regions in Southeast Asia in the near future. Our platform is designed to be scalable and adaptable to different communities and contexts.',
      'Regardless of where you are located, you can support projects through our platform. We accept international donations and welcome volunteers from around the world.',
    ],
    relatedQuestions: [
      { id: '1', question: 'What is Accelero?' },
      { id: '7', question: 'How can I donate?' },
    ],
  },
  '7': {
    id: '7',
    question: 'How can I donate?',
    category: 'Donations',
    categoryId: 'donations',
    icon: '💝',
    answer: [
      'Donating through Accelero is simple and secure. Follow these steps:',
      '1. **Browse Projects**: Visit our projects page and find a cause that resonates with you.',
      '2. **Click "Donate"**: On the project page, click the donate button to begin.',
      '3. **Choose Amount**: Select or enter the amount you wish to donate.',
      '4. **Select Payment Method**: Choose from various payment options including credit/debit cards, bank transfer, or e-wallets.',
      '5. **Complete Payment**: Follow the secure payment process to complete your donation.',
      "You'll receive a confirmation email with your donation receipt, and you can track your contribution history in your account dashboard.",
      'All donations are processed securely, and we provide tax receipts for eligible contributions.',
    ],
    relatedQuestions: [
      { id: '8', question: 'Are donations tax-deductible?' },
      { id: '9', question: 'Can I set up recurring donations?' },
    ],
  },
  '8': {
    id: '8',
    question: 'Are donations tax-deductible?',
    category: 'Donations',
    categoryId: 'donations',
    icon: '💝',
    answer: [
      "Tax deductibility of donations depends on several factors including your location and the specific project or organization you're supporting.",
      'Many of our partner organizations are registered non-profits with tax-exempt status, which means donations to these organizations may be tax-deductible.',
      "When you make a donation, we'll provide you with a receipt that includes all necessary information for tax purposes. This receipt will indicate whether the donation is eligible for tax deduction.",
      'We recommend consulting with a tax professional in your jurisdiction to understand the specific tax benefits available to you.',
      'If you have questions about the tax status of a specific organization or project, please contact our support team for more information.',
    ],
    relatedQuestions: [
      { id: '7', question: 'How can I donate?' },
      { id: '9', question: 'Can I set up recurring donations?' },
    ],
  },
  '9': {
    id: '9',
    question: 'Can I set up recurring donations?',
    category: 'Donations',
    categoryId: 'donations',
    icon: '💝',
    answer: [
      'Yes! Recurring donations are a great way to provide sustained support to causes you care about.',
      'To set up a recurring donation:',
      '1. Select a project you want to support',
      '2. Click the "Donate" button',
      '3. Choose the "Recurring Donation" option',
      '4. Select your preferred frequency: monthly, quarterly, or annually',
      '5. Choose your donation amount',
      '6. Complete the payment setup',
      'Benefits of recurring donations:',
      '- Provides predictable support for organizations to plan their work',
      '- You can set it up once and make an ongoing impact',
      '- Easily manage or cancel your recurring donations from your account dashboard',
      '- Some projects offer special recognition for recurring donors',
      'You can modify or cancel your recurring donation at any time through your account settings.',
    ],
    relatedQuestions: [
      { id: '7', question: 'How can I donate?' },
      { id: '8', question: 'Are donations tax-deductible?' },
    ],
  },
  '10': {
    id: '10',
    question: 'How to become a volunteer?',
    category: 'Volunteering',
    categoryId: 'volunteer',
    icon: '🤝',
    answer: [
      "Becoming a volunteer with Accelero is easy! Here's how to get started:",
      "1. **Create an Account**: Sign up for a free Accelero account if you haven't already.",
      '2. **Complete Your Profile**: Add information about your skills, interests, and availability.',
      '3. **Browse Opportunities**: Visit the volunteer page to see available opportunities.',
      '4. **Apply**: Click "Apply" on opportunities that interest you and fill out a brief application.',
      "5. **Get Matched**: Organizations will review your application and contact you if you're a good fit.",
      "6. **Start Volunteering**: Once accepted, you'll receive details about how to begin.",
      'You can volunteer remotely or in-person depending on the opportunity. We have options for various time commitments, from one-time events to ongoing positions.',
    ],
    relatedQuestions: [
      { id: '11', question: 'What are the requirements?' },
      { id: '12', question: 'Where can I volunteer?' },
    ],
  },
  '11': {
    id: '11',
    question: 'What are the requirements?',
    category: 'Volunteering',
    categoryId: 'volunteer',
    icon: '🤝',
    answer: [
      'Volunteer requirements vary depending on the specific opportunity and organization. Here are the general requirements:',
      '**Basic Requirements:**',
      '- Be at least 17 years old (some opportunities may require 18+)',
      '- Have a valid email address to create an account',
      '- Complete the volunteer profile with accurate information',
      '**Specific Opportunity Requirements:**',
      '- Some positions may require specific skills or experience',
      '- Certain roles might need background checks or references',
      '- Language proficiency may be required for some opportunities',
      '- Time commitment varies by opportunity',
      '**General Expectations:**',
      '- Reliability and commitment to scheduled volunteer hours',
      '- Professional and respectful conduct',
      '- Willingness to learn and follow organization guidelines',
      'Each opportunity listing will clearly state its specific requirements. If you have questions about whether you meet the requirements, feel free to reach out to the organization directly.',
    ],
    relatedQuestions: [
      { id: '10', question: 'How to become a volunteer?' },
      { id: '12', question: 'Where can I volunteer?' },
    ],
  },
  '12': {
    id: '12',
    question: 'Where can I volunteer?',
    category: 'Volunteering',
    categoryId: 'volunteer',
    icon: '🤝',
    answer: [
      'Accelero offers both remote and in-person volunteer opportunities across various locations:',
      '**Remote Opportunities:**',
      '- Many opportunities can be done from anywhere with an internet connection',
      '- Perfect for those with busy schedules or living far from project locations',
      '- Includes roles like online tutoring, content creation, social media management, research, and more',
      '**In-Person Opportunities:**',
      '- Located primarily in Indonesian cities and communities',
      '- Includes hands-on activities like community events, teaching, environmental projects, and direct service',
      '- Specific locations are listed on each opportunity',
      '**How to Find Opportunities:**',
      '1. Visit the volunteer page',
      '2. Use filters to search by location (remote or specific cities)',
      '3. Browse opportunities that match your preferences',
      "We're constantly adding new opportunities in different locations. Set up notifications in your account to be alerted when new opportunities in your area become available.",
    ],
    relatedQuestions: [
      { id: '10', question: 'How to become a volunteer?' },
      { id: '11', question: 'What are the requirements?' },
    ],
  },
}

const AnswerPage: React.FC = () => {
  const params = useParams()
  const answerId = params?.url as string

  const answerData = answers[answerId]

  if (!answerData) {
    return (
      <Master>
        <section className="help-answer-section">
          <div className="container">
            <div className="answer-not-found">
              <span className="not-found-icon">❓</span>
              <h1>Answer Not Found</h1>
              <p>Sorry, we couldn't find the answer you're looking for.</p>
              <Link href="/help" className="btn-back-to-help">
                ← Back to Help Center
              </Link>
            </div>
          </div>
        </section>
      </Master>
    )
  }

  return (
    <Master>
      {/* Breadcrumb */}
      <section className="help-breadcrumb">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link href="/help">Help Center</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href={`/help/category/${answerData.categoryId}`}>{answerData.category}</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{answerData.question}</span>
          </div>
        </div>
      </section>

      {/* Answer Content */}
      <section className="help-answer-section">
        <div className="container">
          <div className="answer-layout">
            {/* Sidebar */}
            <aside className="answer-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <span className="sidebar-icon">{answerData.icon}</span>
                  <h3>{answerData.category}</h3>
                </div>
                <Link href={`/help/category/${answerData.categoryId}`} className="sidebar-view-all">
                  View all in this category →
                </Link>
              </div>

              {answerData.relatedQuestions.length > 0 && (
                <div className="sidebar-card">
                  <h4 className="sidebar-title">Related Questions</h4>
                  <div className="related-questions-list">
                    {answerData.relatedQuestions.map((q) => (
                      <Link
                        key={q.id}
                        href={`/help/answer/${q.id}`}
                        className="related-question-link"
                      >
                        {q.question}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="sidebar-card sidebar-cta">
                <span className="cta-icon">💬</span>
                <h4>Still need help?</h4>
                <p>Contact our support team</p>
                <Link href="/contact" className="cta-button">
                  Contact Us
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <main className="answer-content">
              <div className="answer-header">
                <h1 className="answer-question">{answerData.question}</h1>
                <div className="answer-meta">
                  <span className="answer-category-badge">
                    {answerData.icon} {answerData.category}
                  </span>
                </div>
              </div>

              <div className="answer-body">
                {answerData.answer.map((paragraph, index) => (
                  <p key={index} className="answer-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="answer-feedback">
                <h3>Was this helpful?</h3>
                <div className="feedback-buttons">
                  <button className="feedback-btn feedback-yes">👍 Yes</button>
                  <button className="feedback-btn feedback-no">👎 No</button>
                </div>
              </div>

              <div className="answer-actions">
                <Link href={`/help/category/${answerData.categoryId}`} className="btn-secondary">
                  ← Back to {answerData.category}
                </Link>
                <Link href="/help" className="btn-primary">
                  Back to Help Center
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default AnswerPage
