export function isEmptyObject(param: any): boolean {
  return Object.keys(param).length === 0 && param.constructor === Object;
}
