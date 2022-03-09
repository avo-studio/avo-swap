import React, { lazy } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useFetchCollections, useGetNFTInitializationState } from 'state/nftMarket/hooks'
import PageLoader from 'components/Loader/PageLoader'
import { NFTMarketInitializationState } from 'state/nftMarket/types'
import { nftsBaseUrl } from './constants'

const Home = lazy(() => import('./Home'))
const Collection = lazy(() => import('./Collection'))
const Collections = lazy(() => import('./Collections'))

const Market = () => {
  const { account } = useWeb3React()
  const initializationState = useGetNFTInitializationState()

  useFetchCollections()

  if (initializationState !== NFTMarketInitializationState.INITIALIZED) {
    return <PageLoader />
  }

  return (
    <>
      <Route exact path={nftsBaseUrl}>
        <Home />
      </Route>
      <Route exact path={`${nftsBaseUrl}/collections`}>
        <Collections />
      </Route>
      <Route path={`${nftsBaseUrl}/collections/:collectionAddress`}>
        <Collection />
      </Route>
    </>
  )
}

export default Market
