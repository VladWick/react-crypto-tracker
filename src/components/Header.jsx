import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import {
    createTheme,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container className={classes.back}>
                    <Toolbar>
                        <Typography 
                            onClick={() => navigate('/')}
                            className={classes.title}
                            variant="h6"
                        >
                            Crypto Hunter
                        </Typography>
                        <Select 
                            variant="outlined" 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            style={{
                                width: 100, 
                                height: 40, 
                                marginLeft: 15, 
                            }}
                            onChange={(e) => setCurrency(e.target.value)}
                            className={classes.select}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"RUB"}>RUB</MenuItem>
                        </Select> 
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header