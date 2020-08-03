<template>
  <b-container>
    <div class="row">
      <div class="col-12">
        <h1 class="heading-2">{{ isUserConfirm ? "Welcome back" : "Welcome" }}!</h1>
        <h4 v-show="!isUserConfirm">You look new here.</h4>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Authenticate />
      </div>
      <div class="col-lg-8 mt-4 mt-lg-0">
        <div class="row">
          <div class="col-12">
            <h3 class="heading-2">Features</h3>
          </div>
          <div class="col-lg-12">
            <b-list-group class="mt-2">
              <b-list-group-item>
                <div class="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div class="bg-primary text-center text-white font-size-xl d-50 rounded-circle mb-3 mb-sm-0">
                      <font-awesome-icon icon="list"/>
                    </div>
                  </div>
                  <div class="pl-0 pl-sm-4">
                    <div class="d-block text-center d-sm-flex align-items-center">
                      <span class="font-size-lg">Timelines</span>
                    </div>
                    <p class="text-black-50 mb-0">
                      Create and edit timelines for anything you want.
                    </p>
                  </div>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <div class="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div class="bg-primary text-center text-white font-size-xl d-50 rounded-circle mb-3 mb-sm-0">
                      <font-awesome-icon icon="share-alt"/>
                    </div>
                  </div>
                  <div class="pl-0 pl-sm-4">
                    <div class="d-block text-center d-sm-flex align-items-center">
                      <span class="font-size-lg">Sharing</span>
                    </div>
                    <p class="text-black-50 mb-0">
                      Share your timelines with other people, even if they're not registered.
                    </p>
                  </div>
                </div>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import Authenticate from "@/components/Authenticate";

export default {
  props: {
    isUserConfirm: Boolean,
  },
  components: {
    Authenticate,
  },
}
</script>