

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {

  const users = ref([])

  const currentUser = ref(null)
  

const userForChat = ref(null)
/*
const messages = ref([
  {id: 'sdefef', from: '2', date: 1, 
  to: '1', content: 'Mensaje Para LUIS de Maria #1', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'dddd', from: '2', date: 2, 
  to: '1', content: 'Mensaje para LUIS de Maria #2', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'ewfef', from: '2', date: 4, 
  to: '1', content: 'Mensaje para LUIS de Maria #3', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'ewge', from: '2', date: 5, 
  to: '1', content: 'Mensaje Para LUIS de Maria #4', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'gssg', from: '3', date: 6, 
  to: '1', content: 'mensaje para LUIS de Ester #1', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'eee', from: '3', date: 8, 
  to: '1', content: 'mensaje para LUIS de Ester #2', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'gg', from: '3', date: 9, 
  to: '1', content: 'mensaje para LUIS de Ester #3', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: '4hh', from: '3', date: 10, 
  to: '1', content: 'mensaje para LUIS de Ester #4', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },

  {id: 'grgtdd', from: '1', date: 3, 
  to: '2', content: 'Mensaje de LUIS para MARIA #1', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },
  
  {id: 'nudnd', from: '1', date: 7, 
  to: '3', content: 'Mensaje de LUIS para STER #1', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },

  {id: 'dfggsss', from: '1', date: 8, 
  to: '2', content: 'Mensaje de LUIS para Maria #2', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' },

  {id: '4ge5h5h', from: '1', date: 9, 
  to: '4', content: 'Mensaje de LUIS para Garet #1', 
  foto: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' }
])
 */

const messages = ref([])

////////////LOGIN//////////////
const isLogin = ref(null)  


  return { userForChat, messages, currentUser, users, isLogin }
})
