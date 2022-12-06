


<template>
    
    <div class="box-settings d-flex flex-column align-items-center justify-content-center gap-2" >
        
        <span class="p-2 m-2  
        d-flex align-items-center justify-content-center item-actions"
        v-for="item of settingsIcons" :key="item.id">

            <strong v-if="item.color === 11" >
                <i class="bi bi-person-circle h2"></i>
            </strong>

            <strong v-if="item.color === 22" >
                <i class="bi bi-star-fill h2"></i>
            </strong>
            
            <strong v-if="item.color === 33" >
                <i class="bi bi-bell-fill h2"></i>
            </strong>
            
            <strong v-if="item.color === 44" >
                <i class="bi bi-gear-fill h2"></i>
            </strong>

        </span>
    
    </div>

</template>

<script setup>
import { ref } from "vue";

const settingsIcons = ref([
    {id: 1, action: "people", color: 11}, 
    {id: 2, action: "grupos", color: 22},
    {id: 3, action: "perfil", color: 33}, 
    {id: 4, action: "settings", color: 44}
])

</script>

<style scoped>
.box-settings{
margin: 0;
height: 89vh;
width: 65px;
}

.item-actions{
    width: 37px; height: 37px;
    color: #656383;
}

strong{
    cursor: pointer;
}


</style>