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
                title: `${t('redirecting')} ${counter}...`,
                status: 'info',
                duration: null,
                isClosable: false,
                position: 'top'
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
                    title: `${t('redirecting')} ${counter}...`,
                    status: 'info',
                    duration: null,
                    isClosable: false,
                    position: 'top'
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
