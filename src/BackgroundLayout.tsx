import {  Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function BackgroundLayout() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const bgImageUrl = isHome
        ? "url('/front1.png')"
        : "url('/theme2.png')";

    return (
        <Box
                minH="100vh"
                w="100vw"
                bgImage={bgImageUrl}
                bgRepeat="no-repeat"
                bgSize="contain"
                bgPosition="center"
                bgColor="brand.beige"
                display="flex"
                justifyContent="center"
                py={{ base: 10, md: 20 }}
                px={{ base: 4, md: 8 }}
            >
            <Outlet />  {}
        </Box>
    );
}

export default BackgroundLayout;