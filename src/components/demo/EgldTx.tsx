import { Link, Text, Box, Spinner, Flex } from "@chakra-ui/react";
import { TransactionPayload, TokenTransfer } from "@multiversx/sdk-core";
import {
  useTransaction,
  useConfig,
  useLoginInfo,
  LoginMethodsEnum,
  useAccount,
  WebWalletUrlParamsEnum,
} from "@useelven/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActionButton } from "../tools/ActionButton";

const egldTransferAddress = import.meta.env.VITE_EGLD_TRANSFER_ADDRESS || "";
const egldTransferAmount = import.meta.env.VITE_EGLD_TRANSFER_AMOUNT || "";

export const EGLDTx = () => {
  const { pending, triggerTx, txResult } = useTransaction({
    webWalletRedirectUrl: "/?txid=tx1",
  });
  const { loginMethod } = useLoginInfo();
  const { explorerAddress, chainType } = useConfig();
  const { activeGuardianAddress } = useAccount();

  const handleSendTx = useCallback(() => {
    const demoMessage = "Transaction demo!";
    let gasLimit = 50000 + 1500 * demoMessage.length;
    if (activeGuardianAddress) {
      gasLimit = gasLimit + 50000;
    }
    triggerTx({
      address: egldTransferAddress,
      gasLimit,
      data: new TransactionPayload(demoMessage),
      value: TokenTransfer.egldFromAmount(egldTransferAmount),
    });
  }, [triggerTx]);

  // Temporary solution for multiple tx signing with web wallet using custom tx1 url param
  // Handling such cases will be improved in useElven
  const triggeredTx = () => {
    const windowLocationSearch = window.location.search;
    const urlParams = new URLSearchParams(windowLocationSearch);
    const isTxid = urlParams?.has("txid");
    const txid = urlParams?.get("txid");

    const isWebWalletGuardianSign = urlParams?.has(
      WebWalletUrlParamsEnum.hasWebWalletGuardianSign
    );

    if (isWebWalletGuardianSign || loginMethod === LoginMethodsEnum.wallet) {
      return isTxid && txid === "tx1";
    }

    return true;
  };

  const ownsTx = useRef(triggeredTx());
  const txPending = ownsTx.current && pending;
  const txHashResult = ownsTx.current && txResult?.hash;

  return (
    <Box position="relative" pt={16} pb={4} textAlign="center">
      <Text mb={4}>
        You will be sending 0.001 EGLD to the address: <br />
        <Link
          href={`${explorerAddress}/accounts/${egldTransferAddress}`}
          fontWeight="bold"
          target="_blank"
          rel="noopener noreferrer"
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
            fontWeight="bold"
            target="_blank"
            rel="noopener noreferrer"
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
