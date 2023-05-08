import {
  HomeWorkOutlined,
  TrendingUpOutlined,
  CurrencyExchangeOutlined,
  NewspaperOutlined,
  CloseSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Typography,
} from "@mui/material";
import logo from "../assets/cryptocurrency.png";
import { Link } from "react-router-dom";
import Langchange from "./Langchange";
import { useTranslation } from "react-i18next";
const Navbar = ({  DrawerOpen , setDrawerOpen}) => {
  const { t, i18n } = useTranslation(["menu"]);
  return (
    <Drawer  open={DrawerOpen} >
      <Box style={{ width: "300px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Avatar src={logo} />
          <Typography variant="h5" component={"h1"} marginLeft={"10px"}>
            CryptoVerce
          </Typography>
          <Button onClick={()=>setDrawerOpen(false)} variant="contained">
       {<CloseSharp />}
      </Button>
        </Box>
        <Box >
          <Link to={"/"} style={{color:"white"}}>
            <Button
              variant="text"
              onClick={()=>setDrawerOpen(false)}
              color="sidebtn"
              size="medium"
              startIcon={<HomeWorkOutlined />}
              sx={{ width: "250px", justifyContent: "start" , marginTop:"10px" }}
            >
              {t("Home")}

            </Button>
          </Link>
          <Link to={"/cryptocurences"} style={{color:"white"}}>
            <Button
              variant="text"
              onClick={()=>setDrawerOpen(false)}
              color="sidebtn"
              size="medium"
              startIcon={<TrendingUpOutlined />}
              sx={{ width: "250px", justifyContent: "start" , marginTop:"10px" }}
            >
              {t("Crypto")}

            </Button>
          </Link>
          <Link to={"/exchanges"} style={{color:"white"}}>
            <Button
              variant="text"
              onClick={()=>setDrawerOpen(false)}
              color="sidebtn"
              size="medium"
              startIcon={<CurrencyExchangeOutlined />}
              sx={{ width: "250px", justifyContent: "start", marginTop:"10px"  }}
            >
              {t("Exchanges")}

            </Button>
          </Link>
          <Link to={"/news"} style={{color:"white"}}>
            <Button
              variant="text"
              onClick={()=>setDrawerOpen(false)}
              color="sidebtn"
              size="medium"
              startIcon={<NewspaperOutlined />}
              sx={{ width: "250px", justifyContent: "start" , marginTop:"10px"  }}
            >
              {t("News")}
            </Button>
          </Link>
     
        </Box>
      </Box>
      <Langchange />

    </Drawer>
  );
};

export default Navbar;
