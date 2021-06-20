import { Box, Flex, Text, Link, Divider } from "@chakra-ui/react";
import Intro from "@components/intro";
import Body from "@components/body";

export default function Index(): JSX.Element {
	return (
		<Box w="100vw" h="100vh">
			<Flex justify="center">
				<Box maxW="1050px" w="100%" textAlign="center">
					<Text
						fontFamily="Georgia, seriff"
						fontSize={{ base: "40px", sm: "50px", md: "60px" }}
					>
						ANON-THERAPY
					</Text>
					<Text
						fontFamily="Georgia, seriff"
						fontSize={{ sm: "17px", md: "22px" }}
						mt="-20px"
					>
						—Free Anonymous Online Therapy—
					</Text>
					<Flex justify="space-between" mt="15px" mx="50px">
						<Link>Home</Link>
						<Link>Contact Us</Link>
						<Link>Request Session</Link>
					</Flex>
				</Box>
			</Flex>
			<Divider bg="brand.600" />

			{/* <Flex justify="center">
				<Box>
					<Image src="/undraw/bluehealth.svg" w="500px" />
					<Button
						onClick={() => {
							void router.push(`/session?room=${uuid()}`);
						}}
					>
						Request Session
					</Button>
				</Box>
			</Flex> */}
			<Intro />
			<Body />
		</Box>
	);
	// return <Intro />;
}
