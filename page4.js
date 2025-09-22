let breathText = document.getElementById("breathText");
let circle = document.getElementById("circle");
let inhale = true;

setInterval(() => {
  inhale = !inhale;
  if (inhale) {
    breathText.innerText = "Inhale";
    circle.style.width = "150px";
    circle.style.height = "150px";
    circle.style.backgroundColor = "#4caf50"; 
  } else {
    breathText.innerText = "Exhale";
    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.backgroundColor = "#45a049"; 
  }
}, 2000); 

// timer
let startBtn = document.getElementById("startBtn");
let timeLeft = document.getElementById("timeLeft");
let timer;
let ambient = document.getElementById("ambient");

startBtn.onclick = function() {
  clearInterval(timer);
  let minutes = parseInt(document.getElementById("sessionLength").value);
  let seconds = minutes * 60;

  timer = setInterval(() => {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    timeLeft.innerText = m.toString().padStart(2,'0') + ":" + s.toString().padStart(2,'0');

    if(seconds <= 0){
      clearInterval(timer);
      alert("Session Complete!");
      incrementSessions();
    }
    seconds--;
  }, 1000);
}


let soundBtn = document.getElementById("soundBtn");
soundBtn.onclick = function() {
  if(ambient.paused){
    ambient.play();
    soundBtn.innerText = "Stop Sound";
  } else {
    ambient.pause();
    soundBtn.innerText = "Play Sound";
  }
}


function incrementSessions(){
  let sessions = parseInt(localStorage.getItem("sessions")) || 0;
  sessions++;
  localStorage.setItem("sessions", sessions);
  updateSessions();
}

function updateSessions(){
  let sessions = parseInt(localStorage.getItem("sessions")) || 0;
  document.getElementById("sessions").innerText = sessions;
}


updateSessions();
// footer
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("footer a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); 
      const text = link.textContent.trim();

      
      navigator.clipboard.writeText(text).then(() => {
        alert(`${text} copied to clipboard!`);
      });
    });
  });
});