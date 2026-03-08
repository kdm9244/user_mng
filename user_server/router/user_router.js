//라우팅 = 사용자의 요청(URI+METHOD) + Service + 응답(View or Data)
//

const express = require("express");
const router = express.Router();
// 제공할 서비스 객체
const userService = require("../service/user_service.js");

//전체조회 URI(/users) + METHOD(GET)
router.get("/users", async (req, res) => {
  //사용자의 요청을 받아 서비스에 전체 목록을 조회
  let result = await userService.findAll();
  //작업이 끝날 때까지 기다린후
  res.send(result);
  //브라우저에 보낸다
});
//단건조회URI(/users/:no)+ METHOD(GET)
router.get("/users/:no", async (req, res) => {
  let target = req.params.no; //URL에 적힌 :no 자리에 들어온 값을 꺼낸다
  let result = await userService.findInfoByNo(target);
  //작업이 끝낼때까지 기다린다 userService의 findInfoByno기능을 불러와 넣어는다(값은 target)이다
  res.send(result); //브라우저에 보낸다
});

//등록  URI(/users)+ METHOD(POST)
router.post("/users", async (req, res) => {
  let target = req.body;
  //req.body는 불어온 값의 데이터 뭉치
  let result = await userService.createInfo(target);
  //기다립니다 userService의 createInfo에 기능을 불러 온다(값은 target이다)
  res.send(result); //브라우저로 보낸다
});
//수정  URI(/users/:no)+ METHOD(PUT)
router.put("/users/:no", async (req, res) => {
  let userNo = req.params.no; //:no값을 불러온다
  let target = req.body; //:전체 데이터를 불러온다
  let result = await userService.modifyInfo(userNo, target);
  //기다립니다 userService의 modifyInfo의 의 기능을 불러오고 (값은 userNo,target)이다
  res.send(result); //브라우저로 보낸다
});

//삭제  URI(/users/:no)+ METHOD(DELETE)
router.delete("/user/:no"), async(req,res)=>{
  let userNo = req.params.no;
  let result = await userService.removeInfo(userNo);
  res.send(result)
}
module.exports = router;
