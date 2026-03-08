import { createApp } from 'vue' // Vue 앱을 생성하는 핵심 함수
import App from './App.vue' // 우리 프로젝트의 가장 최상위(Root) 컴포넌트
import router from './router' // 아까 만든 페이지 이동 규칙(라우터)

const app = createApp(App) // App 컴포넌트를 기반으로 새로운 Vue 애플리케이션 인스턴스를 생성합니다.

app.use(router) // 생성된 앱에 라우터 기능을 장착합니다. (이제 페이지 이동이 가능해짐)

app.mount('#app') // 앱을 브라우저의 HTML 파일에 있는 <div id="app"> 태그 안에 렌더링(그리기)합니다.
