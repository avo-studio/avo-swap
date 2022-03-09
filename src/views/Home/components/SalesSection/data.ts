import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Stablecoin Safehaven',
  bodyText: 'AVO STUDIO is pegged to Binance USD Stablecoin which helps protect liquidity providers from impermanent loss',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  
  images: {
    path: '/images/home/',
    attributes: [
      { src: '/images/home/YuklaBUSD.png', alt: 'BTC token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'High-Yield Passive Income',
  bodyText: 'AVO STUDIO incentivizes liquidity providers with high yield farms and pools as a reward for securing the AVO STUDIO protocol',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },

  images: {
    path: '/images/home/',
    attributes: [
      { src: '/images/home/YuklaUSDT.png', alt: 'Stocks chart' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'Community Voting',
  bodyText:
    'AVO STUDIO is governed by its community members who can create & vote on important token proposals',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x6961f579C27CBEd392FCbaA076d84350C1B9660D',
    text: 'Buy AVOX',
    external: false,
  },

  images: {
    path: '/images/home/',
    attributes: [
      { src: '/images/home/YuklaBNB.png', alt: 'AVOX token' }
    ],
  },
}
