<template>
  <div class="default-content">
    <div class="ui grid">
      <div class="four wide column" style="background-color:#f7f7f7" ><!-- NAV PANE -->
        <FilterSide ></FilterSide>
      </div>

      <div class="twelve wide column" ><!-- CONTENT PANE -->

        <div class="ui items" v-for="user in result">
          <div class="item">
            <div class="image">
              <img  class="ui tiny circular image" src="/images/user-icon-female.png" >
            </div>
            <div class="content">
              <a class="header" v-bind:href="user._href.info">{{ user.account.givenName }} {{ user.account.familyName }}</a>
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
import FilterSide from '~/components/filter-side-pane.vue'
import testProfiles from '~/tests/data/user-profiles.json'

export default {
  components: {
    FilterSide
  },

  data () {
    testProfiles.forEach((el) => {
      el._href = {
        info: '/user/' + el.account.uid
      }
    })
    return {
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

</style>
