const dayjs = require('dayjs');

export function convertDate(dateInput, dateFormat) {
	return dayjs(dateInput).format(dateFormat);
}

export function getCurrentTime() {
	return dayjs().toISOString();
}
