import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Switch,
    Tag,
    TagCloseButton,
    TagLabel,
    useToast,
    VStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
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
};

const RSVPForm: React.FC = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const countdown = useCountdown('2025-09-20T15:30:00');

    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        email: '',
        guests: [],
        guestNumbers: 0,
        veganMenus: 0,
        attending: false
    });

    const [guestInput, setGuestInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setFormData(prev => ({ ...prev, guests: newGuests, guestNumbers: newGuests.length }));
            setGuestInput('');
        }
    };

    const removeGuest = (index: number) => {
        const updatedGuests = formData.guests.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, guests: updatedGuests, guestNumbers: updatedGuests.length }));
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

        toast({ title: t('sending'), status: 'info', duration: 2000, isClosable: false, position: 'top' });

        try {
            const response = await fetch('/api/wedding/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                toast({
                    title: '🎉',
                    description: t('submitSuccess'),
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });

                setFormData({ name: '', email: '', guests: [], guestNumbers: 0, veganMenus: 0, attending: false });
                setGuestInput('');
                setSelfGuest(null);

                setTimeout(() => navigate('/thank-you'), 3000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (err) {
            toast({ title: t('submitFail'), status: 'error', duration: 4000, isClosable: true, position: 'top' });
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

            <form onSubmit={handleSubmit}>

                <LanguageSwitcher />

                <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>{t('name')}</FormLabel>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            bg="brand.beige"
                            borderColor="gray.300"
                            _placeholder={{ color: 'gray.500' }}
                            _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #d44d3f' }}
                        />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="attending" mb="0" fontWeight="medium">
                            {t('attending')}
                        </FormLabel>
                        <Switch
                            id="attending"
                            name="attending"
                            isChecked={formData.attending}
                            onChange={handleCheckboxChange}
                            colorScheme="green"
                            size="lg"
                        />
                    </FormControl>

                    <FormControl isRequired={formData.attending} isDisabled={!formData.attending}>
                        <FormLabel>{t('email')}</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            bg="brand.beige"
                            borderColor="gray.300"
                            _placeholder={{ color: 'gray.500' }}
                            _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #d44d3f' }}
                        />
                    </FormControl>

                    <FormControl isDisabled={!formData.attending}>
                        <FormLabel>{t('guestNames')}</FormLabel>
                        <HStack>
                            <Input
                                placeholder={t('addGuestPlaceholder')}
                                value={guestInput}
                                onChange={e => setGuestInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addGuest();
                                    }
                                }}
                                onBlur={addGuest}
                                bg="brand.beige"
                                borderColor="gray.300"
                                _placeholder={{ color: 'gray.500' }}
                                _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #d44d3f' }}
                                isDisabled={!formData.attending}
                            />
                            <IconButton
                                aria-label={t('addGuestPlaceholder')}
                                icon={<AddIcon />}
                                onClick={addGuest}
                                colorScheme="green"
                                variant="outline"
                                borderRadius="full"
                                size="sm"
                                isDisabled={!formData.attending}
                            />
                        </HStack>

                        <Box
                            mt={2}
                            display="flex"
                            flexWrap="wrap"
                            gap={2}
                            minH="40px"
                        >
                            {formData.guests.map((guest, index) => (
                                <Tag
                                    key={index}
                                    borderRadius="full"
                                    variant="solid"
                                    colorScheme="brand"
                                >
                                    <TagLabel>{guest}</TagLabel>
                                    <TagCloseButton onClick={() => removeGuest(index)} />
                                </Tag>
                            ))}
                        </Box>

                        {formData.guests.length === 0 && (
                            <Box fontSize="sm" color="gray.400" mt={2}>
                                No guests added yet.
                            </Box>
                        )}
                    </FormControl>

                    <FormControl isRequired={formData.attending} isDisabled={!formData.attending}>
                        <FormLabel>{t('numberOfGuests')}</FormLabel>
                        <Input
                            value={formData.guestNumbers}
                            isReadOnly
                            bg="brand.beige"
                            borderColor="gray.300"
                            _placeholder={{ color: 'gray.500' }}
                            _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #d44d3f' }}
                        />
                    </FormControl>

                    <FormControl isRequired={formData.attending} isDisabled={!formData.attending}>
                        <FormLabel>{t('veganMenus')}</FormLabel>
                        <NumberInput
                            min={0}
                            max={formData.guestNumbers}
                            value={formData.veganMenus}
                            onChange={(_, numValue) =>
                                setFormData(prev => ({ ...prev, veganMenus: numValue }))
                            }
                            clampValueOnBlur={false}
                        >
                            <NumberInputField
                                bg="brand.beige"
                                borderColor="gray.300"
                                _placeholder={{ color: 'gray.500' }}
                                _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #d44d3f' }}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper
                                    _hover={{ bg: 'brand.red', color: 'white' }}
                                    color="gray.700"
                                />
                                <NumberDecrementStepper
                                    _hover={{ bg: 'brand.red', color: 'white' }}
                                    color="gray.700"
                                />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <Button
                        colorScheme="brand"
                        bg="#e0d6c9"
                        _hover={{ bg: 'brand.green', color: 'white' }}
                        type="submit"
                        width="full"
                        isLoading={loading}
                        loadingText={t('sending')}
                    >
                        {t('submit')}
                    </Button>

                    {submitted && (
                        <Box color="green.600" fontWeight="medium" textAlign="center">
                            🎉 {t('submitSuccess')}
                        </Box>
                    )}
                </VStack>
            </form>
        </Box>
    );
};

export default RSVPForm;
