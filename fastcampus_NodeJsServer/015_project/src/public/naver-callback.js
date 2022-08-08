;(async () => {
  const naver = new naver_id_login(
    APP_CONFIG.NAVER_CLIENT_ID,
    APP_CONFIG.NAVER_REDIRECT_URI
  )
  const token = naver.oauthParams.access_token

  // 얻은 액세스 토큰을 서버로 보내 가입 마무리
  await fetch(`/auth/naver/signin?token=${token}`, {
    method: 'POST',
  })
  window.location.href = '/'
})()
