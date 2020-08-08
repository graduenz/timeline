<template>
  <b-container class="text-center">
    <img src="@/assets/svg/undraw_access_denied_6w73.svg" width="256" class="mt-4 mb-4" />
    <h1>Access denied.</h1>
    <p>It looks you don't have permission to open the resource you requested.</p>
    <b-button variant="primary" @click="$router.replace('/')">
      Go to home page
    </b-button>
  </b-container>
</template>