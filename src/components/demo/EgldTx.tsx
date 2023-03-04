import { Link, Text, Box, Spinner, Flex } from "@chakra-ui/react";
import { TransactionPayload, TokenPayment } from "@multiversx/sdk-core";
import { useTransaction, useConfig } from "@useelven/core";
import { useCallback } from "react";
import { ActionButton } from "../tools/ActionButton";

const egldTransferAddress = import.meta.env.VITE_EGLD_TRANSFER_ADDRESS || "";
const egldTransferAmount = import.meta.env.VITE_EGLD_TRANSFER_AMOUNT || "";

export const EGLDTx = () => {
  const { pending, triggerTx, txResult } = useTransaction();
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = useCallback(() => {
    const demoMessage = "Transaction demo!";
    triggerTx({
      address: egldTransferAddress,
      gasLimit: 50000 + 1500 * demoMessage.length,
      data: new TransactionPayload(demoMessage),
      value: TokenPayment.egldFromAmount(egldTransferAmount),
    });
  }, [triggerTx]);

  return (
    <Box position="relative" p="16" textAlign="center">
      <Text mb={4}>
        1. You will be sending 0.001 EGLD to the address: <br />
        <Link
          href={`${explorerAddress}/accounts/${egldTransferAddress}`}
          fontWeight="bold"
        >
          {egldTransferAddress}
        </Link>{" "}
        <br />
        ({chainType})
      </Text>
      <ActionButton disabled={pending} onClick={handleSendTx}>
        <Text>Send Transaction</Text>
      </ActionButton>
      {txResult?.hash && (
        <Box mt="8">
          <Text>Your transaction: </Text>
          <Link
            href={`${explorerAddress}/transactions/${txResult?.hash}`}
            fontWeight="bold"
          >
            {txResult?.hash}
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
