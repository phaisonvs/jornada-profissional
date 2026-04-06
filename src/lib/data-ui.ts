const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
const MULTIPLE_DASHES = /-+/g;

export function toUiKey(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(NON_ALPHANUMERIC, '-')
    .replace(MULTIPLE_DASHES, '-')
    .replace(/^-+|-+$/g, '');
}
