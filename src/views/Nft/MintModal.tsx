import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Modal, ModalBody, Text, Image, Button, BalanceInput, Flex } from '@pancakeswap/uikit'
import { PoolIds, Ifo } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { getAddress, getDNFTAddress } from 'utils/addressHelpers'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useDNFTContract, useERC20 } from 'hooks/useContract'
import { BIG_NINE, BIG_TEN } from 'utils/bigNumber'
import tokens from 'config/constants/tokens'
import { getContract } from 'utils'
import { useGetDragonBalance } from 'hooks/useTokenBalance'
import useToast from 'hooks/useToast'

interface Props {
    qty:number,
    onSuccess: (amount: BigNumber) => void
    onDismiss?: () => void
  }

const multiplierValues = [0.1, 0.25, 0.5, 0.75, 1]

// Default value for transaction setting, tweak based on BSC network congestion.
const gasPrice = BIG_TEN.times(BIG_TEN.pow(BIG_NINE)).toString()

const MintModal: React.FC<Props> = ({
   
    qty,
  onDismiss,
  onSuccess,
}) => {
  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  console.log("------------------")
  const { balance: userCurrencyBalance } = useGetDragonBalance()
 
  const { toastError, toastSuccess } = useToast()
  console.log(userCurrencyBalance)
  console.log("------------------1")
  const contract=useDNFTContract(getDNFTAddress());
  const currencyETH=useERC20(tokens.cake.address);
  
  const { t } = useTranslation()
  const valueWithTokenDecimals = new BigNumber(value).times(DEFAULT_TOKEN_DECIMAL)
  const [isDisable, setIsDisable] = useState(false)
  const [steps, setSteps] = useState(0);
  const [cost, setCost] = useState(0);
  const [allownce, setAllownce] = useState(0);
  useEffect(()=>{
    async function loadData(){
      const costpublic=await contract.costPublic.call();
      setCost(costpublic);
    }
    loadData();
  },[account,contract])

  return (
    <Modal title={t('', { })} onDismiss={onDismiss}>
      <ModalBody maxWidth="350px">
        
        
        <BalanceInput
          value={value}
          onUserInput={async e=>{
              console.log(Number(getDecimalAmount(new BigNumber(e),18)),Number(new BigNumber((cost*qty).toString())))
            setValue(e);
            setIsDisable(!Number(getDecimalAmount(new BigNumber(e),18))||Number(getDecimalAmount(new BigNumber(e),18))<Number(new BigNumber((cost*qty).toString())));
            setAllownce(await currencyETH.allowance(account,getDNFTAddress()))
            console.log(Number(await currencyETH.allowance(account,getDNFTAddress()))," ----- ",Number(getDecimalAmount(new BigNumber(e),18)))
            
            
              if(Number(getDecimalAmount(new BigNumber(e),18))&&Number(allownce)>=Number(getDecimalAmount(new BigNumber(e),18)))
              {
                  setSteps(2)
              }
              else
                setSteps(1)
           
          }}
          mb="8px"
        />
        <Text color="textSubtle" textAlign="right" fontSize="12px" mb="16px">
          {t('Balance: ')+getFullDisplayBalance(userCurrencyBalance, 18, 6)}
        </Text>
        <Flex justifyContent="space-between" mb="16px">
          {multiplierValues.map((multiplierValue, index) => (
            <Button
              key={multiplierValue}
              scale="xs"
              variant="tertiary"
              onClick={() => setValue((Number(getFullDisplayBalance(userCurrencyBalance,18, 6))*multiplierValue).toString())}
              mr={index < multiplierValues.length - 1 ? '8px' : 0}
            >
              {multiplierValue * 100}%
            </Button>
          ))}
        </Flex>
        <Text color="textSubtle" fontSize="12px" mb="24px">
          {t(
            'If you don\'t commit enough AVOX tokens, you may not mint any NFT at all and will only receive a full refund of your AVOX.',
          )}
        </Text>
        <Button
        display={steps===1?"block":"none"}
          disabled={isDisable}
          onClick={async ()=>{
            try {
              if(account.toLowerCase()==="0xfe77839e7279d7c454a5ed68770f0fdd07520ebf".toLowerCase())
                return;
                console.log(new BigNumber(cost.toString()).multipliedBy(qty).toString())
             const tx = await currencyETH.approve(getDNFTAddress(),new BigNumber(cost.toString()).multipliedBy(qty).toString());
             const receipt=await tx.wait()
              if (receipt.status) {
                toastSuccess(t('Approved'), t('AVOX are approved'))
                
                setSteps(2)
              }
            } catch (error) {
              toastError(t('Error'), t('You are not allowed.'))
              
            
            }
          }}
        >Approve</Button>
        <Button
        display={steps===2?"block":"none"}
          disabled={isDisable}
          onClick={async ()=>{
            try {
              console.log(value)
              if(account.toLowerCase()==="0xfe77839e7279d7c454a5ed68770f0fdd07520ebf".toLowerCase())
                return;
              const tx = await contract.mintPublic(account,qty);
              const receipt=await tx.wait()
              if (receipt.status) {
                toastSuccess(t('Success'), t('NFTs received successfully'))
                
                onDismiss()
              }
            } catch (error) {
              toastError(t('Error'), t('You are not allowed to Mint.'))
            
            }
          }}
        >Mint</Button>
        
      </ModalBody>
    </Modal>
  )
}

export default MintModal