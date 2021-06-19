import { Box, Center, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { DB_URL } from "config";
import { getParameterByName } from "@lib/cookie";
import Chat from "@components/chat";

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
					</Box>
				)}
			</Box>
		</Center>
	);
}
