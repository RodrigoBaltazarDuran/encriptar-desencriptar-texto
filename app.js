// Variables
const textoEntrada = document.getElementById("textoEntrada");
const textoSalida = document.getElementById("textoSalida");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const encriptadorIlustrativo = document.getElementById("encriptadorIlustrativo");
const encriptadorResultado = document.getElementById("encriptadorResultado");
const alerta = document.getElementById("alerta");

// Lista de vocales a encriptar
const vocalesEncriptar = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
}

// Eventos
btnEncriptar.addEventListener("click", () => {
    const textoValido = validarTexto();
    if (textoValido) {
        let textoEncriptado = encriptar(textoEntrada.value.trim());
        textoSalida.textContent = textoEncriptado;
        cambiarDivs()
        return   
    }
    mostrarAlerta()
})

btnDesencriptar.addEventListener("click", () => {
    const textoValido = validarTexto();
    if (textoValido) {
        let textoDesencriptar = desencriptar(textoEntrada.value.trim());
        textoSalida.textContent = textoDesencriptar;
        cambiarDivs()
        return   
    }
    mostrarAlerta()
})

// Esta funcionalidad de copiar probablemente no funcione en todos los navegadores, se recomienda hacerlo en chrome
btnCopiar.addEventListener("click", () => {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById('textoSalida').innerHTML);
    console.log(aux)
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
})

// Funciones
function validarTexto () {
    const arrayTexto = textoEntrada.value.split('');
    for (let i = 0; i < arrayTexto.length; i++) {
        const textoValido = (arrayTexto[i].charCodeAt(0) > 96 && arrayTexto[i].charCodeAt(0) < 123) || arrayTexto[i].charCodeAt(0) === 32;
        if (!textoValido) {
            return false;
        }
    }
    return true;
}

function encriptar (texto) {
    let textoEncriptado = "";
    const tratarTexto = texto.split('');
    tratarTexto.forEach(element => {
        if(Object.keys(vocalesEncriptar).includes(element)) {
            textoEncriptado += vocalesEncriptar[element];
        } else {
            textoEncriptado += element
        }
    });
    return textoEncriptado
}

function desencriptar (texto) {
    for (const key in vocalesEncriptar) {
        const reg = new RegExp(`${vocalesEncriptar[key]}`, "gi")
        let textoTransformado = texto.replace(reg, key);
        texto = textoTransformado
    }
    return texto;
}

function cambiarDivs () {
    encriptadorIlustrativo.classList.add("ocultar")
    encriptadorResultado.classList.remove("ocultar")
}

function mostrarAlerta () {
    alerta.classList.remove("ocultar");
    setTimeout(() => {
        alerta.classList.add("ocultar");
    }, 2000);
}
