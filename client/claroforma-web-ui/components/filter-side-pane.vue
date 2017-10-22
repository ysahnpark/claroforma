<template>
      <form class="ui mini form">
        <h4 class="ui dividing header">Búsqueda</h4>
        <div class="inline fields">
          <div class="sixteen wide field">
            <label>Tema</label>
            <input name="subject" type="text" placeholder="Tema">
          </div>
        </div>

        <div class="inline fields">
          <div class="sixteen wide field">
            <label>Nivel</label>
            <select name="level" class="ui dropdown">
              <option v-bind:value="level.name"  v-for="level in references.levels">{{ level.value }}</option>
            </select>
          </div>
        </div>

        <div class="inline fields">
          <div class="sixteen wide field">
            <label>Ubicacion</label>
            <input name="location" type="text" placeholder="Ubicacion">
          </div>
        </div>

        <hr />
        Disponibilidad
        <div class="fields" v-for="dow in references.dows">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" name="">
            <label>{{ dow.name }}</label>
          </div>
        </div>

        <hr />
        Sexo
        <div class="fields" v-for="gender in references.genders">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" name="">
            <label>{{ gender.name }}</label>
          </div>
        </div>

        <div class="ui submit button">Buscar</div>
      </form>

</template>


<script>
import searchParams from '~/tests/data/search-params.json'

export default {
  data () {
    return {
      references: searchParams
    }
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

</style>
