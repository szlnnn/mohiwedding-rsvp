import { Box, Heading, Text } from '@chakra-ui/react';

const ThankYou = () => (
    <Box maxW="600px" mx="auto" mt={20} textAlign="center">
        <Heading mb={4}>🎉 Thank You!</Heading>
        <Text fontSize="xl">We’ve received your RSVP and look forward to seeing you!</Text>
    </Box>
);

export default ThankYou;
