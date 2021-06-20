/* eslint-disable import/no-default-export */
/* eslint-disable no-void */
import { Button, Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	return (
		<Flex justify="center">
			<Flex
				justify="center"
				align="center"
				flexWrap="wrap-reverse"
				maxW="1200px"
				mx="25px"
			>
				<Box maxW="450px" textAlign="left" my="20px">
					<Box>
						<Heading>Anonymous Therapy Done Right</Heading>
						<Text my="10px" color="text.800">
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Magni qui veniam possimus quod, laudantium,
							adipisci doloribus at debitis quam dolorem tempora.
						</Text>
					</Box>
					<Button
						mt="20px"
						onClick={() => {
							void router.push(`/session?room=${uuid()}`);
						}}
						bg="brand.500"
					>
						Request Session
					</Button>
				</Box>
				<Box my="20px">
					<Image src="/undraw/doctors.svg" w="500px" />
				</Box>
			</Flex>
		</Flex>
	);
}
