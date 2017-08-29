<template>
  <div style="margin-top:70px; padding: 10px">
    <div class="ui grid">
      <div class="four wide column" style="background-color:#f7f7f7" ><!-- NAV PANE -->
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
      </div>

      <div class="twelve wide column" ><!-- CONTENT PANE -->

        <div class="ui items" v-for="user in result">
          <div class="item">
            <div class="image">
              <img  class="ui tiny circular image" src="/images/user-icon-female.png" >
            </div>
            <div class="content">
              <a class="header">{{ user.account.givenName }} {{ user.account.familyName }}</a>
              <div class="meta">
                <span>{{ user.profile.location.city }}, {{ user.profile.location.province }}</span>
              </div>
              <div class="description">
                <p>{{ user.profile.description }}</p>
              </div>
              <div class="extra">
                {{ user.profile.style }}
              </div>
            </div>
          </div>
          <hr />
        </div>

      </div>
  </div>
  </div>
</template>

<script>
// import axios from 'axios'
import SubjectMenu from '~/components/subjectmenu.vue'
import testProfiles from '~/tests/data/user-profiles.json'

export default {
  components: {
    SubjectMenu
  },

  data () {
    return {
      references: {
        dows: [
          {
            name: 'Lunes', index: 0
          },
          {
            name: 'Martes', index: 0
          },
          {
            name: 'Miercoles', index: 0
          },
          {
            name: 'Jueves', index: 0
          },
          {
            name: 'Viernes', index: 0
          }
        ],
        genders: [
          { name: 'Femenino', value: 'f' },
          { name: 'Masculino', value: 'm' }
        ]
      },
      result: testProfiles
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
.jumbotron {
  background-image: url("/images/cover-people-a.jpeg") ;
  background-size: cover;
  height: 300px;
  padding-top: 2em;
}

</style>
