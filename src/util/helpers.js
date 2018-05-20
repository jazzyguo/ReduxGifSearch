
/* Compares current vertical scroll height with the innerHeight of the window
 * @ {operand} String - the operand to compare with e.x. <, <=, >, >=, ===
 * @ {num} Int - compares the current scroll height to this number
 */
export function compareScroll(operand, num) {
	let result = false;

  const d = document.documentElement;
	const offset = d.scrollTop + window.innerHeight;
	const height = d.offsetHeight;
	const diff = height - offset;

	switch(operand) {
		case '<':
			if (diff < num) {
				result = true;
			}
			break;
		case '<=':
			if (diff <= num) {
				result = true;
			}
			break;
		case '>':
			if (diff > num) {
				result = true;
			}
			break;
		case '>=':
			if (diff >= num) {
				result = true;
			}
			break;
		case '===':
			if (diff === num) {
				result = true;
			}
			break;
	}

	return result;
}

/* checks if the body height is less than the window height
 * if true, then the page has no vertical scroll bar
 */
export function hasVerticalScroll() {
	let result = false;
 	const scrollHeight = document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  
	if(scrollHeight > clientHeight) {
		result = true;
	}
	return result;
}

