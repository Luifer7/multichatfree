

import { useDataStore } from "../stores/data";
import { collection, query, where, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import Swal from 'sweetalert2'

export function useAmdin() {

  const useData = useDataStore()

  //Sin terminar
  const addMessage = async (message, yo, otro) => {
  
    const docRef = await addDoc(collection(db, "messages"), {
        date: Date.now(),
        content: message,
        from: yo.id,
        to: otro.id,
        foto: yo.foto
    })
   // useData.messages.push(newMessage)
  }

  const getMessage = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"))
    let mess = [] 
    querySnapshot.forEach((doc) => {
     mess.push(doc.data())
    })
   useData.messages = mess
  }
        getMessage()

  const q = query(collection(db, "messages"))
  const unsubscribe = onSnapshot(q, (snapshot) => {
  let mess = [] 
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      getMessage()
    }
    if (change.type === "modified") {
       
    }
    if (change.type === "removed") {
       
    }
  })
   
})


  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"))

    let usuarios = [] 
    let idCurrentUser = []
    let currentCompare = []

    querySnapshot.forEach((doc) => {
       usuarios.push(doc.data())
       idCurrentUser.push({id: doc.id})
    })
    useData.users = usuarios
    currentCompare = usuarios

     currentCompare = currentCompare.filter(field => field.id === useData.currentUser.id)
     useData.users = useData.users.filter(field => field.id != useData.currentUser.id)
     idCurrentUser = idCurrentUser.filter(field => field.id === currentCompare[0]?.idDocument )
     useData.idDocCurrentUser = idCurrentUser

  }

  getUser()

  const getUserToChat = (user) => {
    useData.userForChat = user
  
  }


  const addFav = async (data) => {
  const docRef = await addDoc(collection(db, "fav"), {
      date: Date.now(),
      id: data.id,
      name: data.name,
      foto: data.foto,
      from: useData.currentUser?.id
    })
    await getFav()
  }

  const getFav = async () => {
    const querySnapshot = await getDocs(collection(db, "fav"))
    let fav = [] 
    querySnapshot.forEach((doc) => {
     fav.push(doc.data())
    })
   useData.anoterFav = fav
   useData.anoterFav = useData.anoterFav.filter(field => field.from === useData.currentUser?.id )
  }

  getFav()

  return { addMessage, getUserToChat, addFav, getFav }
}
