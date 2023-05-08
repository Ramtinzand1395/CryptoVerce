import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Divider,
  Box,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  AttachMoneyOutlined,
  NumbersOutlined,
  BoltOutlined,
  SellOutlined,
  CheckCircleOutlined,
  StopOutlined,
  PriorityHighOutlined,
  EmojiEventsOutlined,
} from "@mui/icons-material";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import millify from "millify";
import LineChart from "./LineChart";
import { Loader } from ".";
import { useTranslation } from "react-i18next";
const CryptoDetails = () => {
  const { t, i18n } = useTranslation(["details"]);
  const { coinId } = useParams();
  const [timeperiod, settimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  if (isFetching) return <Loader />;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: `${t("Price to USD")}`,
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AttachMoneyOutlined />,
    },
    { title: `${t("Rank")}`, value: cryptoDetails?.rank, icon: <NumbersOutlined /> },
    {
      title: `${t("24h Volume")}`,
      value: `$ ${
        cryptoDetails?.allTimeHigh.price &&
        millify(cryptoDetails?.allTimeHigh.price)
      }`,
      icon: <BoltOutlined />,
    },
    {
      title: `${t("Market Cap")}`,
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AttachMoneyOutlined />,
    },
    {
      title: `${t("All-time-high(daily avg.")}`,
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <EmojiEventsOutlined />,
    },
  ];

  const genericStats = [
    {
      title: `${t("Number Of Markets")}`,
      value: cryptoDetails?.numberOfMarkets,
      icon: <BoltOutlined />,
    },
    {
      title: `${t("Number Of Exchanges")}`,
      value: cryptoDetails?.numberOfExchanges,
      icon: <SellOutlined />,
    },
    {
      title: `${t("Aprroved Supply")}`,
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckCircleOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <PriorityHighOutlined />,
    },
    {
      title: `${t("Total Supply")}`,
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <PriorityHighOutlined />,
    },
    {
      title: `${t("Circulating Supply")}`,
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <PriorityHighOutlined />,
    },
  ];
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "cernter",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" component={"h2"} color={"sidebtn.main"}>
          {cryptoDetails.name} ({cryptoDetails.symbol}) price
        </Typography>
        <Typography variant="body1" component={"p"}>
          {t("live price in US Dollar (USD)")}
          {cryptoDetails.name}.
          {t("View value statistics, market cap and supply.")}
        </Typography>
      </Box>
      <Divider variant="fullWidth" sx={{ backgroundColor: "black" }} />
      <Box sx={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <Typography component={"p"}> {t("time")}:</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeperiod}
          label="نتخاب زمان:"
          onChange={(e) => settimeperiod(e.target.value)}
          color="success"
          sx={{
            backgroundColor: "#d1d1d1",
          }}
        >
          <MenuItem value={""}>{t("time")}</MenuItem>

          {time.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/**line Chart */}
      <Grid xs={12} md={12}>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
      </Grid>
      <Grid container spacing={2} margin={"10px"}>
        <Grid xs={12} md={6}>
          <Typography variant="h4" component={"h3"} color={"sidebtn.main"}>
           {t("Value Statistics")} {cryptoDetails.name}
          </Typography>
          <Typography variant="body1" component={"p"} marginTop={"5px"}>
            {t("An overview showing the statistics of ")} {cryptoDetails.name}
          </Typography>
          <Box
            sx={{
              border: "1px solid gray",
              boxShadow: "-15px 5px 5px rgba(0, 0, 0, 0.2)",
              padding: "10px",
            }}
            bgcolor={"#ebebeb"}
          >
            {stats.map(({ icon, title, value } , index) => (
              <>
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "5px",
                    ":hover": { backgroundColor: "white" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {icon}
                    <Typography variant="body2" component={"span"}>
                      {title}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component={"p"}>
                    {value}
                  </Typography>
                </Box>
                <Divider variant="fullWidth" sx={{ backgroundColor: "gray" }} />
              </>
            ))}
          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant="h4" component={"h3"} color={"sidebtn.main"}>
           {t("end")}
          </Typography>
          <Typography variant="body1" component={"p"} marginTop={"5px"}>
            {t("such as the")}
          </Typography>
          <Box
            sx={{
              border: "1px solid gray",
              boxShadow: "-15px 5px 5px rgba(0, 0, 0, 0.2)",
              padding: "10px",
            }}
            bgcolor={"#ebebeb"}
          >
            {genericStats.map(({ icon, title, value  }, index) => (
              <>
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "5px",
                    ":hover": { backgroundColor: "white" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {icon}
                    <Typography variant="body2" component={"span"}>
                      {title}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component={"p"}>
                    {value}
                  </Typography>
                </Box>
                <Divider variant="fullWidth" sx={{ backgroundColor: "gray" }} />
              </>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h3" component={"h3"} color={"sidebtn.main"}>
        {t("Links")} {cryptoDetails.name}
      </Typography>
      <Box
        sx={{
          border: "1px solid gray",
          boxShadow: "-15px 5px 5px rgba(0, 0, 0, 0.2)",
          padding: "10px",
        }}
        bgcolor={"listcolor.main"}
      >
        {cryptoDetails.links.map((link , index) => (
          <>
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "5px",
                ":hover": { backgroundColor: "white" },
              }}
            >
              <Typography variant="h6" component={"h4"}>
                {link.type}
              </Typography>
              <Link to={link.url}>{link.name}</Link>
            </Box>
            <Divider variant="fullWidth" sx={{ backgroundColor: "white" }} />
          </>
        ))}
      </Box>
    </Container>
  );
};

export default CryptoDetails;
