/* eslint-disable no-void */
import { Button, Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	return (
		<Flex justify="center" align="center">
			<Box maxW="450px" textAlign="left">
				<Box>
					<Heading>Anonymous Therapy Done Right</Heading>
					<Text mt="10px" color="text.400">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Magni qui veniam possimus quod, laudantium,
						adipisci doloribus at debitis quam dolorem tempora.
					</Text>
				</Box>
				<Button
					mt="25px"
					onClick={() => {
						void router.push(`/session?room=${uuid()}`);
					}}
				>
					Request Session
				</Button>
			</Box>
			<Box>
				<Image src="/undraw/doctors.svg" w="500px" />
			</Box>
		</Flex>
	);
}
