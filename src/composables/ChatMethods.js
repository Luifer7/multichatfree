

import { useDataStore } from "../stores/data";
import { collection, query, where, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export function useAmdin() {

  const useData = useDataStore()

  //Sin terminar
  const addMessage = async (message, yo, otro) => {
  
    let newMessage = {
        date: Date.now(),
        content: message,
        from: yo.id,
        to: otro.id,
        foto: yo.foto,
    }
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
    querySnapshot.forEach((doc) => {
     usuarios.push(doc.data())
    })
    useData.users = usuarios
    useData.users = useData.users.filter(field => field.id != useData.currentUser.id)
  }

  getUser()

  const getUserToChat = (user) => {
    useData.userForChat = user
  }

  //getUserToChat(useData.users[0])



  return { addMessage, getUserToChat }
}
