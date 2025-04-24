import React from 'react';
import {Box, Button, VStack} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
        position="absolute"
        top="60%" // adjust this to fine-tune vertical position
        left="50%"
        transform="translate(-50%, -50%)"
    >
        <VStack spacing={6}>
            <Button
                size="lg"
                colorScheme="red"
                bg="brand.red"
                _hover={{ bg: 'brand.green' }}
                onClick={() => navigate('/rsvp')}
            >
                RSVP
            </Button>
            <Button
                size="lg"
                colorScheme="teal"
                bg="whiteAlpha.800"
                _hover={{ bg: 'whiteAlpha.900' }}
                onClick={() => navigate('/info')}
            >
                Info
            </Button>
        </VStack>
    </Box>);
};

export default Menu;
