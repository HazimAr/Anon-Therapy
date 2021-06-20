/* eslint-disable no-void */
/* eslint-disable import/no-default-export */
import { Box, Flex, Text, Button, Heading } from "@chakra-ui/react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Body(): JSX.Element {
	return (
		<Flex justify="center">
			<Flex
				justify="space-evenly"
				mt="20px"
				flexWrap="wrap"
				maxW="2000px"
				w="100%"
			>
				<Box maxW="362px" mx="25px">
					<Heading size="md" mb="10px">
						ABOUT US
					</Heading>
					<Text>
						Welcome to Anon-Therapy, an online therapy center made
						by a group of students! Our purpose is to help those who
						want to talk but do not want their identity to be known.
						Upon creating a session, you will be connected with
						someone so you can speak your thoughts anonymously.
					</Text>
				</Box>
				<Box w="250px" fontSize="25px" mt="40px">
					Become a better version of yourself. Request today.
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
			</Flex>
		</Flex>
	);
}
