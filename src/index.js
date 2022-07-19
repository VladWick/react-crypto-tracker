import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CryptoContext>
                <App />
            </CryptoContext>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);