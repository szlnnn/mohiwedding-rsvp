import { Box, Heading, Text } from '@chakra-ui/react';
import {useTranslation} from "react-i18next";

const ThankYou = () => {
    const {t} = useTranslation();
    return (
        <Box maxW="600px" mx="auto" mt={20} textAlign="center">
            <Heading mb={4}>{t('thanks')}</Heading>
            <Text fontSize="xl">{t('thankYou')}</Text>
        </Box>
    );
}

export default ThankYou;
