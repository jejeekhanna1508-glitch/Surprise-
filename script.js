
const scenes = [...document.querySelectorAll(".scene")];
const progress = document.getElementById("progress");
const sky = document.getElementById("sky");
const confettiLayer = document.getElementById("confetti");

let currentScene = 1;
let heartTimer;

function showScene(number) {
  currentScene = number;

  scenes.forEach((scene, index) => {
    scene.classList.toggle("active", index === number - 1);
  });

  progress.style.width = (number / scenes.length * 100) + "%";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (number === 5) {
    celebrate();
  }
}

// Next chapter buttons
document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    const next = Number(button.dataset.next);
    showScene(next);
  });
});

// Open the apology letter's next chapter
document.getElementById("openLetterBtn").addEventListener("click", () => {
  showScene(4);
});

// Shalu wants to try again
document.getElementById("yesBtn").addEventListener("click", () => {
  showScene(5);
});

// Shalu needs more time
document.getElementById("timeBtn").addEventListener("click", () => {
  showScene(6);
});

// Floating hearts and petals
function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "falling-heart";

  const emojis = ["💗", "💕", "🌸", "💖", "✨", "🤍"];
  heart.textContent = emojis[
    Math.floor(Math.random() * emojis.length)
  ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";

  sky.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

// Celebration confetti
function celebrate() {
  const emojis = ["💗", "💕", "✨", "🌸", "💖", "🎀"];

  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.textContent = emojis[
        Math.floor(Math.random() * emojis.length)
      ];

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.fontSize = (14 + Math.random() * 18) + "px";
      piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";

      confettiLayer.appendChild(piece);

      piece.addEventListener("animationend", () => piece.remove());
    }, i * 45);
  }
}

// Giant teddy hug
document.getElementById("hugBtn").addEventListener("click", () => {
  const message = document.getElementById("hugMessage");

  message.textContent =
    "Sending the biggest teddy hug ever to my Shalu ma! 🧸💗 " +
    "A million virtual kisses too! 😘";

  celebrate();
});

// Replay from the beginning
function replayStory() {
  document.getElementById("hugMessage").textContent = "";
  showScene(1);
}

document.getElementById("replayBtn").addEventListener("click", replayStory);
document.getElementById("replayBtn2").addEventListener("click", replayStory);

// Keep the background alive
heartTimer = setInterval(createFloatingHeart, 650);

for (let i = 0; i < 14; i++) {
  setTimeout(createFloatingHeart, i * 220);
}
