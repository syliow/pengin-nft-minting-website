import { useState } from "react";
import "./App.css";
import MainMint from "./components/MainMint";
import NavBar from "./components/NavBar";
import { ThemeProvider, theme, Box } from "@chakra-ui/react";
import PenginGIF from "./assets/pengin.gif";

function App() {
  const [accounts, setAccounts] = useState([]);
  console.log(accounts, "accounts");
  return (
    <ThemeProvider theme={theme}>
      <Box className="overlay">
        <Box className="App" width="100%" height="100%">
          <NavBar accounts={accounts} setAccounts={setAccounts} />
          <Box mt={5}>
            <img src={PenginGIF} alt="pengin" className="pengin" />
          </Box>
          <MainMint accounts={accounts} setAccounts={setAccounts} />
        </Box>
        <Box className="background"></Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
