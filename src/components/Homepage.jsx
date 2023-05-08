import millify from "millify";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography } from "@mui/material";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Cryptocurences from "./Cryptocurences";
import News from "./News";
import { useTranslation } from "react-i18next";

import { Loader } from ".";
const Homepage = () => {
  const { t, i18n } = useTranslation(["homepage"]);

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalstats = data?.data?.stats;
  if (isFetching) return <Loader />
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" component={"h2"} color={"sidebtn.main"}>
          {t("Global")}
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ marginTop: "20px" }}>
            <Typography color="gray" gutterBottom>
            {t("Top")}
            </Typography>
            <Typography sx={{ fontSize: 34 }} color="black" gutterBottom>
              {globalstats.total}
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
            {t("Total Exchanges")}
            </Typography>
            <Typography sx={{ fontSize: 34 }} color="black" gutterBottom>
              {millify(globalstats.totalExchanges)}
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
            {t("Total 24h Volume ")}
            </Typography>
            <Typography sx={{ fontSize: 34 }} color="black" gutterBottom>
              {millify(globalstats.total24hVolume)}
            </Typography>
          </Grid>

          <Grid xs={6}>
            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
            {t("Total Market Cap")}
            </Typography>
            <Typography sx={{ fontSize: 34 }} color="black" gutterBottom>
              {millify(globalstats.totalMarketCap)}
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
            {t("Total Markets")}
            </Typography>
            <Typography sx={{ fontSize: 34 }} color="black" gutterBottom>
              {millify(globalstats.totalMarkets)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={6}>
            <Typography variant="h5" component={"h2"} color={"sidebtn.main"}>
            {t("Top 10 Cryptos In The World")}
            </Typography>
          </Grid>
          <Grid xs={6} justifyContent={"end"} display={"flex"}>
            <Typography variant="h5" component={"h3"}>
              <Link to={"/cryptocurences"} style={{ color: "blue" }}>
                {t("Show more")}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Cryptocurences simplified />

        <Grid container marginTop={"20px"}>
          <Grid xs={6}>
            <Typography variant="h5" component={"h2"} color={"sidebtn.main"} >
            {t("Latest Crypto News")}
            </Typography>
          </Grid>
          <Grid xs={6} justifyContent={"end"} display={"flex"}>
            <Typography variant="h5" component={"h3"}>
              <Link to={"/news"} style={{ color: "blue" }}>
                {" "}
                {t("Show more")}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <News simplified />
      </Container>
    </>
  );
};

export default Homepage;
