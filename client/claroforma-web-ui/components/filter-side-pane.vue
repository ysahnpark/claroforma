<template>
      <form class="ui mini form">
        <h4 class="ui dividing header">Busqueda</h4>
        <div class="inline fields">
          <div class="sixteen wide field">
            <label>Tema</label>
            <input type="text" placeholder="Tema">
          </div>
        </div>

        <div class="inline fields">
          <div class="sixteen wide field">
            <label>Nivel</label>
            <input type="text" placeholder="Nivel">
          </div>
        </div>

        <div class="inline fields">
          <div class="sixteen wide field">
            <label>Ubicacion</label>
            <input type="text" placeholder="Ubicacion">
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
export default {
  data () {
    return {
      references: {
        dows: [
          {
            name: 'Lunes', index: 1
          },
          {
            name: 'Martes', index: 2
          },
          {
            name: 'Miercoles', index: 3
          },
          {
            name: 'Jueves', index: 4
          },
          {
            name: 'Viernes', index: 5
          },
          {
            name: 'Sabado', index: 6
          }
        ],
        genders: [
          { name: 'Femenino', value: 'f' },
          { name: 'Masculino', value: 'm' }
        ]
      }
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
