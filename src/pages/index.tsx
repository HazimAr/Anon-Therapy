/* eslint-disable no-void */
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	return (
		<Flex justify="center">
			<Box>
				<Image src="/undraw/doctors.svg" w="500px" />
				<Button
					onClick={() => {
						void router.push(`/session?room=${uuid()}`);
					}}
				>
					Request Session
				</Button>
			</Box>
		</Flex>
	);
}
