


import { useDataStore } from "../stores/data"
import  format  from 'date-fns/format'
import formatDistance from "date-fns/formatDistance";
import Swal from 'sweetalert2'
import { auth, db } from "../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { collection, updateDoc, doc, query, deleteDoc, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import  getDay  from "date-fns/getDate";
import { useAmdin } from "./ChatMethods";

export function useFormat() {

    const useData = useDataStore()

   
    const formatCurrentUser = async (data) => {

        const justNow = new Date()
        useData.alternativeData = {}

        let created = Math.floor(data?.metadata?.createdAt)
        let lastLoginAt = Math.floor(data?.metadata?.lastLoginAt)

        useData.alternativeData = 
            {
                created: formatDistance(created, justNow),
                createdTime: data.metadata.creationTime,
                lastLoginAt: formatDistance(lastLoginAt, justNow),
                lastSignInTime: data?.metadata?.lastSignInTime
            }

    }


    // MODAL EDITAR IMAGEN
    const ModalEditPhoto = async  () => {

        const { value: url } = await Swal.fire({
            input: 'url',
            inputLabel: 'URL de  la imagen',
            inputPlaceholder: 'Copia la URL',
            showCancelButton: true
          })
          
          if (url) {
            Swal.fire({
                imageUrl: `${url}`,
                imageWidth: 300,
                imageHeight: 200,
                text: 'Quieres agregar esta imagen?',
                imageAlt: 'URl no disponible',
                showConfirmButton: true,
                showDenyButton: true,
            }).then((result) => {
                if (result.isDenied) {
                    Swal.fire({
                        icon: 'error',
                        title: 'La imagen no fue cambiada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (result.isConfirmed) {
                    editPhoto(url)
                    Swal.fire({
                        icon: 'success',
                        title: 'Tu imagen fue cambiada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            
              })

          }
    }

    //Edit IMAGEN METHOD
   const editPhoto = async (url) => {
 
    await updateProfile(auth.currentUser, {
        photoURL: url
    }).then(() => {

        const updatePhotoRef = doc(db, "usuarios", useData.idDocCurrentUser);
        updateDoc(updatePhotoRef, {
            foto: url
        })
        
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                useData.isLogin = true
    
                let current = 
                { id: user.uid, token: user.refreshToken, email: user.email, 
                name: user.displayName, foto: user.photoURL, estado: null}
    
                useData.currentUser = current
                 formatCurrentUser(user) 
                 
              } else { 
              useData.isLogin = false 
            }
    
          })

    }).catch((error) => {console.log(error)})  
    }


    // MODAL EDITAR USERNAME
    const ModalEditUsername = async  () => {

        const { value: username } = await Swal.fire({
            input: 'text',
            inputLabel: 'Escoge un nuevo nombre',
            inputPlaceholder: 'Escribe aqui',
            inputAttributes: {
                maxlength: 10,
              },
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                  return 'You need to write something!'
                }
              }
          })
          
          if (username) {
            Swal.fire({
                title: `Quieres cambiar tu nombre por ${username}?`,
                showConfirmButton: true,
                showDenyButton: true,
            }).then((result) => {
                if (result.isDenied) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Tu nombre no fue cambiado!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (result.isConfirmed) {
                    editUsername(username)
                    Swal.fire({
                        icon: 'success',
                        title: 'Tu nombre ha sido cambiada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            
              })

          }
    }

    //Edit USERNAME METHOD
   const editUsername = async (username) => {
    let newname = username
    await updateProfile(auth.currentUser, {
        displayName: newname.toUpperCase()
    }).then(() => {

        const updatePhotoRef = doc(db, "usuarios", useData.idDocCurrentUser);
        updateDoc(updatePhotoRef, {
            name: newname.toUpperCase()
        })
        
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                useData.isLogin = true
    
                let current = 
                { id: user.uid, token: user.refreshToken, email: user.email, 
                name: user.displayName, foto: user.photoURL, estado: null}
    
                useData.currentUser = current
                 formatCurrentUser(user) 
                 
              } else { 
              useData.isLogin = false 
            }
    
          })

    }).catch((error) => {console.log(error)})  
    }

     // MODAL EDITAR FUENTE
     const ModalEditFuente = async  (fuente) => {
      
      if (fuente === '' || fuente === 'Escoge una fuente') {
        return  Swal.fire({
          icon: "error", text: "Debes escoger una de las opciones!"
        })
      }

      Swal.fire({
        html: `Has elegido <b class="text-success" >${fuente}</b>`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        showCancelButton: true, cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          const updatePhotoRef = doc(db, "usuarios", useData.idDocCurrentUser);
          updateDoc(updatePhotoRef, {
              fuente: fuente
          })
          getRenewData()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tu fuente ha sido modificada',
              showConfirmButton: false,
              timer: 1500
            })
           
        } 
    
      })

     
    }

    const getRenewData = async () => {
        const querySnapshot = await getDocs(collection(db, "usuarios"))
        let usuarios = [] 
        let currentCompare = []
        querySnapshot.forEach((doc) => {
           usuarios.push(doc.data())
        })
        currentCompare = usuarios
         currentCompare = currentCompare.filter(field => field.id === useData.currentUser?.id)
         useData.fuente = currentCompare[0].fuente
    }


    const getDateNow = () => {

        let current = new Date()
        useData.fechaActual = {}

        let diaNumero = current.getDay()
        let diaNombre = ""
        let diaMesNumero = current.getDate()
        let numeroMes = current.getMonth() + 1
        let nombreMes = ''
        let year = current.getFullYear()

        let hora = current.getHours().toString()
        let minuto = current.getMinutes().toString()

        switch (diaNumero) {
            case 0:
              diaNombre = "Domingo";
              break;
            case 1:
              diaNombre = "Lunes";
              break;
            case 2:
               diaNombre = "Martes";
              break;
            case 3:
              diaNombre = "Miercoles";
              break;
            case 4:
              diaNombre = "Jueves";
              break;
            case 5:
              diaNombre = "Viernes";
              break;
            case 6:
              diaNombre = "Sabado";
          }

        switch (numeroMes) {
            case 1:
              nombreMes = "Enero";
              break;
            case 2:
              nombreMes = "Febrero";
              break;
            case 3:
               nombreMes = "Marzo";
              break;
            case 4:
              nombreMes = "Abril";
              break;
            case 5:
              nombreMes = "Mayo";
              break;
            case 6:
              nombreMes = "Junio";
              break;
            case 7:
              nombreMes = "Julio";
              break;
              case 8:
               nombreMes = "Agosto";
              break;
            case 9:
              nombreMes = "Septiembre";
              break;
            case 10:
              nombreMes = "Octubre";
              break;
            case 11:
              nombreMes = "Noviembre";
              break;
            case 12:
              nombreMes = "Diciembre";
          }
         
          if (minuto.length === 1) {
              minuto = `0${minuto}`
          }
          

        useData.fechaActual = {
            nombredia: diaNombre, diamesnumero: diaMesNumero, 
            nombremes: nombreMes, year: year, hora: `${hora}:${minuto}`
        }  
        
    }

    getDateNow()


    return {
        formatCurrentUser, ModalEditPhoto, ModalEditUsername, getDateNow, ModalEditFuente
    }
}