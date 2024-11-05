import express from "express";
import { connection } from "../db_connection.js";
import Web3 from "web3";
import crypto from "crypto";
import multer from "multer";
import { encodeEthereumAddress } from "./lib/index.js";

const upload = multer({ dest: "uploads/" });

const app = express();
const web3 = new Web3();

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  // auth 테이블에서 expires_at이 현재 시간 보다 이후이면서 token이 존재하는지 반환
  const query = `
    CALL verify_token (?);
  `;

  const values = [token];

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(403).json({ message: "Invalid token" });
    }

    next();
  });
}

// app.get("/status", (req, res, next) => {
//   console.log("Request status API success!!");

//   res.send("GOOD!");
// });

// JSON 데이터를 파싱하기 위한 미들웨어 설정
app.use(express.json());

// POST /getTodayCount 경로에 대한 처리
app.post("/getTodayCount", (req, res) => {
  const { userId } = req.body;

  const query = `
    CALL get_today_count (?);
  `;

  const values = [userId];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

<<<<<<< HEAD
// POST /getTotalCount 경로에 대한 처리
app.post("/getTotalCount", (req, res) => {
  const { userId } = req.body;

  // user 테이블에서 user_id가 일치하는 유저의 total_count, total_point값 반환.
  const query = `
    CALL get_total_count (?);
  `;

  const values = [userId];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /getDailyCount 경로에 대한 처리
app.post("/getDailyCount", (req, res) => {
  const { userId } = req.body;

  // daily_count테이블에서 userId가 일치하는 거 최대 7개까지 반환.
  const query = `
    CALL get_daily_count (?);
  `;

  const values = [userId];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /getUser 경로에 대한 처리
app.post("/getUser", (req, res) => {
  const { address } = req.body;

  // user 테이블에서 address가 일치하는 것 중에 user_id, wallet_address, nickname, profile, referral_user_id 반환
  const query = `
    CALL get_user (?);
  `;

  const values = [address];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /getRank 경로에 대한 처리
app.post("/getRank", (req, res) => {
  const { address } = req.body;

  // user 테이블에서 address가 일치하는 항목이 total_point를 내림차순으로 정렬했을 때 몇 번째 인덱스에 위치하는지 반환
  const query = `
    CALL get_rank (?);
  `;

  const values = [address];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /getLeaderboard 경로에 대한 처리
app.post("/getLeaderboard", (req, res) => {
  const { from, to } = req.body;

  // user 테이블에서 total_point를 기준으로 내림차순으로 정렬했을 때 [from, to]에 위치한 항목들 모두 반환
  const query = `
    CALL get_leaderboard (?,?);
  `;

  const values = [from, to];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// GET /getTodayMaxCount 경로에 대한 처리
app.get("/getTodayMaxCount", (req, res) => {
  // daily_count 테이블에서 date가 오늘과 일치하는 항목중에 spin_count + slide_count의 값이 가장 큰 항목의 spin_count, slide_count 값 반환
  const query = `
    CALL get_today_max_count (?);
  `;

  connection.query(query, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /getAuthToken 경로에 대한 처리
app.post("/getAuthToken", (req, res) => {
  const { timestamp, signature, address } = req.body;

  if (Math.abs(Date.now() - timestamp) > 60 * 1000) {
    return res.status(400).json({
      result: Math.abs(Date.now() - timestamp),
      message:
        "The timestamp differs from the server time by more than 1 minutes.",
    });
  }

  const message = timestamp.toString(); // timestamp를 문자열로 변환하여 서명 검증에 사용

  try {
    // 서명을 통해 지갑 주소 복구
    const recoveredAddress = web3.eth.accounts.recover(message, signature);

    // 복구된 주소가 요청된 주소와 일치하는지 확인
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      const token = crypto.randomBytes(32).toString("hex");
      const userId = encodeEthereumAddress(address);

      // auth_tokens 테이블에서 userId와 일치하는 행이 존재한다면 삭제하고 새로 token, userId, create_at = 현재 시간, expired_at = 현재 시간 + 1달로 새로운 행 생성
      const query = `
        CALL set_token (?, ?);
      `;

      const values = [token, userId];

      connection.query(query, values, (err, results) => {
        if (err) {
          res.json({
            result: 0,
            message: err.message,
            data: {},
          });
          return;
        }

        res.json({
          result: 1,
          message: "success",
          data: {
            result: [
              [
                {
                  token,
                },
              ],
            ],
          },
        });
        return;
      });
    } else {
      res.status(400).json({
        error: "Invalid signature",
        message: "The signature does not match the provided address.",
      });
    }
  } catch (error) {
    console.error("Error verifying signature:", error);
    res.status(500).json({
      error: "Signature verification failed",
      message: "An error occurred while verifying the signature.",
    });
  }
});

// POST /setUser 경로에 대한 처리 (프로필 사진 업로드 O)
app.post("/setUser", verifyToken, upload.single("file"), (req, res) => {
  // file 저장 로직 추가
  var profile = null;

  const token = req.headers.authorization;
  const { nickname, referral_user_id } = req.body;

  // auth_tokens 테이블에서 token을 조회하고 일치하는 행의 user_id를 참조하여 user 테이블에 profile, nickname, referral_user_id를 수정
  // 이 때, 각 값이 null인 경우에는 변경 X,
  // referral_user_id가 이미 설정되어 있는데 null 값이 전달된게 아니라면 에러 반환 or 실행 X
  const query = `
    CALL set_user (?,?,?,?);
  `;

  const values = [token, profile, nickname, referral_user_id];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /setUser 경로에 대한 처리 (프로필 사진 업로드 X)
app.post("/setUser", verifyToken, upload.none(), (req, res) => {
  const token = req.headers.authorization;
  const { nickname, referral_user_id } = req.body;

  const query = `
    CALL set_user (?,?,?,?);
  `;

  const values = [token, null, nickname, referral_user_id];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

// POST /addCount 경로에 대한 처리
app.post("/addCount", verifyToken, (req, res) => {
  // file 저장 로직 추가
  const token = req.headers.authorization;
  const { spin_count, slide_count } = req.body;

  // auth_tokens 테이블에서 token을 조회하고 일치하는 행의 user_id를 참조하여 daily_count테이블에 spin_count, slide_count 값 만큼 더해주기
  // 만약 daily 테이블에 오늘 날짜의 date가 존재하지 않는다면 행 추가
  const query = `
    CALL add_count (?,?,?);
  `;

  const values = [token, spin_count, slide_count];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.json({
        result: 0,
        message: err.message,
        data: {},
      });
      return;
    }

    res.json({
      result: 1,
      message: "success",
      data: { results },
    });
  });
});

=======
>>>>>>> 2a5044e1b18b31f1d9b7568a8e752eb2987810e1
export default app;
