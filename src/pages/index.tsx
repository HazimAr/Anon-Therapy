import { Button, Center } from "@chakra-ui/react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
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
