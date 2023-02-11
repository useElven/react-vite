import { useNetworkSync } from "@useelven/core";
import {
  Box,
  HStack,
  Text,
  Link,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import reactLogo from "./assets/react.svg";
import { LoginModalButton } from "./components/tools/LoginModalButton";
import { Authenticated } from "./components/tools/Authenticated";
import { EGLDTx } from "./components/demo/EgldTx";

function App() {
  useNetworkSync({ chainType: "devnet" });
  return (
    <VStack justify="center" height="$100vh">
      <HStack justify="center" height="36" width="100%" mb="8">
        <Link href="https://vitejs.dev" target="_blank">
          <Image
            src="/vite.svg"
            className="logo"
            alt="Vite logo"
            width="32"
            height="32"
          />
        </Link>
        <Link href="https://reactjs.org" target="_blank">
          <Image
            src={reactLogo}
            className="logo react"
            alt="React logo"
            width="32"
            height="32"
          />
        </Link>
      </HStack>
      <Box>
        <Heading as="h1">Vite + React + useElven</Heading>
      </Box>
      <LoginModalButton />
      <Box>
        <Text mt="8">Click on the Vite and React logos to learn more</Text>
      </Box>
      <Authenticated>
        <EGLDTx />
      </Authenticated>
    </VStack>
  );
}

export default App;
