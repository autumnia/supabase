
<template>
  <div class="form-container" v-if="isLogin">
    <div class="top-info-box">
      <img src="/vite.svg" alt="profile">
      <div class="right-info">
        <span class="name">{{name}}</span>
        <address>{{ addr }}</address>
      </div>
    </div>
    <div class="text-info">
      <h4>자기소개</h4>
      <p>{{ text }}</p>
    </div>

    <button class="logout" @click="handleLogout">로그아웃</button>

    <details class="job-list" >
      <summary>내 지원내역</summary>
      <p v-for="job in job_apply_list" :key="job.id">
        <span>[지원완료] {{  job.job_title }}</span>
        <time>{{ new Date(job.created_at).toLocaleDateString() }}</time>
      </p>
    </details>

    <details class="job-list" >
      <summary>받은 지원내역</summary>
      <p v-for="job in job_recieve_list" :key="job.id">
        <span>{{ job.applicant_name }}님이 <q>{{ job.job_title }}</q>에 지원했습니다.</span>
        <time>{{ new Date(job.created_at).toLocaleDateString() }}</time>
      </p>
    </details>
  </div>
</template>

<style lang="scss" scoped>
    .form-container {
        margin-top: 20px;
    }

// 버튼 디자인 수정
  button { 
    background: transparent;
    color: var(--main-color);
    font-size: 16px;
    margin-top: 40px;
    &:hover{
      opacity: 0.7;
      text-decoration: underline;
    }
  }  

    .logout {
        display: block;
        margin: 0 auto;
        padding: 10px 20px;
        text-align: center;
    }  

  .top-info-box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .right-info {
      width: 100%;
      line-height: 1.4;
  
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      address {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        color: #777;
      }
    }
  }

  .text-info {
    margin-bottom: 25px;
    h4 {
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 12px 1rem;
    }
  }

  .job-list {
    list-style-type: none;
    font-size: 14px;
    padding: 1rem 0;
    
    summary {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d9d9d9;
    }

    p {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      time {
        color: #777;
        font-size: 12px;
        font-weight: 400;
        width: 10em;
        // outline: 1px solid red;
        text-align: right;
      }
    }

    q { font-weight: bold;}
  }
</style>

<script setup>
import supabase from '../supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';  
import { useAuth } from '../auth/auth'; // 로그인 상태 확인 함수 가져오기

const { isLogin, user, checkLoginStatus } = useAuth(); // 로그인 상태 확인 함수 가져오기
const router = useRouter()

const name = ref('사용자 이름');
const addr = ref('사용자 주소');
const text = ref('자기소개 내용');

const job_apply_list = ref([]);
const job_recieve_list = ref([]);

const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if(error) {
        alert('로그아웃 실패');
        return;
    } 
  
    alert('로그아웃 성공')
    router.push('/')
}


async function check_user_auth() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        alert('로그인 후 이용해 주세요');
        isLogin.value = false;
        router.push('/');
        return null;
    }

    return user;
}

async function get_user_info(userId) {
    const { data, error } = await supabase
        .from('user_table')
        .select('name, addr, text')
        .eq('id', userId)
        .single();

    if (!data) {
        console.error('사용자 정보 가져오기 실패:', error);
        return null;
    }

    return data;
}

// 마운트시 사용자 정보 가져오기
onMounted(async() => {
    const user = await check_user_auth();
    const data = await get_user_info(user.id);

    name.value = data.name;
    addr.value = data.addr;
    text.value = data.text;

    console.log('로그인 상태');
    isLogin.value = true;
});


</script>
    
