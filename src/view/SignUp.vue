<template>
  <div class="loading_info" v-if="isLoading">
    <p>회원가입 처리중...</p>
  </div>
  <div class="form-container">
    <form @submit.prevent="handle_signup">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="이메일 입력"
          autocomplete="email"
          required
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="비밀번호 입력"
          autocomplete="new-password"
          minlength="8"
          required
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="tel">Phone</label>
        <input 
          type="tel" 
          id="tel" 
          placeholder="010-1234-5678"
          autocomplete="tel"  
          pattern="^01[0-9]-\d{4}-\d{4}$"
          maxlength="13"
          required  
          v-model="tel"
        />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          type="text" 
          id="name" 
          placeholder="이름 입력"
          required
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="addr">Address</label>
        <input 
          type="text" 
          id="addr" 
          placeholder="주소 입력"
          required
          v-model="addr"
        />
      </div>
      <div class="form-group">
        <label for="text">자기소개</label>
        <textarea id="text" v-model="text"></textarea>
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>
    
<style scoped lang="scss">
/* @import "../style/form.scss"; */
@use "../style/form.scss";

  .loading_info {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, 0.7);
    color: #fff;
    display: grid;
    place-items: center;
  }    
</style>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';   
import supabase from '../supabase';

const router = useRouter();
const isLoading = ref(false);

const email = ref('');
const password = ref('');
const tel = ref('');
const text = ref('');
const name = ref('');
const addr = ref('');

function wheb_error(err, isLoading) {
  isLoading.value = false; // 서버 요청 완료
  console.error('Error:', err.message);
  alert('오류가 발생했습니다: ' + err.message);
}

const handle_signup = async () => {
  isLoading.value = true; // 서버 요청 시작
  
  // 회원가입 처리  
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  // 에러 에러가 발생했을 때
  if(error) {
      isLoading.value = false; // 서버 요청 완료 
      alert(error.message);
      return;
  } 

  const { table_error } = await supabase
    .from('user_table')
    .insert({ 
        tel: tel.value,
        text: text.value,
        name: name.value,
        addr: addr.value
    });

  if ( table_error ) {
    isLoading.value = false; // 서버 요청 완료
    alert(table_error.message);
    return;
  }

  // console.log('회원가입 성공:', data);
  alert('회원가입 성공')
  isLoading.value = false; // 서버 요청 완료

  // 로그인 후 홈으로 이동
  router.push('/');
}
</script>
    
