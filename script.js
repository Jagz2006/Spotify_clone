

const songs = [
  {
    name: "Track 1 - Sample Song",
    file: "song1.mp3",
    thumbnail: "thumb1.jpg",
  },
  {
    name: "Track 2 - Another Tune",
    file: "song2.mp3",
    thumbnail: "thumb2.jpg",
  },
];

let currentSong = 0;
const audioPlayer = document.getElementById("audioPlayer");
const masterPlay = document.getElementById("masterPlay");
const progressBar = document.getElementById("progressBar");
const songElements = document.querySelectorAll(".song");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const songTitle = document.getElementById("songTitle");
const volumeSlider = document.getElementById("volumeSlider");

function loadSong(index) {
  currentSong = index;
  audioPlayer.src = songs[index].file;
  songTitle.textContent = songs[index].name;
  audioPlayer.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
}

masterPlay.addEventListener("click", () => {
  if (audioPlayer.paused || audioPlayer.currentTime <= 0) {
    audioPlayer.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioPlayer.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

songElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    loadSong(index);
  });
});

audioPlayer.addEventListener("timeupdate", () => {
  const progress = parseInt(
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  );
  progressBar.value = progress || 0;
});

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = (progressBar.value * audioPlayer.duration) / 100;
});

prev.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

next.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});
