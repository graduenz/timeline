<template>
  <b-container>
    <div class="row">
      <div class="col-12">
        <h1 class="heading-2">Welcome!</h1>
        <h4>You look new here.</h4>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Authenticate />
      </div>
      <div class="col-lg-8 mt-4 mt-lg-0">
        <div class="row">
          <div class="col-12 pt-4 pl-4">
            <img src="@/assets/svg/undraw_timeline_9u4u.svg" width="256" class="mb-4" />
            <h1>Built by a dev, for yourself.</h1>
            <p>
              This app is an experiment of Netlify's resources with a very simple purpose: allow people to create and edit two-level timelines and share it with people, if they want.
            </p>
            <p>
              Also, it is an open source project on GitHub and is licensed under MIT. Feel free to do what you want.
            </p>
            <p>
              <font-awesome-icon :icon="[ 'fab', 'github' ]" /> GitHub repository: <a href="https://github.com/graduenz/timeline">https://github.com/graduenz/timeline</a>
            </p>
            <p>
              <font-awesome-icon :icon="[ 'fas', 'user' ]" /> Author's website: <a href="https://guilhermeraduenz.dev">https://guilhermeraduenz.dev</a>
            </p>
          </div>
          <div class="col-lg-12">
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import Authenticate from "@/components/Authenticate";

export default {
  components: {
    Authenticate,
  },
}
</script>