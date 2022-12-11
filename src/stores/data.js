

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {

  const users = ref([])

  const currentUser = ref(null)
  const idDocCurrentUser = ref(null)
  const alternativeData = ref(null)
  const anoterFav = ref([])
  const noFav = ref([])

  const userForChat = ref(null)
  const messages = ref([])

  ////////////LOGIN//////////////
  const isLogin = ref(null) 
  const spinner = ref(null)


  return { userForChat, messages, currentUser, idDocCurrentUser, users, isLogin, spinner,
           alternativeData, anoterFav, noFav }
})
