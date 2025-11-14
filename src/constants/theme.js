import { useColorScheme } from "react-native";
import colors from "./colors";

export const useTheme = () => {
  const scheme = useColorScheme(); 
  const colorSet = scheme === "dark" ? colors.darkColors : colors.lightColors;

  return {
    colors: colorSet,
    scheme,
  };
};
