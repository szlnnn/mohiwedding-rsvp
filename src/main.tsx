import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme.ts";
import RSVPForm from "./RSVPForm.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ThankYou from "./ThankYou.tsx";
import './i18n';
import Menu from "./Menu.tsx";
import BackgroundLayout from "./BackgroundLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChakraProvider theme={theme}>
          <BrowserRouter>
                  <Routes>
                      <Route element={<BackgroundLayout />}>
                          <Route index element={<Menu />} />
                          <Route path="rsvp" element={<RSVPForm />} />
                          <Route path="thank-you" element={<ThankYou/>} />
                      </Route>
                  </Routes>
          </BrowserRouter>
      </ChakraProvider>
  </StrictMode>,
)
