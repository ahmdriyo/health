export function getQueryParams() {
  if (typeof window === 'undefined') {
    return {};
  }
  let params = {};
  const searchParams = new URLSearchParams(window.location.search);
  for (let param of searchParams.entries()) {
    params[param[0]] = param[1];
  }
  console.log('Query Params:', params); // Tambahkan ini untuk debug
  return params;
}
