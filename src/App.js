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
      <Box className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <img src={PenginGIF} alt="pengin" className="pengin" />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
