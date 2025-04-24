import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Textarea,
    useToast,
    VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type FormDataState = {
    name: string;
    email: string;
    guests: string;
    guestNumbers: number;
    veganMenus: number;
    attending: boolean;
};

const RSVPForm: React.FC = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        email: '',
        guests: '',
        guestNumbers: 0,
        veganMenus: 0,
        attending: false
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberChange = (name: keyof FormDataState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        toast({
            title: 'Sending your RSVP...',
            status: 'info',
            duration: 2000,
            isClosable: false,
            position: 'top'
        });

        try {
            const response = await fetch('/api/wedding/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);

                toast({
                    title: '🎉 RSVP submitted successfully!',
                    description: 'Thank you for letting us know. Redirecting...',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });

                setFormData({
                    name: '',
                    email: '',
                    guests: '',
                    guestNumbers: 0,
                    veganMenus: 0,
                    attending: false
                });

                setTimeout(() => {
                    navigate('/thank-you');
                }, 3000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (err) {
            toast({
                title: 'Error submitting RSVP',
                description: 'Something went wrong. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
        } finally {
            setLoading(false);
        }
    };

    const inputStyleProps = {
        bg: 'brand.beige',
        borderColor: 'gray.300',
        _placeholder: { color: 'gray.500' },
        _focus: { borderColor: 'brand.red', boxShadow: '0 0 0 1px #d44d3f' }
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
            <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" value={formData.name} onChange={handleChange} {...inputStyleProps} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} {...inputStyleProps} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Guest Names</FormLabel>
                        <Textarea name="guests" value={formData.guests} onChange={handleChange} {...inputStyleProps} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Number of Guests</FormLabel>
                        <NumberInput
                            min={0}
                            value={formData.guestNumbers}
                            onChange={value => handleNumberChange('guestNumbers', value)}
                        >
                            <NumberInputField name="guestNumbers" {...inputStyleProps} />
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Vegan Menus</FormLabel>
                        <NumberInput
                            min={0}
                            value={formData.veganMenus}
                            onChange={value => handleNumberChange('veganMenus', value)}
                        >
                            <NumberInputField name="veganMenus" {...inputStyleProps} />
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <Checkbox
                            name="attending"
                            isChecked={formData.attending}
                            onChange={handleCheckboxChange}
                        >
                            I will be attending
                        </Checkbox>
                    </FormControl>

                    <Button
                        colorScheme="brand"
                        bg="brand.red"
                        _hover={{ bg: 'brand.green', color: 'white' }}
                        type="submit"
                        width="full"
                        isLoading={loading}
                        loadingText="Sending..."
                    >
                        Submit RSVP
                    </Button>

                    {submitted && (
                        <Box color="green.600" fontWeight="medium" textAlign="center">
                            🎉 Thank you! Your RSVP has been received.
                        </Box>
                    )}
                </VStack>
            </form>
        </Box>
    );
};

export default RSVPForm;
