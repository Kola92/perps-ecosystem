import { Divider, Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@synthetixio/formatters';
import { KeyColour } from '../../Dashboard';
import { BLOCKCHAIN_COLORS, TOKEN_COLORS } from './Delegation';
import { format } from 'date-fns';

interface DelegationTooltipProps {
  active?: boolean;
  payload?: any[];
  blockchains?: string[];
  label?: string;
}

export const DelegationTooltip = ({ payload, blockchains }: DelegationTooltipProps) => {
  const delegation = payload?.[0]?.payload;

  if (!delegation) {
    return null;
  }

  return (
    <Flex
      flexDirection="column"
      bg="navy.900"
      padding={4}
      minWidth="190px"
      width="fit-content"
      borderRadius="md"
      borderWidth="1px"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {delegation.labelType === 'M'
          ? delegation.label
          : format(new Date(delegation.day), 'yyyy-MM-dd')}
      </Text>
      {blockchains?.map((blockchain, index) => {
        return (
          <Flex key={index} mb={2} justifyContent="space-between" w="100%">
            <KeyColour
              label={delegation[blockchain].id}
              colour={BLOCKCHAIN_COLORS[index]}
              textTransform="capitalize"
            />
            <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
              ${formatNumber(delegation[blockchain].cumDelegationUsd)}
            </Text>
          </Flex>
        );
      })}
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(delegation.totalCumDelegationsUsd)}
        </Text>
      </Flex>
      <Divider my={2} />
      {blockchains?.map((blockchain, index) => {
        return (
          <Flex key={index} mb={2} justifyContent="space-between" w="100%">
            <KeyColour
              label={delegation[blockchain].id}
              colour={TOKEN_COLORS[index]}
              textTransform="capitalize"
            />
            <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
              {formatNumber(delegation[blockchain].dailyDelegations)}
            </Text>
          </Flex>
        );
      })}
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {formatNumber(delegation.totalDailyDelegations)}
        </Text>
      </Flex>
    </Flex>
  );
};
