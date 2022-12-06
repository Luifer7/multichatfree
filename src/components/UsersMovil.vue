

<template>

        <div class="users-two m-auto mt-2 mb-3" v-for="us of useData.users" :key="us.id" @click="getUserToChat(us)" > 
           <img :src="us?.foto" width="40" height="40" style="object-fit: cover;" class="rounded-circle img-b" 
           :class="(us.id === useData.userForChat?.id ?'selected':'')"
           alt="">
        </div>
    
</template>

<script setup >
import { ref } from "vue";
import { useAmdin } from "../composables/ChatMethods";
import { useDataStore } from "../stores/data";

const useData = useDataStore()
const { getUserToChat } = useAmdin()

</script>

<style scoped>

.users-two{
    width: 50px;
    display: flex; align-items: center; justify-content: center;
    padding: 3px; border-radius: 50%;
    transition: .6s ease all;
    cursor: pointer;
}
.img-b{
    transition: .6s ease all;
    border: 2px solid rgba(4, 142, 235, 0.603);
}
.img-b:hover{
    border: 5px solid rgba(4, 142, 235, 0.603);

}

.selected{
    border: 3px solid rgb(14, 172, 85);
    transition: .6s ease all;
}

.selected:hover{
    border: 4px solid rgb(14, 172, 85)
}

</style>