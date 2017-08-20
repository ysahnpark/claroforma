<template>
  <div>
    <div class="jumbotron">
      <div class="title-box">
        <h1 class="title">
          APRENDER ABRE OPORTUNIDADES!
        <br />
          QUÉ QUIERES APRENDER HOY?
        </h1>
        <div class="ui action input">
          <input type="subjecct" placeholder="Search...">
          <button class="ui button">Encuentra Tutores</button>
        </div>
      </div>
    </div>
    <SubjectMenu />
    <div class="links">
      <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
      <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
    </div>
  </div>
</template>

<script>
import SubjectMenu from '~/components/subjectmenu.vue'

export default {
  components: {
    SubjectMenu
  }
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
