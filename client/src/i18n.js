import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Election Guide",
      assistant: "AI Assistant",
      timeline: "Election Timeline",
      eligibility: "Eligibility Checker",
      dashboard: "Dashboard",
      login: "Login",
      register: "Register",
      logout: "Logout",
      get_started: "Get Started",
      hero_title: "Empowering Every Voter with Knowledge",
      hero_subtitle: "Your interactive guide to understanding the election process in India.",
      ask_placeholder: "Type your question about elections...",
      checking: "Assistant is thinking...",
    }
  },
  hi: {
    translation: {
      welcome: "चुनाव गाइड में आपका स्वागत है",
      assistant: "एआई सहायक",
      timeline: "चुनाव समयरेखा",
      eligibility: "पात्रता जांच",
      dashboard: "डैशबोर्ड",
      login: "लॉगिन",
      register: "पंजीकरण",
      logout: "लॉगआउट",
      get_started: "शुरू करें",
      hero_title: "हर मतदाता को ज्ञान से सशक्त बनाना",
      hero_subtitle: "भारत में चुनाव प्रक्रिया को समझने के लिए आपका संवादात्मक मार्गदर्शक।",
      ask_placeholder: "चुनाव के बारे में अपना प्रश्न पूछें...",
      checking: "सहायक सोच रहा है...",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
