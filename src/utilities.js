import dayjs from 'dayjs';

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

export {html, getYear, getMonth, getDay, getMonthName, getTime, getDuration};
