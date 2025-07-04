<template>
    <section v-if="isLogin && post">
      <!-- 상단이미지 -->
      <figure v-if="post.img_url">
        <img :src="post.img_url" alt="head image">
      </figure>
  
      <!-- 상세정보 -->
      <div class="container" v-if="post">
        <h2>{{ post.title }}</h2>
      
        <p class="top_info">
          {{ post.company_name }}
          <span>&middot;</span>
          {{ post.location }}
        </p>

        <p class="pay">
          {{ post.pay_rule }}: <b>{{ post.pay.toLocaleString() }}</b>
        </p>

        <textarea class="desc" rows="5" disabled>{{ post.desc }}</textarea>
      </div>

      <!-- 하단 고정 버튼 -->
      <!-- 타인 -->
      <div class="bottom-btn-group" v-if="post && post.author !== user.id">
        <a class="btn-tel" :href="`tel:${post.tel}`">전화문의</a>
        <button class="btn-apply-disable" v-if="isApplied">지원완료</button>
        <button class="btn-apply" @click="handleApply" v-if="!isApplied">지원하기</button>
      </div>

      <!-- 내글 -->
      <div class="bottom-btn-group" v-if="post && post.author === user.id">
        <router-link class="btn-tel" :to="`/job-post-update/${post.id}`">수정</router-link>
        <button class="btn-apply" @click="handelDelete">삭제</button>
      </div>
    </section>
  </template>

<style scoped lang="scss">
figure {
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

h2 {
  font-size: 16px;
  margin-bottom: 5px;
}

.top_info {
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
}

.pay {
  font-size: 14px;
  font-weight: bold;
  color: #444;
  padding: 10px 0;
  margin-bottom: 16px;
}

.desc {
  width: 100%;
  padding: 0px;
  border: none;
  line-height: 22px;
  margin-bottom: 10px;
  outline: none;
  background: #fff;
}

.bottom-btn-group {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;

  button, .btn-tel {
    width: 50%;
    border-radius: 0;
    padding-top: 14px;
    padding-bottom: 14px;
    margin: 0;
    cursor: pointer;
    //  추가
    text-align: center;
    color: #fff;
    text-decoration: none;
  }

  .btn-tel {
    background-color: var(--main-color-dark);
  }

  .btn-apply {
    background-color: var(--main-color-dark);
  }

  .btn-apply-disable {
    background-color: #ccc;
  }
}
</style>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import supabase from '../supabase';
import { useAuth } from '../auth/auth';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const post = ref(null); // 글 데이터 저장 변수
const { isLogin, user, checkLoginStatus } = useAuth(); // 로그인 상태 확인 함수 가져오기
const isApplied = ref(false); // 지원내역 확인 변수

// console.log(route.params.id);


// 1. DB에서 글 가져오기
onMounted(async () => {
  await checkLoginStatus();

  // 로그인 상태일 때만 데이터 가져오기
  if (user.value) {
    const { data, error } = await supabase
      .from('job_posts')
      .select()
      .eq('id', id)
      .single()

    post.value = data;
    console.log(post.value);

    if (error) {
      alert('글 가져오기 실패');
      return;
    }
  }

  // 지원내역 확인
  checkApply();
});    

// 지원내역 확인 함수
const checkApply = async () => {
  const { data, error } = await supabase
    .from('job_apply_list')
    .select()
    .eq('applicant_id', user.value.id)
    .eq('post_id', id);

    // console.log('지원내역확인 함수 error:', error);

    if(error) {
      alert('오류가 발생했습니다');
      return;
    }

    if(data.length > 0) {
      isApplied.value = true;
    }
}

async function get_userinfo(  ) {
  const { data, error } = await supabase
  .from('user_table')
  .select()
  .eq('id', user.value.id) 
  .single();

  if(error) {
    alert('오류가 발생했습니다');
    return;
  }  

  return {data};
}

async function apply_for_job( {  data } ) {
  const { error } = await supabase
    .from('job_apply_list')
    .insert({
      job_title:      post.value.title,
      employer_id:    post.value.author,
      applicant_id:   user.value.id,
      applicant_name: data.name,
      applicant_tel:  data.tel,
      post_id:        post.value.id,
    });

  if(error) {
    alert('지원저장 오류가 발생했습니다');
    return;
  } 
}


// 2. 지원하기 함수
const handleApply = async () => {
  // 유저 데이터에서 이름과 전화번호 가져오기(user_table에서 가져와야 됨)
  const { data } = await get_userinfo(  );

  // 지원내역 저장
  await apply_for_job({  data });
  
  // 잘 처리 되었으면 확인 메시지를 보여 준다. 
  alert('지원이 완료되었습니다.');

  // 지원이 완료되면 글목록으로 이동
  router.push('/job-list');
};

// 이미지 삭제 함수
const deleteImage = async () => {
  if(!post.value.img_url || post.value.img_url === '') {
    alert('삭제할 이미지가 없습니다.');
    return;
  }

  // if(post.value.img_url) {
    const { data, error } = await supabase
      .storage
      .from('images')
      .remove ([post.value.img_url.split('/').pop()] );
    
    if(error) 
      console.log('이미지 삭제 실패');
  // }
}

// 글삭제 함수
const handelDelete = async () => {
  const cnfm = confirm('정말 삭제하시겠습니까?')

  if (!cnfm) return;

  // 이미지 삭제
  await deleteImage()

  // 글 삭제
  const { error } = await supabase
    .from('job_posts')
    .delete()
    .eq('id', id)

    if(error) {
      alert('글삭제 실패');
      return;
    } 
    
    // else {
      alert('삭제 완료');
      router.push('/job-list');
    // }

}


</script>


