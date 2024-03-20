'use client'

import * as constants from '@/app/build-your-pro/constants';
import { useEffect, useState } from 'react';

export default function HowToUse() {
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    setLanguage(navigator.language || 'en-US');
  }, []);

  const text = getHowToText(language);

  return (
    <ol className="list-group list-group-numbered list-group-flush mt-3">
      {text.map((item: string, index: number) => {
        return (
          <li key={index} className="list-group-item">
            {item}
          </li>
        );
      })}
    </ol>
  );
}

function getHowToText(language: string) {
  const lang = language.toLowerCase();

  if (lang.includes('fr') || lang === 'fr') {
    return constants.HOWTOUSE_FR;
  }
  if (lang.includes('it') || lang === 'it') {
    return constants.HOWTOUSE_IT;
  }
  if (lang.includes('es') || lang === 'es') {
    return constants.HOWTOUSE_ES;
  }

  return constants.HOWTOUSE;
}