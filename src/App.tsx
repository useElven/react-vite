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
import { EGLDTx2 } from "./components/demo/EgldTx2";

function App() {
  useNetworkSync({
    apiTimeout: '10000',
    chainType: import.meta.env.VITE_MULTIVERSX_CHAIN_TYPE || "devnet",
    ...(import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
      ? {
          walletConnectV2ProjectId: import.meta.env
            .VITE_WALLET_CONNECT_PROJECT_ID,
        }
      : {}),
  });

  return (
    <VStack justify="center" minHeight="$100vh" pt={16}>
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
        <Link href="https://www.useelven.com" target="_blank">
          <Image
            src="/useelven.png"
            className="logo"
            alt="useElven logo"
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
        <Text mt="8">Click on the Vite, React and useElven logos to learn more</Text>
      </Box>
      <Authenticated>
        <EGLDTx />
        <EGLDTx2 />
      </Authenticated>
    </VStack>
  );
}

export default App;
