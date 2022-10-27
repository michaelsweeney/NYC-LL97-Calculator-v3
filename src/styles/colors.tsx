type ColorGroupTypes = {
  [key: string]: string;
};

type ColorTypes = {
  primary: ColorGroupTypes;
  secondary: ColorGroupTypes;
  reds: ColorGroupTypes;
  greens: ColorGroupTypes;
  blues: ColorGroupTypes;
  grays: ColorGroupTypes;
  whites: ColorGroupTypes;
  akf: ColorGroupTypes;
};

export const colors: ColorTypes = {
  primary: {
    light: "#dcea9a",
    main: "#BAD636",
    dark: "#9CB62A",
  },
  secondary: {
    light: "#878787",
    main: "#595954",
    dark: "#282826",
  },
  reds: {
    light: "rgb(178,50,50)",
    medium: "rgb(161,46,46)",
    dark: "rgb(131,37,37)",
  },
  greens: {
    light: "rgb(110,177,44)",
    medium: "rgb(95,153,38)",
    dark: "rgb(79,127,32)",
  },
  blues: {
    light: "rgb(53,143,180)",
    medium: "rgb(44,122,156)",
    dark: "rgb(35,103,133)",
  },
  grays: {
    light: "#878787",
    medium: "#595954",
    dark: "#3B3B3B",
  },
  whites: {
    medium: "#fff",
  },
  akf: {
    red: "#cf202e",
    gray: "gray",
  },
};

export const bar_colors = {
  elec: "#358FB4",
  gas: "#6EB12C",
  steam: "#B23232",
  fuel_two: "#A644E2",
  fuel_four: "#62009E",
  fine: colors.grays.medium,
  threshold: colors.primary.main,
  under: colors.primary.main,
  excess: colors.grays.medium,
  total: colors.primary.main,
};

export const chart_background_color = "rgb(240,240,240)";
