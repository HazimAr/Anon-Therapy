/* eslint-disable import/no-default-export */
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

export default function Body(): JSX.Element {
	return (
		<Flex justify="center">
			<Flex
				justify="center"
				mt="20px"
				flexWrap="wrap"
				maxW="1000px"
				w="100%"
			>
				<Box maxW="362px">
					<Heading size="md" mb="10px">
						ABOUT US
					</Heading>
					<Text ml="">
						Welcome to Anon-Therapy, an online therapy center made
						by a group of students! Our purpose is to help those who
						want to talk but do not want their identity to be known.
						Upon creating a session, you will be connected with
						someone so you can speak your thoughts anonymously.
					</Text>
				</Box>
				<Box w="250px" fontSize="25px" mt="40px" ml="auto">
					Become a better version of yourself. Request today.
				</Box>
			</Flex>
		</Flex>
	);
}
