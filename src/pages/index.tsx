import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	const [room, setRoom] = useState("");

	return (
		<Center h="100vh">
			<Box>
				<Input
					onChange={(e: any) => {
						const room = e.target.value;
						setRoom(room);
					}}
					placeholder="Room"
				/>

				<Flex justify="space-between">
					<Button
						onClick={() => {
							router.push(`/play?room=${room}`);
						}}
					>
						Join
					</Button>
					<Button
						onClick={() => {
							router.push(`/play?room=${uuid()}`);
						}}
					>
						Create Private Match
					</Button>
				</Flex>
			</Box>
		</Center>
	);
}
