<template>
  <nav>
    <h1>{{ title }}</h1>
    <router-link 
      v-if="currentPath === '/' 
          || currentPath === '/signup' 
          || currentPath === '/job-post'
          || currentPath.startsWith('/job-post-update')
        "
      to="/job-list" 
      class="btn-close"
    >
      <Icon 
        icon="material-symbols:close" 
        width="24"
        style="color: #1e1e1e;"
      />
    </router-link>

    <!-- job-detail, user-profile 좌측 뒤로가기 아이콘 -->
    <router-link 
      v-if="currentPath.startsWith('/job-detail') || currentPath === '/user-profile'"
      to="/job-list" 
      class="btn-close"
    >
      <Icon 
        icon="ic:baseline-arrow-back" 
        width="24" 
        height="24"  
        style="color: 1e1e1e" 
      />
    </router-link>
    
    <!-- job-list 우측에 배치되는 프로필, 글쓰기 아이콘 -->
    <div class="right-icons" v-if="currentPath === '/job-list'">
      <router-link to="/job-post"><!-- post -->
        <Icon 
        icon="mdi:pencil-outline"  
          width="24"
          style="color: #1e1e1e;"
        />
      </router-link>
      <router-link to="/user-profile">
        <Icon 
          icon="teenyicons:user-circle-solid" 
          width="24"
          style="color: #1e1e1e;"
        />
      </router-link>
    </div> 
  </nav>
</template>

<style lang="scss" scoped>
  nav {
    position: relative;
    // background: pink;
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 44px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 16px;
      color: var(--text-color-dark);
    }
    .btn-close {
      position: absolute;
      left: 15px;
      text-decoration: none;
    }
  }  

  .right-icons {
    position: absolute;
    right: 15px;
    top: 10px;
    display: flex;
    gap: 10px;
  }
</style>
  
<script setup>
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';

let route = useRoute();
let currentPath = route.path;
let title = ref('');

const exactMatchMap = new Map([
  ['/', '로그인'],
  ['/signup', '회원가입'],
  ['/user-profile', '프로필'],
  ['/job-list', '구인조회'],
  ['/job-post', '구인등록'],
  ['/about', '회사소개'],
]);

const startsWithMap = [
{ prefix: '/job-detail', title: '상세보기' },
{ prefix: '/job-post-update', title: '구인등록 수정' },
];


watch(route, (newPath) => {
  currentPath = newPath.path;
  // console.log(currentPath);
  
  // 경로 별로 제목을 다르게 설정
  title.value = '페이지';

  // 정확히 일치하는 경로 먼저 확인
  if (exactMatchMap.has(currentPath)) {
    title.value = exactMatchMap.get(currentPath);
  } 
  else {
    // startsWith 조건 확인
    const matched = startsWithMap.find( 
      item => currentPath.startsWith(item.prefix)
    );

    // console.log('matched:', matched);
    
    if (matched) {
      title.value = matched.title;
    }
  }

  // if(currentPath === '/') {
  //   title.value = '로그인'; 
  // } else if (currentPath === '/signup') {
  //   title.value = '회원가입';
  // } else if (currentPath === '/job-list') {
  //   title.value = '구인조회';
  // } else if (currentPath.startsWith('/job-detail')) {
  //   title.value = '상세보기';
  // } else if (currentPath === '/job-post') {
  //   title.value = '구인등록'
  // } else if (currentPath === '/user-profile') {
  //   title.value = '프로필'
  // } else if (currentPath.startsWith('/job-post-update')) {
  //   title.value = '구인등록 수정'
  // }

});
</script>



  


