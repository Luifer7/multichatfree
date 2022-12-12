


<template>
    
    <div class="box-settings d-flex flex-column align-items-center justify-content-center gap-1" >
        
        <span class="p-2 m-2 
        d-flex align-items-center justify-content-center item-actions"
        v-for="item of settingsIcons" :key="item.id">

            <strong v-if="item.color === 33" >
                <RouterLink to="/" >
                    <i class="bi bi-chat-fill h2"></i>
                </RouterLink>  
            </strong>

            <strong v-if="item.color === 11" >
                <RouterLink to="/about" >
                    <i class="bi bi-person-circle h2"></i>
                </RouterLink>  
            </strong>

            <strong v-if="item.color === 22" >
                <RouterLink to="/fav" >
                    <i class="bi bi-star-fill h2"></i>
                </RouterLink>  
            </strong>
        
        
        </span>
    
    </div>

</template>

<script setup>
import { ref } from "vue";

const settingsIcons = ref([ 
    {id: 2, action: "grupos", color: 33},
    {id: 1, action: "people", color: 11},
    {id: 3, action: "perfil", color: 22}
])

</script>

<style scoped>
.box-settings{
margin: 0;
height: 89vh;
width: 60px;
}

.item-actions{
    width: 37px; height: 37px;
    color: #656383;
}

strong{
    cursor: pointer;
}

.router-link-active {
    transition: .4s ease all;
    color: #369e61;
 }


</style>