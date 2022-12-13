

<template>
    
    <div class="w-100 border" > 
        
        <div class="card m-3 p-3" >
            <strong class="mb-1" >
                Escoge una fuente  <strong class="m-3" >Actual: <b class="text-success">{{useData.fuente}}</b> </strong>
            </strong>
            <select v-model="fuent" class="form-select form-select-sm" aria-label=".form-select-sm example">
            <option selected>Escoge una fuente</option>
            <option :value="f.font" v-for="f of fuentes" :key="f.id" >{{f.font}}</option>
            </select>
            <div :class="fuent" class="m-2 mt-4 h5 d-flex align-items-center justify-content-around" >
                <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, aut?</small>
                <i class="bi bi-check2-circle h2 m-0 check-icon"
                    @click="ModalEditFuente(fuent)"
                ></i>
            </div>
        </div>

    </div>

</template>

<script setup >
import { ref } from "@vue/reactivity";
import { useFormat } from "../composables/FormatDay";
import { useDataStore } from "../stores/data";

const { ModalEditFuente } = useFormat()
const useData = useDataStore()


const fuent = ref('')
const fuentes = ref([
    {id: 1, font: 'Caveat'}, {id: 2, font: 'Oswald'}, 
    {id: 3, font: 'Roboto'}, {id: 4, font: 'SecularOne'}
])


</script>

<style scoped>

    
.Caveat{
  font-family: 'Caveat', cursive;
  font-size: 1.4em;
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

.check-icon {
    transition: .6s ease all;
    cursor: pointer;
}
.check-icon:hover {
   color: rgb(0, 81, 255);
   transform: scale(1.2);
}
.check-icon:active {
   transform: scale(1);
}


</style>