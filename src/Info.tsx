import React from 'react';
import {
    Box,
    Button,
    FormLabel,
    Heading,
    Text,
    VStack,
    Link,
    Divider, HStack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Info: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            w="100vw"
            minH="100vh"
            px={{ base: 4, md: 10 }}
            py={{ base: 10, md: 16 }}
            bg="whiteAlpha.800"
            backdropFilter="blur(10px)"
            position="relative"
        >

            <VStack spacing={10} maxW="700px" mx="auto" align="center" textAlign="center">

                <HStack>
                    <Heading as="h2" size="lg">
                        {t('info.scheduleTitle')}
                    </Heading>
                    <LanguageSwitcher/>
                </HStack>


                <VStack spacing={4}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">15:30 – {t('info.ceremony')}</Text>
                        <Text fontSize="md">{t('churchName')}</Text>
                        <Text fontSize="sm" color="gray.600">
                            Ghidfalău 527095, Romania
                        </Text>
                    </Box>

                    <Box>
                        <Text fontSize="lg" fontWeight="bold">18:00 – {t('info.dinner')}</Text>
                        <Text fontSize="md">Panorama Boutique Hotel & Event Hall</Text>
                        <Text fontSize="sm" color="gray.600">
                            Calea Vâlcele, DN13E 9, Sfântu Gheorghe 527175, Romania
                        </Text>
                    </Box>
                </VStack>

                <Divider />

                <VStack spacing={6} w={{base: "90%", md: "80%"}}>
                    <Box w="100%">
                        <FormLabel fontWeight="medium">{t('info.churchLocation')}</FormLabel>
                        <Box
                            as="iframe"
                            src="https://www.google.com/maps?q=Fortified+Reformed+Church+Ghidfalău,+Ghidfalău+527095,+Romania&output=embed"
                            width="100%"
                            height="220"
                            loading="lazy"
                            style={{ border: 0, borderRadius: '12px' }}
                        />
                    </Box>

                    <Box w="100%">
                        <FormLabel fontWeight="medium">{t('info.venueLocation')}</FormLabel>
                        <Box
                            as="iframe"
                            src="https://www.google.com/maps?q=Panorama+Boutique+Hotel+%26+Event+Hall,+Calea+Valcele,+DN13E+9,+Sfântu+Gheorghe+527175,+Romania&output=embed"
                            width="100%"
                            height="220"
                            loading="lazy"
                            style={{ border: 0, borderRadius: '12px' }}
                        />
                    </Box>
                </VStack>



                <Button
                    as={Link}
                    href="https://www.google.com/maps/dir/Fortified+Reformed+Church+Ghidfalău,+Ghidfalău+527095,+Romania/Panorama+Boutique+Hotel+%26+Event+Hall,+Calea+Valcele,+DN13E+9,+Sfântu+Gheorghe+527175,+Romania"
                    isExternal
                    size="md"
                    w={{ base: '70%' }}
                    colorScheme="brand"
                    bg="#e0d6c9"
                    _hover={{ color: 'white' }}
                >
                    {t('info.routeButton')}
                </Button>





                <Button
                        size="md"
                        w={{ base: "70%" }}
                        colorScheme="brand"
                        bg="brand.green"
                        _hover={{ color: 'white' }}
                        onClick={() => navigate('/')}
                    >
                        {t('back')}
                    </Button>

            </VStack>
        </Box>
    );
};

export default Info;
