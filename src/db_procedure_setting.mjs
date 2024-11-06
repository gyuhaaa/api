import { connection } from "../db_connection.js";

// 쿼리 실행
// var query = "SHOW DATABASES";
// var query = "SHOW PROCEDURE STATUS WHERE Db = 'wrecking_ball'";

// connection.query(query, (err, results, fields) => {
//   if (err) {
//     console.error("쿼리 실행에 실패했습니다:", err);
//     return;
//   }

//   console.log("쿼리 결과:", results);
// });

// 프로시저 삭제
// var query = "DROP PROCEDURE `get_today_count`";
// var query = "DROP PROCEDURE `get_total_point`";
// var query = "DROP PROCEDURE `daily_slide`";

// var query = "DROP PROCEDURE `get_today_count`, `get_total_point`, `daily_slide`, `config`";

// ####################################################################################
// ######## 프로시저 생성 ################################################################
// ####################################################################################

// 조회(SELECT) ########################################################################
// 1. 메인 페이지 - 사용자 모달 : 사용자 정보

// input: wallet_address => user_id로 수정
var query = "DROP PROCEDURE IF EXISTS get_user;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_user (
    IN input_user_id CHAR(8)
  )
  BEGIN
      SELECT user_id, wallet_address, profile_image, nickname, referral_user_id
      FROM user
      WHERE user_id = input_user_id
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 2. 메인 페이지 : 사용자 일일 카운트
var query = "DROP PROCEDURE IF EXISTS get_today_count;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_today_count(
    IN input_user_id CHAR(8)
  )
  BEGIN
    DECLARE today DATE;
    SET today = CURDATE();
    
    SELECT 
        COALESCE(dc.spin_count, 0) AS spin_count,
        COALESCE(dc.slide_count, 0) AS slide_count
    FROM 
        (SELECT input_user_id AS user_id) AS u
    LEFT JOIN 
        daily_count dc ON dc.user_id = u.user_id AND dc.date = today
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 프로시저 호출 테스트
// var query = "CALL get_today_count (?);"
// connection.query(query, ["00000000"], (err, results) => {
//   if (err) {
//     console.error("프로시저 호출 실패:", err);
//     return;
//   }

//   const [rows] = results;
//   if (rows.length > 0) {
//     const { spin_count, slide_count } = rows[0];
//     console.log("spin_count:", spin_count, "slide_count:", slide_count);
//   } else {
//     console.log("해당 유저의 데이터가 없습니다.");
//   }
// });

// 3. 메인 페이지 : 일일 최대 카운트
var query = "DROP PROCEDURE IF EXISTS get_today_max_count;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_today_max_count ()
  BEGIN
    SELECT (SELECT spin_count FROM daily_count WHERE date = CURDATE() ORDER BY spin_count DESC LIMIT 1) AS spin_max_count, 
      (SELECT slide_count FROM daily_count WHERE date = CURDATE() ORDER BY slide_count DESC LIMIT 1) AS slide_max_count
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 4. 메인 페이지 - 바텀 시트 : 사용자 총 포인트
var query = "DROP PROCEDURE IF EXISTS get_total_point;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_total_point (
    IN input_user_id CHAR(8)
  )
  BEGIN
    SELECT total_count, total_point
    FROM user
    WHERE user_id = input_user_id;
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 프로시저 호출 테스트
// var query = "CALL get_total_point (?);"
// connection.query(query, ["00000000"], (err, results) => {
//   if (err) {
//     console.error("프로시저 호출 실패:", err);
//     return;
//   }

//   const [rows] = results;
//   if (rows.length > 0) {
//     const { total_spin_point, total_slide_point } = rows[0];
//     console.log("total_spin_point:", total_spin_point, "total_slide_point:", total_slide_point);
//   } else {
//     console.log("해당 유저의 데이터가 없습니다.");
//   }
// });

// 5. 메인 페이지 - 바텀 시트 : 사용자 최근 7일 total(spin + slide), nft, referral 포인트
var query = "DROP PROCEDURE IF EXISTS get_week_point;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_week_point (
    IN input_user_id CHAR(8)
  )
  BEGIN
    SELECT 
        wd.date,
        COALESCE(spin_count * (SELECT spin_point_per_count FROM config ORDER BY id DESC LIMIT 1;) + slide_count * (SELECT slide_point_per_count FROM config ORDER BY id DESC LIMIT 1;), 0) AS total_point,
        COALESCE(nft_count, 0) AS nft_count,
        COALESCE(referral_point, 0) AS referral_point
    LEFT JOIN 
        daily_count
    WHERE
        user_id = input_user_id 
        AND date >= CURDATE() - INTERVAL 6 DAY
    GROUP BY
        date
    ORDER BY 
        date;

    DROP TEMPORARY TABLE IF EXISTS week_date;
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 6. 랭킹 페이지 : 전체 회원 대상 total_point 내림차순 10명 정렬
// 몇 등까지 보여줄 건지? 사용자가 많아졌을 때 무한대로 보여줄 수는 없음.
var query = "DROP PROCEDURE IF EXISTS get_leaderboard;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_leaderboard (
    IN input_from INT,
    IN input_to INT,
  )
  BEGIN
    SELECT rank, user_id, wallet_address, profile_image, nickname, total_point
    FROM (
        SELECT 
            ROW_NUMBER() OVER (ORDER BY total_point DESC) AS rank,
            user_id,
            wallet_address,
            profile_image,
            nickname,
            total_point
        FROM 
            user
    ) AS ranked_users
    WHERE rank BETWEEN input_from AND input to
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 7. 랭킹 페이지 : 사용자 등수
var query = "DROP PROCEDURE IF EXISTS get_rank;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE get_rank (
    IN input_user_id CHAR(8)
  )

  BEGIN
    SELECT rank
    FROM (
        SELECT 
            user_id,
            total_point,
            ROW_NUMBER() OVER (ORDER BY total_point DESC) AS rank
        FROM 
            user
    ) AS ranked_users
    WHERE user_id = input_user_id;
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 토큰 유효성 검증
var query = "DROP PROCEDURE IF EXISTS verify_token;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE verify_token (
    IN input_token CHAR(64)
  )

  BEGIN
    SELECT 
      IF(
        EXISTS (
            SELECT 1
            FROM auth_tokens
            WHERE token = input_token
              AND expire_at >= CURDATE()
        ), 
        TRUE, 
        FALSE
      ) AS token_valid;
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 수정(UPDATE) ########################################################################
// 1. 메인 페이지 - 모달 : 회원 닉네임, 프로필 이미지, 추천인 코드
var query = "DROP PROCEDURE IF EXISTS set_user;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE set_user (
    IN input_user_id CHAR(8),
    IN input_profile_image VARCHAR(100),
    IN input_nickname VARCHAR(10),
    IN input_referral_user_id CHAR(8)
  )
  BEGIN
    UPDATE user 
    SET profile_image = input_profile_image,
      nickname = input_nickname,
      referral_user_id = input_referral_user_id,
    WHERE user_id = input_user_id;
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 3. auth_tokens
var query = "DROP PROCEDURE IF EXISTS set_token;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE set_token (
    IN input_token CHAR(64),
    IN input_user_id CHAR(8)
  )
  BEGIN
    UPDATE auth_tokens SET token = input_token, created_at = CURDATE(), expired_at = CURDATE() + INTERVAL 7 DAY 
    WHERE user_id = input_user_id
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 입력(INSERT) ########################################################################
// 1. user : 처음 지갑 연결 시
var query = "DROP PROCEDURE IF EXISTS insert_user;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE insert_user (
    IN input_user_id CHAR(8),
    IN input_wallet_address CHAR(42),
    IN input_nickname VARCHAR(10)
  )
  BEGIN
    INSERT INTO user (user_id, wallet_address, nickname) VALUES
    (input_user_id, input_wallet_address, input_nickname)
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 2. auth_tokens : 처음 서명 시
var query = "DROP PROCEDURE IF EXISTS insert_token;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE insert_token (
    IN input_user_id CHAR(8),
    IN input_token CHAR(64),
  )
  BEGIN
    INSERT INTO auth_tokens (user_id, token, created_at, expires_at) VALUES
    (input_user_id, input_token, CURDATE(), CURDATE() + INTERVAL 7 DAY )
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 3. spin, slide 카운트
var query = "DROP PROCEDURE IF EXISTS add_count;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE add_count (
    IN input_token CHAR(64),
    IN input_spin_count INT,
    IN input_slide_count INT
  )
  BEGIN
    INSERT INTO daily_count (user_id, date, spin_count, slide_count)
    VALUES ((SELECT user_id FROM auth_tokens WHERE token = input_token), CURDATE(), input_spin_count, input_slide_count)
    ON DUPLICATE KEY UPDATE 
        spin_count = input_spin_count,
        slide_count = input_slide_count;
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 이벤트 스케줄러 ########################################################################
// 이벤트 스케줄러 실행되는 동안에는 유저들이 실행 못하게 하는 게 좋지 않을까? 00:00 ~ 00:10 까지는 점검으로 카운팅 안 되게 하는 건 어떨까요??

// 이벤트 스케줄러 활성화
var query = `SET GLOBAL event_scheduler = ON;`;
// 매일 0시
// daily_spin, daily_slide 데이터를 user 테이블에 업데이트
// daily_spin, daily_slide 테이블에 관리자 데이터 insert (특정 일자에 아무 데이터도 없는 것을 방지하기 위해)
var query = `
  CREATE EVENT IF NOT EXISTS update_total_count
  ON SCHEDULE EVERY 1 DAY
  STARTS '2024-11-02 00:00:00'
  DO
  BEGIN
    UPDATE user u
    JOIN daily_spin sp ON u.user_id = sp.user_id
    JOIN (SELECT spin_point_per_count FROM config ORDER BY id DESC LIMIT 1) c
    SET 
        u.total_spin_count = u.total_spin_count + sp.spin_count,
        u.total_spin_point = (u.total_spin_count + sp.spin_count) * c.spin_point_per_count
    WHERE sp.date = CURDATE();

    UPDATE user u
    JOIN daily_slide sl ON u.user_id = sl.user_id
    JOIN (SELECT slide_point_per_count FROM config ORDER BY id DESC LIMIT 1) c
    SET 
        u.total_slide_count = u.total_slide_count + sl.slide_count,
        u.total_slide_point = (u.total_slide_count + sl.slide_count) * c.slide_point_per_count
    WHERE sl.date = CURDATE();

    INSERT INTO daily_spin (user_id, date)
    VALUES ('00000000', CURDATE())
    ON DUPLICATE KEY UPDATE date = CURDATE();
  END;
`;

// db 연결 종료
connection.end();
