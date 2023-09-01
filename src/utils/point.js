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

function isPointFuture(dateFrom) {
  return dayjs().isBefore(dateFrom);
}

function isPointPresent(dateFrom, dateTo) {
  return dayjs().isSameOrBefore(dateFrom) && dayjs().isSameOrAfter(dateTo);
}

function isPointPast(dateTo){
  return dayjs().isAfter(dateTo);
}

export { formatDate, formatTime, formatDuration, isPointFuture, isPointPresent, isPointPast };
