import { connection } from "../db_connection";

connection.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결에 실패했습니다:", err);
    return;
  }
  console.log("데이터베이스에 성공적으로 연결되었습니다.");
});

// 쿼리 실행
// var query2 = "SHOW DATABASES";
// var query2 = "SHOW TABLES";

// var query2 = "CREATE DATABASE flexir";
// var query2 = "USE flexir";

// var query2 = "DROP TABLE `order_common`";

// 토큰 정보 테이블
var query2 =
  "CREATE TABLE token (" +
  "token_id INT AUTO_INCREMENT PRIMARY KEY, " +
  "token_name VARCHAR(100) NOT NULL, " +
  "token_addr VARCHAR(42) NOT NULL, " +
  "telegram VARCHAR(100), " +
  "X VARCHAR(100), " +
  "discord VARCHAR(100), " +
  "homepage VARCHAR(100), " +
  "settle_time DATETIME, " +
  "settle_duration DATETIME GENERATED ALWAYS AS (settle_time + INTERVAL 1 DAY) STORED, " +
  "settle_rate DECIMAL(65, 16), " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";
var query2 = "SELECT * from token";
var query2 =
  "INSERT INTO token (token_name, token_addr, status) VALUES ('GRASS', '0xd66d861fb4df099652c63cf472e6b7de95725bae', 1)";
var query2 = "SELECT * from token";
var query2 = "UPDATE token SET settle_time = null WHERE token_id = 1";
var query2 = "SELECT * from token";

// offer 테이블
var query2 =
  "CREATE TABLE offer (" +
  "offer_id INT PRIMARY KEY, " +
  "order_id INT, " +
  "value INT NOT NULL, " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

// order_common 테이블
var query2 =
  "CREATE TABLE order_common (" +
  "common_id INT PRIMARY KEY, " +
  "token_id INT NOT NULL, " +
  "collateral INT NOT NULL, " +
  "amount INT NOT NULL, " +
  "exchange_token VARCHAR(42) NOT NULL, " +
  "full_match BOOLEAN, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

// order 테이블
var query2 =
  "CREATE TABLE `order` (" +
  "order_id INT PRIMARY KEY, " +
  "common_id INT NOT NULL, " +
  "owner VARCHAR(42) NOT NULL, " +
  "amount INT NOT NULL, " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";
var query2 =
  "CREATE TABLE `order_buy` (" +
  "order_id INT PRIMARY KEY, " +
  "common_id INT NOT NULL, " +
  "owner VARCHAR(42) NOT NULL, " +
  "amount INT NOT NULL, " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";
var query2 =
  "CREATE TABLE `order_sell` (" +
  "order_id INT PRIMARY KEY, " +
  "common_id INT NOT NULL, " +
  "owner VARCHAR(42) NOT NULL, " +
  "amount INT NOT NULL, " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

// index 테이블
var query2 =
  "CREATE TABLE `index` (" +
  "id INT AUTO_INCREMENT PRIMARY KEY, " +
  "table_name VARCHAR(100) NOT NULL, " +
  "column_name VARCHAR(100) NOT NULL, " +
  "column_value INT NOT NULL, " +
  "description VARCHAR(100) NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";
var query2 =
  "INSERT INTO `index` (table_name, column_name, column_value, description) VALUES " +
  "('token', 'status', 1, 'active'), " +
  "('token', 'status', 2, 'inactive'), " +
  "('token', 'status', 3, 'settle'), " +
  "('order', 'status', 1, 'open'), " +
  "('order', 'status', 2, 'filled'), " +
  "('order', 'status', 3, 'canceled'), " +
  "('order', 'status', 4, 'insale'), " +
  "('offer', 'status', 0, 'none'), " +
  "('offer', 'status', 1, 'buy'), " +
  "('offer', 'status', 2, 'sell') ";
var query2 = "SELECT * from `index`";

// 사용자 지갑 주소, 이메일 테이블
var query2 =
  "CREATE TABLE user (" +
  "user_id INT AUTO_INCREMENT PRIMARY KEY, " +
  "user_addr VARCHAR(42) NOT NULL, " +
  "email VARCHAR(200), " +
  "use_yn VARCHAR(1) NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

// 이메일 발송 내역 테이블
var query2 =
  "CREATE TABLE email_log (" +
  "id INT AUTO_INCREMENT PRIMARY KEY, " +
  "user_id INT NOT NULL, " +
  "title VARCHAR(8000) NOT NULL, " +
  "content VARCHAR(8000) NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP " +
  ")";

// 쿼리 실행
connection.query(query2, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// db 연결 종료
connection.end();

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
contract.events.NewToken().on("data", function (event) {
  console.log("NewToken event: ", event);
});
contract.events.NewOrder().on("data", function (event) {
  console.log("NewOrder event: ", event);
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
contract.events.CancelOffer().on("data", function (event) {
  console.log("CancelOffer event: ", event);
});
contract.events.UpdateAcceptedTokens().on("data", function (event) {
  console.log("UpdateAcceptedTokens event: ", event);
});
contract.events.CloseOffer().on("data", function (event) {
  console.log("CloseOffer event: ", event);
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
contract.events.Settle2Steps().on("data", function (event) {
  console.log("Settle2Steps event: ", event);
});
contract.events.UpdateTokenSettleDuration().on("data", function (event) {
  console.log("UpdateTokenSettleDuration event: ", event);
});
contract.events.NewResaleOffer().on("data", function (event) {
  console.log("NewResaleOffer event: ", event);
});
contract.events.ResaleOfferFilled().on("data", function (event) {
  console.log("ResaleOfferFilled event: ", event);
});

// 이벤트 구독 해지
await contract.events.NewOffer().unsubscribe();
await contract.events.NewToken().unsubscribe();
await contract.events.NewOrder().unsubscribe();
await contract.events.SettleFilled().unsubscribe();
await contract.events.SettleCancelled().unsubscribe();
await contract.events.CancelOrder().unsubscribe();
await contract.events.CancelOffer().unsubscribe();
await contract.events.UpdateAcceptedTokens().unsubscribe();
await contract.events.CloseOffer().unsubscribe();
await contract.events.TokenToSettlePhase().unsubscribe();
await contract.events.UpdateTokenStatus().unsubscribe();
await contract.events.TokenForceCancelSettlePhase().unsubscribe();
await contract.events.Settle2Steps().unsubscribe();
await contract.events.UpdateTokenSettleDuration().unsubscribe();
await contract.events.NewResaleOffer().unsubscribe();
await contract.events.ResaleOfferFilled().unsubscribe();

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
  // Create subscription
  const subscription = await web3.eth.subscribe("newHeads");

  subscription.on("data", async () => {
    const price = await getPrice();
    console.log("Price:", price);
  });
}
main().catch(console.error);
