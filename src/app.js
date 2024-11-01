import express from "express";
import { connection } from "../db_connection.js";

const app = express();
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

export default app;
