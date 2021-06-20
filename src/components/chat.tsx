/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Input, Flex, Box, Text, FormControl, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
	width: 100%;
`;

export default function Home({ socket, role, room }: any): JSX.Element {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		role
			? {
					from: "System",
					message: "Connected as therapist",
			  }
			: {
					from: "System",
					message: "Connected anonymously",
			  },
	]);

	type messageType = {
		from: string;
		message: string;
	};

	function displayMessage(displayMessage: string, from: string) {
		const tempMessages: object[] = [];

		messages.forEach((i: object) => {
			tempMessages.push(i);
		});

		tempMessages.push({
			from,
			message: displayMessage,
		});

		// @ts-ignore
		setMessages(tempMessages);
	}

	// useEffect(() => {}, []);

	useEffect(() => {
		socket.removeListener("message");

		socket.on("message", (msg: string) => {
			displayMessage(msg, role ? "Patient" : "Therapist");
		});
	}, [messages]);

	return (
		<Flex justify="center" w="100vw" h="100vh">
			<Box>
				<Flex maxW="1200px" w="100%" justify="space-between">
					<Image src="/logo.png" h="100px" />
					<Box>
						<Text
							fontFamily="Georgia, seriff"
							fontSize={{ base: "40px", sm: "50px", md: "60px" }}
						>
							ANON-THERAPY
						</Text>
						<Text
							fontFamily="Georgia, seriff"
							fontSize={{ sm: "17px", md: "22px" }}
							mt="-20px"
							textAlign="center"
						>
							—Free Anonymous Online Therapy—
						</Text>
					</Box>
					<Image src="/logo.png" h="100px" />
				</Flex>
				<Box maxW="1200px" w="100%" mx="25px">
					<Flex
						textAlign="left"
						h="80vh"
						flexDir="column"
						justify="flex-end"
						overflowY="auto"
					>
						{messages.map((message: messageType, index: number) => {
							return (
								<Text key={index} my="10px" fontSize="xl">
									{message.from}:
									<Text fontSize="lg">
										{" "}
										{message.message}
									</Text>
								</Text>
							);
						})}
					</Flex>

					<StyledForm
						onSubmit={(e) => {
							if (!message) {
								return;
							}
							e.preventDefault();
							socket.emit("message", message, room);
							displayMessage(message, "You");
							setMessage("");
						}}
					>
						<FormControl id="first-name" isRequired>
							<Input
								color="text.900"
								borderColor="#072d75"
								w="100%"
								placeholder="Message"
								value={message}
								onChange={(event: any) => {
									const temp = event.target.value;
									setMessage(temp);
								}}
							/>
						</FormControl>
					</StyledForm>
				</Box>
			</Box>
		</Flex>
		// <Flex h="100vh" align="flex-end">
		// 	<Box maxW="2000px" w="100%" mx="25px">
		// 		<Flex
		// 			textAlign="left"
		// 			h="80vh"
		// 			flexDir="column"
		// 			justify="flex-end"
		// 			overflowY="auto"
		// 		>
		// 			{messages.map((message: messageType, index: number) => {
		// 				return (
		// 					<Text key={index} my="10px" fontSize="xl">
		// 						{message.from}:
		// 						<Text fontSize="lg"> {message.message}</Text>
		// 					</Text>
		// 				);
		// 			})}
		// 		</Flex>
		// 		<Flex my="20px">
		// 			<form
		// 				onSubmit={(e) => {
		// 					if (!message) {
		// 						return;
		// 					}
		// 					e.preventDefault();
		// 					socket.emit("message", message, room);
		// 					displayMessage(message, "You");
		// 					setMessage("");
		// 				}}
		// 			>
		// 				<FormControl id="first-name" isRequired>
		// 					<Input
		// 						color="text.900"
		// 						borderColor="#072d75"
		// 						w="100%"
		// 						placeholder="Message"
		// 						value={message}
		// 						onChange={(event: any) => {
		// 							const temp = event.target.value;
		// 							setMessage(temp);
		// 						}}
		// 					/>
		// 				</FormControl>
		// 			</form>
		// 		</Flex>
		// 	</Box>
		// </Flex>
	);
}
