const perfil = document.getElementById("perfil");

perfil.addEventListener("click", ()=>{
    fetch("/perfil",{ //Enviamos la petición a la ruta "/perfil" para tener el perfil
        method: "get",
        headers: {
         "content-type": "application/json", //La Cookie ya nos está habilitando y si el cliente manda una peticion las Cookies que ya tenga creadas viajarán en la peticion
        }, //Primero tenemos que enviar el Token y después la petición
     }) .then(res => { //Se recibe la respuesta del usuario
       return res.json();
     }) .then(data => {
       console.log(data);
     });
});