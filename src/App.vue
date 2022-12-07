<script setup>
import { RouterLink, RouterView } from "vue-router";
import ProfileComponent from "./components/ProfileComponent.vue";
import setthings from "./components/Setthings.vue";
import { useDataStore } from "./stores/data";
const useData = useDataStore()
</script>

<template>

  <div class="box-nav d-flex align-items-center justify-content-between">
    <span class="fw-bold text-dark m-2 h4">MultichatFree</span>

    <ProfileComponent></ProfileComponent>
  
  </div>

  <div class="box-all d-flex">
    <setthings></setthings>

    <RouterView />
    
  </div>
  
</template>



<style scoped>
.box-nav {
  height: 11vh;
  background-color: #ffff;
  border-bottom: 2px solid #efeff5;
}
.box-all {
  height: 89vh;
}


/* CSS */
.button-21 {
  align-items: center;
  appearance: none;
  background-color: #3EB2FD;
  background-image: linear-gradient(1deg, #4F58FD, #149BF3 99%);
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd,sans-serif;
  font-size: 1rem;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color .2s,background-position .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}

.button-21:active,
.button-21:focus {
  outline: none;
}

.button-21:hover {
  background-position: -20px -20px;
}

.button-21:focus:not(:active) {
  box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
}
</style>
