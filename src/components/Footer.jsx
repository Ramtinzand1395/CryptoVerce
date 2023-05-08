import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <Box color={"sidebtn.main"} bgcolor={"footerbg.main"} sx={{ textAlign: "center" }}>
        <Typography variant="h4" component={"h4"}>
          CryptoVerce
        </Typography>
        <Typography variant="h5" component={"h5"}>
          توسعه شده توسط ramtin.zand
        </Typography>
        <Box sx={{marginY:"20px"}}>
            <Link to="/" style={{margin:"20px"}}>
                <Button variant="outlined" color="sidebtn">
                    خانه
                </Button>
            </Link>
            <Link to="/exchanges" style={{margin:"20px"}}>
                <Button variant="outlined" color="sidebtn">
                    تبادلات
                </Button>
            </Link>
            <Link to="/news" style={{margin:"20px"}}>
                <Button variant="outlined" color="sidebtn">
                    اخبار
                </Button>
            </Link>
        </Box>
      </Box>
  );
};

export default Footer;
