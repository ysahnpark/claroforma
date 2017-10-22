<template>
  <div class="default-content">
    <div class="ui grid">
      <div class="four wide column" style="background-color:#f7f7f7" ><!-- NAV PANE -->
        <FilterSide ></FilterSide>
      </div>

      <div class="twelve wide column" ><!-- CONTENT PANE -->

        <div class="ui breadcrumb">
          <a class="section">Inicio</a>
          <span class="divider">/</span>
          <a class="section" href="/searchresult">Búsqueda</a>
          <span class="divider">/</span>
          <div class="active section">{{ user.account.givenName }} </div>
        </div>

        <div class="ui items ">
          <div class="item">
            <div class="image">
              <img  class="ui tiny circular image" src="/images/user-icon-female.png" >

              <div class="ui one column stackable center aligned page grid">
                 <div class="column twelve wide">
                     <button id="btn-contact" class="ui orange button">Contactar</button>
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
            <a class="item active" data-tab="about-me">A cerca de mi</a>
            <a class="item" data-tab="availability">Disponibilidad</a>
            <a class="item" data-tab="qna">Preguntas y Respuestas</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="about-me">
            <h4>A cerca de mi</h4>
            {{ user.profile.description }}
            <h4>Estilo</h4>
            {{ user.profile.style }}
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

    <!-- model box -->
    <div class="ui small modal">
      <div class="header">Contactar</div>
      <div class="content">
        <form class="ui form">
          <div class="fields">
            <div class="field">
              <label>Tema</label>
              <input type="text" name="subject" placeholder="tema">
            </div>
            <div class="field">
              <label>Nivel</label>
              <input type="text" name="level" placeholder="Nivel">
            </div>
          </div>
          <div class="field">
            <label>Ubicacion</label>
            <input type="text" name="location" placeholder="Ubicacion">
          </div>
          <div class="fields">
            <div class="field">
              <label>Dias</label>
              <input type="text" name="days" placeholder="days">
            </div>
            <div class="field">
              <label>Fecha aprox. de comienzo</label>
              <input type="text" name="startDate" placeholder="Fecha de comienzo">
            </div>
          </div>
          <div class="field">
            <label>Mensaje</label>
            <textarea rows="2"></textarea>
          </div>
        </form>
      </div>
      <div class="actions">
        <button class="ui primary button" name="submit">Enviar</button>
        <div class="ui cancel button">Cancelar</div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import FilterSide from '~/components/filter-side-pane.vue'
import testProfiles from '~/tests/data/user-profiles.json'
// import $ from 'jquery'

if (process.browser) {
  // Block executed only in the browser.
  // Needed to run jquery for the semantic ui's tab functionality
  var s = document.createElement('script')
  var script = '$(".menu .item").tab();'
  script += '$("#btn-contact").click(function(){$(".ui.modal").modal("show")});'
  s.text = script

  document.getElementsByTagName('head')[0].appendChild(s)
  console.log('Hello browser')
}

export default {
  components: {
    FilterSide
  },

  data () {
    return {
      user: testProfiles[0]
    }
  },

  asyncData (context) {
    console.log('context.params:' + JSON.stringify(context.params))
    axios.get('http://localhost:8080/api/users/' + context.params.uid)
      .then((res) => {
        console.log(res.data)
        return { user: testProfiles[0] }
      })
      .catch((e) => {
        // console.log(e)
        // console.log({ statusCode: 404, message: 'Post not found' })
      })
  }
}
</script>

<style>

</style>
