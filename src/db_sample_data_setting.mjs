import { connection } from "../db_connection.js";

// 쿼리 실행
// var query = "SHOW DATABASES";
// var query = "SHOW TABLES";

// connection.query(query, (err, results, fields) => {
//   if (err) {
//     console.error("쿼리 실행에 실패했습니다:", err);
//     return;
//   }

//   console.log("쿼리 결과:", results);
// });

// 테이블 삭제
// var query = "DROP TABLE `user`, `daily_count`, `config`, `auth_tokens`";

// ####################################################################################
// ######## 샘플 데이터 생성 ##############################################################
// ####################################################################################

// 유저 정보 테이블
// var query = `
//   CREATE TABLE user (
//     user_id CHAR(8) PRIMARY KEY,
//     wallet_address CHAR(42) NOT NULL UNIQUE,
//     profile_image VARCHAR(100),
//     nickname VARCHAR(20) NOT NULL,
//     referral_user_id CHAR(8),
//     total_count INT DEFAULT 0,
//     total_point INT DEFAULT 0,
//     nft_count INT DEFAULT 0,
//     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (referral_user_id) REFERENCES user(user_id) ON DELETE SET NULL
//   );
// `;

// var query = `
//   INSERT INTO user (user_id, wallet_address, nickname) VALUES
//   ("00000000", "0x0000000000000000000000000000000000000000", "admin"),
//   ("00000001", "0x0000000000000000000000000000000000000001", "an"),
//   ("00000002", "0x0000000000000000000000000000000000000002", "seong"),
//   ("00000003", "0x0000000000000000000000000000000000000003", "min"),
//   ("00000004", "0x0000000000000000000000000000000000000004", "gyu"),
//   ("00000005", "0x0000000000000000000000000000000000000005", "seon");
// `;
// // var query = `SELECT * FROM user`;

// connection.query(query, (err, results, fields) => {
//   if (err) {
//     console.error("쿼리 실행에 실패했습니다:", err);
//     return;
//   }

//   console.log("쿼리 결과:", results);
// });

// config 테이블
// var query = `
//   CREATE TABLE config (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     spin_point_per_count INT NOT NULL,
//     slide_point_per_count INT NOT NULL,
//     referral_benefit DECIMAL(2,2),
//     nft_benefit INT,
//     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// 테스트 데이터 추가
var query = `
  INSERT INTO config (spin_point_per_count, slide_point_per_count, referral_benefit, nft_benefit) VALUES
  (100, 10, 0.01, 1);
`;
// var query = `SELECT * FROM config`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 자이로볼 카운트 정보 테이블
// var query = `
//   CREATE TABLE daily_spin (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id CHAR(8) NOT NULL,
//     date DATE NOT NULL,
//     spin_count INT DEFAULT 0,
//     spin_point INT DEFAULT 0,
//     FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
//     UNIQUE (user_id, date)
//   );
// `;

// var query = `
//   CREATE TABLE daily_count (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id CHAR(8) NOT NULL,
//     date DATE NOT NULL,
//     spin_count INT DEFAULT 0,
//     slide_count INT DEFAULT 0,
//     nft_point INT DEFAULT 0,
//     referral_point INT DEFAULT 0,
//     FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
//     UNIQUE (user_id, date)
//   );
// `;

// // 테스트 데이터 추가
// // var query = `
// //   INSERT INTO daily_spin (user_id, date, spin_count, spin_point) VALUES
// //   ("00000000", CURDATE(), 10, 10 * (SELECT spin_point_per_count FROM config ORDER BY id DESC LIMIT 1));
// // `
// // var query = `SELECT * FROM daily_spin`

// connection.query(query, (err, results, fields) => {
//   if (err) {
//     console.error("쿼리 실행에 실패했습니다:", err);
//     return;
//   }

//   console.log("쿼리 결과:", results);
// });

// // 슬라이드 카운트 정보 테이블
// // var query = `
// //   CREATE TABLE daily_slide (
// //     id INT AUTO_INCREMENT PRIMARY KEY,
// //     user_id CHAR(8) NOT NULL,
// //     date DATE NOT NULL,
// //     slide_count INT DEFAULT 0,
// //     slide_point INT DEFAULT 0,
// //     FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
// //     UNIQUE (user_id, date)
// //   );
// // `;

// // 테스트 데이터 추가
// // var query = `
// //   INSERT INTO daily_slide (user_id, date, slide_count, slide_point) VALUES
// //   ("00000000", CURDATE(), 5, 5 * (SELECT slide_point_per_count FROM config ORDER BY id DESC LIMIT 1));
// // `;
// // var query = `SELECT * FROM daily_slide`;

// // connection.query(query, (err, results, fields) => {
// //   if (err) {
// //     console.error("쿼리 실행에 실패했습니다:", err);
// //     return;
// //   }

// //   console.log("쿼리 결과:", results);
// // });

// // 사용자 인증 테이블
// var query = `
//   CREATE TABLE auth_tokens (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id CHAR(8) NOT NULL,
//     token CHAR(64) NOT NULL,
//     created_at DATE NOT NULL,
//     expires_at DATE NOT NULL,
//     FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
//     UNIQUE (token)
//   );
// `;
// connection.query(query, (err, results, fields) => {
//   if (err) {
//     console.error("쿼리 실행에 실패했습니다:", err);
//     return;
//   }

//   console.log("쿼리 결과:", results);
// });

// // db 연결 종료
connection.end();
