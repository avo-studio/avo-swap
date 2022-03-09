import { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x4F778D043032D24DB0fdB68355dD1E55d7942a3A',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  }
/*  ,
  {
    sousId: 1,
    stakingToken: serializedTokens.usdt,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xc24f88BAF62C908b0f0717928c91Ac0dc9b425A2',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: serializedTokens.pancake,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x319fb8b37847d7a209636c35354355c4b07a01a6',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 3,
    stakingToken: serializedTokens.bake,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x7fe3b70a4b54c68990e17dc33d8fbc3cc67c5a93',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 4,
    stakingToken: serializedTokens.btcb,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xd1713763903da559686aa741653c48a99ff01daa',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 5,
    stakingToken: serializedTokens.eth,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x572f41e83a09eb9bcea9f81a7b85f101e459903a',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 6,
    stakingToken: serializedTokens.dot,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xeb4102c3368a0d83247053fdf9d46b3dbad0d970',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 7,
    stakingToken: serializedTokens.link,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xc36df795475705eded29064fd4811e0a31c7fa0e',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 8,
    stakingToken: serializedTokens.wbnb,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x359d1aba332f5d89aa47ca4e1022a27dcdb9fe99',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 9,
    stakingToken: serializedTokens.ada,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xa2a931b824ccf660b1e44bc48dc5aadd667e8658',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.3',
    sortOrder: 1,
    isFinished: false,
  }
  */
]

export default pools
