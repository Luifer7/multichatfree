

<template>
    
    <div class="interruptor" >
        <div class="form-check form-switch h4">
            <input v-model="checked" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
        </div>
    </div>

</template>

<script setup >
import {  collection, query, where, getDocs , doc, updateDoc} from "@firebase/firestore";
import { ref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";
import Swal from 'sweetalert2'
import { db } from "../firebase";
import { useDataStore } from "../stores/data";

const useData = useDataStore()

const checked = ref(null)

const yo = ref(null)
const currentId = ref('')

onUpdated(() => {
    if (checked.value) {
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Estas en linea',
        showConfirmButton: false,
        timer: 1000
        })
        const washingtonRef = doc(db, "usuarios", currentId.value);
        updateDoc(washingtonRef, {
        estado: 1
        })
    }
    if (!checked.value) {
        Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'No estas en linea',
        showConfirmButton: false,
        timer: 1000
        })
        const washingtonRef = doc(db, "usuarios", currentId.value);
        updateDoc(washingtonRef, {
        estado: 2
        })
       
    }
})

const getCurrentUser = async () => {
    
   if (useData.currentUser?.id) {
    const q = query(collection(db, "usuarios"), where("id", "==", useData.currentUser?.id));
    const querySnapshot = await getDocs(q);
    let c = []
    querySnapshot.forEach((doc) => {
        c.push({id: doc.id, ...doc.data()})
    })  
        yo.value = c[0]
        currentId.value = c[0].idDocument
        useData.estado = c[0].estado

           if (!checked.value) {
                if (useData.estado === 1) {
                    checked.value = true   
                }
                if (useData.estado === 2) {
                    checked.value = false   
                }
           }
           if (checked.value) {
              console.log("TUDO BEN")
           }
    }

        function saludos(){
          getCurrentUser()
        }

        setTimeout(saludos, 4000);

}

getCurrentUser()


</script>

<style scoped>

.interruptor{
    color: black;
}

</style>