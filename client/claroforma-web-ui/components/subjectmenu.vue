<template>
  <div class="ui center aligned container">
    <div class="ui compact menu">
        <div class="ui simple dropdown item">
          Matematicas <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" href="#">Aritmetica</a>
            <a class="item" href="#">trigonometria</a>
            <div class="item">
              <i class="dropdown icon"></i>
              Calculo
              <div class="menu">
                <a class="item" href="#">Derivados</a>
                <a class="item" href="#">Calculo</a>
              </div>
            </div>
          </div>
        </div>

        <div class="ui simple dropdown item">
          Ingles <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" href="#">Expresion y Lenguas</a>
            <a class="item" href="#">Escritura</a>
          </div>
        </div>

        <div v-for="category in categories" class="item">
          <a :href="category">{{ category }}</a>
        </div>

    </div>
  </div>
</template>

<script>
// import axios from '~/plugins/axios'
import axios from 'axios'

export default {
  // props: ['categories'],

  data () {
    // Initialize with empty otherwise vue will complain
    return { categories: [] }
  },
  mounted () {
    let self = this
    axios.get('http://localhost:8080/api/categories')
      .then((res) => {
        console.log(res.data)
        self.categories = res.data
      })
      .catch((e) => {
        console.log({ statusCode: 404, message: 'Post not found' })
      })
  }

}
</script>

<style>

</style>
