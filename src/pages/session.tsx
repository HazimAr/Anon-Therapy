/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-void */
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import Chat from "@components/chat";
import { getParameterByName } from "@lib/cookie";
import axios from "axios";
import { DB_URL, IS_PRODUCTION } from "config";
import router from "next/router";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(DB_URL);

export default function Play(): JSX.Element {
	const [room, setRoom] = useState("");
	const [started, setStarted] = useState(false);
	const [role, setRole] = useState(false);
	const [full, setFull] = useState(false);
	const [roleP, setRoleP] = useState(false)
	const [notify, setNotify] = useState(false);

	useEffect(() => {
		socket.on("start", () => {
			// @ts-ignore
			setStarted(true);
		});

		socket.on("leave", () => {
			void router.push(`/close`);
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
		const roleP = getParameterByName("role")
		if (roleP) {
			setRoleP(true)
		}
		else {
			setRoleP(false)
		}

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
			return;
		}
		void router.push(`/`);
	}, []);

	useEffect(() => {
		if (started === false && room && full === false && roleP === false) {
			void axios.post(
				"https://discord.com/api/webhooks/856105965500891136/MjqIwfQThqPz6u8c6dCU_DtklVgN4Vf6xytoKKItQvhgCSXJvQm3LTXDSWuPcqcFrGc_",
				{
					content: `<@&855764473767395368>\nSomeone has requested a therapy session\n${
						IS_PRODUCTION
							? `https://anontherapy.vercel.app/session?room=${room}&role=true`
							: `http://localhost:3000/session?room=${room}&role=true`
					}`,
				}
			);
			return;
		}
		if (notify === false && started === true && room && full === false ) {
			setNotify(true);
			void axios.post(
					"https://discord.com/api/webhooks/856105965500891136/MjqIwfQThqPz6u8c6dCU_DtklVgN4Vf6xytoKKItQvhgCSXJvQm3LTXDSWuPcqcFrGc_",
					{
						content: `A therapist has joined room ${room}\n${
							IS_PRODUCTION
								? `https://anontherapy.vercel.app/session?room=${room}`
								: `http://localhost:3000/session?room=${room}`
						}`,
					}
				);
			return;
		}
		// if (started === false && room && full === false) {
		// 	void axios.post(
		// 			"https://discord.com/api/webhooks/856105965500891136/MjqIwfQThqPz6u8c6dCU_DtklVgN4Vf6xytoKKItQvhgCSXJvQm3LTXDSWuPcqcFrGc_",
		// 			{
		// 				content: `A therapist has joined room ${room}\n${
		// 					IS_PRODUCTION
		// 						? `https://anontherapy.vercel.app/session?room=${room}`
		// 						: `http://localhost:3000/session?room=${room}`
		// 				}`,
		// 			}
		// 		);
		// 	return;
		// }

	}, [started, room, full]);

	return (
		<Center h="100vh">
			<Box>
				{full ? (
					<Box textAlign="center">
						<Heading size="md">
							It looks like this room is full if you would like to
							make another session please click below
						</Heading>
						<Button
							bg="#49c3f8"
							onClick={() => {
								void router.push(`/`);
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
					<Box textAlign="center">
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
