'use client'

import React from 'react'
import { useLanguage } from '@contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher-wrapper">
      <button
        onClick={() => setLanguage('en')}
        className={`lang-option ${language === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        <span className="flag">🇬🇧</span>
        <span className="lang-code">EN</span>
      </button>

      <button
        onClick={() => setLanguage('id')}
        className={`lang-option ${language === 'id' ? 'active' : ''}`}
        aria-label="Switch to Indonesian"
        aria-pressed={language === 'id'}
      >
        <span className="flag">🇮🇩</span>
        <span className="lang-code">ID</span>
      </button>
    </div>
  )
}
