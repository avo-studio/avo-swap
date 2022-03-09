import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { getBscScanLink } from 'utils'
import { Flex, Link, PocketWatchIcon, Text, Skeleton } from '@pancakeswap/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { PublicIfoData } from 'views/Ifos/types'



const Timer: React.FC<any> = ({msg}) => {
  const { t } = useTranslation()
  const secondsUntilEnd=1646506800-(new Date().getTime()/1000);
  const timeUntil = getTimePeriods(secondsUntilEnd)
  console.log(timeUntil)
  return (
    <Flex justifyContent="center" m="10px">
      {msg==="false"?<>
        
        <PocketWatchIcon width="28px" mr="16px" />
        <Flex alignItems="center">
          
          <Text style={{fontSize:"24px"}}>
            Minting is Closed
          </Text>
          
        </Flex>
      </>:
      <>
        
      <PocketWatchIcon width="28px" mr="16px" />
      <Flex alignItems="center">
        
        <Text style={{fontSize:"24px"}}>
          Minting is Open
        </Text>
        
      </Flex>
    </>}
        
      
    </Flex>
  )
}

export default Timer
