/* eslint-disable no-void */
import { Button, Center, Box, Heading } from "@chakra-ui/react";
import router from "next/router";

export default function Index(): JSX.Element {
	return (
		<Center h="100vh">
			<Box textAlign="center">
				<Heading>The other person has left the room</Heading>
				<Button
					onClick={() => {
						void router.push(`/`);
					}}
					bg="brand.500"
				>
					Go Home
				</Button>
			</Box>
		</Center>
	);
}
