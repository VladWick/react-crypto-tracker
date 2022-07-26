import { makeStyles } from "@material-ui/core";
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';

import Alert from './components/Alert';

const useStyles = makeStyles(() => ({
    App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
    },
}));

const App = () => {

    const classes = useStyles();

    return (
        <div className={classes.App}>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
            <Alert />
        </div>
    );
}

export default App;