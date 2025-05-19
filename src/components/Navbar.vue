<template>
  <nav>
    <h1>{{ title }}</h1>
    <router-link 
      v-if="currentPath === '/' || currentPath === '/signup' || currentPath === '/job-post'|| currentPath.startsWith('/job-post-update')"
      to="/job-list" 
      class="btn-close"
    >
      <!-- 상단 좌측 닫기 아이콘 -->
      <Icon icon="material-symbols:close" width="24" style="color: #1e1e1e;"/> 
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
      <router-link to="/user-profile">
        <Icon 
          icon="teenyicons:user-circle-solid" 
          width="24"
          style="color: #1e1e1e;"
        />
      </router-link>
      <router-link to="/job-post"><!-- post -->
        <Icon 
        icon="mdi:pencil-outline"  
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

  const path_map = new Map([
    ['/', '로그인'],
    ['/signup', '회원가입'],
    ['/job-list', '땅콩알바'],
    ['/job-post', '구인등록'],
    ['/user-profile', '프로필'],
  ]);

  watch(route, (newPath) => {
    currentPath = newPath.path;
    console.log(currentPath);
    
    // 경로 별로 제목을 다르게 설정
    title.value = path_map.get(currentPath) || '';



  });
</script>
  
