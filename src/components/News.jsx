import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Avatar,
  Box,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loader } from ".";
import { useTranslation } from "react-i18next";
const demoImg =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const { t, i18n } = useTranslation(["news"]);

  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (isFetching) return <Loader />

  return (
    <>
    {!simplified && (
        <>
          <Box sx={{ display: "flex", alignItems: "center" , margin:"20px" , justifyContent:"center" }}>
            <Typography component={"p"}> {t("select")}</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newsCategory}
              label="نتخاب ارز دیجیتال:"
              onChange={(e) => setNewsCategory(e.target.value)}
              color="success"
              sx={{
                backgroundColor: "gray",
              }}
            >
              <MenuItem value={"Cryptocurrency"} >
              Cryptocurrency
              </MenuItem>

              {data?.data?.coins?.map((coin) => (
                <MenuItem key={coin.name} value={coin.name}>
                  {coin.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </>
      )}
        <Grid container spacing={2} marginTop={"20px"} marginX={"50px"}>
          {cryptoNews.value.map((news) => (
            <Grid xs={12} sm={6} md={4} key={news.name}>
              <Link to={`/crypto/${news.url}`} target="_blank" rel="noreferrer">
                <Card dir="ltr">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={news?.image?.thumbnail?.contentUrl || demoImg}
                      alt={news.name}
                    />
                    <CardContent>
                      <Typography variant="h4" component="h2" color="#3787ff">
                        {news.name.substring(0, 18)} ...
                      </Typography>
                      <Typography gutterBottom variant="body1" component="h6">
                        {news.description > 100
                          ? `${news.description.substring(0, 100)} ... `
                          : news.description}
                      </Typography>
                    </CardContent>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={
                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                            demoImg
                          }
                          alt="news"
                        />
                        <Typography gutterBottom variant="body1" component="p">
                          {news.provider[0]?.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography gutterBottom variant="body1" component="p">
                          {moment(news.datePublished).startOf("ss").fromNow()}
                        </Typography>
                      </Box>
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

export default News;
