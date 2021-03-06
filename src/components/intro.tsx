/* eslint-disable import/no-default-export */
/* eslint-disable no-void */
import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

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
				<Box maxW="450px" my="20px">
					<Box>
						<Heading>Anonymous Therapy Done Right</Heading>
						<Text my="10px" color="#265cc0">
							Comfort. Privacy. Providing optional assistance or
							to only listen. To us you will never be a stranger,
							to us you are our friend.
						</Text>
					</Box>
				</Box>
				<Box my="20px">
					<Image src="/undraw/bluehealth.svg" w="500px" />
				</Box>
			</Flex>
		</Flex>
	);
}
