import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	const [room, setRoom] = useState("");

	return (
		<Center h="100vh">
			<Button
				onClick={() => {
					router.push(`/play?room=${uuid()}`);
				}}
			>
				Request Session
			</Button>
		</Center>
	);
}
