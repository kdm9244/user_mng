//table : t_users
//전체조회
const selectAllUser = `SELECT user_no,
                      user_id,user_name,
                      user_gender,user_age,
                      join_data 
                      FROM t_users 
                      ORDER BY user_no`; //데이터 베이스 쿼리문  아이디,나이,데이터 를 t_users에 가져오고 순서대로 정렬
//단건조회
const selectUserByNo = `SELECT user_no,
                          user_id,
                          user_name,
                          user_pwd,
                          user_gender,
                          user_age,
                          join_data 
                        FROM t_users 
                        WHERE user_no = ?;`; //user_no에 중에 하나의 회원을 불러온다
//등록
const insertUser = `
INSERT INTO t_users (user_id, user_pwd, user_name, user_gender, user_age, join_data)
VALUES(?,?,?,?,?,?) `; // 배열,기본값을 가져가야함 ()안에 있는 배열을 ? 칸에 맞게 넣는다
//수정
const updateUser = `
UPDATE t_users
SET ?
WHERE user_no =?
`; //?에 {컬럼명 : 값}의 형태도 객체를 전달하면 알아서 바뀌어줌 WHERE user_no 를 지정해줘야함

//2개의 값을 가지는 배열 , [객체, 기본값]
//{'user_id : 'hong' , 'user_pwd' : '1234'} => user_id='hong', user_pwd='1234'

//삭제
const deleteUser = 
`DELETE FROM t_users WHERE user_no =?`;

module.exports = {
  selectAllUser,
  selectUserByNo,
  insertUser,
  updateUser,
  deleteUser,
};
 //다른 파일에서 관련된 정보를 밖으로 꺼낼 수 있도록함