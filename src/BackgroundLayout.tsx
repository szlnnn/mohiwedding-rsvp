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
                bgImage={{
                    base: "url('/front.png')",
                    md: bgImageUrl,
                    lg: bgImageUrl
                }}
                bgSize={{ base: '100% auto', md: 'contain' }}     // <- stretch downward on base
                bgPosition={{ base: 'top center', md: 'center' }}
                bgRepeat="no-repeat"
                bgColor="brand.beige"
                display="flex"
                justifyContent="center"
            >
            <Outlet />  {}
        </Box>
    );
}

export default BackgroundLayout;