// Hide text and weapons

document.getElementById("spaceid").style.visibility = "hidden";

//Count down
let countdownTimeout;
startCountdown();

function startCountdown() {
  let i = 15;
  
  if (countdownTimeout) {
    clearTimeout(countdownTimeout);
  }
  function count() {
    document.getElementById("timer").innerHTML = i;
    if (i > 0 && document.getElementById("health").value > 0) {
      i--;
      countdownTimeout = setTimeout(count, 1000);
    } else {
      countdownTimeout = null;

      if (i <= 0) {
        window.location.href = "./final_gameover.html";
      } 
      }
      
    }
    count();
    }

  
  
 



// Clicker and life
let button = ["monster-button","monster-button-child", "monster-button-boss"]
let position_button=0;
let position_dany = 0;
let coins = 0;
let y = 0
let dany = [30,15,5,40];
let time2 = 4000;
let increment = 500;
let doublestrike=0;
let music = 0;
  document.getElementById(button[position_button]).addEventListener("click", iterate)
  function iterate(){

    if(doublestrike >0) {
      position_dany++
      doublestrikeEffect();
    }
    if(music===0) {
      firstenemy();
      music++
    }
    y += 1 // y = y +1
    coins = coins + Math.round(y/10 + Math.random()*10);
    document.getElementById("counter").innerHTML = y;
    document.getElementById( 'health').value-= dany[position_dany]; // value = value - dany
    document.getElementById("coins").innerHTML = coins ; 
    showDamageEffect();
    showSlashEffect();  
    if(doublestrike >0) {
      doublestrike--;
      position_dany--;
    }
    
    if(document.getElementById("health").value <= 0 && position_button > 1) {
      window.location.href = "./final_winner.html";}

  


// Change monster 

    let health2 = document.getElementById("health").value;
    if (health2 <=0 && position_button < 2) {
      
      position_button++;
      document.getElementById("monster-button").style.display = "none";
    document.getElementById("monster-button-child").style.display = "block";
    document.getElementById( 'health').value = 500;
    position_dany++
    document.getElementById(button[position_button]).addEventListener("click", iterate);
    i=15;
    document.getElementById("timer").innerHTML = i ;
    startCountdown()
    
    
    }
    if (health2 <=0 && position_button >1) {
      
      document.getElementById("monster-button-child").style.display = "none";
      document.getElementById("monster-button-boss").style.display = "block";
      document.getElementById( 'health').value = 500;
      document.getElementById(button[position_button]).addEventListener("click", iterate);
      i=15;
      document.getElementById("timer").innerHTML = i ;
      let h=1;
    startCountdown()
   
    
    // regenerate life
    setTimeout(function(){
     
      const missatge = document.querySelector(".space1 h3");
      document.getElementById( 'health').value+= 100;
      document.documentElement.style.setProperty("--big_size_height", "400px");
      document.documentElement.style.setProperty("--big_size_width", "400px");
      document.getElementById("spaceid").style.visibility = "visible";
      missatge.style.animation = 'none'; // Primero se elimina la animación
      missatge.offsetHeight;  
      missatge.style.animation = 'health_anim 3s ease-out forwards';
      setTimeout(() => {
        missatge.style.display = "none"; // o visibility: hidden;
      }, 1500);
        
      
      }, 7000);
      
    
    }

  }
  





// Slash effect

function showSlashEffect() {

    const monster = document.getElementById(button[position_button]);
    const slash = document.createElement("div");
    slash.classList.add("slash-anim");
  
    monster.appendChild(slash); // Añade el efecto sobre el footer
  
    setTimeout(() => {
      slash.remove(); // Limpia después de animar
    }, 300);
  }


// Weapon poison

function shop() {
  document.getElementById("weapon1").addEventListener("click", function() {
    if (coins >=150) {
      coins -= 150;
      document.getElementById("coins").innerHTML = coins;

    let secondsPassed = 0;
    const interval = setInterval(() => {
      document.getElementById('health').value -= 20;
      secondsPassed++;
      if(document.getElementById("health").value <= 0) {
        window.location.href = "./final_winner.html";

      }
      poisonEffect();
      if (secondsPassed >= 10) {
        clearInterval(interval); // Detener después de 10 segundos
      }
    }, 1000); // Cada 1 segundo
  }
  });
}
shop();

// Weapon critical strike
function shop2() {
  document.getElementById("weapon2").addEventListener("click", function() {
    if (coins >=200) {
      coins -= 200;
      document.getElementById("coins").innerHTML = coins;
      let secondsPassed = 0;
      const interval = setInterval(() => {
        
        secondsPassed++;
      
        let value = Math.random()*10;
        if (value >=3) {
          
          doublestrike=1
        }
        if (secondsPassed >= 10) {
          clearInterval(interval); // Detener después de 10 segundos
        }
      }, 1000); // Cada 1 segundo

    
    
  }
  });
}
shop2();



// Light random 
class Blood {
    constructor() {
     this.img = document.createElement("img"); // Crear una nova imatge
      this.img.src = "./resources/images/png/light.png";
      this.img.width = 50;
      this.img.height = 60;
      this.img.classList.add("blood");
      this.img.style.position = "absolute"
      document.querySelector(".space").appendChild(this.img);
      this.randomPosition();
      this.img.addEventListener('click', this.addCoins.bind(this));
      
    }
    randomPosition() {
       
      let top = Math.floor(Math.random()* 200)
      let left = Math.floor(Math.random()*1000)
      this.img.style.top = top +"px";
      this.img.style.left = `${left}px`;
      time2 = time2- increment;
    }
    // Añadimos coins cuando se presiona la imagen
  addCoins() {
    let coinAmount = Math.round(Math.random()*11);  // Definimos que se añaden 10 monedas por cada clic en la luz.
    coins += coinAmount;  // Aumentamos el total de monedas.
    document.getElementById("coins").innerHTML = coins;  // Actualizamos el número de monedas en el HTML.
    const audio = document.getElementById("myAudio-bird");
    audio.play();
    // Opcionalmente, podemos eliminar la luz una vez que se ha hecho clic en ella
    this.img.remove();  // Elimina la imagen de la luz después de hacer clic en ella.
}
  }
  
  const guardarblood = new Blood();
  guardarblood.randomPosition();
  
  


  // Crear sang cada 3 segons si `health` > 0
  let interval = null;
  let counting =0;
  
  
   function clone() {
      
    if (interval !== null){
      return
    } else {
    interval = setInterval(function () {
    let health = document.getElementById("health").value;
    
    if (health > 0) {
      new Blood(); // Crear una nova sang a una posició aleatòria
      counting++
      increment = increment +500;

      
      
      if (counting >14) {
        clearInterval(interval);
      }
     
    } 
    
        
       // Atura la creació quan `health` arriba a 0
    
  }, time2);}
   }
   window.addEventListener("DOMContentLoaded", () => {
    clone();
  });
 
  // Damage effect

  function showDamageEffect() {
    const overlay = document.querySelector('.damage-overlay');
    overlay.style.opacity = 1;
  
    setTimeout(() => {
      overlay.style.opacity = 0;
    }, 300); // duración del efecto
  }
  
  // Poison effect

  function poisonEffect() {

    const overlay = document.querySelector('.poison-overlay');
    document.getElementById("poisonstyle").style.display = "block";
    overlay.style.opacity = 0.7;
    
    overlay.style.animation = "none";
    overlay.offsetHeight; // forza reflow
    overlay.style.animation = "poisoneffect 10s ease-out forwards";
    setTimeout(() => {
   
    }, 10000); 
     
      }

  // Double Strike effect

  function doublestrikeEffect() {
    const overlay2 = document.querySelector('.doublestrike-overlay');
    document.getElementById("doublestrike").style.display = "block";
    overlay2.style.opacity = 0.7;
    setTimeout(() => {
      document.getElementById("doublestrike").style.display = "none";
    }, 1000); 
    
  }

  //Audio bird

  function audiobird() {
    const audio = document.getElementById("myAudio-bird");
    audio.play();
    audio.currentTime = 0;
  }

  //Audio 1st enemy

  function firstenemy() {
    const audio = document.getElementById("myAudio-enemy");
    audio.currentTime = 0;
    audio.play();
   
  }