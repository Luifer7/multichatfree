



<template>

      <div class="w-100">
       
        <h1 class="text-center mt-3 fw-bold text-uppercase" >
          {{useData.currentUser?.name}}
        </h1>

        <div class="card p-3 m-2" >
          
            <strong>Email: 
              <b class="text-muted" >{{useData.currentUser?.email}}</b> <br>
              <small>Verificado: {{useData.AlternativeData?.emailVerified}}</small>
            </strong>
            
            <div class="m-2 d-flex flex-column" >

                  <strong>
                    Cuenta creada: 
                  <b class="text-muted" >{{useData.AlternativeData?.metadata.createdAt}}</b>
                </strong>
                
                <strong>
                    Creation time: 
                  <b class="text-muted" >{{useData.AlternativeData?.metadata.creationTime}}</b>
                </strong>

                <strong>
                    Cuenta creada: 
                  <b class="text-muted" >{{useData.AlternativeData?.metadata.lastLoginAt}}</b>
                </strong>
                
                <strong>
                    Creation time: 
                  <b class="text-muted" >{{useData.AlternativeData?.metadata.lastSignInTime}}</b>
                </strong>

            </div>  

            <div class="img text-center" >
              <img :src="useData.currentUser?.foto" width="200" class="img-thumbnail" alt="">
            </div>
         
        </div>

      </div>

</template>

<script setup >
import { useDataStore } from "../stores/data";

const useData = useDataStore()

</script>

<style>

</style>
