import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(durationPlugin);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


function formatDate(date){
  return dayjs(date).format('MMM DD');
}

function formatTime(date){
  return dayjs(date).format('hh:mm');
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

function isPointFuture(dateFrom) {
  return dayjs().isBefore(dateFrom);
}

function isPointPresent(dateFrom, dateTo) {
  return dayjs().isSameOrBefore(dateFrom) && dayjs().isSameOrAfter(dateTo);
}

function isPointPast(dateTo){
  return dayjs().isAfter(dateTo);
}

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortPointDay(pointA, pointB) {
  const weight = getWeightForNullDate(pointB.dateFrom, pointA.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function sortPointTime(pointA, pointB) {

  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

export { formatDate,
  formatTime,
  formatDuration,
  isPointFuture,
  isPointPresent,
  isPointPast,
  sortPointDay,
  sortPointTime,
  sortPointPrice };
