import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
    ],
  },
  {
    label: t('Lottery'),
    href: '/lottery',
    icon: 'MyTicket',
    showItemsOnMobile: false,
    items: []
  },
  {
    label: t('NFT'),
    href: '/nft',
    icon: 'Nft',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Mint NFT'),
        href: '/nft',
      },
      {
        label: t('View your NFTs'),
        href: '/viewNFTs',
      },
      {
        label: t('Market'),
        href: '/nftmarket',
      },
    ]
  },

  {
    label: 'More',
    href: '#',
    icon: 'More',
    hideSubNav: false,
    items: [
      
      {
        label: t('Twitch'),
        href: 'https://www.twitch.tv/avostudio',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Facebook'),
        href: 'https://www.facebook.com/AVO-Studio-113136691278487/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      }
      ,
      {
        label: t('Medium'),
        href: 'https://avostudio-io.medium.com',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      }
    ],
  },
]

export default config
