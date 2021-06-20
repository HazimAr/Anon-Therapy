import { Box, Flex, Text, Heading, Divider } from "@chakra-ui/react";

export default function Body(): JSX.Element {
	return (
		<Flex
			justify="space-evenly"
			mt="20px"
			flexWrap="wrap"
			
		>
			<Box maxW="362px">
				<Heading size="md" mb="10px">
					ABOUT US
				</Heading>
				<Text>
					Welcome to Anon-Therapy, an online therapy center made by a
					group of students! Our purpose is to help those who want to
					talk but do not want their identity to be known. Upon
					creating a session, you’ll be connected with someone so you
					can speak your thoughts anonymously.
				</Text>
			</Box>
			<Box w="250px" fontSize="25px" mt="40px">
				Become a better version of yourself. Request today.
			</Box>
		</Flex>
	);
}
