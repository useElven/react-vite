import { Link, Text, Box, Spinner, Flex } from "@chakra-ui/react";
import { TransactionPayload, TokenTransfer } from "@multiversx/sdk-core";
import { useTransaction, useConfig } from "@useelven/core";
import { ActionButton } from "../tools/ActionButton";

const egldTransferAddress = import.meta.env.VITE_EGLD_TRANSFER_ADDRESS || "";
const egldTransferAmount = import.meta.env.VITE_EGLD_TRANSFER_AMOUNT || "";

export const EGLDTx = () => {
  const { pending, triggerTx, txResult } = useTransaction({
    id: "tx1",
  });
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = () => {
    const demoMessage =
      "Transaction demo from xDevGuild Vite + React dapp template!";

    const gasLimit = 50000 + 1500 * demoMessage.length;

    triggerTx({
      address: egldTransferAddress,
      gasLimit,
      data: new TransactionPayload(demoMessage),
      value: TokenTransfer.egldFromAmount(egldTransferAmount),
    });
  };

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
      <ActionButton disabled={pending} onClick={handleSendTx}>
        <Text>Send Transaction</Text>
      </ActionButton>
      {txResult?.hash && (
        <Box mt="8">
          <Text>Your transaction: </Text>
          <Link
            href={`${explorerAddress}/transactions/${txResult.hash}`}
            fontWeight="bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {txResult.hash}
          </Link>
        </Box>
      )}
      {pending && (
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
