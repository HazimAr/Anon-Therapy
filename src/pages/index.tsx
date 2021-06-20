
import { Button, Box, Flex, Image, Text, Divider } from "@chakra-ui/react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	return (
		<Box w="100vw" h="100vh" bg="#e5f6ff">
			<Box color="#072D75">
				<Text
					fontFamily="Georgia,seriff"
					fontSize={{ base: "40px", sm: "50px", md: "60px" }}
				>
					ANON-THERAPY
				</Text>
				<Text
					fontFamily="Georgia,seriff"
					fontSize={{ sm: "17px", md: "22px" }}
					mt="-20px"
				>
					—Free Anonymous Online Therapy—
				</Text>
				<Flex justify="space-evenly" mt="15px">
					<Text>HOME</Text> <Text>ABOUT US</Text> <Text>FAQ</Text>
					<Text>CONTACT US</Text>
				</Flex>
				<Divider colorScheme="#6FB7D6" />
			</Box>
			<Flex justify="center">
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
			</Flex>
		</Box>

	);
}
