<template>
  <div>
    <Header/>
    <section class="main container">
      <nuxt/>
    </section>

    <div class="ui inverted vertical footer segment">
      <div class="ui center aligned container">
       <div class="ui stackable inverted divided grid">
         <div class="seven wide column">
           <h4 class="ui inverted header">Compania</h4>
           <div class="ui inverted link list">
             <a href="#" class="item">A cerca</a>
           </div>
           <div class="ui inverted link list">
             <a href="#" class="item">Contactar</a>
           </div>
         </div>
         <div class="seven wide column">
          <h4 class="ui inverted header">A cerca de Claroforma</h4>
          <p>Claroforma es la plataforma donde la gente puede encontrar tutores a la medida</p>
        </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/header.vue'

export default {
  components: {
    Header
  },
  data: function () {
    return { message: 'My World' }
  }
}
</script>

<style>
.main.container {
  margin-top: 2em;
}
.ui.footer.segment {
  margin: 5em 0em 0em;
  padding: 5em 0em;
}
</style>
