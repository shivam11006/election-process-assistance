import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass hover:bg-white/20 transition-all text-sm font-medium"
        >
            <Languages className="w-4 h-4" />
            {i18n.language === 'en' ? 'हिन्दी' : 'English'}
        </button>
    );
};

export default LanguageToggle;
