import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Switch,
    useToast,
    VStack,
    Textarea, FormErrorMessage
} from '@chakra-ui/react';
import {AddIcon, MinusIcon} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.tsx';
import useCountdown from "./hooks/useCountdown.ts";

type FormDataState = {
    name: string;
    email: string;
    guests: string[];
    guestNumbers: number;
    veganMenus: number;
    attending: boolean;
    message: string;
};

const RSVPForm: React.FC = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const countdown = useCountdown('2025-09-20T15:30:00');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        email: '',
        guests: [],
        guestNumbers: 0,
        veganMenus: 0,
        attending: false,
        message: ''
    });

    const [guestInput, setGuestInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selfGuest, setSelfGuest] = useState<string | null>(null);

    useEffect(() => {
        const name = formData.name.trim();

        if (formData.attending && name) {
            setFormData(prev => {
                let updatedGuests = prev.guests;

                if (selfGuest && prev.guests.includes(selfGuest)) {
                    updatedGuests = updatedGuests.filter(g => g !== selfGuest);
                }

                updatedGuests = [...updatedGuests, name];

                return {
                    ...prev,
                    guests: updatedGuests,
                    guestNumbers: updatedGuests.length
                };
            });

            setSelfGuest(name);
        }

        if (!formData.attending && selfGuest) {
            setFormData(prev => {
                const updatedGuests = prev.guests.filter(g => g !== selfGuest);
                return {
                    ...prev,
                    guests: updatedGuests,
                    guestNumbers: updatedGuests.length
                };
            });
            setSelfGuest(null);
        }
    }, [formData.attending, formData.name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const addGuest = () => {
        const trimmed = guestInput.trim();
        if (trimmed && !formData.guests.includes(trimmed)) {
            const newGuests = [...formData.guests, trimmed];
            setFormData(prev => ({
                ...prev,
                guests: newGuests,
                guestNumbers: newGuests.length
            }));
            setGuestInput('');
        }
    };

    const removeGuest = (index: number) => {
        const updatedGuests = formData.guests.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            guests: updatedGuests,
            guestNumbers: updatedGuests.length
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.attending && formData.guests.length === 0) {
            toast({
                title: t('guestNames'),
                description: t('addGuestPlaceholder'),
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
            return;
        }

        toast({
            position: 'top',
            duration: 2000,
            isClosable: false,
            render: () => (
                <Box color="black" p={3} bg="#e0d6c9" borderRadius="md">
                    {t('sending')}
                </Box>
            ),
        });

        try {
            const response = await fetch(backendUrl + '/api/wedding/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    email: '',
                    guests: [],
                    guestNumbers: 0,
                    veganMenus: 0,
                    attending: false,
                    message: ''
                });
                setGuestInput('');
                setSelfGuest(null);

                setTimeout(() => navigate('/thank-you'), 2000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (err) {
            toast({
                title: t('submitFail'),
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            w="100%"
            maxW="600px"
            bg="whiteAlpha.800"
            backdropFilter="blur(10px)"
            p={10}
            margin={{ base: "5", md: "10", lg: "20" }}
            borderRadius="2xl"
            boxShadow="lg"
        >
            <Box textAlign="center" mb={4}>
                <Box fontSize="xl" fontWeight="semibold">
                    {t('countdownHeader')}
                </Box>
                <Box fontSize="md" color="gray.600">
                    {t('countdownText', countdown)}
                </Box>
            </Box>

            <Box fontSize="sm" color="gray.500" mt={1} textAlign="center" mb={4}>
                {t('weddingDateExact')}
            </Box>

            <form onSubmit={handleSubmit}>
                <LanguageSwitcher />

                <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>{t('name')}</FormLabel>
                        <Input
                            name="name"
                            value={formData.name}
                            borderColor="gray.300"
                            onChange={handleChange}
                            bg="brand.beige"
                        />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="attending" mb="0">{t('attending')}</FormLabel>
                        <Switch
                            id="attending"
                            name="attending"
                            isChecked={formData.attending}
                            onChange={handleCheckboxChange}
                            colorScheme="green"
                            size="lg"
                        />
                    </FormControl>

                    <FormControl
                        isRequired={formData.attending}
                        isDisabled={!formData.attending}
                        isInvalid={formData.attending && formData.email !== '' && !/^\S+@\S+\.\S+$/.test(formData.email)}
                    >
                        <FormLabel>{t('email')}</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            borderColor="gray.300"
                            value={formData.email}
                            onChange={handleChange}
                            bg="brand.beige"
                        />
                        <FormErrorMessage>
                            {t('please_enter_a_valid_email')}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isDisabled={!formData.attending}>
                        <FormLabel>{t('guestNames')}</FormLabel>
                        <HStack>
                            <Input
                                placeholder={t('addGuestPlaceholder')}
                                value={guestInput}
                                borderColor="gray.300"
                                onChange={e => setGuestInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addGuest();
                                    }
                                }}
                                onBlur={addGuest}
                                bg="brand.beige"
                            />
                            <IconButton
                                aria-label={t('addGuestPlaceholder')}
                                icon={<AddIcon />}
                                onClick={addGuest}
                                colorScheme="brand"
                                backgroundColor="brand.green"
                                size="sm"
                            />
                        </HStack>

                        <Box mt={2} display="flex" flexWrap="wrap" gap={2} minH="40px">
                            {formData.guests.map((guest, index) => (
                                <Box
                                    key={index}
                                    px={3}
                                    py={0.5}
                                    bg="#e0d6c9"
                                    borderRadius="full"
                                    display="flex"
                                    alignItems="center"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    {guest}
                                    <Box
                                        as="button"
                                        ml={2}
                                        fontSize="sm"
                                        onClick={() => removeGuest(index)}
                                        _hover={{ opacity: 0.7 }}
                                    >
                                        ×
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {formData.guests.length === 0 && (
                            <Box fontSize="sm" color="gray.400" mt={1}>
                                {t("noGuests")}
                            </Box>
                        )}
                    </FormControl>

                    <FormControl isRequired={formData.attending} isDisabled={!formData.attending}>
                        <FormLabel>
                            {t('veganMenus')}
                        </FormLabel>
                        <HStack spacing={1}>
                            <Input
                                value={formData.veganMenus}
                                isReadOnly
                                textAlign="center"
                                width="3rem"
                                height="2rem"
                                fontSize="md"
                                borderRadius="md"
                                bg="brand.beige"
                                borderColor="gray.300"
                                color="gray.800"
                            />
                            <IconButton
                                aria-label="Decrease"
                                icon={<MinusIcon boxSize={3} />}
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        veganMenus: Math.max(0, prev.veganMenus - 1),
                                    }))
                                }
                                isDisabled={!formData.attending || formData.veganMenus <= 0}
                                size="sm"
                                variant="outline"
                                borderColor="#f0c5c5"
                                colorScheme="brand"
                                backgroundColor="brand.green"
                                _hover={{ color: 'white' }}
                                borderRadius="md"
                            />
                            <IconButton
                                aria-label="Increase"
                                icon={<AddIcon boxSize={3} />}
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        veganMenus: Math.min(formData.guestNumbers, prev.veganMenus + 1),
                                    }))
                                }
                                isDisabled={
                                    !formData.attending || formData.veganMenus >= formData.guestNumbers
                                }
                                size="sm"
                                variant="outline"
                                borderColor="#f0c5c5"
                                colorScheme="brand"
                                backgroundColor="brand.green"
                                _hover={{ color: 'white' }}
                                borderRadius="md"
                            />
                        </HStack>
                    </FormControl>



                    <FormControl>
                        <FormLabel>{t('message')}</FormLabel>
                        <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            borderColor="gray.300"
                            placeholder={t('writeMessage')}
                            bg="brand.beige"
                        />
                    </FormControl>

                    <Button
                        colorScheme="brand"
                        bg="#e0d6c9"
                        _hover={{ color: 'white' }}
                        type="submit"
                        width="full"
                        isLoading={loading}
                        loadingText={t('sending')}
                    >
                        {t('submit')}
                    </Button>

                    <Button
                        width="full"
                        colorScheme="brand"
                        bg="brand.green"
                        _hover={{ color: 'white' }}
                        onClick={() => navigate('/')}
                    >
                        {t('back')}
                    </Button>

                </VStack>
            </form>
        </Box>
    );
};

export default RSVPForm;
