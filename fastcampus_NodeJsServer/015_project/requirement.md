# 플로우별 처리 과정

## OAuth flow
    - Vendors
        - Naver  
        - Kakao  
        - Facebook
    - 각각의 OAuth provider에 개발자 계정을 만들고 설정을 해야 함
    - access token -> (platformUserId, platform) -> 회원가입/로그인 처리
    - HTTPS => ngrok으로 일단 처리

## 이메일 가입
    - 인증 상태를 확인팔 필요가 있음 -> 유저 정보에 'verified' 라는 필드가 있어야 함
    - 'verified' 필드가 'false' 이면 정상적인 활동 불가능
    - 이메일 인증은 특수한 코드와 함께 이메일을 보내서 그 링크로 접속했을 떄만 인증이 되게 처리
        - 다음 링크로 들어와 인증을 마무리해 주세요: https://somewhere.com/verify_memail?code=abcde-dfwer-asd-123"
        - 위 링크로 'GET' 해서 들어오게 되면 'verfied'를 'true'로 바꿔줌
    - AWS -> SES (Simple Email Service)로 인증 메일 보낼 것.

    - 비밀번호 초기화
        - 비밀번호 찾기는 지원하지 않습니다. 찾기가 가능하다는 것은 양방향 변환 (암호화, 복호화)이 가능하거나, plain text로 저장이 되어 있다는 뜻. 원래 암호를 매우 알기 어려운 해시 펑션 (one-wat function)을 사용해 해시된 값을 데이터베이스에 저장.
        - 우저가 처음 가입한 해당 이메일로 인증 메일과 비슷하게 초기화 링크를 담은 메일을 보냄
        - 해당 링크를 타고 들어오면 그떄 등록해두었던 비밀번호(바꾸고자 하는 비밀번호)로 기존 비밀번호를 갱신시킴  

# 배포
AWS를 사용해서 배포합니다.
 - EC2 (server)
    - git 레포지토리를 clone 해서 배포
 - HTTPS 지원 - Amazon 인증서.
 - ELB (Elastic Load Balancer)를 사용해 여기에 인증서를 올리고, ELB가 뒤의 EC2를 바라보게 함
 - SES를 통해 메일 처리.
 - 데이터베이스는 몽고DB를 사용.