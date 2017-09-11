<template>
  <div style="margin-top:70px; padding: 10px">
    <div class="ui grid">
      <div class="four wide column" style="background-color:#f7f7f7" ><!-- NAV PANE -->
        <FilterSide ></FilterSide>
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
            <a class="item active" data-tab="about-me">A cerca de mi</a>
            <a class="item" data-tab="availability">Disponibilidad</a>
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
import FilterSide from '~/components/filter-side-pane.vue'
import testProfiles from '~/tests/data/user-profiles.json'
// import $ from 'jquery'

if (process.browser) {
  // Block executed only in the browser.
  // Needed to run jquery for the semantic ui's tab functionality
  var s = document.createElement('script')
  s.text = ' $(".menu .item").tab()'
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
