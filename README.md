# 분개 처리 시스템


### 프로젝트 개요

 **원천 데이터 기반 3단계 회계 분개 자동 처리 시스템**

실제 ERP 시스템에서 사용되는 회계 분개 생성 프로세스를 구현한 웹 애플리케이션입니다.

### 데모 링크
👉 **[Live Demo](https://greenseaKona.github.io/my-profile)**

🚀 핵심 특징
실무 중심 설계

SQL 쿼리 빌더: 개발자가 익숙한 SELECT-FROM 구조
수식 엔진을 통한 데이터 변동시 확장성 제공.
유연한 분개 규칙: 차변/대변 항목 자유 추가/수정 가능.

### 데이터 흐름
```
원천 테이블 → SELECT 쿼리 → 수집된 데이터
     ↓
분개 규칙 설정 (계정 + 수식)
     ↓
처리 로직 실행 → 완성된 분개 데이터
```

매입 거래: 사무용품(90%) + 부가세(10%) / 외상매입금
확장 가능: 다양한 거래 유형과 분개 패턴 지원


에러 처리: 차대불일치 검증 및 표시


### 📂 프로젝트 구조
```
my-profile/
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
├── README.md
├── tailwind.config.js
└── src/
    ├── main.jsx
    └── AccountingJournalSystem.jsx
```