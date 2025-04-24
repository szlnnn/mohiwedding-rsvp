import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Box, ChakraProvider} from "@chakra-ui/react";
import theme from "./theme.ts";
import RSVPForm from "./RSVPForm.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ThankYou from "./ThankYou.tsx";
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChakraProvider theme={theme}>
          <BrowserRouter>
              <Box
                  minH="100vh"
                  w="100vw"
                  bgImage="url('/theme2.png')"
                  bgRepeat="no-repeat"
                  bgSize="contain"
                  bgPosition="top center"
                  bgColor="brand.beige"
                  display="flex"
                  justifyContent="center"
                  py={{ base: 10, md: 20 }}
                  px={{ base: 4, md: 8 }}
              >
                  <Routes>
                      <Route path="/" element={<RSVPForm />} />
                      <Route path="/thank-you" element={<ThankYou />} />
                  </Routes>
              </Box>


          </BrowserRouter>
      </ChakraProvider>
  </StrictMode>,
)
