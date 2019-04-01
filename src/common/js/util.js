export function countDown(text) {
  let count = 60
  if (count === 0) {
    text = '获取验证码'
    count = 59
  } else {
    count--
    setTimeout(() => {
      countDown(text)
    }, 1000)
  }
  return text
}
