/* eslint-disable no-void */
import { Button, Center, Box, Heading } from "@chakra-ui/react";
import router from "next/router";

export default function Index(): JSX.Element {
	return (
		<Center h="100vh">
			<Box>
				<Heading>The other person has left the room</Heading>
				<Button
					onClick={() => {
						void router.push(`/`);
					}}
				>
					Go Home
				</Button>
			</Box>
		</Center>
	);
}
