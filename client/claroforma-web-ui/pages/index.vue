<template>
  <div>
    <div class="jumbotron">
      <div class="title-box">
        <h1 class="title">
          APRENDER ABRE OPORTUNIDADES!
        <br />
          QUÉ QUIERES APRENDER HOY?
        </h1>
        <form class="ui form">
          <div class="ui action input">
            <input type="subjecct" name="q" placeholder="Search...">
            <button class="ui button" href="/searchresult">Encuentra Tutores</button>
          </div>
        </form>
      </div>
    </div>
    <SubjectMenu ></SubjectMenu>
    <div>
      Busca tutor a la medida
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
import SubjectMenu from '~/components/subjectmenu.vue'

export default {
  components: {
    SubjectMenu
  }

  /*
  asyncData (context) {
    axios.get('http://localhost:8080/api/categories')
      .then((res) => {
        console.log(res.data)
        return { categories: res.data }
      })
      .catch((e) => {
        console.log(e)
        // console.log({ statusCode: 404, message: 'Post not found' })
      })
  }
  */
}
</script>

<style>
.jumbotron {
  background-image: url("/images/cover-people-a.jpeg") ;
  background-size: cover;
  height: 300px;
  padding-top: 2em;
}
.title-box {
  width: 60%;
  margin: 2em auto;
}
h1.title {
  color: white;
  text-shadow: 2px 2px #333;
}
</style>
