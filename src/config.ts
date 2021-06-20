// google analytics measurement id
const GA_TRACKING_ID = "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DB_URL = IS_PRODUCTION
	? "https://therapy-ses.herokuapp.com"
	: "http://localhost:6969";

const META = {
	title: "Anon Therapy | Anonymous Therapy",
	lang: "en-us",
	description: "The secret comfort you never knew you needed.",
	url: "https://anon-therapy.vercel.app",
};

export { GA_TRACKING_ID, IS_PRODUCTION, META, DB_URL };
