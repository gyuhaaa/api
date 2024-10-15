// (terminal) npm i web3
// 현용님 infura key : 2a34b908696f4275b84ae15338cc6b8a
var { Web3 } = require("web3");
var web3 = new Web3(
  "wss://sepolia.infura.io/ws/v3/2a34b908696f4275b84ae15338cc6b8a"
);

// flexir 컨트랙트 세팅
var c_addr = "0x48EfDb7b1995432fb733FadE4Aa4b7CB03e6cF03";
var c_abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "cancelOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "createPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "originalOrderId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "reofferStatus",
        type: "uint8",
      },
    ],
    name: "createResaleOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "fillOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum PointMarket.OfferType",
        name: "offerType",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "exchangeToken",
        type: "address",
      },
    ],
    name: "newOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundFee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "doer",
        type: "address",
      },
    ],
    name: "CancelOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "doer",
        type: "address",
      },
    ],
    name: "CancelOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256",
      },
    ],
    name: "CloseOffer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resaleOfferId",
        type: "uint256",
      },
    ],
    name: "fillResaleOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "forceCancelOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PointMarket.OfferType",
        name: "offerType",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "exchangeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "fullMatch",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "address",
        name: "doer",
        type: "address",
      },
    ],
    name: "NewOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "NewOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "originalOrderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "reofferStatus",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "NewResaleOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "settleDuration",
        type: "uint256",
      },
    ],
    name: "NewToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "resaleOfferId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "ResaleOfferFilled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "isAccepted",
        type: "bool",
      },
    ],
    name: "setAcceptedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "doer",
        type: "address",
      },
    ],
    name: "Settle2Steps",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "settleCancelled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "doer",
        type: "address",
      },
    ],
    name: "SettleCancelled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "settleFilled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "doer",
        type: "address",
      },
    ],
    name: "SettleFilled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "tokenForceCancelSettlePhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "TokenForceCancelSettlePhase",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "tokenToggleActivation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint152",
        name: "settleRate",
        type: "uint152",
      },
    ],
    name: "tokenToSettlePhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "settleRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "settleTime",
        type: "uint256",
      },
    ],
    name: "TokenToSettlePhase",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAccepted",
        type: "bool",
      },
    ],
    name: "UpdateAcceptedTokens",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeWallet_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "feeSettle_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feeRefund_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pledgeRate_",
        type: "uint256",
      },
    ],
    name: "updateConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldFeeWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldFeeSettle",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldFeeRefund",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldPledgeRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newFeeWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newFeeSettle",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newFeeRefund",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPledgeRate",
        type: "uint256",
      },
    ],
    name: "UpdateConfig",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "oldValue",
        type: "uint48",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "newValue",
        type: "uint48",
      },
    ],
    name: "UpdateTokenSettleDuration",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum PointMarket.TokenStatus",
        name: "oldValue",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum PointMarket.TokenStatus",
        name: "newValue",
        type: "uint8",
      },
    ],
    name: "UpdateTokenStatus",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "uint48",
        name: "newValue",
        type: "uint48",
      },
    ],
    name: "updateSettleDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "withdrawStuckToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "getOffer",
    outputs: [
      {
        components: [
          {
            internalType: "enum PointMarket.OfferType",
            name: "offerType",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "tokenId",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "exchangeToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "filledAmount",
            type: "uint256",
          },
          {
            internalType: "enum PointMarket.OfferStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "offeredBy",
            type: "address",
          },
          {
            internalType: "bool",
            name: "fullMatch",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "originalOrderId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "reofferStatus",
            type: "uint8",
          },
        ],
        internalType: "struct PointMarket.Offer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "enum PointMarket.OrderStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct PointMarket.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "getToken",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAddr",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "settleTime",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "settleDuration",
            type: "uint48",
          },
          {
            internalType: "uint152",
            name: "settleRate",
            type: "uint152",
          },
          {
            internalType: "enum PointMarket.TokenStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct PointMarket.Token",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "offerAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "offerOfferedBy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "offerOriginalOrderId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "offerStatus",
    outputs: [
      {
        internalType: "enum PointMarket.OfferStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "offertype",
    outputs: [
      {
        internalType: "enum PointMarket.OfferType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oneDay",
    outputs: [
      {
        internalType: "uint48",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "orderBuyer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "orderSeller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "orderStatus",
    outputs: [
      {
        internalType: "enum PointMarket.OrderStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
var contract = new web3.eth.Contract(c_abi, c_addr);

// 이벤트 구독
contract.events.NewToken().on("data", function (event) {
  console.log("NewToken event: ", event);
});
contract.events.NewCommon().on("data", function (event) {
  console.log("NewCommon event: ", event);
});
contract.events.NewOrder().on("data", function (event) {
  console.log("NewOrder event: ", event);
});
contract.events.NewOffer().on("data", function (event) {
  console.log("NewOffer event: ", event);
  console.log("returnValues: ", event.returnValues);
  console.log("id: ", event.returnValues.id);
  console.log("offerType: ", event.returnValues.offerType);
  console.log("tokenId: ", event.returnValues.tokenId);
  console.log("exchangeToken: ", event.returnValues.exchangeToken);
  console.log("tokenId: ", event.returnValues.tokenId);
  console.log("amount: ", event.returnValues.amount);
  console.log("value: ", event.returnValues.value);
  console.log("collateral: ", event.returnValues.collateral);
  console.log("fullMatch: ", event.returnValues.fullMatch);
  console.log("doer: ", event.returnValues.doer);
});
contract.events.FillPartialOffer().on("data", function (event) {
  console.log("FillPartialOffer event: ", event);
});
contract.events.FillOffer().on("data", function (event) {
  console.log("FillOffer event: ", event);
});
contract.events.FillResaleOffer().on("data", function (event) {
  console.log("FillResaleOffer event: ", event);
});
contract.events.SettleFilled().on("data", function (event) {
  console.log("SettleFilled event: ", event);
});
contract.events.SettleCancelled().on("data", function (event) {
  console.log("SettleCancelled event: ", event);
});
contract.events.CancelOrder().on("data", function (event) {
  console.log("CancelOrder event: ", event);
});
// contract.events.CancelOffer().on("data", function (event) {
//   console.log("CancelOffer event: ", event);
// });
// contract.events.UpdateAcceptedTokens().on("data", function (event) {
//   console.log("UpdateAcceptedTokens event: ", event);
// });
contract.events.CloseOffer().on("data", function (event) {
  console.log("CloseOffer event: ", event);
});
contract.events.UpdateConfig().on("data", function (event) {
  console.log("UpdateConfig event: ", event);
});
contract.events.TokenToSettlePhase().on("data", function (event) {
  console.log("TokenToSettlePhase event: ", event);
});
contract.events.UpdateTokenStatus().on("data", function (event) {
  console.log("UpdateTokenStatus event: ", event);
});
contract.events.TokenForceCancelSettlePhase().on("data", function (event) {
  console.log("TokenForceCancelSettlePhase event: ", event);
});
// contract.events.Settle2Steps().on("data", function (event) {
//   console.log("Settle2Steps event: ", event);
// });
contract.events.UpdateTokenSettleDuration().on("data", function (event) {
  console.log("UpdateTokenSettleDuration event: ", event);
});

// 이벤트 구독 해지
await contract.events.NewToken().unsubscribe();
await contract.events.NewCommon().unsubscribe();
await contract.events.NewOrder().unsubscribe();
await contract.events.NewOffer().unsubscribe();
await contract.events.FillPartialOffer().unsubscribe();
await contract.events.FillOffer().unsubscribe();
await contract.events.FillResaleOffer().unsubscribe();
await contract.events.SettleFilled().unsubscribe();
await contract.events.SettleCancelled().unsubscribe();
await contract.events.CancelOrder().unsubscribe();
// await contract.events.CancelOffer().unsubscribe();
// await contract.events.UpdateAcceptedTokens().unsubscribe();
await contract.events.CloseOffer().unsubscribe();
await contract.events.UpdateConfig().unsubscribe();
await contract.events.TokenToSettlePhase().unsubscribe();
await contract.events.UpdateTokenStatus().unsubscribe();
await contract.events.TokenForceCancelSettlePhase().unsubscribe();
// await contract.events.Settle2Steps().unsubscribe();
await contract.events.UpdateTokenSettleDuration().unsubscribe();

// flexir와 무관한 내용 / just reference
async function getPrice() {
  var usdtBalance = Number(await usdt_c.methods.balanceOf(weth_usdt).call());
  var wethBalance = Number(await weth_c.methods.balanceOf(weth_usdt).call());
  var usdtDecimals = Number(await usdt_c.methods.decimals().call());
  var wethDecimals = Number(await weth_c.methods.decimals().call());
  var decimalDifference = Math.abs(usdtDecimals - wethDecimals);
  var price = (usdtBalance / wethBalance) * 10 ** decimalDifference;
  return price;
}

async function main() {
  const subscription = await web3.eth.subscribe("newHeads");

  subscription.on("data", async () => {
    const price = await getPrice();
    console.log("Price:", price);
  });
}

main().catch(console.error);
