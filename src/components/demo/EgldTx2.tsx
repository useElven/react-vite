import { Link, Text, Box, Spinner, Flex } from "@chakra-ui/react";
import { TransactionPayload, TokenTransfer } from "@multiversx/sdk-core";
import {
  useTransaction,
  useConfig,
  useLoginInfo,
  LoginMethodsEnum,
  WebWalletUrlParamsEnum,
} from "@useelven/core";
import { useCallback, useEffect, useState } from "react";
import { ActionButton } from "../tools/ActionButton";

const egldTransferAddress = import.meta.env.VITE_EGLD_TRANSFER_ADDRESS || "";
const egldTransferAmount2 = import.meta.env.VITE_EGLD_TRANSFER_AMOUNT2 || "";

export const EGLDTx2 = () => {
  const { pending, triggerTx, txResult } = useTransaction({
    webWalletRedirectUrl: "/?webWalletTx=tx2",
  });
  const { loginMethod } = useLoginInfo();
  const { explorerAddress, chainType } = useConfig();
  const [txHashResult, setTxHashResult] = useState("");

  const handleSendTx = useCallback(() => {
    const demoMessage = "Transaction demo 2!";
    triggerTx({
      address: egldTransferAddress,
      gasLimit: 100000 + 1500 * demoMessage.length,
      data: new TransactionPayload(demoMessage),
      value: TokenTransfer.egldFromAmount(egldTransferAmount2),
    });
  }, [triggerTx]);

  // Temporary solution for multiple tx signing with web wallet using custom tx2 url param
  // Handling such cases will be improved in useElven
  const triggeredTx = () => {
    const windowLocationSearch = window.location.search;
    const urlParams = new URLSearchParams(windowLocationSearch);
    const isWebWalletTx = urlParams?.has("webWalletTx");
    const webWalletTx = urlParams?.get("webWalletTx");
    const isWebWalletGuardianSign = urlParams?.has(
      WebWalletUrlParamsEnum.hasWebWalletGuardianSign
    );

    if (isWebWalletGuardianSign || loginMethod === LoginMethodsEnum.wallet) {
      return isWebWalletTx && webWalletTx === "tx2";
    }
    return true;
  };

  const ownsTx = triggeredTx();
  const txPending = ownsTx && pending;

  useEffect(() => {
    const txHashResult = ownsTx && txResult?.hash;
    if (txHashResult) {
      setTxHashResult(txHashResult);
    }
  }, [ownsTx, txResult?.hash]);

  return (
    <Box position="relative" pt={4} pb={16} textAlign="center">
      <Text mb={4}>
        You will be sending 0.002 EGLD to the address
        <br />
        (for testing transaction triggers at the same time): <br />
        <Link
          href={`${explorerAddress}/accounts/${egldTransferAddress}`}
          fontWeight="bold"
        >
          {egldTransferAddress}
        </Link>{" "}
        <br />({chainType})
      </Text>
      <ActionButton disabled={txPending} onClick={handleSendTx}>
        <Text>Send Transaction</Text>
      </ActionButton>
      {txHashResult && (
        <Box mt="8">
          <Text>Your transaction: </Text>
          <Link
            href={`${explorerAddress}/transactions/${txHashResult}`}
            target="_blank"
            fontWeight="bold"
          >
            {txHashResult}
          </Link>
        </Box>
      )}
      {txPending && (
        <Flex
          align="center"
          justify="center"
          position="absolute"
          inset="0"
          background="rgba(0, 0, 0, 20%)"
        >
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};
