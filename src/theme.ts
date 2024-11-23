import { extendTheme } from "@chakra-ui/theme-utils";

const theme = {
  config: {
    colors: {
      primary: "#ff3131",
    },
    fonts: {
      body: "Parkinsans, sans-serif",
    },
  },
}

const customTheme = extendTheme(theme)

export default customTheme;
