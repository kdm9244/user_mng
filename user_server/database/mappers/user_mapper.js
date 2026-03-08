//실제 SQL문을 수행
const { pool } = require("../DAO"); //DB 연결 통로를 가져옵니다
const userSql = require("../sql/user.js");  //user.js 쿼리문을 가져옵니다

//전체조회 비동기(async)로 작동하여 DB응답을 기다립니다
const selectAllUser = async () => {
  let conn = null; // DB와 연결된 통로를 담을 변수입니다.
  try {
    // connetionPool에서 대기중인 connection 변환
    conn = await pool.getConnection(); // 작업을 불러올떄까지 기다린다  통로(pool)에서 값(getConnection)을 불러온다
    // 해당 connection을 통해 sSQL문 실행 결과 반환
    let [rows, fields] = await conn.query(userSql.selectAllUser); 
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    //사용이 끝난 connection을 pool에 돌려줌
    if (conn) conn.release(); //일을 마친후 다시 값을 돌려보내는 역활  poolConecton()이후 *release() 역활 중요
  }
};
//단건 조회
const selectUserByNo = async (no) => {
  let conn = null;
  try {
    conn = await pool.getConnection(); //db에서 저장소에서 값을 가져오고
    let [result] = await conn.query(userSql.selectUserByNo, no); //result 에서 기다립니다 통로에서 (쿼리문 중에 '단건조회를' no는 ?자리에 들어갈 id값)
    let info = result[0]; //result는 배열의 객체 그중 하나를 꺼내기 위해 [0] 을 꺼내서 {} 객체 형태로 만든다
    return info; //info결과를 반환한다
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};
//등록
const insertUser = async (userInfo) => {
  //userInfo : [user_id, user_pwd, ... ]
  let conn = null;
  try {
    conn = await pool.getConnection(); //변수는 기다립니다 통로의 갑에서
    let [result] = await conn.query(userSql.insertUser, userInfo); //result값은 기다립니다 통로에서 쿼리값을 불러올떄까지(쿼리는 inserUser를 사용하고 값은 userinfo입니다)
    return result; //result값을 반환합니다
  } catch (err) {
  } finally {
    if (conn) conn.release();
  }
};
//수정
const updateUser = async (userNo, updateDate) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    //여러 작업을 하나로 묶어서 전부 성공하거나 아니면 아예 하나도 안한상태를 만들기위해서
    // 지금부터 작업하는 내용은 임시 저장소에 보관하는 행위

    let [result] = await conn.query(userSql.updateUser, [updateDate, userNo]); 
    //result의 변수는 기다립니다.통로에서.쿼리문을 불러올떄까지(userSql에서 updateUser의 쿼리문을 불러옵니다)
    //쿼리? 에 맞게 변수를 집어주고 set-updateDate where ? userNO 순서대로 할것
    //추가 DML 실행 => 같은 트랙잭션으로 묶임!!!
    conn.commit(); //커밋하기
    return result; //그리고 저장
  } catch (err) {
    console.log(err);
    conn.rollback(); //에러가 난다면 취소할것
  } finally {
    if (conn) conn.release();
  }
};
//삭제
const deleteUser = async(userDelete) => {
  let conn = null
  try{
    conn= await pool.getConnection();
    let [result] = await conn.query(userSql.deleteUser, userDelete)
  }catch(err){
    console.log(err)
  }finally{
    if(conn) conn.release()
  }
};

module.exports = { selectAllUser, selectUserByNo, insertUser, updateUser , deleteUser };
