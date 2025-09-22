var exercises = {
  back: { none: ["Superman Hold", "Reverse Snow Angels", "Inverted Rows"], 
  dumbbells: ["Bent Over Rows", "Single Arm Row", "Deadlift"] },
  shoulders: { none: ["Pike Push-ups", "Arm Circles", "Wall Handstand Hold"], 
  dumbbells: ["Shoulder Press", "Lateral Raises", "Front Raises"] },
  triceps: { none: ["Diamond Push-ups", "Bench Dips", "Close Grip Push-ups"], 
  dumbbells: ["Overhead Tricep Extension", "Kickbacks", "Dumbbell Close Press"] },
  legs: { none: ["Squats", "Lunges", "Glute Bridge"],
  dumbbells: ["Goblet Squats", "Dumbbell Lunges", "Romanian Deadlift"] },
  abs: { none: ["Crunches", "Leg Raises", "Plank"], 
  dumbbells: ["Russian Twists", "Weighted Sit-ups", "Dumbbell Side Bend"] }
};

var workout = [];
var current = 0;
var time = 30;
var timer;

function generateWorkout() {
  var bodyPart = document.getElementById("bodyPart").value;
  var equipment = document.getElementById("equipment").value;

  var arr = exercises[bodyPart][equipment];
  workout = [];
  while (workout.length < 3) {
    var r = arr[Math.floor(Math.random() * arr.length)];
    if (!workout.includes(r)) workout.push(r);
  }

  var list = document.getElementById("list");
  list.innerHTML = "";
  workout.forEach(ex => {
    var li = document.createElement("li");
    li.innerText = ex;
    list.appendChild(li);
  });

  document.getElementById("plan").style.display = "block";
  document.getElementById("exerciseName").innerText = "Press Start";
  document.getElementById("timer").innerText = "30";
  current = 0;
}

function startTimer() {
  if (workout.length === 0) return;

  clearInterval(timer);
  time = 30;
  document.getElementById("exerciseName").innerText = workout[current];
  document.getElementById("timer").innerText = time;

  timer = setInterval(function() {
    time--;
    document.getElementById("timer").innerText = time;

    if (time <= 0) {
      clearInterval(timer);
      document.getElementById("beep").play();
      current++;
      if (current < workout.length) {
        time = 30; 
        startTimer(); 
      } else {
        document.getElementById("exerciseName").innerText = "Workout Complete!";
      }
    }
  }, 1000);
}
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