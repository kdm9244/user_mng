<script setup>
import { ref, onBeforeMount, computed } from "vue";
const users = ref([]); //서버에서 가져온 사용자 목록을 담을 값 값이 변화면 자동으로 다시 그려줌
const count = computed(() => { //배열의 길이를 자동으로 계산을 합니다. 사용자가 추가되거나 삭제되면 users의 count도 실시간으로 바뀐
  return users.value.length;
});
const findAllList = async () => { 
  // http://localhost:3000/users
  let list = await fetch(`/api/users`) //우리가 만든 서버에 전체 데이터를 달라고 요청을 함
    .then((res) => res.json()) //서버가 보내준 값을 json값으로 바꿈
    .catch((err) => console.log(err));
  users.value = list; //변환된 데이터를  list에 넣는다
};

const dataFormat = (dateVal) => {
  let newDate = new Date(dateVal);// 날짜 생성 객체: 서버에서 온 문자열을 자바스크립트가 계산할 수 있도록 변경한다
  let year = newDate.getFullYear(); // 연도 추출
  //01 012
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2); //월 추출 2자리 고정 1은 0이기 떄문에+1 해줄것
  let day = ("0" + (newDate.getDate())).slice(-2); //날 추출 2자리 고정  1은 0이기 떄문에+1 해줄것
  return `${year}-${month}-${day}`;
};

import { useRouter } from "vue-router"; 
const router = useRouter(); //Vue의 페이지 이동 기능을 사용하기 위해 가져옮
//특정 회원을 선택 시 상세페이지로 이동
const goToDetail = (userNo) => { //특정 회원번호(userNo)를 클릭했을때 호출
  router.push({ name: "userInfo", params: { no: userNo } }); //이동한 페이지에 삽입합니다({이름은 : userInfo},:no의 값)
};

onBeforeMount(() => { //화면(컴포넌트)이 브라우저에 그려지기 직전에 실행되는 훅(Hook)입니다
                      //데이터를 가져오는 동안 좀더 자연스러운 화면을 준비할 수 있고 데이터가 준비된 상태에서 첫 화면을 그릴 수 있음
                      //onBeforeMount:API 호출, 데이터 사전 준비 /onMounted:DOM 요소 직접 조작, 차트 그리기 등/onBeforeUpdate:수정 전의 상태 확인 / onUnmounted:타이머 해제, 메모리 정리
  findAllList(); //화면이 열리자마자 바로 사용자 목록이 보이도록 만드는 것
});
</script>
<template>
  <div class="contnet">
    <table class="table text-center">
      <caption>
        Total :
        {{
          count
        }}
      </caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>아이디</th>
          <th>이름</th>
          <th>성별</th>
          <th>가입날짜</th>
          <!-- yyyy-mm-dd -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in users" v-on:click="goToDetail(info.user_no)">
          <td>{{ info.user_no }}</td>
          <td>{{ info.user_id }}</td>
          <td>{{ info.user_name }}</td>
          <td>{{ info.user_gender == "M" ? "남" : "여" }}</td>
          <td>{{ dataFormat(info.join_data) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
