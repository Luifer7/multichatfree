
<template>
    

        <div class="w-100 box-fav" >

          
            
            <h1 class="text-center mt-3 fw-bold text-uppercase">
               Mis Favoritos
            </h1>
           
        
                 
                  <div v-for="fav of useData.anoterFav" :key="fav.id" 
                  class="gap-2 m-2 d-flex align-items-center justify-content-between card d-flex flex-row p-2" > 
                   <div class="d-flex align-items-center jsutify-content-center gap-1" >
                    <img :src="fav.foto" width="50" height="50" class="rounded-circle" style="object-fit: cover;" alt="">
                    <strong class="m-0 p-0 h4 text-capitalize" >{{fav.name}} <i class="bi bi-star-fill text-warning"></i> </strong>
                   </div>
                    <i class="bi bi-trash m-3 delete-fav h4"
                    @click="deleteFav(fav)" ></i>  
                </div>
              

        </div>

</template>

<script setup >

import { useAmdin } from "../composables/ChatMethods";
import { useDataStore } from "../stores/data";


const useData = useDataStore()
const { getFav, deleteFav } = useAmdin()



</script>


<style scoped>

.delete-fav{
    transition: .6s ease all;
    cursor: pointer;
}
.delete-fav:hover{
    color: rgba(241, 11, 11, 0.89);
    transform: scale(1.1);
}

.box-fav{
    overflow: auto;
    padding: 10px;
    background-color: #2c374d1a;
}


</style>