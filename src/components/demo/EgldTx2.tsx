import { Link, Text, Box, Spinner, Flex } from "@chakra-ui/react";
import { TransactionPayload, TokenTransfer } from "@multiversx/sdk-core";
import { useTransaction, useConfig } from "@useelven/core";
import { ActionButton } from "../tools/ActionButton";

const egldTransferAddress = import.meta.env.VITE_EGLD_TRANSFER_ADDRESS || "";
const egldTransferAmount2 = import.meta.env.VITE_EGLD_TRANSFER_AMOUNT2 || "";

export const EGLDTx2 = () => {
  const { pending, triggerTx, txResult } = useTransaction({
    id: "tx2",
  });
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = () => {
    const demoMessage =
      "Transaction demo from useElven Vite React dapp template!";

    const gasLimit = 50000 + 1500 * demoMessage.length;

    triggerTx({
      address: egldTransferAddress,
      gasLimit,
      data: new TransactionPayload(demoMessage),
      value: TokenTransfer.egldFromAmount(egldTransferAmount2),
    });
  };

  return (
    <Box position="relative" pt={4} pb={16} textAlign="center">
      <Text mb={4}>
        You will be sending 0.002 EGLD to the address
        <br />
        (for testing transaction triggers at the same time): <br />
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
