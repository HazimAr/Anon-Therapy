import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { DB_URL } from "config";
import { getParameterByName } from "@lib/cookie";
import Chat from "@components/chat";
import axios from "axios";
import { IS_PRODUCTION } from "config";

const socket = io(DB_URL);

export default function Play(): JSX.Element {
	const [room, setRoom] = useState("");
	const [started, setStarted] = useState(false);
	const [role, setRole] = useState(false);

	useEffect(() => {
		socket.on("start", () => {
			setStarted(true);
		});

		socket.on("leave", () => {
			setStarted(false);
			socket.emit(
				"join-room",
				room,
				(isStarted: boolean, serverRole: boolean) => {
					setRole(serverRole);
					setStarted(isStarted);
				}
			);
		});

		const room = getParameterByName("room");

		if (room) {
			setRoom(room);
			socket.emit(
				"join-room",
				room,
				(isStarted: boolean, serverRole: boolean) => {
					setRole(serverRole);
					setStarted(isStarted);
				}
			);
		}
	}, []);

	useEffect(() => {
		if (!started) {
			axios.post(
				"https://discord.com/api/webhooks/855762656644169728/vjm0UGACLsGlZ4p31_MiYAapuxHVIbKcOzvy7ozode5F7YPz4hCs7w-gamrDzN9crYuO",
				{
					content: `<@&855764473767395368>\nSomeone has requested a therapy session\n${
						IS_PRODUCTION
							? `https://anon-therapy.vercel.app/session?room=${room}`
							: `http://localhost:3000/session?room=${room}`
					}`,
				}
			);
		}
	}, [started]);

	return (
		<Center h="100vh">
			<Box>
				{started ? (
					<Box>
						<Chat socket={socket} role={role} room={room} />
					</Box>
				) : (
					<Box>
						<Heading size="md">
							Please wait for a therapist to connect to the room
						</Heading>
						<Text>
							For you guys who are testing just send the url to
							another person
						</Text>
					</Box>
				)}
			</Box>
		</Center>
	);
}
