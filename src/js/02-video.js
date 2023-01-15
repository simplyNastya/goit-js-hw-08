import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('iframe');

const player = new Player(iframeEl);

function handleTimeUpdate (event) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(event.seconds))
};

player.on('timeupdate', throttle (handleTimeUpdate, 1000));

player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));



