require("dotenv").config({ path: "database/dbConfig.env" });
//환경변수 설정 path를 통해 설정된 파일이 어디있는지 찾아온다

const express = require("express");
//express: 웹 서버를 쉽게 만들게 도와주는 프레임워크


//앱 생성 및 포트 설정
const app = express();
const port = 3000; 
//app: express를 실행해서 만든 생성 객체 와 서버의 Port 정보

//미들 웨어 등록 영역
//body pasresr
//content=type : appliction/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); //사용자가 폼을 통해 보낸 데이터를 해석
//content=type : appliction/json
app.use(express.json()); //사용자가 보낸 파일을 json 형태의 데이터를 자바스크림트 객체처럼 쓰게한다

//Sever 실행
app.listen(port, () => {
  console.log(`Sever Start`);
  console.log(`http://localhost:${port}`);
}); //서버 가동을 시키는 코드

//라우팅 등록 영역
// -r기본 라우팅
app.get("/", (req, res) => { // GET방식으로 / 경로에 접근했을때
  res.send("Welcom!!"); //브라우저 화면에 괄호 안의 내용을 그려줍니다.
}); 

//기능별 라우터 모듈 등록
const userRouter = require("./router/user_router.js"); //외부파일에 주소로 안내되어있는 길을 찾아준다
app.use("/", userRouter);  //그 지도를 우리 서버의 "/" 경로에 합칩니다.
