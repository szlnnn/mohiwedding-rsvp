import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, VStack, Heading, Text } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

const WeddingRSVP = () => {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim()) return;

        const templateParams = {
            name,
            guests,
        };

        try {
            await emailjs.send(
                "your_service_id",  // Replace with your EmailJS Service ID
                "your_template_id", // Replace with your EmailJS Template ID
                templateParams,
                "your_public_key"   // Replace with your EmailJS Public Key
            );
            setSubmitted(true);
        } catch (error) {
            console.error("Error sending RSVP:", error);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1}>
            {!submitted ? (
                <VStack spacing={4}>
                    <Heading as="h2" size="lg" textAlign="center">You're Invited!</Heading>
                    <Text>Please RSVP to our wedding by filling out the form below.</Text>

                    <FormControl>
                        <FormLabel>Your Name</FormLabel>
                        <Input
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Number of Guests</FormLabel>
                        <NumberInput
                            min={1}
                            max={10}
                            value={guests}
                            onChange={(value) => setGuests(Number(value) || 1)}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>

                    <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!name.trim()}>
                        Submit RSVP
                    </Button>
                </VStack>

            ) : (
                <VStack spacing={4}>
                    <Heading as="h2" size="lg">Thank You!</Heading>
                    <Text>{name}, your RSVP has been submitted for {guests} {guests > 1 ? "people" : "person"}.</Text>
                </VStack>
            )}
        </Box>
    );
};

export default WeddingRSVP;