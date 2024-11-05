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
// 1. 메인 페이지 : 회원별 일일 카운트
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
        COALESCE(sp.spin_count, 0) AS spin_count,
        COALESCE(sl.slide_count, 0) AS slide_count
    FROM 
        (SELECT input_user_id AS user_id) AS u
    LEFT JOIN 
        daily_spin sp ON sp.user_id = u.user_id AND sp.date = today
    LEFT JOIN 
        daily_slide sl ON sl.user_id = u.user_id AND sl.date = today;
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

// 2. 메인 페이지 - 바텀 시트 : 회원 총 spin, slide 포인트
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
    SELECT total_spin_point, total_slide_point
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

// 3. 메인 페이지 - 바텀 시트 : 회원 최근 7일 spin, slide 포인트
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
    CREATE TEMPORARY TABLE IF NOT EXISTS week_date (
        date DATE PRIMARY KEY
    );

    TRUNCATE TABLE week_date;
    INSERT INTO week_date (date)
    SELECT CURDATE() - INTERVAL seq DAY
    FROM (SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 
          UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6) AS days
    ORDER BY date DESC;

    SELECT 
        wd.date,
        COALESCE(sp.spin_point, 0) AS spin_point,
        COALESCE(sl.slide_point, 0) AS slide_point
    FROM 
        week_date wd
    LEFT JOIN 
        daily_spin sp ON wd.date = sp.date AND sp.user_id = input_user_id
    LEFT JOIN 
        daily_slide sl ON wd.date = sl.date AND sl.user_id = input_user_id
    ORDER BY 
        wd.date;

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

// 4. 랭킹 페이지 : 전체 회원 대상 spin_count, slide_count 내림차순 정렬
var query = "DROP PROCEDURE IF EXISTS get_rank;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
 CREATE PROCEDURE get_rank (IN type TINYINT)
  BEGIN
    IF type = 1 THEN
      SELECT profile_image, nickname, total_spin_point
      FROM user
      ORDER BY total_spin_point DESC;
    ELSE IF type = 2 THEN
      SELECT profile_image, nickname, total_slide_point
      FROM user
      ORDER BY total_slide_point DESC;
    END IF;
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
var query = "DROP PROCEDURE IF EXISTS update_user_data;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE update_user_data (
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

// 2. spin 카운트
var query = "DROP PROCEDURE IF EXISTS update_spin_data;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE update_spin_data (
    IN input_user_id CHAR(8),
    IN input_spin_count INT
  )
  BEGIN
    UPDATE daily_spin 
    SET spin_count = spin_count + input_spin_count,
      spin_point = spin_point + (input_spin_count * (SELECT spin_point_per_count FROM config ORDER BY id DESC LIMIT 1;))
    WHERE user_id = input_user_id AND date = CURDATE();
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 3. slide 카운트
var query = "DROP PROCEDURE IF EXISTS update_slide_data;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE update_slide_data (
    IN input_user_id CHAR(8),
    IN input_slide_count INT
  )
  BEGIN
    UPDATE daily_slide 
    SET slide_count = slide_count + input_slide_count,
      slide_point = slide_point + (input_slide_count * (SELECT slide_point_per_count FROM config ORDER BY id DESC LIMIT 1;))
    WHERE user_id = input_user_id AND date = CURDATE();
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
// 1. user
var query = "DROP PROCEDURE IF EXISTS insert_user_data;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE insert_user_data (
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

// 2. spin 카운트
var query = "DROP PROCEDURE IF EXISTS insert_spin_data;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE insert_spin_data (
    IN input_user_id CHAR(8),
    IN input_spin_count INT
  )
  BEGIN
    INSERT INTO daily_spin (user_id, date, spin_count, spin_point) VALUES
    (input_user_id, CURDATE(), input_spin_count, input_spin_count * (SELECT spin_point_per_count FROM config ORDER BY id DESC LIMIT 1;))
  END;
`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

// 3. slide 카운트
var query = "DROP PROCEDURE IF EXISTS insert_slide_data;";
connection.query(query, (err, results, fields) => {
  if (err) {
    console.error("쿼리 실행에 실패했습니다:", err);
    return;
  }

  console.log("쿼리 결과:", results);
});

var query = `
  CREATE PROCEDURE insert_slide_data (
    IN input_user_id CHAR(8),
    IN input_slide_count INT
  )
  BEGIN
    INSERT INTO daily_slide (user_id, date, spin_count, spin_point) VALUES
    (input_user_id, CURDATE(), input_slide_count, input_slide_count * (SELECT slide_point_per_count FROM config ORDER BY id DESC LIMIT 1;))
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
