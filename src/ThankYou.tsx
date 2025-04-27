import { Box, Heading, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();
    const [counter, setCounter] = useState(3);
    const toastId = 'redirect-toast'; // constant ID for updating

    useEffect(() => {
        if (!toast.isActive(toastId)) {

            toast({
                id: toastId,
                duration: null,
                isClosable: false,
                position: 'top',
                render: () => (
                    <Box color="black" p={3} bg="#e0d6c9" borderRadius="md">
                        {t('redirecting')} {counter}...
                    </Box>
                ),
            });
        }

        const timer = setInterval(() => {
            setCounter(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        if (counter === 0) {
            toast.close(toastId);
            navigate('/');
        } else {
            if (toast.isActive(toastId)) {
                toast.update(toastId, {
                    duration: null,
                    isClosable: false,
                    position: 'top',
                    render: () => (
                        <Box  color="black" p={3} bg="#e0d6c9" borderRadius="md">
                            {t('redirecting')} {counter}...
                        </Box>
                    ),
                });
            }
        }
    }, [counter, navigate, toast, t]);

    return (
        <Box maxW="600px" mx="auto" mt={20} textAlign="center">
            <Heading mb={4}>{t('thanks')}</Heading>
            <Text fontSize="xl">{t('thankYou')}</Text>
        </Box>
    );
};

export default ThankYou;
