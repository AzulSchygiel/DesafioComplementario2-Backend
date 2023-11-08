const formularioLogin = document.getElementById("formularioLogin");

formularioLogin.addEventListener("submit", (e) => {
  e.preventDefault(); //Para que cuando se envie la información con el formulario no se borre
  const info = {
    nombre: e.target.nombre.value,
    email: e.target.email.value
  };
  fetch("/iniciarsesion",{ //Enviamos la petición al servidor
     method: "post",
     headers: {
      "content-type": "application/json"
     },
     body: JSON.stringify(info)
  }) .then(res => { //Se recibe la respuesta del usuario
    return res.json();
  }) .then(data => {
    console.log(data); //Se muestra el Token ya guardado en cookie
  });
});