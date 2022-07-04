import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);
const STORAGE_TIME = 'videoplayer-current-time';
// метод .on відстежує подію timeupdate ( тротлом уповільнємо безіменну функцію, яка приймає значення
// події timeupdate у змінну moveTime)
// в localStorage записуємо властивість seconds, яка знаходиться у об'єкта moveTime.
player.on(
  'timeupdate',
  throttle(function (moveTime) {
    localStorage.setItem(STORAGE_TIME, moveTime.seconds);
  }, 1000)
);
//перевірка чи пустий сторедж, якщо не пустий то плеєру вказуємо початковий час
const savedData = localStorage.getItem(STORAGE_TIME);
if (savedData) {
  player.setCurrentTime(savedData);
}
