import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap app with Router here
import './index.css';  // Your global styles
import App from './App.jsx';
import './App.css'; // App specific styles
import { GlobalProvider } from './contexts/GlobalContext.jsx'; // Import GlobalProvider

// Create and render the root of the React app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap everything in Router */}
      <GlobalProvider> {/* GlobalProvider wraps your app */}
        <App />
      </GlobalProvider>
    </Router>
  </StrictMode>
);