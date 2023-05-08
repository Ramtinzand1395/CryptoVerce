import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { Loader } from ".";
import { Avatar, Box, Container, Typography } from "@mui/material";
import millify from "millify";
import { useTranslation } from "react-i18next";

export default function NestedList() {
  const { t, i18n } = useTranslation(["exchanges"]);
  const [open, setOpen] = React.useState(true);
  const { data: exchange, isFetching } = useGetExchangesQuery();
  if (isFetching) return <Loader />;

  return (
    <Container maxWidth={"md"}>
      <List
        sx={{ width: "100%", bgcolor: "listcolor.main" }}
        component="div"
        aria-labelledby="تبادلات ارز های دیجیتال"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {t("Exchanges")}
          </ListSubheader>
        }
      >
        {exchange?.data?.exchanges?.map((c) => (
          <Box key={c.uuid}>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon
                sx={{ display: "flex", alignItems: "center", padding: "10px" }}
              >
                {c.rank}.
                <Avatar src={c.iconUrl} />
              </ListItemIcon>
              <ListItemText primary={c.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Typography
                component={"span"}
                sx={{ pl: 6 }}
                color={c.recommended ? "green" : "red"}
              >
                {c.recommended
                  ? `${t("recommendedT")}`
                  : `${t("recommendedF")}`}
              </Typography>
              <ListItemText
                primary={`${t("price")} : ${millify(c.price)}`}
                sx={{ pl: 6 }}
              />
              <ListItemText
                primary={`${t("numberOfMarkets")} : ${millify(
                  c.numberOfMarkets
                )}`}
                sx={{ pl: 6 }}
              />
            </Collapse>
          </Box>
        ))}
      </List>
    </Container>
  );
}
