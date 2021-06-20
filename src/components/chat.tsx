/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Input, Flex, Box, Text, FormControl } from "@chakra-ui/react";
import { useState, useEffect } from "react";

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
		<Flex h="100vh" align="flex-end">
			<Box maxW="2000px" w="100%" mx="25px">
				<Flex
					textAlign="left"
					h="90vh"
					flexDir="column"
					justify="flex-end"
					overflowY="scroll"
				>
					{messages.map((message: messageType, index: number) => {
						return (
							<Text key={index} my="10px" fontSize="xl">
								{message.from}:
								<Text fontSize="lg"> {message.message}</Text>
							</Text>
						);
					})}
				</Flex>
				<Flex my="20px">
					<form
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
					</form>
				</Flex>
			</Box>
		</Flex>
	);
}
