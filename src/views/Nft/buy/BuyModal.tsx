import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Modal, ModalBody, Text, Image, Button, BalanceInput, Flex } from '@pancakeswap/uikit'
import { PoolIds, Ifo } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { getAddress,  getDNFTAddress, getNftMarketAddress } from 'utils/addressHelpers'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useDNFTContract, useERC20, useNftMarketContract } from 'hooks/useContract'
import { BIG_NINE, BIG_TEN } from 'utils/bigNumber'
import tokens from 'config/constants/tokens'
import { getContract } from 'utils'
import { useGetDragonBalance } from 'hooks/useTokenBalance'
import useToast from 'hooks/useToast'
import { useHistory } from 'react-router-dom'
import { getBep20Contract, getNftMarketContract } from 'utils/contractHelpers'

interface Props {
  tid:number
    onSuccess: (amount: BigNumber) => void
    onDismiss?: () => void
  }

const multiplierValues = [0.1, 0.25, 0.5, 0.75, 1]

// Default value for transaction setting, tweak based on BSC network congestion.
const gasPrice = BIG_TEN.times(BIG_TEN.pow(BIG_NINE)).toString()

const BuyModal: React.FC<Props> = ({
  tid,
  onDismiss,
  onSuccess,
}) => {
  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  const currency=useERC20(tokens.cake.address);
  const contract=useNftMarketContract(getNftMarketAddress());
  const { toastError, toastSuccess } = useToast()
  const hist=useHistory();
  const [approved, setApproved] = useState(false);
  const [sellPrice, setSellPrice] = useState('');
  
  
  console.log(tid)
  const { t } = useTranslation()
  useEffect(()=>{
    async function loaddata() {
     if(account)
      {
        const cur=getBep20Contract(tokens.cake.address);
      const allowance=await cur.allowance(account,getNftMarketAddress())
      const nftmarket=getNftMarketContract(getNftMarketAddress());
      const res=await nftmarket.NftInfos(tid)
        console.log("check1 ",Number(allowance)>=Number(res.price))
      if(new BigNumber("".concat(allowance)).gte(res.price))
        setApproved(true)
      else
        setApproved(false);
      setSellPrice(new BigNumber("".concat(res.price)).multipliedBy('10e+17').toString())
      }
      
    }
    
    loaddata();
  },[account,tid])

  return (
    <Modal title={t('', { })} onDismiss={onDismiss}>
      <ModalBody maxWidth="350px">
        
        
        
       
        
        <Text color="textSubtle" fontSize="12px" mb="24px">
          {t(
            'If you don\'t commit enough AVOX tokens, you may not buy any NFT at all and will only receive a full refund of your AVOX.',
          )}
        </Text>
        {approved?<Button
       
          onClick={async ()=>{
            try {
            const tx = await contract.sell(tid);
             const receipt=await tx.wait()
              if (receipt.status) {
                toastSuccess(t('Success'), t('NFT is sent to your wallet'))
                onDismiss();
              }
            } catch (error) {
              toastError(t('Error'), t('You are not allowed..'))
              
            
            }
          }}
        >Buy</Button>:<Button
       
        onClick={async ()=>{
          try {
            console.log(sellPrice)
          const tx = await currency.approve("0x696fbfd1aa632f7df5265f6b388f5ce6e2a633a8",sellPrice);
           const receipt=await tx.wait()
           
            if (receipt.status) {
              toastSuccess(t('Approved'), t('AVOX is approved to buy'))
              setApproved(true)
            }
          } catch (error) {
            toastError(t('Error'), t('You are not allowed.'))
            
            console.log(error)
          }
        }}
      >Approve</Button>}
        
       
        
      </ModalBody>
    </Modal>
  )
}

export default BuyModal