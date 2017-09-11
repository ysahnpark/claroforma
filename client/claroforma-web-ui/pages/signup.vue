<template>
  <div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header">
      <div class="content">
        Un paso mas para abrir un mundo de oportunidades
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <button class="ui facebook button">
            <i class="facebook icon"></i>
            Registrar por Facebook
          </button>
        </div>
        <div class="field">
          <button class="ui linkedin button">
            <i class="linkedin icon"></i>
            Registrar por LinkedIn
          </button>
        </div>
      </div>

      <div class="ui error message"></div>

    </form>

    <div class="ui message">
      Al registrar, acepto los términos de uso y la política de privacidad
    </div>
  </div>
</div>
</template>

<script>

if (process.browser) {
  // Block executed only in the browser.
  // Needed to run jquery for the semantic ui's tab functionality
  var s = document.createElement('script')
  s.text = ' $(".menu .item").tab()'
  document.getElementsByTagName('head')[0].appendChild(s)
  console.log('Hello browser')
}

export default {
}
</script>

<style>
.column {
  max-width: 450px;
}
</style>
