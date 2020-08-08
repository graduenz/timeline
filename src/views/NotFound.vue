<template>
  <b-container class="text-center">
    <img src="@/assets/svg/undraw_page_not_found_su7k.svg" width="256" class="mt-4 mb-4" />
    <h1>Resource not found.</h1>
    <p>It looks the resource you are trying to open does not exist.</p>
    <b-button variant="primary" @click="$router.replace('/')">
      Go to home page
    </b-button>
  </b-container>
</template>