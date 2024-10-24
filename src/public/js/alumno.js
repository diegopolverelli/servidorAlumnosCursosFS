const socket=io()
const ulCursos=document.querySelector("#cursos")

socket.on("nuevoCurso", datosCurso=>{

    let liCurso=document.createElement("li")
    liCurso.innerHTML=`${datosCurso.nombre} - horas: ${datosCurso.horas} <button onclick="agregaCurso(${datosCurso.id})">Agregar</button>`
    // {{nombre}} - horas: {{horas}} <button>Agregar</button>
    ulCursos.append(liCurso)
})

const spanAlumno=document.getElementById("idAlumno")
const agregaCurso=async(idCurso)=>{
    let idAlumno=Number(spanAlumno.textContent)
    if(isNaN(idAlumno)){
        alert("Error con id alumno")
        return 
    }
    console.log(idCurso, idAlumno)
    let respuesta=await fetch(`/api/alumnos/${idAlumno}/curso/${idCurso}`,{
        method:"post", 

    })
    if(respuesta.status>=400){
        let {error}=await respuesta.json()
        alert(error)
        return 
    }
    window.location.reload()
}