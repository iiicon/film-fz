export const baseParams = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://maxyoyu.com/' : window.location.origin,
  timeout: 15000,
  responseType: 'json',
  withCredentials: true
}
