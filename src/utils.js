import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date){
  return dayjs(date).format('MMM DD');
}

function formatTime(date){
  return dayjs(date).format('HH:mm');
}

export {getRandomArrayElement, formatDate, formatTime};
