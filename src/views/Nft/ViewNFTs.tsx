import { Button, Card, Flex, Heading, Text, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'

import BigNumber from 'bignumber.js'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'contexts/Localization'
import { useDNFTContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { getDNFTAddress } from 'utils/addressHelpers'
import { getDNFTContract } from 'utils/contractHelpers'
import MintModal from './MintModal'
import Timer from './Timer'

const StyledCard = styled(Card)`
  align-self: center;
  display:block;
  width:360px;
  margin:10px;
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`
class NFTModal{
	image="";

	description="";

	name="";

	id="";
}

const ViewNFTs: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  
  const [mystate, setMystate] = useState<any>()

  useEffect(()=>{
    async function loadData(){
      const contract = getDNFTContract(getDNFTAddress());
      if(account)
      {
        const nftsids=await contract.walletOfOwner(account);
        const len=nftsids.length;
        const alldata=[];
        for(let i=0;i<len;i++)
        {
            const uri=await contract.tokenURI(nftsids[i]);
            
            const resp= await axios.get(uri,{
                headers: {
                    'content-type': 'application/json'
                }
            });
            console.log(resp)
            alldata.push(<StyledCard key={i} isActive={!false}>
                <FarmCardInnerContainer>
                  
                <Flex justifyContent="space-between">
                    <Text>NFT Id:</Text>
                    <Text bold>{Number(nftsids[i])}</Text>
                  </Flex>
                  <br/>
                  <Flex justifyContent="space-between">
                    <Text>NFT Type:</Text>
                    <Text bold>{resp.data.name}</Text>
                  </Flex>
                  <br/>
                  <Flex justifyContent="space-between">
                    <Text>Staking Reward:</Text>
                    <Text bold>{resp.data.description}</Text>
                  </Flex>
                  <br/>
                  <video style={{margin:"auto"}} width="300" controls autoPlay={!false}>
              <source src={resp.data.image} type="video/mp4"/>
          </video>
                  <br/>
                  
                </FarmCardInnerContainer>
          
                
              </StyledCard>);
        }
         setMystate(alldata);
      }
    }
    loadData();
  },[account])

 

  

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('NFTs')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('View your NFTs')}
        </Heading>
        
      </PageHeader>
      <Page style={{textAlign:"center",display:"flex",flexWrap:"wrap"}}>
      
        {mystate}
        
      </Page>
    </>
  )
}

export default ViewNFTs
