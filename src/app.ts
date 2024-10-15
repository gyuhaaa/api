import express, { Request, Response, NextFunction } from "express";
import { connection } from "../db_connection";
import mysql, { FieldPacket, RowDataPacket, OkPacket } from "mysql2";

// Express 애플리케이션 생성
const app = express();
app.get("/status", (req, res, next) => {
  console.log("Request status API success!!");

  res.send("GOOD!");
});

// JSON 데이터를 파싱하기 위한 미들웨어 설정
app.use(express.json());

// POST /a 경로에 대한 처리
app.post("/newoffer", (req: Request, res: Response, next: NextFunction) => {
  const { offer_id, order_id, value, status } = req.body;
  var query =
    "USE flexir;" +
    "INSERT INTO `offer` (offer_id, order_id, value, status) VALUES " +
    "(" +
    offer_id +
    ", " +
    order_id +
    ", " +
    value +
    ", " +
    status +
    ")";

  // 쿼리 실행
  connection.query(
    query,
    (
      err: Error | null,
      results: RowDataPacket[] | OkPacket | OkPacket[] | null,
      fields: FieldPacket[] | undefined
    ) => {
      if (err) {
        res.json({
          result: 0,
          message: err.message, // 에러 메시지 전달
          data: {},
        });
        return;
      }

      // 성공 시 결과 반환
      res.json({
        result: 1,
        message: "success",
        data: results, // 쿼리 결과를 반환
      });
    }
  );

  // db 연결 종료
  connection.end();
});

// POST /a 경로에 대한 처리
app.post("/a", (req: Request, res: Response, next: NextFunction) => {
  const { offer_id, value } = req.body;

  // offer_id와 value가 정상적으로 제공되었을 때 응답
  if (offer_id && value) {
    res.json({
      result: 1,
      message: "success",
      data: {
        offer_id: offer_id,
        value: value,
      },
    });
  } else {
    res.status(400).json({
      result: 0,
      message: "Invalid input",
      data: null,
    });
  }
});

// POST /b 경로에 대한 처리
app.post("/b", (req: Request, res: Response, next: NextFunction) => {
  console.log("POST /b request received.");

  res.json({
    message: "This is the response from /b",
    data: { keyB: "valueB" },
  });
});

// POST /c 경로에 대한 처리
app.post("/c", (req: Request, res: Response, next: NextFunction) => {
  console.log("POST /c request received.");

  res.json({
    message: "This is the response from /c",
    data: { keyC: "valueC" },
  });
});

// POST /d 경로에 대한 처리
app.post("/d", (req: Request, res: Response, next: NextFunction) => {
  console.log("POST /d request received.");

  res.json({
    message: "This is the response from /d",
    data: { keyD: "valueD" },
  });
});

export default app;
