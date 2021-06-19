import { Input, Flex, Box, Center, Text, FormControl } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { DB_URL } from "config";
import { getParameterByName } from "@lib/cookie";

const socket = io(DB_URL);

export default function Home(): JSX.Element {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			from: "System",
			message:
				"Thank you for creating a session, please wait for one of our therapists to connect to the room",
		},
	]);
	const [role, setRole] = useState(false);
	const [room, setRoom] = useState("");

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
			from: from,
			message: displayMessage,
		});

		//@ts-ignore
		setMessages(tempMessages);
	}

	useEffect(() => {
		const roomP = getParameterByName("room");
		if (roomP) {
			socket.emit("join-room", roomP);
			setRoom(roomP);
		}
		socket.on("message", (msg, role) => {
			displayMessage(msg, role ? "Therapist" : "Patient");
		});
	}, []);

	return (
		<Center h="100vh">
			<Box maxW="700px" w="100%" mx="25px">
				<Box textAlign="left">
					{messages.map((message: messageType, index: number) => {
						return (
							<Text key={index} my="10px">
								{message.from}:
								<Text fontSize="sm"> {message.message}</Text>
							</Text>
						);
					})}
				</Box>
				<Flex mt="25px">
					<form
						onSubmit={(e) => {
							if (!message) return;
							e.preventDefault();
							socket.emit("message", message, role);
							displayMessage(message, "You");
							setMessage("");
						}}
					>
						<FormControl id="first-name" isRequired>
							<Input
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
		</Center>
	);
}
