/* eslint-disable import/no-default-export */
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		brand: {
			50: "#dffbfb",
			100: "#aff4f6",
			200: "#74eef2",
			300: "#02e6ee",
			400: "#00dfeb",
			500: "#00d7e9",
			600: "#00c6d6",
			700: "#00b0ba",
			800: "#009ba2",
			900: "#007774",
		},
		secondary: {
			50: "#E8F5E9",
			100: "#C8E6C9",
			200: "#A5D6A7",
			300: "#81C784",
			400: "#66BB6A",
			500: "#4CAF50",
			600: "#43A047",
			700: "#388E3C",
			800: "#2E7D32",
			900: "#1B5E20",
		},
		text: {
			50: "#FAFAFA",
			100: "#F5F5F5",
			200: "#EEEEEE",
			300: "#E0E0E0",
			400: "#BDBDBD",
			500: "#9E9E9E",
			600: "#757575",
			700: "#616161",
			800: "#424242",
			900: "#212121",
			1000: "#161616",
		},
	},
	styles: {
		global: () => ({
			html: {
				height: "100%",
			},
			body: {
				fontFamily: "body",
				color: "text.1000",
				bg: "brand.100",
				lineHeight: "base",
			},
		
		}),
	},
});

export default theme;
