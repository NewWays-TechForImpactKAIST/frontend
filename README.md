# 다양성 평가 리포트 웹사이트 프론트엔드

[![Netlify Status](https://api.netlify.com/api/v1/badges/af408c4b-acff-491f-93a8-b49a7b4dd33b/deploy-status)](https://app.netlify.com/sites/newways-tech4impact-diversity/deploys)
![CI Status](https://github.com/NewWays-TechForImpactKAIST/frontend/actions/workflows/ci.yml/badge.svg)

React로 개발되는 다양성 평가 리포트 웹사이트의 프론트엔드 레포지토리입니다.

이 프로젝트는 [Netlify](https://netlify.com/)를 사용하여 배포되고 있습니다.

- 배포 주소: https://diversity.tech4impact.kr

<p align="center">
    <img src="https://github.com/NewWays-TechForImpactKAIST/frontend/assets/46402016/a1edb0d7-4bc6-4b79-97b7-908324688cc3" alt="screenshot" width="500"/>
</p>

## Setup

이 프로젝트를 실행하기 위해서는 Node.js(v18.17.0), pnpm(8.8.0)이 설치되어 있어야 합니다.

1.  Node.js 설치: nvm([윈도우용](https://github.com/coreybutler/nvm-windows), [맥/리눅스용](https://github.com/nvm-sh/nvm)) 또는 [fnm](https://github.com/Schniz/fnm)과 같은 노드 가상환경 관리자를 설치합니다. 이후 이 레포지토리를 클론한 폴더에서 터미널을 실행하고, 아래 명령을 입력하여 Node 18 버전을 설치합니다.
    ```bash
    # nvm이 설치된 경우 실행. nvm use로 프로젝트 폴더의 .nvmrc 파일에 명시된 Node.js 버전을 사용합니다.
    nvm install 18.17.0
    nvm use
    # fnm이 설치된 경우 실행.
    fnm install 18.17.0
    fnm use
    ```
2.  pnpm 설치: 터미널에서 pnpm을 설치합니다.
    ```bash
    npm install -g pnpm
    ```
3.  의존성 설치: 터미널에서 아래 명령을 입력하여 의존성을 설치합니다.
    ```bash
    pnpm install
    ```
4.  개발 서버 실행: 터미널에서 아래 명령을 입력하여 개발 서버를 실행합니다.
    ```bash
    pnpm dev
    ```
5.  빌드: 배포 시 아래 명령을 입력하여 정적 파일을 생성합니다.
    ```bash
    pnpm build
    ```

## 디자인 파일 (작업 중)

- Figma 링크: https://www.figma.com/file/Dh9nytTfbib9qGI56Ddw6F/NewWays-%EB%8B%A4%EC%96%91%EC%84%B1-%ED%8F%89%EA%B0%80-%EB%A6%AC%ED%8F%AC%ED%8A%B8?type=design&node-id=0%3A1&mode=design&t=ugrYtZqACCSdDBmK-1
