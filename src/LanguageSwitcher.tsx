import {
    IconButton,
    Image
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const toggleLanguage = () => {
        const newLang = i18n.language === 'hu' ? 'en' : 'hu';
        i18n.changeLanguage(newLang);
    };

    return (
        <IconButton
            aria-label="Toggle language"
            onClick={toggleLanguage}
            icon={
                <Image
                    src={i18n.language === 'hu' ? '/gb.png' : '/hu.png'}
                    alt="language flag"
                    boxSize="28px"
                    objectFit="cover"
                    borderRadius="full"
                />
            }
            variant="outline"
            borderRadius="full"
            size="sm"
            position="absolute"
            top={2}
            right={2}
        />
    );
};

export default LanguageSwitcher;