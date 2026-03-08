//서비스 계층 Mapper에서 받는 데이터를 웹 서버에서 쓰기 좋게 포장하는 역활
//userMapper의 주소를 가져옵니다
const userMapper = require("../database/mappers/user_mapper.js");

//전체 회원조회
const findAll = async () => {
  let list = await userMapper.selectAllUser(); //userMapper의 데이터를 가져오라고하는것
  return list; //list값을 전달해준다
};
//회원 상세조회
const findInfoByNo = async (userNo) => {
  let detail = await userMapper.selectUserByNo(userNo);
  return detail;
};
//회원 등록
const createInfo = async (userObj) => {
  //1.객체 => 배열 변환 1. 객체의 값을 가져오기 2. 해당값을 이용해서 배열로 만들기
  const { user_id, user_pwd, user_name, user_gender, user_age, join_data } =
    userObj;
  //첫번째 사용자가 보낸 데이터(userObj) 객체에서 필요한 재료만 꺼낼것
  let insertData = [
    user_id,
    user_pwd,
    user_name,
    user_gender,
    user_age,
    join_data,
  ];
  //두번째 이 데이터를 가지고 순서대로 [] 배열안에 넣을것
 
  let result = await userMapper.insertUser(insertData);
  //세번째 []배열을 가지고 userMapper에게 값을 전달

  //3. 결과를 실행
  let resObj = {
    //성공여부
    status: result.insertId > 0 ? "success" : "fail", //insertId가 0보다 큰것은 새로운 번호가 생성되었다는 의미
    //primary key(user_no)반환
    user_no: result.insertId,  // user_no라는 칸에는 result 데이터를 꺼낸 insertId 값을 넣어라
  }; 
  return resObj;
};
//회원 정보 수정
const modifyInfo = async (no, userInfo) => {
  let result = await userMapper.updateUser(no, userInfo);
  let resObj = {
    //성공여부
    status: result.changedRows > 0, //changeRodw는 Mysql이 UPDATE작업을 마친 뒤 보내주는 "실제로 데이터가 바뀐 행의 갯수" 수정이 될경우 1 수정이 안될경우 0을 나타냄
    target: {       // 어떤 데이터를 수정했는지 찾음
      user_no: no, //누구를 수정했는지
      ...userInfo, //'스프레드 연산자(...)을 사용
    },
  };
  return resObj;
};
//회원 삭제
const removeInfo = async (deleteuser) => {
  let result = await userMapper.deleteUser(deleteuser)
  let resObj ={
    status: result.affectedRows > 0 ? "success" : "fail", //affectedRows는 지운줄이 몇개인가 확인해주는 것
    user_no : deleteuser,
  }
  return resObj
};

module.exports = { findAll, findInfoByNo, createInfo, modifyInfo, removeInfo };
