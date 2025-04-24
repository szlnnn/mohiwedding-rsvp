import React from 'react';
import {Box, Button, HStack, Text, VStack} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher.tsx";

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box
            w="100vw"
            h="100vh"
            position="relative"
            px={4}
        >
            <Box
                position="absolute"
                top="65%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="full"
                maxW="400px"
            >

                <VStack spacing={6} textAlign="center">
                    <HStack spacing={2}>
                        <Box position="relative">
                            <LanguageSwitcher />
                        </Box>

                    <Text fontSize="lg" fontWeight="medium">
                        {t('invitationText')}
                    </Text>

                    </HStack>
                    <Button
                        size="lg"
                        w="full"
                        colorScheme="brand"
                        bg="#e0d6c9"
                        _hover={{ bg: 'brand.grey', color: 'white' }}
                        onClick={() => navigate('/rsvp')}
                    >
                        {t('respond')}
                    </Button>

                    <Button
                        size="lg"
                        w="full"
                        colorScheme="brand"
                        bg="brand.green"
                        _hover={{ color: 'white' }}
                        onClick={() => navigate('/info')}
                    >
                        {t('info')}
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Menu;
