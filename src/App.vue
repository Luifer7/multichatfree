

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Interruptor from "./components/Interruptor.vue";
import ProfileComponent from "./components/ProfileComponent.vue";
import setthings from "./components/Setthings.vue";
import { useDataStore } from "./stores/data";
const useData = useDataStore()
</script>

<template>

  <div class="box-nav box-success flex-wrap d-flex align-items-center justify-content-between"
  :class="useData?.fuente"
  >

    <span class="fw-bold text-dark m-2" style="cursor: pointer;">multichatfree</span>
    
    <Interruptor v-if="useData.isLogin" ></Interruptor>
    
    <ProfileComponent v-if="useData.isLogin" ></ProfileComponent>
  
  </div>

  <div class="box-all d-flex"
  :class="useData?.fuente"
  >
    <setthings></setthings>

    <RouterView />
    
    
  </div>
  
</template>



<style scoped >

@import url('https://fonts.googleapis.com/css2?family=Caveat&family=Oswald&family=Roboto&family=Secular+One&display=swap');


.box-nav {
  height: 9vh;
  background-color: #ffff;
  border-bottom: 2px solid #efeff5;
}

.box-all {
  height: 89vh;
}

.infoo{
  font-size: .6em;
}

/*///////////   //////////// */
       
.Caveat{
  font-family: 'Caveat', cursive;
  font-size: 1.2em;
}
.Oswald {
  font-family: 'Oswald', sans-serif;  
  font-size: 1em;
}
.Roboto{
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
}
.SecularOne{
  font-family: 'Secular One', sans-serif;
  font-size: 1em;
}

/* ////////////  //////////// */



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
