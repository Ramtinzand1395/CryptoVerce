import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const lngs = [
  { code: "en", native: "English" },
  { code: "fa", native: "فارسی" },
];

export default function Langchange() {
  const { i18n } = useTranslation();

  const handleTrans = (code) => {
    i18n.changeLanguage(code)
  };

  return (
    <div>
      {lngs.map((lng, index) => {
        const { code, native } = lng;
        return (
          <Button
          key={index}
            variant="contained"
            onClick={() => handleTrans(code)}
            sx={{margin:"10px"}}
          >
            {native}
          </Button>
        );
      })}
    </div>
  );
}
