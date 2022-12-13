

import { useDataStore } from "../stores/data";
import { collection, doc, query, deleteDoc, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import Swal from 'sweetalert2'
import { id } from "date-fns/locale";

export function useAmdin() {

  const useData = useDataStore()

  //Sin terminar
  const addMessage = async (message, yo, otro) => {

    let ahora = new Date()
    let minuto = ahora.getMinutes()
    let hora = ahora.getHours()
    
    const docRef = await addDoc(collection(db, "messages"), {
        date: new Date(),
        time: `${hora}:${minuto}`,
        content: message,
        from: yo.id,
        to: otro.id,
        foto: yo.foto
    })

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

     currentCompare = currentCompare.filter(field => field.id === useData.currentUser?.id)
     useData.users = useData.users.filter(field => field.id != useData.currentUser?.id)
     idCurrentUser = idCurrentUser.filter(field => field.id === currentCompare[0]?.idDocument )
     useData.idDocCurrentUser = idCurrentUser[0].id
  }

  getUser()

  const getUserToChat = (user) => {
    useData.userForChat = user
   
  }



  // FAVORITOS

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
     fav.push(
      {idDoc: doc.id,
      ...doc.data()}
     )
    
    })
   useData.anoterFav = fav
   useData.anoterFav = useData.anoterFav.filter(field => field.from === useData.currentUser?.id )
  
  }
  
  const deleteFav = async (data) => {
    Swal.fire({
      title: `Quieres borrar a ${data.name} de tu lista de favoritos?`,
      imageUrl: `${data.foto}`,
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
         deleteDoc(doc(db, "fav", data.idDoc))
         getFav()
        Swal.fire(`${data.name} borrado de favortios`, '', 'success')
      }
    })
  }

  getFav()

  return { addMessage, getUserToChat, addFav, getFav, deleteFav }
}
