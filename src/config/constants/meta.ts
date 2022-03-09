import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'AVO STUDIO',
  description:
    'The most popular AMM on BSC by user count! Earn AVOX through yield farming or win it in the Lottery, then stake it in Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by AVO STUDIO), NFTs, and more, on a platform you can trust.',
  image: 'https://swap.avostudio.io/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('AVO STUDIO')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('AVO STUDIO')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('AVO STUDIO')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('AVO STUDIO')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('AVO STUDIO')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('AVO STUDIO')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('AVO STUDIO')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('AVO STUDIO')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('AVO STUDIO')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('AVO STUDIO')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('AVO STUDIO')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('AVO STUDIO')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('AVO STUDIO')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('AVO STUDIO')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('AVO STUDIO')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('AVO STUDIO')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('AVO STUDIO')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('AVO STUDIO')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('AVO STUDIO Info & Analytics')}`,
        description: 'View statistics for AVO STUDIO exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('AVO STUDIO Info & Analytics')}`,
        description: 'View statistics for AVO STUDIO exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('AVO STUDIO Info & Analytics')}`,
        description: 'View statistics for AVO STUDIO exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('AVO STUDIO')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('AVO STUDIO')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('AVO STUDIO')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('AVO STUDIO')}`,
      }
    default:
      return null
  }
}
