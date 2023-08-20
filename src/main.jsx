import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/index.jsx'
import {AppContext} from './context/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChakraProvider theme={theme}>
    <AppContext>
    <App />
    </AppContext>
  </ChakraProvider>
  </React.StrictMode>,
)
