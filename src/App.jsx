import { useState }from "react";
//MUI
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { lighttheme } from "./theme/index";
//NOTE Create RTL Cache
const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
//Components
import { CryptoDetails, Cryptocurences, Exchanges, Footer, Homepage, Navbar, News } from "./components";
import { Route, Routes } from "react-router-dom";

import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
const App = () => {
  
  const { t, i18n } = useTranslation(["homepage"]);
  document.body.dir = i18n.dir();
  const [DrawerOpen, setDrawerOpen] = useState(false);
  return (
    <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={lighttheme}>
        <Box sx={{margin:"20px"}}>
      <Fab color="footerbg" onClick={() => setDrawerOpen(true)} size="medium" variant="extended" sx={{position:"fixed" , color:"white" , ":hover":{backgroundColor:"#001815"}}}>
        {t("menu")}
        <MenuIcon />
      </Fab>
        </Box>
       <Navbar DrawerOpen={DrawerOpen} setDrawerOpen={setDrawerOpen} />
       <Routes>
        <Route path="/" element={<Homepage setDrawerOpen={setDrawerOpen} />}/>
        <Route path="/cryptocurences" element={<Cryptocurences />}/>
        <Route path="/cryptodetails/:coinId" element={<CryptoDetails />}/>
        <Route path="/exchanges" element={<Exchanges />}/>
        <Route path="/news" element={<News />}/>
       </Routes>
       <Footer />
      </ThemeProvider>
    </CacheProvider>
      );
};

export default App;
