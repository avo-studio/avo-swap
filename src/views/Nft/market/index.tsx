import { Button, Card, Flex, Heading, Text, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'

import BigNumber from 'bignumber.js'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'contexts/Localization'
import { useDNFTContract, useERC20, useNftMarketContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { startsWith } from 'lodash'
import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {  getDNFTAddress, getNftMarketAddress } from 'utils/addressHelpers'
import { getDNFTContract, getNftMarketContract } from 'utils/contractHelpers'
import { getBalanceAmount, getBalanceNumber, getDecimalAmount } from 'utils/formatBalance'

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
  const { toastError, toastSuccess } = useToast()
  const [mystate, setMystate] = useState<any>()
  const hist=useHistory();
  
  const wmarketcontract=useNftMarketContract(getNftMarketAddress());

  

  useEffect(()=>{
    
      

    async function loadData(){
      const contract = getDNFTContract(getDNFTAddress());
    
      const gmarketcontract = getNftMarketContract(getNftMarketAddress());
      if(account&&account.startsWith("0x")&&gmarketcontract)
      {
        const res=await gmarketcontract.getList()
        const alldata=[];
        for(let i=0;i<res.length;i++)
        {
            const uri=await contract.tokenURI(res[i].tokenId);
            try{
              const resp= await axios.get(uri,{
                headers: {
                    'content-type': 'application/json'
                }
            });
            alldata.push(<StyledCard key={i} isActive={!false}>
              <FarmCardInnerContainer>
              <Flex justifyContent="space-between">
                  <Text>NFT Id:</Text>
                  <Text bold>{Number(res[i].tokenId)}</Text>
                </Flex>
                <br/>
                <Flex justifyContent="space-between">
                  <Text>NFT Type:</Text>
                  <Text bold>{resp.data.name}</Text>
                </Flex>
                <br/>
                <Flex justifyContent="space-between">
                  <Text>Desc:</Text>
                  <Text bold>{resp.data.description}</Text>
                </Flex>
                <br/>
                <video style={{margin:"auto"}} width="300" controls autoPlay={!false}>
            <source src={resp.data.image} type="video/mp4"/>
        </video>
        <br/>
                <Flex justifyContent="space-between">
                  <Text>Selling Price</Text>
                  <Text>{Number(res[i].price)/1000000000000000000} AVOX</Text>
                </Flex>
                <br/>
                <Flex justifyContent="center">
                <Button onClick={async ()=>{
                  hist.push('/buyNFT?tid='.concat(Number(res[i].tokenId).toString()))
                  // // await currency.approve(getNftMarketAddress(),res[i].price)
                  // await wmarketcontract.sell(res[i].tokenId)
                }}>Buy</Button> 
                </Flex>
                
              </FarmCardInnerContainer>
        
              
            </StyledCard>);
          }
          catch(e){
            const resp={nam:"N/A",desc:"N/A",img:"N/A"};
            alldata.push(<StyledCard key={i} isActive={!false}>
              <FarmCardInnerContainer>
                
              <Flex justifyContent="space-between">
                  <Text>NFT Id:</Text>
                  <Text bold>{Number(res[i].tokenId)}</Text>
                </Flex>
                <br/>
                <Flex justifyContent="space-between">
                  <Text>NFT Type:</Text>
                  <Text bold>{resp.nam}</Text>
                </Flex>
                <br/>
                <Flex justifyContent="space-between">
                  <Text>Desc:</Text>
                  <Text bold>{resp.desc}</Text>
                </Flex>
                <br/>
                <video style={{margin:"auto"}} width="300" controls autoPlay={!false}>
            <source src="/logo.mp4" type="video/mp4"/>
        </video>
        <br/>
                <Flex justifyContent="space-between">
                  <Text>Selling Price</Text>
                  <Text>{Number(res[i].price)/1000000000000000000} AVOX</Text>
                </Flex>
                <br/>
                <Flex justifyContent="center">
                <Button onClick={async ()=>{
                  hist.push('/buyNFT?tid='.concat(Number(res[i].tokenId).toString()))
                  // // await currency.approve(getNftMarketAddress(),res[i].price)
                  // await wmarketcontract.sell(res[i].tokenId)
                }}>Buy</Button> 
                </Flex>
              </FarmCardInnerContainer>
            </StyledCard>);
          }
            
            
        }
         setMystate(alldata);
      }
    }
    loadData();
  },[account,t,toastSuccess,hist,wmarketcontract])

 

  

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('Market')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('Buy your NFTs')}
        </Heading>
        
      </PageHeader>
      <Page style={{textAlign:"center",display:"flex",flexWrap:"wrap"}}>
      
        {mystate}
        
      </Page>
    </>
  )
}

export default ViewNFTs
