import millify from "millify";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect, useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Container
} from "@mui/material";
import { Loader } from ".";
import { useTranslation } from "react-i18next";
const Cryptocurences = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptolist, isFetching } = useGetCryptosQuery(count);
  const [Cryptos, setCryptos] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const { t, i18n } = useTranslation(["crypto"]);

  useEffect(() => {
    const filterd = cryptolist?.data?.coins.filter((c) =>
      c.name.toLowerCase().includes(SearchTerm.toLowerCase())
    );
    setCryptos(filterd);
  }, [cryptolist, SearchTerm]);

  if (isFetching) return <Loader />
  return (
    <>
      {!simplified && (
        <Box sx={{ display: "flex", justifyContent: "center"  }}>
          <TextField
            id="input-with-icon-textfield"
            focused
            label="جستجو ..."
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchSharp />
                </InputAdornment>
              ),
              style: { color: "black", backgroundColor: "#d1d1d1" },
            }}
            variant="filled"
          />
        </Box>
      )}

      <Grid container spacing={3} marginTop={"20px"} marginX={"50px"}>
        {Cryptos?.map((c) => (
          <Grid xs={12} sm={6} md={3} key={c.uuid}>
            <Link to={`/cryptodetails/${c.uuid}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"
                    image={c.iconUrl}
                    alt={c.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {c.name} . {c.rank}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("Price")}: {millify(c.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {t("Market Cap ")}: {millify(c.marketCap)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {t("Daily Change")}: {millify(c.change)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Cryptocurences;
