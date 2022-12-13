

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {

  const users = ref([])
  const currentUser = ref(null)
  
  // MI ID
  const idDocCurrentUser = ref(null)
  const fuente = ref(null)
  const alternativeData = ref(null)

  //Fav
  const anoterFav = ref([])
  const noFav = ref([])

  const estado = ref(0)

  const userForChat = ref(null)
  const messages = ref([])

  ////////////LOGIN//////////////
  const isLogin = ref(null) 
  const spinner = ref(null)


  const fechaActual = ref({})


  return { userForChat, messages, currentUser, idDocCurrentUser, users, isLogin, spinner,
           alternativeData, anoterFav, noFav, estado, fechaActual, fuente }
})
