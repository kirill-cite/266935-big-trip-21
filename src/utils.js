import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';

dayjs.extend(durationPlugin);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date){
  return dayjs(date).format('MMM DD');
}

function formatTime(date){
  return dayjs(date).format('HH:mm');
}

function formatDuration(dateFrom, dateTo){
  const ms = dayjs(dateTo).diff(dateFrom);
  const duration = dayjs.duration(ms);

  if (duration.days()){
    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()){
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}

export {getRandomArrayElement, formatDate, formatTime, formatDuration};
