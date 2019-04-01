import fetch from 'api/fetch'

export function gethotmovies(cityName) {
  const data = {
    cityName
  }
  return fetch({
    url: '/api/gethotmovies',
    method: 'post',
    data
  })
}

export function getBanners() {
  const data = {
    bannerType: 'INFO',
    num_per_page: 1000,
    page_no: 0,
    isDeleted: 0
  }
  return fetch({
    url: '/api/getBanners',
    method: 'get',
    params: data
  })
}

export function test() {
  return fetch({
    url: '/api/favorite/deletemovie?id=246377',
    method: 'post'
  })
}