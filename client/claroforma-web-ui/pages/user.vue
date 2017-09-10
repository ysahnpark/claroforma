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

        <div class="ui items ">
          <div class="item">
            <div class="image">
              <img  class="ui tiny circular image" src="/images/user-icon-female.png" >

              <div class="ui one column stackable center aligned page grid">
                 <div class="column twelve wide">
                     <button class="ui orange button">Contactar</button>
                 </div>
              </div>

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

          <!-- Tabs -->
          <div class="ui secondary pointing menu">
            <a class="item" data-tab="about-me">A cerca de mi</a>
            <a class="item active" data-tab="availability">Disponibilidad</a>
            <a class="item" data-tab="qna">Preguntas y Respuestas</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="about-me">
            <p>About me</p>
          </div>
          <div class="ui bottom attached tab segment " data-tab="availability">
            <p>availability</p>
          </div>
          <div class="ui bottom attached tab segment " data-tab="qna">
            <p>qna</p>
          </div>


        </div>

      </div>
    </div>


  </div>
</template>

<script>
// import axios from 'axios'
import SubjectMenu from '~/components/subjectmenu.vue'
import testProfiles from '~/tests/data/user-profiles.json'
// import $ from 'jquery'

if (process.browser) {
  var s = document.createElement('script')
  s.text = ' $(".menu .item").tab()'
  document.getElementsByTagName('head')[0].appendChild(s)
  console.log('Hello browser')
}
console.log('Hello server')

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
      user: testProfiles[0]

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
