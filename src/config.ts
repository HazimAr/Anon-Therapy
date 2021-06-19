// google analytics measurement id
const GA_TRACKING_ID = "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DB_URL = IS_PRODUCTION
	? "https://therapy-ses.herokuapp.com"
	: "http://localhost:6969";

const META = {
	title: "NextJS ChakraUI Template | Hazim Arafa",
	lang: "en-us",
	description:
		"Boilerplate built to scale containing Typescript + NextJS + ChakraUI + Google Analytics + ESLint + Jest + Styled Components + Icons",
	url: "https://boilerplate.hazimarafa.tech",
};

export { GA_TRACKING_ID, IS_PRODUCTION, META, DB_URL };
