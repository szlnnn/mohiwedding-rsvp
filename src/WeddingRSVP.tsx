import React, { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

const WeddingRSVP: React.FC = () => {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!name.trim()) return;

        const templateParams = { name, guests };

        try {
            setSubmitted(true);
            await emailjs.send(
                "your_service_id",  // Replace with your EmailJS Service ID
                "your_template_id", // Replace with your EmailJS Template ID
                templateParams,
                "your_public_key"   // Replace with your EmailJS Public Key
            );
        } catch (error) {
            console.error("Error sending RSVP:", error);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Heading as="h2" size="lg" textAlign="center">You're Invited!</Heading>
                        <Text textAlign="center">Please RSVP by filling out the form below.</Text>
                        <Input
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="Number of Guests"
                            value={guests}
                            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                            min={1}
                            max={10}
                            required
                        />
                        <Button colorScheme="blue" type="submit">Submit RSVP</Button>
                    </VStack>
                </form>
            ) : (
                <VStack spacing={4}>
                    <Heading as="h2" size="lg" textAlign="center">Thank You!</Heading>
                    <Text textAlign="center">{name}, your RSVP has been submitted</Text>
                </VStack>
            )}
        </Box>
    );
};

export default WeddingRSVP;