<script setup>
import { useRoute } from "vue-router"; //앞에서 보낸 router.push데이터를 useRoute에 가져온다
const route = useRoute(); //route는 useRoute로 사용한다
const selectNo = route.params.no; //selectNo는 라우트의 :no의 값이다

import { ref, computed, onBeforeMount } from "vue"; 
const user = ref({});//user 가져온 회원 상세 정보를 담을 객이다  ref를 써야 반응형으로 바꿀 수 있다
const findByNo = async (userNo) => { //비동기 통신을 사용
  let info = await fetch(`/api/users/${userNo}`) //info는 버 API(/api/users/회원번호)를 호출하여 정보를 요청
    .then((res) => res.json()) //응답 받은 데이터를 json객체로 변환
    .catch((err) => console.log(err));
  user.value = info; //서버에서 받아온 상세 정보를 user객체에 담고 user.value를 업데이트 하면서 상세화면을 그림
};
onBeforeMount(() => { //상세회면을 그리기전에 실행되는 함수
  findByNo(selectNo); // 사용자가 클릭한 번호를 전달하여, 화면이 뜨기 전에 정보를 미리 받아옵니다.
}); 
</script>
<template>
  <div class="contaier text-center">
    <!-- 12칸 -->
    <div class="row">
      <div class="col-4">NO.</div>
      <div class="col-8">{{ user.user_no }}</div>
    </div>
    <div class="row">
      <div class="col-4">아이디</div>
      <div class="col-8">{{ user.user_id }}</div>
    </div>
    <div class="row">
      <div class="col-4">비밀번호</div>
      <div class="col-8">{{ user.user_pwd }}</div>
    </div>
    <div class="row">
      <div class="col-4">이름</div>
      <div class="col-8">{{ user.user_name }}</div>
    </div>
    <div class="row">
      <div class="col-4">성별</div>
      <div class="col-8">{{ user.user_gender }}</div>
    </div>
    <div class="row">
      <div class="col-4">나이</div>
      <div class="col-8">{{ user.user_age }}</div>
    </div>
    <div class="row">
      <div class="col-4">가입일자</div>
      <div class="col-8">{{ user.user_data }}</div>
    </div>
    <div>
      <button class="btn btn-info">수정</button>
      <button class="btn btn-light">목록</button>
      <button class="btn btn-warning">삭제</button>
    </div>
  </div>
</template>
