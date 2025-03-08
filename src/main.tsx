import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WeddingRSVP from "./WeddingRSVP.tsx";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "./theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <WeddingRSVP/>
          <ColorModeScript/>
      </ChakraProvider>
  </StrictMode>,
)
