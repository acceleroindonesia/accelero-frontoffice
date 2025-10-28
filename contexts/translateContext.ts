import { useContext } from 'react';
import { LanguageContext } from '@/contexts/languageContext';
import { getTranslation } from '@/utils/translations';

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = getTranslation(language);

  return {
    t,
    language,
    setLanguage,
  };
}