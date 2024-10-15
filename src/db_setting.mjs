import { connection } from "../db_connection.js";

connection.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결에 실패했습니다:", err);
    return;
  }
  console.log("데이터베이스에 성공적으로 연결되었습니다.");
});

// 쿼리 실행
// var query = "SHOW DATABASES";
// var query = "SHOW TABLES";

// var query = "CREATE DATABASE flexir";
var query = "USE flexir";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// var query = "DROP TABLE `token`";
// var query = "DROP TABLE `offer`";
// var query = "DROP TABLE `order_common`";
// var query = "DROP TABLE `order_buy`";
// var query = "DROP TABLE `order_sell`";
// var query = "DROP TABLE `index`";
// var query = "DROP TABLE `config`";
// var query = "DROP TABLE `user`";
// var query = "DROP TABLE `email_log`";

// var query = "DROP TABLE `token`, `offer`, `order_common`, `order_buy`, `order_sell`, `index`, `config`, `user`, `email_log`";

// 토큰 정보 테이블
var query =
  "CREATE TABLE token (" +
  "token_id INT, " +
  "network VARCHAR(30), " +
  "token_name VARCHAR(100) NOT NULL, " +
  "token_addr VARCHAR(42) NOT NULL, " +
  "telegram VARCHAR(100), " +
  "X VARCHAR(100), " +
  "discord VARCHAR(100), " +
  "homepage VARCHAR(100), " +
  "settle_time DATETIME, " +
  "settle_duration INT, " +
  "settle_rate DECIMAL(65, 16), " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME, " +
  "PRIMARY KEY (token_id, network) " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query =
  "INSERT INTO token (token_name, token_addr, status) VALUES ('GRASS', '0xd66d861fb4df099652c63cf472e6b7de95725bae', 1)";
var query = "SELECT * from token";
var query = "UPDATE token SET settle_time = null WHERE token_id = 1";
var query = "SELECT * from token";

// order_common 테이블
var query =
  "CREATE TABLE order_common (" +
  "common_id INT, " +
  "network VARCHAR(30), " +
  "token_id INT NOT NULL, " +
  "collateral INT NOT NULL, " +
  "amount INT NOT NULL, " +
  "exchange_token VARCHAR(42) NOT NULL, " +
  "full_match BOOLEAN, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME, " +
  "PRIMARY KEY (common_id, network), " +
  "FOREIGN KEY (token_id, network) REFERENCES token(token_id, network) " +
  "ON UPDATE CASCADE " +
  "ON DELETE CASCADE " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// order_buy 테이블
var query =
  "CREATE TABLE `order_buy` (" +
  "order_id INT, " +
  "network VARCHAR(30), " +
  "common_id INT NOT NULL, " +
  "owner VARCHAR(42) NOT NULL, " +
  "amount INT NOT NULL, " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME, " +
  "PRIMARY KEY (order_id, network), " +
  "FOREIGN KEY (common_id, network) REFERENCES order_common(common_id, network) " +
  "ON UPDATE CASCADE " +
  "ON DELETE CASCADE " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// order_sell 테이블
var query =
  "CREATE TABLE `order_sell` (" +
  "order_id INT, " +
  "network VARCHAR(30), " +
  "common_id INT NOT NULL, " +
  "owner VARCHAR(42) NOT NULL, " +
  "amount INT NOT NULL, " +
  "status INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME, " +
  "PRIMARY KEY (order_id, network), " +
  "FOREIGN KEY (common_id, network) REFERENCES order_common(common_id, network) " +
  "ON UPDATE CASCADE " +
  "ON DELETE CASCADE " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// offer 테이블
var query =
  "CREATE TABLE offer (" +
  "offer_id INT, " +
  "network VARCHAR(30), " +
  "order_id INT, " +
  "value INT NOT NULL, " +
  "is_buy BOOLEAN NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME, " +
  "PRIMARY KEY (offer_id, network), " +
  "FOREIGN KEY (order_id, network) REFERENCES order_buy(order_id, network) " +
  "ON UPDATE CASCADE " +
  "ON DELETE CASCADE, " +
  "FOREIGN KEY (order_id, network) REFERENCES order_sell(order_id, network) " +
  "ON UPDATE CASCADE " +
  "ON DELETE CASCADE " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// index 테이블
var query =
  "CREATE TABLE `index` (" +
  "id INT AUTO_INCREMENT PRIMARY KEY, " +
  "table_name VARCHAR(100) NOT NULL, " +
  "column_name VARCHAR(100) NOT NULL, " +
  "column_value INT NOT NULL, " +
  "description VARCHAR(100) NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query =
  "INSERT INTO `index` (table_name, column_name, column_value, description) VALUES " +
  "('token', 'status', 0, 'none'), " +
  "('token', 'status', 1, 'active'), " +
  "('token', 'status', 2, 'inactive'), " +
  "('token', 'status', 3, 'settle'), " +
  "('order', 'status', 0, 'none'), " +
  "('order', 'status', 1, 'open'), " +
  "('order', 'status', 2, 'settle_filled'), " +
  "('order', 'status', 3, 'settle_canceled'), " +
  "('order', 'status', 4, 'canceled'), " +
  "('order', 'status', 5, 'insale') ";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = "SELECT * from `index`";

// config 테이블
var query =
  "CREATE TABLE `config` (" +
  "id INT AUTO_INCREMENT PRIMARY KEY, " +
  "old_fee_wallet VARCHAR(42) NOT NULL, " +
  "old_fee_settle INT NOT NULL, " +
  "old_fee_refund INT NOT NULL, " +
  "old_pledge_rate INT NOT NULL, " +
  "new_fee_wallet VARCHAR(42) NOT NULL, " +
  "new_fee_settle INT NOT NULL, " +
  "new_fee_refund INT NOT NULL, " +
  "new_pledge_rate INT NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 사용자 지갑 주소, 이메일 테이블
var query =
  "CREATE TABLE user (" +
  "user_id INT AUTO_INCREMENT PRIMARY KEY, " +
  "user_addr VARCHAR(42) NOT NULL, " +
  "email VARCHAR(200), " +
  "is_agree BOOLEAN NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "mod_date DATETIME " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 이메일 발송 내역 테이블
var query =
  "CREATE TABLE email_log (" +
  "id INT AUTO_INCREMENT PRIMARY KEY, " +
  "user_id INT NOT NULL, " +
  "title VARCHAR(8000) NOT NULL, " +
  "content VARCHAR(8000) NOT NULL, " +
  "reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
  "FOREIGN KEY (user_id) REFERENCES user(user_id) " +
  "ON UPDATE CASCADE " +
  ")";

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// db 연결 종료
connection.end();
