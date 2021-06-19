import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { DB_URL } from "config";
import { getParameterByName } from "@lib/cookie";
import Chat from "@components/chat";
import axios from "axios";
import { IS_PRODUCTION } from "config";
import router from "next/router";
import { v4 as uuid } from "uuid";

const socket = io(DB_URL);

export default function Play(): JSX.Element {
	const [room, setRoom] = useState("");
	const [started, setStarted] = useState();
	const [role, setRole] = useState(false);
	const [full, setFull] = useState();

	useEffect(() => {
		socket.on("start", () => {
			setStarted(true);
		});

		socket.on("leave", () => {
			router.push(`/close`);
			// setStarted(false);
			// socket.emit(
			// 	"join-room",
			// 	room,
			// 	(isStarted: boolean, serverRole: boolean, isFull: boolean) => {
			// 		setFull(isFull);
			// 		setRole(serverRole);
			// 		setStarted(isStarted);
			// 	}
			// );
		});

		const room = getParameterByName("room");

		if (room) {
			setRoom(room);
			socket.emit(
				"join-room",
				room,
				(isStarted: boolean, serverRole: boolean, isFull: boolean) => {
					setFull(isFull);
					setRole(serverRole);
					setStarted(isStarted);
				}
			);
		}
	}, []);

	useEffect(() => {
		if (started === false && room && full === false) {
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
	}, [started, room, full]);

	return (
		<Center h="100vh">
			<Box>
				{full ? (
					<Box>
						<Heading size="md">
							It looks like this room is full if you would like to
							make another session please click below
						</Heading>
						<Button
							onClick={() => {
								router.push(`/`);
							}}
						>
							Request Session
						</Button>
					</Box>
				) : started ? (
					<Box>
						<Chat socket={socket} role={role} room={room} />
					</Box>
				) : (
					<Box>
						<Heading size="md">
							Please wait for a therapist to connect to the room
						</Heading>
						<Heading>Average wait time: 5 min</Heading>
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
