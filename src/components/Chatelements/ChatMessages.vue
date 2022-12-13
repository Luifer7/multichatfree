


<template>  

    <div class="messages" ref="itemRefs">

        <div v-for="message of getMess()" :key="message.id" 
        :class="message.from === useData.currentUser?.id ?'message left mb-2':'message mb-2'">

            <div class="d-flex align-items-start  justify-content-between p-1"
            :class="message.from === useData.currentUser?.id ?'content-msg':''">

                <img :src="message?.foto" width="35" height="35" 
                style="object-fit: cover; border: 2px solid blue; border-radius: 50px;" 
                 class="rounded-circle" alt="">
                <p class="content-message">{{message.content}} <br>
                    <b class="text-dark time"  >{{message.time}}</b>
                </p> 
               
            </div>
            
        </div>

    </div>

</template>

<script setup >
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useDataStore } from "../../stores/data";

const useData = useDataStore()

const itemRefs = ref(null)

const getMess = () => {
    function saludos(){
        downScroll()
    }
    setTimeout(saludos, 500)

    let betweenMsg = []
    let msg = useData.messages.filter(field => field.from === useData.userForChat?.id)
    let msgt = useData.messages.filter(field => field.from === useData.currentUser?.id)
    betweenMsg = [... msgt.filter(field => field.to === useData.userForChat?.id), 
                   ...msg.filter(field => field.to === useData.currentUser?.id) ]
    
    return betweenMsg.sort( function(a, b) {return a.date - b.date}) 
}


const downScroll = () => {   
    if (itemRefs.value) {
      itemRefs.value.scrollTop = itemRefs.value.scrollHeight
    }
}


</script>

<style scoped>
.messages{ height: 100%; overflow-y: auto;
    scroll-behavior: smooth;
}

.message{
    padding: 5px; border-radius: 10px; 
    width: 300px; margin-top: 10px; margin-left: 10px;
    background-color: rgb(231, 231, 209);
}

.left{
    margin-left: auto;
    margin-right: 10px;
    background-color:rgba(35, 156, 90, 0.596);
}

.content-message{
    font-size: .8em; margin: 5px;
    word-wrap: break-word;
    width: 240px;
    font-weight: 500;
}

.content-msg{
    justify-content: space-around;
}
.time{
    font-size: .8em;
    letter-spacing: 1px;
    font-weight: 900;
}

.content-msg img:nth-of-type(1) {
    order: 1;
}

.content-msg img:nth-of-type(2) {
    order: 2;
}

@media (max-width: 780px) {

    .message{
    width: 190px;
    }

    .content-message{
        font-size: .7em; 
        width: 120px;
    }

}



</style>