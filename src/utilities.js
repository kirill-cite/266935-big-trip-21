import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';

dayjs.extend(durationPlugin);

/**
 * @param {dayjs.ConfigType} value
 * @returns {string}
 */
function formatDate(value) {
  return dayjs(value).format('MMM D');
}

/**
 * @param {dayjs.ConfigType} value
 * @returns {string}
 */
function formatTime(value){
  return dayjs(value).format('HH:mm');
}

/**
 * @param {dayjs.ConfigType} valueFrom
 * @param {dayjs.ConfigType} valueTo
 * @returns {string}
 */
function formatDuration(valueFrom, valueTo){
  const ms = dayjs(valueTo).diff(valueFrom);
  const duration = dayjs.duration(ms);

  if (duration.days()){
    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()){
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}

console.log(formatDuration('2023-03-18T13:00Z', '2023-03-18T14:00Z'));

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {string}
 */
function html(strings, ...values) {
  return strings.reduce((before, after, index) => {
    const value = values[index - 1];

    if (value === undefined) {
      return before + after;
    }

    if (Array.isArray(value)) {
      return before + value.join('') + after;
    }

    return before + value + after;
  });
}

/**
 * @param {string} date
 * @returns {string}
 */
function getYear(date){
  return dayjs(date).format('YYYY');
}

/**
 * @param {string} date
 * @returns {string}
 */
function getMonth(date){
  return dayjs(date).format('MM');
}

/**
 * @param {string} date
 * @returns {string}
 */
function getDay(date){
  return dayjs(date).format('DD');
}

/**
 * @param {string} date
 * @returns {string}
 */
function getMonthName(date){
  return dayjs(date).format('MMM');
}

/**
 * @param {string} date
 * @returns {string}
 */
function getTime(date){
  return dayjs(date).format('HH:mm');
}

/**
 * @param {string} dateFrom
 * @param {string} dateTo
 * @returns {string}
 */
function getDuration(dateFrom, dateTo) {
  const totalMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes % 60;

  if (days) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  if (hours) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  return `${String(minutes).padStart(2, '0')}M`;
}

export {html,
  formatDate,
  formatTime,
  formatDuration,
  getYear, getMonth, getDay, getMonthName, getTime, getDuration};
