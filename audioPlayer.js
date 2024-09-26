// audioPlayer.js
let player;
const videoId = "Rsv2VkoIpk0"; // Reemplaza con el ID del video de YouTube que deseas usar

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', // Altura cero para hacerlo invisible
        width: '0', // Anchura cero para hacerlo invisible
        videoId: videoId,
        playerVars: {
            'autoplay': 1, // Reproduce automáticamente
            'controls': 0, // Sin controles visibles
            'mute': 0 // Mute desactivado si deseas escuchar
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo(); // Inicia la reproducción
}
