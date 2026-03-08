import { createRouter, createWebHistory } from "vue-router"; //

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //history: 브라우저의 '뒤로 가기' 기능을 지원하기 위한 설정입니다
  routes: [
    {
      path: "/user/list", // 1. 브라우저 주소창에 이 주소를 입력하면
      name: "userList", // 2. 이 경로의 별명입니다.
      component: () => import("../views/UserList.vue"), // 3. 이 파일을 불러와서 화면에 띄워라!
    },
    {
      path: "/user/info/:no", 
      name: "userInfo",
      component: () => import("../views/UserInfo.vue"),
    },
  ],
});

export default router;
