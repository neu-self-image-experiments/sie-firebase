// Checks if a string is underfined, empty, or whitespace
// https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript
export function isEmpty(str) {
  return !str || 0 === str.length || 0 === str.trim().length;
}
