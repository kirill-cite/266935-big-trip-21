import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date){
  return dayjs(date, 'DD');
}

export {getRandomArrayElement, formatDate};
