<template>
  <div>
    <HeaderPane/>
    <section class="main container">
      <nuxt/>
    </section>

    <FooterPane/>

  </div>
</template>

<script>
import HeaderPane from '~/components/header-pane.vue'
import FooterPane from '~/components/footer-pane.vue'

export default {
  components: {
    HeaderPane,
    FooterPane
  },
  data: function () {
    return { message: 'My World' }
  }
}
</script>

<style>
.main.container {
  margin-top: 16px;
}
.ui.footer.segment {
  margin: 5em 0em 0em;
  padding: 5em 0em;
}
.default-content {
  margin-top: 70px;
  padding: 10px
}
</style>
