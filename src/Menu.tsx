import React from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.tsx';

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box
            position="absolute"
            top={{base: "60%", md: "50%", lg: "50%"}}
            left="50%"
            transform="translate(-50%, -50%)"
            maxW="400px"
            w="full"
        >
            <VStack spacing={6} textAlign="center" position="relative">
                <Box position="absolute" top="-40px" right="0">
                    <LanguageSwitcher />
                </Box>

                <Text fontSize="lg" fontWeight="medium">
                    {t('invitationText')}
                </Text>

                <Button
                    size="md"
                    w={{ base: "70%", md: "full" }} // narrower on small screens
                    colorScheme="brand"
                    bg="#e0d6c9"
                    _hover={{ bg: 'brand.grey', color: 'white' }}
                    onClick={() => navigate('/rsvp')}
                >
                    {t('respond')}
                </Button>


                <Button
                    size="md"
                    w={{ base: "70%", md: "full" }} // same here
                    colorScheme="brand"
                    bg="brand.green"
                    _hover={{ color: 'white' }}
                    onClick={() => navigate('/info')}
                >
                    {t('info')}
                </Button>
            </VStack>
        </Box>
    );
};

export default Menu;
