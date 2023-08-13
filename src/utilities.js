
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

export {html, getYear, getMonthName, getMonthNumber, getDate};
