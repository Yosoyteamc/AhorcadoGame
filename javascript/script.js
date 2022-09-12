let palabras = ["memoria","java","alarma","fresa","limon","pecera","windows","ala","gamer","codigo","color","pieza","arbol","estacion","robot","pelea","cosmos","naranja"];
let letraspresionadaincorrecta = [];
let letraspresionadacorrecta = [];
let palabra = "";
let countglobal = 0;
let recibir = true;
let incorrecto = 1;
var color = "white";

function limpiarVariables(){
    palabra = "";
    letraspresionadaincorrecta = [];
    letraspresionadacorrecta = [];
    countglobal = 0;
    recibir = true;
    incorrecto=1;
    document.getElementById("btn-wf").value = "Rendirse";
}

function getRandomIntInclusive(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return  Math.floor(Math.random() * (max - min + 1) + min);
}

function dibujarOrca(){
    var canvas = document.getElementById("canva-picture");
    var pincel = canvas.getContext("2d");
    canvas.width=canvas.width;

    //visualizar el tamaño del canvas creado por defecto
    //console.log(canvas.width + " " + canvas.height);

    pincel.moveTo(75,130);
    pincel.lineTo(225,130);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    pincel.moveTo(112.5,130);
    pincel.lineTo(112.5,20);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    pincel.moveTo(132.5,20);
    pincel.lineTo(112.5,40);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    pincel.moveTo(111,20);
    pincel.lineTo(187.5,20);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    return;
}

function dibujarLineas(lineas){
    var canvas = document.getElementById("canva-word");
    var pincel = canvas.getContext("2d");
    canvas.width=canvas.width;
          
    let x = 0;
    let x2 = 37.5;

    for(var i=0; i<lineas; i++){

        pincel.moveTo(x+2,95);
        pincel.lineTo(x2-5,95);
        pincel.lineWidth = 7;
        pincel.strokeStyle = "white";
        pincel.stroke();

        x = x2;
        x2 = x2 + 37.5;
    }

}

function dibujarMunheco(paso){
    var canvas = document.getElementById("canva-picture");
    var pincel = canvas.getContext("2d");

    switch (paso) {
        case 1:
            pincel.moveTo(187,20);
            pincel.lineTo(187,30);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 2:
            pincel.beginPath();
            pincel.arc(187,40,10,0,Math.PI*2,true); 
            pincel.closePath;
            pincel.stroke();
            break;
        case 3:
            pincel.moveTo(187,50);
            pincel.lineTo(187,90);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 4:
            pincel.moveTo(187,50);
            pincel.lineTo(170,75);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 5:
            pincel.moveTo(187,50);
            pincel.lineTo(204,75);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 6: 
            pincel.moveTo(187,90);
            pincel.lineTo(204,115);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke(); 
            break;
        case 7:
            pincel.moveTo(187,90);
            pincel.lineTo(170,115);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
        default:
          console.log('No hay mas movimientos.');
          break;
      }
}

function dibujarLetras(letra, posicion, enlinea, color){
    var canvas = document.getElementById("canva-word");
    var pincel = canvas.getContext("2d");

    if(enlinea){
        pincel.font="bold 70px Rubik, serif";
        pincel.fillStyle = color;
        if(letra != "i"){
            pincel.fillText(letra.toUpperCase(),(37.5*posicion)+3,80,25);
            return;
        }
        else{
            pincel.fillText(letra.toUpperCase(),(37.5*posicion)+10,80,10);
            return;
        }
    }
    else{
        pincel.font="bold 25px Rubik, serif";
        pincel.fillStyle = "white";      
        pincel.fillText(letra.toUpperCase(),(15*countglobal),148,10);
        countglobal++;
        return
    }
}

function recibirLetras(letra){      
    let countincorrecta = false;
    let countcorrecta = false;

    if(letraspresionadacorrecta.length!=0){
        for(var i = 0;i < letraspresionadacorrecta.length; i++){
            if(letra==letraspresionadacorrecta[i]){
                countcorrecta = true;
            }
        }
    }
    if(countcorrecta === true){return;}
    if(countcorrecta === false){
        for(var i = 0; i<palabra.length; i++){
            if(letra == palabra[i]){
                countincorrecta = true;
                letraspresionadacorrecta.push(letra);
                dibujarLetras(letra,i,true,"white");
                if(letraspresionadacorrecta.length == palabra.length){
                    for(var i = 0; i<palabra.length; i++){
                        dibujarLetras(palabra[i],i,true,"white");
                    }
                    MensajePantalla("Ganaste, la palabra era: ",palabra);
                    //alert("Ganaste, la palabra era: " + palabra);
                    recibir = false;
                    return;
                }
            }
        }
    }
    if(countincorrecta  === false){
        let countaux = false;
        if(letraspresionadaincorrecta.length!=0){
            for(var i = 0; i<letraspresionadaincorrecta.length; i++){
                if(letra==letraspresionadaincorrecta[i]){
                    countaux = true;
                }
            }
            if(countaux === false){
                dibujarLetras(letra,i,false,"white");
                letraspresionadaincorrecta.push(letra);
                dibujarMunheco(incorrecto);
                incorrecto++;
                if(letraspresionadaincorrecta.length>6){
                    for(var i = 0; i<palabra.length; i++){
                        dibujarLetras(palabra[i],i,true,"red");  
                    }
                    MensajePantalla("Perdiste, la palabra era: ",palabra);
                    //alert("Perdiste, la palabra era: " + palabra);
                    recibir = false;
                    return;
                } 
            }
        }
        else{
            letraspresionadaincorrecta.push(letra);
            dibujarLetras(letra,i,false,"white");
            dibujarMunheco(incorrecto);
            incorrecto++;
        }
    }

    countincorrecta = false;
    countcorrecta = false;

    //Imprirmir lo que hay en las listas de letras: correctas e incorrectas.     
/*     console.log("Letra correctas");
    console.log(letraspresionadacorrecta);
    console.log("Letra incorrectas");
    console.log(letraspresionadaincorrecta);  */

}

function enviarLetraMovil(){
    var letramobile = String(document.querySelector(".view-ingame__text-mobile").value);
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if(pattern.test(letramobile)){
        if(recibir){
            recibirLetras(letramobile.toLowerCase());
        }
    }
    else{
        MensajePantalla("Por favor ingrese letras",""); 
        document.querySelector(".view-ingame__text-mobile").focus();     
        //alert("Por favor ingrese letras")
        }
    document.querySelector(".view-ingame__text-mobile").value = "";

}

function esperarLetras(){
    document.addEventListener('keyup', (event) => {
        var keyName = event.key;
        var KeyCode = event.keyCode; 
        const pattern = new RegExp('^[A-Z]+$', 'i');

        if(KeyCode >= 65 && KeyCode <=90){
            //Imprime la letra presionada
            //console.log(keyName);
            if(pattern.test(keyName)){
                if(recibir){
                    recibirLetras(keyName);
                }
            }
        }
      }, false);
}

function jugar(){

    limpiarVariables();
    //Imprimir la cantidad de palabras que hay para adivinar. 
    //console.log("la cantidad de palabras son: " + palabras.length);

    palabra = palabras[getRandomIntInclusive(0,palabras.length-1)];
    //Imprimir la palabra a adivinar.
    //console.log(palabra);
    
    dibujarLineas(palabra.length);
    dibujarOrca();
    esperarLetras(); 
}

function rendirse(){
    if(recibir){    
        for(var i = 0; i<palabra.length; i++){
            dibujarLetras(palabra[i],i,true,"Yellow");
        }
        MensajePantalla("Te rendiste, la palabra era: ",palabra);
        //alert("Te rendiste, la palabra era: " + palabra);
        recibir = false;
        document.getElementById("btn-wf").value = "Salir";
    }
    else{
        pantallaInicio();       
    }
}

function agregarPalabra(){
    var palabranueva = document.getElementById("text-add-word").value;
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if(pattern.test(palabranueva)){
        if((palabranueva.length>=3) && (palabranueva.length<=8)){
            palabras.push(palabranueva);
            MensajePantalla("La palabra: '" + palabranueva + "' se agregó","");
            //alert("La palabra se agregó.");
        }
        else{
            MensajePantalla("La palabra no puede ser agregada. ","Lee las condiciones");
            //alert("La palabra no puede ser agregada. lee las condiciones");
        }
    }
    else{
        MensajePantalla("La palabra no puede ser agregada. ","Lee las condiciones");
        //alert("La palabra no puede ser agregada.");
        }
    
    document.getElementById("text-add-word").value = "";

}

function MensajePantalla(texto,textoespecial){
    var modalpantalla = document.querySelector(".view-modal");
    modalpantalla.style.display = "flex";

    document.querySelector("#modal-message").textContent = texto;
    document.getElementById("modal-message__span").textContent = textoespecial;
    document.querySelector(".view-modal__message").focus();
}

function MensajeOcultoPantalla(){
    var modalpantalla = document.querySelector(".view-modal");
    modalpantalla.style.display = "none";
}


function pantallaAgregarPalabra(){
    var btnlogin = document.querySelector(".view-main__btn-login");
    var btnadd = document.querySelector(".view-main__word");
    btnlogin.style.display = "none";
    btnadd.style.display = "flex";
}

function pantallaInicio(){
    var btnlogin = document.querySelector(".view-main__btn-login");
    var btnadd = document.querySelector(".view-main__word");
    var pantallaJuego = document.querySelector(".view-ingame");
    var pantallaInicio = document.querySelector(".view-main");
    pantallaInicio.style.display = "flex";
    pantallaJuego.style.display = "none"
    btnlogin.style.display = "flex";
    btnadd.style.display = "none"

    document.getElementById('modal').classList.remove('view-modal--scale');
}

function pantallaJugar(){
    var pantallaInicio = document.querySelector (".view-main");
    var pantallaJuego = document.querySelector(".view-ingame");
    pantallaInicio.style.display = "none";
    pantallaJuego.style.display = "flex"

    document.getElementById('modal').classList.add('view-modal--scale');

    jugar();
}

