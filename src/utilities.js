
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
  const dateObj = new Date(date);
  return dateObj.getFullYear().toString();
}

/**
 * @param {string} date
 * @returns {string}
 */
function getMonthName(date){
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const dateObj = new Date(date);
  return months[dateObj.getMonth()];
}

/**
 * @param {string} date
 * @returns {string}
 */
function getMonthNumber(date){
  const dateObj = new Date(date);
  return (dateObj.getMonth() + 1).toString();
}

/**
 * @param {string} date
 * @returns {string}
 */
function getDate(date){
  const dateObj = new Date(date);
  return dateObj.getDate().toString();
}

/**
 * @param {string} date
 * @returns {string}
 */
function getHoursString(date){
  const dateObj = new Date(date);
  return dateObj.getUTCHours().toString().padStart(2,'0');
}

/**
 * @param {string} date
 * @returns {string}
 */
function getMinutesString(date){
  const dateObj = new Date(date);
  return dateObj.getMinutes().toString().padStart(2,'0');
}

/**
 * @param {string} dateFrom
 * @param {string} dateTo
 * @returns {string}
 */
function getDuration(dateFrom, dateTo){
  let duration = '';
  const dateFromObj = new Date(dateFrom);
  const dateToObj = new Date(dateTo);
  let remainTime = dateToObj.getTime() - dateFromObj.getTime();

  const days = Math.floor(remainTime / (1000 * 60 * 60 * 24));
  if (days > 0){
    duration += `${days}D `;
    remainTime = remainTime - days * (1000 * 60 * 60 * 24);
  }

  const hours = Math.floor(remainTime / (1000 * 60 * 60));
  if (hours > 0){
    duration += `${hours.toString().padStart(2, '0')}H `;
    remainTime = remainTime - hours * (1000 * 60 * 60);
  }else if (duration.includes('D')){
    duration += '00H ';
  }

  const minutes = Math.floor(remainTime / (1000 * 60));
  if (minutes > 0){
    duration += `${minutes.toString().padStart(2, '0')}M`;
  }else{
    duration += '00M';
  }

  return duration;
}


export {html, getYear, getMonthName, getMonthNumber, getDate, getHoursString, getMinutesString, getDuration};
