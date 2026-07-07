export function isEmptyData<T>(data: T | null | undefined): boolean {
  if (data == null) {
    return true;
  }

  if (Array.isArray(data)) {
    return data.length === 0;
  }

  return false;
}
