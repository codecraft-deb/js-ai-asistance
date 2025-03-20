import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SpeechApp from './SpeechApp.jsx'
import GlobalContext from './globalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContext>
      <SpeechApp />
    </GlobalContext>
  </StrictMode>,
)
