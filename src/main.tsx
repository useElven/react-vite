import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // TODO: add React strict mode when the problem with Ledger (useElven) in development is solved
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
