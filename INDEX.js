let art = document.querySelector('.art');
let curr_playing = document.querySelector('.curr-playing');
let artist = document.querySelector('.artist');
let song_name = document.querySelector('.song-name');

let prev_track = document.querySelector('.prev-track');
let pp = document.querySelector('.pp');
let next_track = document.querySelector('.next-track');
let playPause_track = document.querySelector('.playPause-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.vol-slider');
let current_time = document.querySelector('.current-time');
let total_time = document.querySelector('.total-time');
let wave = document.getElementById('wave');
let ff = document.getElementById('fa');
// creatiing audio element
let curr_track = document.createElement('audio');
//
// let track_idx=0;
// let isPlaying=false;
// let isRandom=false;
// let updateTimer;

const currentTime = function (e) {
  const minutes = Math.floor(e / 60);
  const seconds = Math.floor(e - minutes * 60);
  //   console.log(seconds);

  if (seconds < 10 && minutes < 10) {
    document.getElementById('current-time').innerHTML = `0${minutes}:0${seconds}`;
  } else if (seconds > 10 || minutes < 10) {
    document.getElementById('current-time').innerHTML = `0${minutes}:${seconds}`;
  } else if (seconds < 10 && minutes > 10) {
    document.getElementById('current-time').innerHTML = `${minutes}:0${seconds}`;
  } else if (seconds > 10 && minutes > 10) {
    document.getElementById('current-time').innerHTML = `${minutes}:${seconds}`;
  }
  if (audioElement.currentTime === audioElement.duration) {
    next_track.click();
  }
};
const music_list = [
  {
    img: './png/cover.jpg',
    name: 'love',
    artist: 'Shubh',
    music: './songs/kapil0.mp3',
  },
  {
    img: './png/cover.jpg',
    name: 'dil nal lare',
    artist: 'Ap Delleho',
    music: './songs/kapil1.mp3',
  },
  {
    img: './png/cover.jpg',
    name: 'mainu nahi pehchandi',
    artist: 'jerry',
    music: './songs/kapil2.mp3',
  },
  {
    img: './png/cover.jpg',
    name: 'kangna',
    artist: 'Abber ',
    music: './songs/kapil3.mp3',
  },
  {
    img: './png/cover.jpg',
    name: 'offshore',
    artist: 'Shubh',
    music: './songs/kapil4.mp3',
  },
  {
    img: './png/cover.jpg',
    name: 'Udd Gya',
    artist: 'B prak',
    music: './songs/kapil5.mp3',
  },
  {
    img: './png/cover.jpg',
    name: 'sip sip',
    artist: 'Jasmin sandles',
    music: './songs/kapil6.mp3',
  },
];

let songIndex = 0;
let slider = document.getElementById('seek-slider');
let vol = document.getElementById('vol-slider');

let audioElement = new Audio(`./songs/kapil${songIndex}.mp3`);

setTimeout(() => {
  changeTotalTime(audioElement.duration);
  audioElement.currentTime = (slider.value / slider.max) * audioElement.duration;
}, 100);

ff.addEventListener('click', () => {
  if (audioElement.volume > 0) {
    audioElement.volume = 0;
    ff.classList.remove('fa-volume-up');
    ff.classList.remove('fa');
    ff.classList.add('fas');
    ff.classList.add('fa-volume-mute');
  } else {
    ff.classList.remove('fas');
    ff.classList.remove('fa-volume-mute');
    ff.classList.add('fa-volume-up');
    ff.classList.add('fa');
    audioElement.volume = vol.value / 100;
  }
});
vol.addEventListener('click', () => {
  audioElement.volume = vol.value / 100;
  if (audioElement.volume == 0) {
    ff.classList.remove('fa-volume-up');
    ff.classList.remove('fa');
    ff.classList.add('fas');
    ff.classList.add('fa-volume-mute');
  } else {
    ff.classList.remove('fas');
    ff.classList.remove('fa-volume-mute');
    ff.classList.add('fa-volume-up');
    ff.classList.add('fa');
    audioElement.volume = vol.value / 100;
  }
});
slider.addEventListener('click', () => {
  audioElement.currentTime = (slider.value / slider.max) * audioElement.duration;
  currentTime(audioElement.currentTime);
});
load_details(songIndex);

playPause_track.addEventListener('click', () => {
  load_details(songIndex);
  if (audioElement.paused || audioElement.currentTime <= 0) {
    art.classList.add('rotate');
    audioElement.play();
    setTimeout(() => {
      changeTotalTime(audioElement.duration);
    }, 10);
    audioElement.ontimeupdate = function () {
      currentTime(audioElement.currentTime);

      slider.value = (audioElement.currentTime / audioElement.duration) * 100;
    };
    pp.classList.remove('fa-play-circle');
    pp.classList.add('fa-pause-circle');
  } else {
    setTimeout(() => {
      changeTotalTime(audioElement.duration);
    }, 10);
    audioElement.ontimeupdate = function () {
      currentTime(audioElement.currentTime);

      slider.value = (audioElement.currentTime / audioElement.duration) * 100;
    };
    art.classList.remove('rotate');
    audioElement.pause();

    pp.classList.remove('fa-pause-circle');
    pp.classList.add('fa-play-circle');
  }
});

// playPause_track.addEventListener('click', () => {
//   art.classList.add('rotate');
//   load_details(songIndex);
//   setTimeout(() => {
//     changeTotalTime(audioElement.duration);
//   }, 10);
//   audioElement.play();

//   pp.classList.remove('fa-play-circle');
//   pp.classList.add('fa-pause-circle');
//   setTimeout(() => {
//     changeTotalTime(audioElement.duration);
//   }, 10);
//   art.classList.remove('rotate');
//   audioElement.pause();
//   pp.classList.remove('fa-pause-circle');
//   pp.classList.add('fa-play-circle');
// });
next_track.addEventListener('click', () => {
  if (songIndex == music_list.length - 1) {
    audioElement.pause();
    songIndex = 0;

    audioElement = new Audio(`./songs/kapil${songIndex}.mp3`);

    setTimeout(() => {
      changeTotalTime(audioElement.duration);
    }, 10);
    audioElement.ontimeupdate = function () {
      currentTime(audioElement.currentTime);

      slider.value = (audioElement.currentTime / audioElement.duration) * 100;
    };
    audioElement.play();
    load_details(songIndex);
    art.classList.add('rotate');
    return;
  }
  if (songIndex < music_list.length - 1) {
    audioElement.pause();
    songIndex++;

    audioElement = new Audio(`./songs/kapil${songIndex}.mp3`);
    setTimeout(() => {
      changeTotalTime(audioElement.duration);
    }, 10);
    audioElement.ontimeupdate = function () {
      currentTime(audioElement.currentTime);

      slider.value = (audioElement.currentTime / audioElement.duration) * 100;
    };
    audioElement.play();
    load_details(songIndex);
    art.classList.add('rotate');
  }
});
prev_track.addEventListener('click', () => {
  if (songIndex == 0) {
    audioElement.pause();
    songIndex = music_list.length;
    audioElement = new Audio(`./songs/kapil${songIndex}.mp3`);
    setTimeout(() => {
      changeTotalTime(audioElement.duration);
    }, 10);
    audioElement.play();
    audioElement.ontimeupdate = function () {
      currentTime(audioElement.currentTime);

      slider.value = (audioElement.currentTime / audioElement.duration) * 100;
    };
    load_details(songIndex);
    art.classList.add('rotate');
    return;
  }
  if (songIndex > 0) {
    audioElement.pause();
    songIndex--;
    audioElement = new Audio(`./songs/kapil${songIndex}.mp3`);
    setTimeout(() => {
      changeTotalTime(audioElement.duration);
    }, 10);
    audioElement.play();
    audioElement.ontimeupdate = function () {
      currentTime(audioElement.currentTime);

      slider.value = (audioElement.currentTime / audioElement.duration) * 100;
    };
    load_details(songIndex);
    art.classList.add('rotate');
  }
});

function load_details(index) {
  // curr_playing.scr= music_list[index].music;

  art.style.backgroundImage = `url( " ${music_list[index].img} ")`;

  song_name.textContent = music_list[index].artist;
  artist.textContent = music_list[index].name;

  curr_playing.textContent = `Playing music        ${index + 1}        of       ${music_list.length}`;
}
const changeTotalTime = function (duration) {
  const minutes = Math.floor(audioElement.duration / 60);
  const seconds = Math.floor(audioElement.duration - minutes * 60);
  //   console.log(seconds);

  if (seconds < 10 && minutes < 10) {
    document.getElementById('total-time').innerHTML = `0${minutes}:0${seconds}`;
  } else if (seconds > 10 || minutes < 10) {
    document.getElementById('total-time').innerHTML = `0${minutes}:${seconds}`;
  } else if (seconds < 10 && minutes > 10) {
    document.getElementById('total-time').innerHTML = `${minutes}:0${seconds}`;
  } else if (seconds > 10 && minutes > 10) {
    document.getElementById('total-time').innerHTML = `${minutes}:${seconds}`;
  }
};

// loadTrack(track_idx);

// function loadTrack(track_idx){
//     clearInterval(updateTimer);
//     reset();
//     curr_track.scr= music_list[track_idx].music;
//     curr_track.load();
//     art.style.backgroundImage = `url( " ${music_list[track_idx].img} ")`;

// song_name.textContent=music_list[track_idx].artist;
// artist.textContent=music_list[track_idx].name;

// curr_playing.textContent =  `Playing music        ${track_idx + 1}        of       ${music_list.length}`

// // setinterval runs an callback after an given time
// updateTimer = setInterval(setUpdate, 100);
// curr_track.addEventListener('ended',nextTrack);
// }
// function reset(){
//     current_time.textContent = "00:00";
//     total_time.textContent = "00:00";
//     seek_slider.value = 0;
// }
// function setUpdate(){
//     let seekPosition = 0;
//     if(!isNaN(curr_track.duration)){
//         seekPosition = curr_track.currentTime * (10 / curr_track.duration);
//         seek_slider.value = seekPosition;

//         let currentMinutes = Math.floor(curr_track.currentTime / 60);
//         let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
//         let durationMinutes = Math.floor(curr_track.duration / 60);
//         let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

//         if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
//         if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
//         if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
//         if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

//         current_time.textContent = currentMinutes + ":" + currentSeconds;
//         total_duration.textContent = durationMinutes + ":" + durationMinutes;
//     }
// }
// function nextTrack(){
//     if(track_idx < music_list.length - 1 && isRandom === false){
//         track_idx += 1;
//     }else if(track_idx < music_list.length - 1 && isRandom === true){
//         let random_index = Number.parseInt(Math.random() * music_list.length);
//         track_idx = random_index;
//     }else{
//         track_idx = 0;
//     }
//     loadTrack(track_idx);
//     playTrack();
// }

// // for play btn///////////////////////////////////////////////////////
// function playPauseTrack(){
//     isPlaying ? pauseTrack() : playTrack();
// }
// function playTrack(){
//     curr_track.play();
//     isPlaying = true;
//     // track_art.classList.add('rotate');
//     // wave.classList.add('loader');
//     playPause_track.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
// }
// function pauseTrack(){
//     curr_track.pause();
//     isPlaying = false;
//     // track_art.classList.remove('rotate');
//     // wave.classList.remove('loader');
//     playPause_track.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
// }
// /////////////////////////////////////////////////////////////////
// //for random btn
// function rendomTrack(){
//     isRandom ? pauseRandom() : playRandom();
// }
// function playRandom(){
//     isRandom = true;
//     // randomIcon.classList.add('randomActive');
// }
// function pauseRandom(){
//     isRandom = false;
//     // randomIcon.classList.remove('randomActive');
// }
// ////////////////////////////////////////////////////////////////
// //repeat btn
// function repeatTrack(){
//     let current_index = track_idx;
//     loadTrack(current_index);
//     playTrack();
// }

// /////////////////////////////////////////////////////////////////
// // next track
// function nextTrack(){
//     if(track_idx < music_list.length - 1 && isRandom === false){
//         track_idx += 1;
//     }else if(track_idx < music_list.length - 1 && isRandom === true){
//         let random_index = Number.parseInt(Math.random() * music_list.length);
//         track_idx = random_index;
//     }else{
//         track_idx = 0;
//     }
//     loadTrack(track_idx);
//     playTrack();
// }

// // ///////////////////////////////////////////////////////////////
// //prev track
// function prevTrack(){
//     if(track_idx > 0){
//         track_idx -= 1;
//     }else{
//         track_idx = music_list.length -1;
//     }
//     loadTrack(track_idx);
//     playTrack();
// }

// ///////////////////////////////////////////
// // volume and song length
// function seekTo(){
//     let seekto = curr_track.duration * (seek_slider.value / 10);
//     curr_track.currentTime = seekto;
// }
// function setVolume(){
//     curr_track.volume = volume_slider.value / 10;
// }
