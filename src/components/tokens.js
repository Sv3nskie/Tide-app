const TOKENS = [
    {
      name: "Binance token",
      symbol: "BNB",
      decimals: 18,
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      pair:[
        {name: 'WBNB/BUSD', address: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      pair:[
        {name: 'ETH/WBNB', address: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc', swap: 'PancakeSwap'},
        {name: 'ETH/BUSD', address: '0x7213a321F1855CF1779f42c0CD85d3D95291D34C', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Ripple",
      symbol: "XRP",
      decimals: 18,
      address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
      pair:[
        {name: 'XRP/WBNB', address: '0x03F18135c44C64ebFdCBad8297fe5bDafdBbdd86', swap: 'PancakeSwap'},
        {name: 'XRP/BUSD', address: '0x8339CfC9002d1ecBB23b9DE95CF17AbF0A9c2ea8', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Cardano",
      symbol: "ADA",
      decimals: 18,
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
      pair:[
        {name: 'ADA/WBNB', address: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F', swap: 'PancakeSwap'},
        {name: 'ADA/BUSD', address: '0x1E249DF2F58cBef7EAc2b0EE35964ED8311D5623', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      decimals: 18,
      address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
      pair:[
        {name: 'DOT/WBNB', address: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF', swap: 'PancakeSwap'},
        {name: 'DOT/BUSD', address: '0x9fDaaB9312084298d210B8789629D3054230e998', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      decimals: 8,
      address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
      pair:[
        {name: 'DOGE/WBNB', address: '0xac109C8025F272414fd9e2faA805a583708A017f', swap: 'PancakeSwap'},
        {name: 'DOGE/BUSD', address: '0xE27859308ae2424506D1ac7BF5bcb92D6a73e211', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
      pair:[
        {name: 'AVAX/WBNB', address: '0x151268db1579ebC5306D4aAa5DCC627646E6986F', swap: 'PancakeSwap'},
        {name: 'AVAX/BUSD', address: '0xDbA5cb3ADbbc055253F0Bb7cd84a883a40ae4f09', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Uniswap Protocol",
      symbol: "UNI",
      decimals: 18,
      address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
      pair:[
        {name: 'UNI/WBNB', address: '0x014608E87AF97a054C9a49f81E1473076D51d9a3', swap: 'PancakeSwap'},
        {name: 'UNI/BUSD', address: '0x0E91275Aec7473105c8509BC41AE54b8FE8a7Fc3', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Shiba Inu",
      symbol: "SHIB",
      decimals: 18,
      address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
      pair:[
        {name: 'SHIB/WBNB', address: '0x6b7b3523a6660a5fcE3c28E1536CC8dd8D57f7E0', swap: 'PancakeSwap'},
        {name: 'SHIB/BUSD', address: '0xAFED47109dd84bf9067BBd592b2ebb47f82ffa54', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Ethereum Classic",
      symbol: "ETC",
      decimals: 18,
      address: "0x3d6545b08693daE087E957cb1180ee38B9e3c25E",
      pair:[
        {name: 'ETC/WBNB', address: '0x4d2d10B785BF000Dfd19e92cE2D2aE79E119b956', swap: 'PancakeSwap'},
        {name: 'ETC/BUSD', address: '0xDb8721B7a04c3E592264Bf58558526B16B15E757', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      decimals: 18,
      address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
      pair:[
        {name: 'LTC/WBNB', address: '0x71b01eBdDD797c8E9E0b003ea2f4FD207fBF46cC', swap: 'PancakeSwap'},
        {name: 'LTC/BUSD', address: '0x9B60DB1dA3BEc30ef144BA5a908147c562ff822A', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      decimals: 18,
      address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
      pair:[
        {name: 'LINK/WBNB', address: '0x00C4849E82D574B02f43c0F84b131dCC9cAbFC49', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0x9191B027C26d44b86177E64f992cf4DCd1F4E0eF', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "NEAR Protocol",
      symbol: "NEAR",
      decimals: 18,
      address: "0x1Fa4a73a3F0133f0025378af00236f3aBDEE5D63",
      pair:[
        {name: 'LINK/WBNB', address: '0x9191B027C26d44b86177E64f992cf4DCd1F4E0eF', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xFa02950196950d54a2ae3aD99472279FDe273772', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Cosmos",
      symbol: "ATOM",
      decimals: 18,
      address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
      pair:[
        {name: 'LINK/WBNB', address: '0x468b2DC8DC75990eE3E9dc0648965Ad6294E7914', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xE8e1a7A9A8Cf745cED06147925CA26Fb3941FabE', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      decimals: 18,
      address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
      pair:[
        {name: 'LINK/WBNB', address: '0x29b839540C07Cc0D4B06611859B01A762Cf94cf4', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xAfB3c543EBa8aFcb87b5d552C1142d9a18D375e7', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 18,
      address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      pair:[
        {name: 'LINK/WBNB', address: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Flow",
      symbol: "FLOW",
      decimals: 18,
      address: "0xC943c5320B9c18C153d1e2d12cC3074bebfb31A2",
      pair:[
        {name: 'LINK/WBNB', address: '0x7EF96b1477a3b196b13Ac4efF40711CFC1E070D7', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Chain",
      symbol: "XCN",
      decimals: 18,
      address: "0x7324c7C0d95CEBC73eEa7E85CbAac0dBdf88a05b",
      pair:[
        {name: 'LINK/WBNB', address: '0xF01eD80d46759c0cf6A3e9c66856017d81284962', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0x55f2698E7EeA7Fd51d82Cc0988A688c5d5558f7c', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Tezos",
      symbol: "XTZ",
      decimals: 18,
      address: "0x16939ef78684453bfDFb47825F8a5F714f12623a",
      pair:[
        {name: 'LINK/WBNB', address: '0x7f7411e820B32d799231ca502ED80Ba7dCe4B9E1', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0x7778Cea1178502b23294753Fc88257d2AA171E40', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Elrond",
      symbol: "EGLT",
      decimals: 18,
      address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
      pair:[
        {name: 'LINK/WBNB', address: '0xcD68856b6E72E99b5eEaAE7d41Bb4A3b484c700D', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0x85889A1C541EA4f026C02c7793E0B729cC71D84a', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Eos",
      symbol: "EOS",
      decimals: 18,
      address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
      pair:[
        {name: 'LINK/WBNB', address: '0xB6e34b5C65Eda51bb1BD4ea5F79d385Fb94b9504', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xFEB86A7AFA7cef7d6fa9142B1ca44d6cEeeADf6F', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Maker",
      symbol: "MKR",
      decimals: 18,
      address: "0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350",
      pair:[
        {name: 'LINK/WBNB', address: '0xd446A0fac0ABd96797EfD1B7fa2243223Ee5eDc6', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xc0BD3550260BAC12B0Bd60Ca64c729E5FCBfA325', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Zcash",
      symbol: "ZEC",
      decimals: 18,
      address: "0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb",
      pair:[
        {name: 'LINK/WBNB', address: '0xFCB75A61c89634b38983Ee366810804a4d760D0e', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "MIOTAC",
      symbol: "IOTA",
      decimals: 18,
      address: "0xd944f1D1e9d5f9Bb90b62f9D45e447D989580782",
      pair:[
        {name: 'LINK/WBNB', address: '0x31698113d3f1316261716e09db387b8636f83685', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0x8C6C26a5097fa37cF0dEF2CE3f2eA7c1328d8E3D', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
      address: "0xAD29AbB318791D579433D831ed122aFeAf29dcfe",
      pair:[
        {name: 'LINK/WBNB', address: '0xf567A65c0acBA56ddC1E0e768A8A022b142Ba3f3', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0x343c0aD4EEcF9b0fDa4Cea3d351c13D0fCa16bB1', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Zilliqa",
      symbol: "ZIL",
      decimals: 18,
      address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
      pair:[
        {name: 'LINK/WBNB', address: '0x6A97867a4b7Eb7646ffB1F359ad582e9903aa1C2', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xB76cD0dabb70Ee7397b88C7A40046f73414a4C04', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Frax Finance",
      symbol: "FXS",
      decimals: 18,
      address: "0xe48A3d7d0Bc88d552f730B62c006bC925eadB9eE",
      pair:[
        {name: 'LINK/WBNB', address: '0x14f1F1d54F06701a4BE0E2D0F7992237c3eAd1FA', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "1inch Exchange",
      symbol: "1INCH",
      decimals: 18,
      address: "0x111111111117dC0aa78b770fA6A738034120C302",
      pair:[
        {name: 'LINK/WBNB', address: '0x38B22083c11538ffD534938ed5fba408a6568552', swap: 'PancakeSwap'},
        {name: 'LINK/BUSD', address: '0xe193cC411C0f83A6322abCE2c4FD9987F9741Af8', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Gala Games",
      symbol: "GALA",
      decimals: 18,
      address: "0x7dDEE176F665cD201F93eEDE625770E2fD911990",
      pair:[
        {name: 'LINK/WBNB', address: '0x8dd5Fc7941966448961250119db45af8aaA85D3f', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Synthetix",
      symbol: "SNX",
      decimals: 18,
      address: "0x9Ac983826058b8a9C7Aa1C9171441191232E8404",
      pair:[
        {name: 'LINK/WBNB', address: '0xe04a6C46901af77c0baEBE0D9F13B5BcB8447FE6', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Compound",
      symbol: "COMP",
      decimals: 18,
      address: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
      pair:[
        {name: 'LINK/WBNB', address: '0xc89C40C5E716850a8EC6B67Ef5d6080adbB19d33', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "IoTeX Network",
      symbol: "IOTX",
      decimals: 18,
      address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
      pair:[
        {name: 'LINK/WBNB', address: '0x1C4D17440d6ae1d1BBCF6cf2DED2c36163D9B2F8', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Yearn.Finance",
      symbol: "YFI",
      decimals: 18,
      address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e",
      pair:[
        {name: 'LINK/WBNB', address: '0xCE383277847f8217392eeA98C5a8B4a7D27811b0', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Ankr",
      symbol: "ANKR",
      decimals: 18,
      address: "0xf307910A4c7bbc79691fD374889b36d8531B08e3",
      pair:[
        {name: 'LINK/WBNB', address: '0x3147F98B8f9C53Acdf8F16332eaD12B592a1a4ae', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "BabyDogeCoin",
      symbol: "BabyDoge",
      decimals: 18,
      address: "0xc748673057861a797275CD8A068AbB95A902e8de",
      pair:[
        {name: 'LINK/WBNB', address: '0xc736cA3d9b1E90Af4230BD8F9626528B3D4e0Ee0', swap: 'PancakeSwap'}
      ]
    },
    {
      name: "Coti",
      symbol: "COTI",
      decimals: 18,
      address: "0xAdBAF88B39D37Dc68775eD1541F1bf83A5A45feB",
      pair:[
        {name: 'LINK/WBNB', address: '0xa4B19fBcD1a6040AD8542dBeF5d9D5Eb3Ed7ef11', swap: 'PancakeSwap'}
      ]
    }
];

export const tokenMenu1 = [
  {
    name: "Binance token",
    symbol: "BNB",
    decimals: 18,
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    decimals: 18,
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  },
];

export const tokenMenu2 = [
  {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    pair:[
      {name: 'ETH/WBNB', address: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc', swap: 'PancakeSwap'},
      {name: 'ETH/BUSD', address: '0x7213a321F1855CF1779f42c0CD85d3D95291D34C', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Ripple",
    symbol: "XRP",
    decimals: 18,
    address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    pair:[
      {name: 'XRP/WBNB', address: '0x03F18135c44C64ebFdCBad8297fe5bDafdBbdd86', swap: 'PancakeSwap'},
      {name: 'XRP/BUSD', address: '0x8339CfC9002d1ecBB23b9DE95CF17AbF0A9c2ea8', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Cardano",
    symbol: "ADA",
    decimals: 18,
    address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    pair:[
      {name: 'ADA/WBNB', address: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F', swap: 'PancakeSwap'},
      {name: 'ADA/BUSD', address: '0x1E249DF2F58cBef7EAc2b0EE35964ED8311D5623', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    decimals: 18,
    address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    pair:[
      {name: 'DOT/WBNB', address: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF', swap: 'PancakeSwap'},
      {name: 'DOT/BUSD', address: '0x9fDaaB9312084298d210B8789629D3054230e998', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    decimals: 8,
    address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    pair:[
      {name: 'DOGE/WBNB', address: '0xac109C8025F272414fd9e2faA805a583708A017f', swap: 'PancakeSwap'},
      {name: 'DOGE/BUSD', address: '0xE27859308ae2424506D1ac7BF5bcb92D6a73e211', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
    address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
    pair:[
      {name: 'AVAX/WBNB', address: '0x151268db1579ebC5306D4aAa5DCC627646E6986F', swap: 'PancakeSwap'},
      {name: 'AVAX/BUSD', address: '0xDbA5cb3ADbbc055253F0Bb7cd84a883a40ae4f09', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Uniswap Protocol",
    symbol: "UNI",
    decimals: 18,
    address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    pair:[
      {name: 'UNI/WBNB', address: '0x014608E87AF97a054C9a49f81E1473076D51d9a3', swap: 'PancakeSwap'},
      {name: 'UNI/BUSD', address: '0x0E91275Aec7473105c8509BC41AE54b8FE8a7Fc3', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    decimals: 18,
    address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    pair:[
      {name: 'SHIB/WBNB', address: '0x6b7b3523a6660a5fcE3c28E1536CC8dd8D57f7E0', swap: 'PancakeSwap'},
      {name: 'SHIB/BUSD', address: '0xAFED47109dd84bf9067BBd592b2ebb47f82ffa54', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Ethereum Classic",
    symbol: "ETC",
    decimals: 18,
    address: "0x3d6545b08693daE087E957cb1180ee38B9e3c25E",
    pair:[
      {name: 'ETC/WBNB', address: '0x4d2d10B785BF000Dfd19e92cE2D2aE79E119b956', swap: 'PancakeSwap'},
      {name: 'ETC/BUSD', address: '0xDb8721B7a04c3E592264Bf58558526B16B15E757', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    decimals: 18,
    address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
    pair:[
      {name: 'LTC/WBNB', address: '0x71b01eBdDD797c8E9E0b003ea2f4FD207fBF46cC', swap: 'PancakeSwap'},
      {name: 'LTC/BUSD', address: '0x9B60DB1dA3BEc30ef144BA5a908147c562ff822A', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    decimals: 18,
    address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    pair:[
      {name: 'LINK/WBNB', address: '0x00C4849E82D574B02f43c0F84b131dCC9cAbFC49', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0x9191B027C26d44b86177E64f992cf4DCd1F4E0eF', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "NEAR Protocol",
    symbol: "NEAR",
    decimals: 18,
    address: "0x1Fa4a73a3F0133f0025378af00236f3aBDEE5D63",
    pair:[
      {name: 'LINK/WBNB', address: '0x9191B027C26d44b86177E64f992cf4DCd1F4E0eF', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xFa02950196950d54a2ae3aD99472279FDe273772', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    decimals: 18,
    address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
    pair:[
      {name: 'LINK/WBNB', address: '0x468b2DC8DC75990eE3E9dc0648965Ad6294E7914', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xE8e1a7A9A8Cf745cED06147925CA26Fb3941FabE', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Bitcoin Cash",
    symbol: "BCH",
    decimals: 18,
    address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
    pair:[
      {name: 'LINK/WBNB', address: '0x29b839540C07Cc0D4B06611859B01A762Cf94cf4', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xAfB3c543EBa8aFcb87b5d552C1142d9a18D375e7', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18,
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    pair:[
      {name: 'LINK/WBNB', address: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Flow",
    symbol: "FLOW",
    decimals: 18,
    address: "0xC943c5320B9c18C153d1e2d12cC3074bebfb31A2",
    pair:[
      {name: 'LINK/WBNB', address: '0x7EF96b1477a3b196b13Ac4efF40711CFC1E070D7', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Chain",
    symbol: "XCN",
    decimals: 18,
    address: "0x7324c7C0d95CEBC73eEa7E85CbAac0dBdf88a05b",
    pair:[
      {name: 'LINK/WBNB', address: '0xF01eD80d46759c0cf6A3e9c66856017d81284962', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0x55f2698E7EeA7Fd51d82Cc0988A688c5d5558f7c', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Tezos",
    symbol: "XTZ",
    decimals: 18,
    address: "0x16939ef78684453bfDFb47825F8a5F714f12623a",
    pair:[
      {name: 'LINK/WBNB', address: '0x7f7411e820B32d799231ca502ED80Ba7dCe4B9E1', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0x7778Cea1178502b23294753Fc88257d2AA171E40', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Elrond",
    symbol: "EGLT",
    decimals: 18,
    address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
    pair:[
      {name: 'LINK/WBNB', address: '0xcD68856b6E72E99b5eEaAE7d41Bb4A3b484c700D', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0x85889A1C541EA4f026C02c7793E0B729cC71D84a', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Eos",
    symbol: "EOS",
    decimals: 18,
    address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
    pair:[
      {name: 'LINK/WBNB', address: '0xB6e34b5C65Eda51bb1BD4ea5F79d385Fb94b9504', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xFEB86A7AFA7cef7d6fa9142B1ca44d6cEeeADf6F', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Maker",
    symbol: "MKR",
    decimals: 18,
    address: "0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350",
    pair:[
      {name: 'LINK/WBNB', address: '0xd446A0fac0ABd96797EfD1B7fa2243223Ee5eDc6', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xc0BD3550260BAC12B0Bd60Ca64c729E5FCBfA325', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Zcash",
    symbol: "ZEC",
    decimals: 18,
    address: "0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb",
    pair:[
      {name: 'LINK/WBNB', address: '0xFCB75A61c89634b38983Ee366810804a4d760D0e', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "MIOTAC",
    symbol: "IOTA",
    decimals: 18,
    address: "0xd944f1D1e9d5f9Bb90b62f9D45e447D989580782",
    pair:[
      {name: 'LINK/WBNB', address: '0x31698113d3f1316261716e09db387b8636f83685', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0x8C6C26a5097fa37cF0dEF2CE3f2eA7c1328d8E3D', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Fantom",
    symbol: "FTM",
    decimals: 18,
    address: "0xAD29AbB318791D579433D831ed122aFeAf29dcfe",
    pair:[
      {name: 'LINK/WBNB', address: '0xf567A65c0acBA56ddC1E0e768A8A022b142Ba3f3', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0x343c0aD4EEcF9b0fDa4Cea3d351c13D0fCa16bB1', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Zilliqa",
    symbol: "ZIL",
    decimals: 18,
    address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
    pair:[
      {name: 'LINK/WBNB', address: '0x6A97867a4b7Eb7646ffB1F359ad582e9903aa1C2', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xB76cD0dabb70Ee7397b88C7A40046f73414a4C04', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Frax Finance",
    symbol: "FXS",
    decimals: 18,
    address: "0xe48A3d7d0Bc88d552f730B62c006bC925eadB9eE",
    pair:[
      {name: 'LINK/WBNB', address: '0x14f1F1d54F06701a4BE0E2D0F7992237c3eAd1FA', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "1inch Exchange",
    symbol: "1INCH",
    decimals: 18,
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    pair:[
      {name: 'LINK/WBNB', address: '0x38B22083c11538ffD534938ed5fba408a6568552', swap: 'PancakeSwap'},
      {name: 'LINK/BUSD', address: '0xe193cC411C0f83A6322abCE2c4FD9987F9741Af8', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Gala Games",
    symbol: "GALA",
    decimals: 18,
    address: "0x7dDEE176F665cD201F93eEDE625770E2fD911990",
    pair:[
      {name: 'LINK/WBNB', address: '0x8dd5Fc7941966448961250119db45af8aaA85D3f', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Synthetix",
    symbol: "SNX",
    decimals: 18,
    address: "0x9Ac983826058b8a9C7Aa1C9171441191232E8404",
    pair:[
      {name: 'LINK/WBNB', address: '0xe04a6C46901af77c0baEBE0D9F13B5BcB8447FE6', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
    address: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
    pair:[
      {name: 'LINK/WBNB', address: '0xc89C40C5E716850a8EC6B67Ef5d6080adbB19d33', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "IoTeX Network",
    symbol: "IOTX",
    decimals: 18,
    address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
    pair:[
      {name: 'LINK/WBNB', address: '0x1C4D17440d6ae1d1BBCF6cf2DED2c36163D9B2F8', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Yearn.Finance",
    symbol: "YFI",
    decimals: 18,
    address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e",
    pair:[
      {name: 'LINK/WBNB', address: '0xCE383277847f8217392eeA98C5a8B4a7D27811b0', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Ankr",
    symbol: "ANKR",
    decimals: 18,
    address: "0xf307910A4c7bbc79691fD374889b36d8531B08e3",
    pair:[
      {name: 'LINK/WBNB', address: '0x3147F98B8f9C53Acdf8F16332eaD12B592a1a4ae', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "BabyDogeCoin",
    symbol: "BabyDoge",
    decimals: 18,
    address: "0xc748673057861a797275CD8A068AbB95A902e8de",
    pair:[
      {name: 'LINK/WBNB', address: '0xc736cA3d9b1E90Af4230BD8F9626528B3D4e0Ee0', swap: 'PancakeSwap'}
    ]
  },
  {
    name: "Coti",
    symbol: "COTI",
    decimals: 18,
    address: "0xAdBAF88B39D37Dc68775eD1541F1bf83A5A45feB",
    pair:[
      {name: 'LINK/WBNB', address: '0xa4B19fBcD1a6040AD8542dBeF5d9D5Eb3Ed7ef11', swap: 'PancakeSwap'}
    ]
  }
];

export function tokenInfo(){
  return TOKENS;
}