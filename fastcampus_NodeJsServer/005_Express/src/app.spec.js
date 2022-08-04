const supertest = require('supertest')

const app = require('./app')

const request = supertest(app)
// request 오브젝트를 통해 HTTP?요청들을 할 수 있어짐

test('Our First Test', async () => {
  //test 실행 중 app.listen이 불려 테스트가 끝나지 않게 됨
  // 해당 코드 제거 후 테스트
  const result = await request.get('/users/15').accept('applicatiom/json')

  //result.body가 원하는 구조여야 한다
  expect(result.body).toMatchObject({
    nickname: expect.any(String), //nickname이 string 타입이어야 한다
  })
  expect(1 + 2).toBe(3)
})

test('retreive iser page', async () => {
  const result = await request.get('/users/15').accept('text/html')

  //테스트 위해선 html 파싱 필요
  //html로 시작하고 html로 끝나는지
  expect(result.text).toMatch(/^<html>.*<\/html>$/)
  expect(1 + 2).toBe(3)
})

test('update nickname', async() => {
    
    const result = await request.post('/users/15').send({ nickname: 'newNickname' })
    expect(res.status).toBe(200)

    const userResult = request.get('/users/15').accept('application/json')
    expect(userResult.status).toBe(200)
    expect(userResult.body).toMatchObject({
        nickname: "newNickname"
    })

})
