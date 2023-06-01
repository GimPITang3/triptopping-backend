# triptopping-backend

[![](https://img.shields.io/badge/TripTopping-online-brightgreen)](https://trip.abys.dev)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/GimPITang3/triptopping-backend/deploy.yml?branch=main)

> [TripTopping 홈페이지](https://trip.abys.dev)

## 팀원 및 역할 분담

- 심지수 201820708, rlj1202@ajou.ac.kr, rlj1202 (GitHub)
  - Google OAuth 2.0 연동
  - Google Maps API 연동
  - 여행 일정 추천 알고리즘 스켈레톤 코드 작성
  - MongoDB 연동
- 주진형 201720798, jujh97@ajou.ac.kr JuJinHyeong (GitHub)
  - 여행 일정 추천 알고리즘 작성
  - Google Translate API 연동
- 신상민 201820735, sss@ajou.ac.kr qilip (GitHub)
  - OpenAI 연동
  - CI/CD 담당
- 현광빈 201720728, bio8641@ajou.ac.kr, BEEPMan (GitHub)
  - 커뮤니티 모듈 작성

## 사용 기술 스택

- [Nest.js](https://github.com/nestjs/nest) - 웹 어플리케이션 서버 프레임워크
- [MongoDB](https://www.mongodb.com/) - NoSQL 데이터베이스
- [Google Maps API](https://developers.google.com/maps)
- [Google Translate API](https://cloud.google.com/translate/?hl=ko)
- [Google OAuth2](https://developers.google.com/identity/authorization?hl=ko) - Authentication 제공
- [AWS Elastic Beanstalk](https://aws.amazon.com/ko/elasticbeanstalk/)
- [Nginx](https://www.nginx.com/)
- [AWS Cloudfront](https://aws.amazon.com/ko/cloudfront/)
- [OpenAI API](https://openai.com/blog/openai-api)

## 프로젝트 구조

```
.github/              # Github Action 설정 파일
.platform/            # Elastic Beanstalk 설정 파일
src/
  articles/           # 커뮤니티 게시물 모듈
  auth/               # Authentication 모듈
    google/           # Google OAuth2.0 모듈
  errors/             # 사용자 정의 Error들
  google-maps/        # Google Maps API 모듈
  google-translate/   # Google Translate API 모듈
  interfaces/         # 인터페이스들
  middlewares/        # 미들웨어들
  openai/             # ChatGPT 관련 OpenAI 모듈
  pagination/         # Pagination을 위한 클래스들
  plans/              # 여행 일정 모듈
  schedule-recommend/ # 여행 일정 추천 모듈
  users/              # 유저 모듈
  utils/              # 유틸 함수들
  main.ts             # 프로그램 진입 소스 코드 파일
.eslintrc.js          # eslint 설정 파일
.prettierrc           # prettier 설정 파일
package.json          # 프로젝트 설정 파일
tsconfig.json         # Typescript 설정 파일
```

## 환경변수 설정

```
PORT=3001

MONGODB_URI=mongodb+srv://...

JWT_ACCESS_TOKEN_SECRET=secret
JWT_ACCESS_TOKEN_EXPIRE_TIME=30d

GOOGLE_CLIENT_ID=...
GOOGLE_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

GOOGLE_MAPS_ACCESS_KEY=...

OPENAI_API_ORG=...
OPENAI_API_KEY=...
```

## 협업 방식

- Git 브랜치 전략은 GitFlow를 사용

## 코딩 컨벤션

- 기본적으로 Nest.js의 컨벤션 사용
- ESlint 및 Prettier를 사용
- Indent는 space 2번으로 통일

## 설치

```bash
$ npm install
```

## 실행

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 테스트

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
