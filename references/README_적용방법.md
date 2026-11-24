# 소액티켓 V4 — 독립 상세페이지 5개 완성본

## 제공 파일 수: 총 10개
- 필수 8개: public/index.html, public/mobile-payment.html, public/credit-card.html, public/giftcard.html, public/guide.html, public/faq.html, public/assets/site.css, public/assets/site.js
- 참고 2개: references/README_적용방법.md, references/CODEX_적용지시문.txt

## 사용 방법
1. ZIP을 압축 해제합니다. 반드시 public 폴더 전체를 유지하세요.
2. public/index.html을 Chrome으로 열면 상단 메가메뉴와 상세페이지 링크가 동작합니다. (일부 보안 정책상 file:// URL의 브라우저 기능은 제한될 수 있습니다.)
3. 더 정확한 테스트: VS Code에서 프로젝트 폴더를 열어 Live Server로 미리보기하거나 프로젝트 루트에서 `python -m http.server 8000 --directory public` 후 http://localhost:8000/ 접속
4. 새 소액티켓 프로젝트 public 폴더에 8개 필수 파일을 배치하세요. 실제 운영 중인 다른 사이트의 파일과 혼동해 덮어쓰지 마세요.
5. Cloudflare Pages 배포시 빌드 출력 디렉터리를 `public`으로 지정할 수 있습니다. 별도의 VPS나 PHP 서버는 필요하지 않습니다.

## 구현된 화면
- 메인 index.html: 기존 V3의 6장 자동 슬라이드, 6열 전체 메뉴, 서비스 소개와 빠른 안내
- mobile-payment.html: 한도, 승인 오류, 청구·납부
- credit-card.html: 일시불·할부 비교표, 결제 금액, 카드별 조건, 취소
- giftcard.html: 모바일·지류 종류, 사용 상태, 매입 금액, 입금 확인
- guide.html: 4단계 이용 절차, 사전 점검, 개인정보
- faq.html: FAQ, 오류 문의 안내, 공식 상담 채널 연결 준비 안내

## 주의사항
- 공식 상담 채널 주소를 아직 받지 않았으므로, 가짜 채널톡 링크를 연결하지 않았습니다. 현재 상단 상담 안내는 faq.html#contact로 이동합니다.
- 도메인 확정 전 시안 단계이므로 모든 페이지에 noindex,nofollow를 적용했습니다. 정식 사이트 공개 전 도메인·운영정보·사업자정보·개인정보처리방침 확인 및 SEO 설정이 필요합니다.
- 매입률, 무이자 할부 개월 수, 입금 완료 시간 같은 운영 조건은 임의로 약속하지 않았습니다.
- 메가메뉴의 세부 항목은 실제 상세 페이지 및 해당 섹션으로 이동합니다. 공통 CSS/JS는 assets에서 불러옵니다.
