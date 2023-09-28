export function removeTags(str: string) {
  if (str === null || str === '') return false;
  // eslint-disable-next-line no-param-reassign
  str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, '');
}
