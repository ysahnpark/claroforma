<template>
  <div>
    <Header/>
    <section class="main container">
      <nuxt/>
    </section>
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
  margin-top: 3em;
}
</style>
