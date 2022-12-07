
<template>
    

        <div class="w-100" >

          
            
            <h1 class="text-center mt-3 fw-bold text-uppercase">
               Mis Favoritos
            </h1>
           
            <div class="card p-2 m-1 d-flex" >
                 
                  <div v-for="fav of useData.anoterFav" :key="fav.id" class="gap-2 m-2 d-flex align-items-end  p-2" > 
                    <img :src="fav.foto" width="50" height="50" class="rounded-circle" alt="">
                    <strong class="m-0 p-0" >{{fav.name}}  </strong>
                    <strong class="m-0 p-0" >{{fav.from}}  </strong>
                </div>
                
            </div>

        </div>

</template>

<script setup >

import { useAmdin } from "../composables/ChatMethods";
import { useDataStore } from "../stores/data";


const useData = useDataStore()
const { getFav } = useAmdin()



</script>