// =========================
// 데이터 정의
// =========================

// Kakao SDK 초기화 (사용 전 Kakao Developers에서 발급받은 JavaScript 키로 교체하세요)
// 아래 'YOUR_KAKAO_JAVASCRIPT_KEY'를 실제 키로 변경해야 공유 기능이 동작합니다.
try {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    // 실제 서비스 키로 교체됨
    window.Kakao.init("78242d5d0b5b0dc45de215bd62fac6cb");
  }
} catch (e) {
  // 초기화 실패 시 콘솔에만 경고를 남깁니다.
  console.warn("Kakao SDK 초기화에 실패했습니다. 키 또는 스크립트를 확인하세요.", e);
}

/**
 * 질문과 선택지 데이터를 정의합니다.
 * 각 질문은 텍스트(q)와 두 개의 선택지(a1, a2), 그리고 결과 계산에 사용될 값(v1, v2)을 포함합니다.
 */
const questions = [
  {
    q: "당신은 주로 어디서 시간을 보내나요?",
    a1: "실내 (Indoor)",
    v1: "I",
    a2: "야외 (Outdoor)",
    v2: "O"
  },
  {
    q: "어떤 맛의 커피를 선호하시나요?",
    a1: "산뜻한 산미 (Acidity)",
    v1: "A",
    a2: "부드러운 고소함 (Savory)",
    v2: "S"
  },
  {
    q: "당신은 아침형 인간인가요?",
    a1: "아침형 (Morning)",
    v1: "M",
    a2: "올빼미형 (Night Owl)",
    v2: "N"
  }
];

/**
 * 기본으로 사용할 결과 이미지 경로입니다.
 * 실제 상품 이미지로 교체할 때 해당 상수를 업데이트하면 됩니다.
 */
const defaultProductImage = "images/product_default.png";

/**
 * 테스트 결과 매핑 테이블입니다.
 * 질문 답변을 조합하여 만든 키(예: "I-A-M")를 통해 결과 상세 정보를 제공합니다.
 */
const resultsData = {
  // 1. 인도어(I)
  // 1.1 산미(A)
  "I-A-M": {
    typeTitle: "집콕 감성파의 상쾌한 아침",
    productName: "coff 산미 드립백",
    description: "창밖을 바라보며 여유를 즐기는 당신. 아침을 깨우는 상쾌한 산미의 드립백 커피 한 잔으로 완벽한 하루를 시작해 보세요.",
    productImage: defaultProductImage
  },
  "I-A-N": {
    typeTitle: "고요한 밤, 나만의 힐링 타임",
    productName: "coff 산미 콜드브루",
    description: "늦은 밤, 좋아하는 책이나 영화와 함께하는 시간을 즐기는군요. 깔끔하고 청량한 산미의 콜드브루가 당신의 밤을 더 특별하게 만들어 줄 거예요.",
    productImage: defaultProductImage
  },
  // 1.2 고소(S)
  "I-S-M": {
    typeTitle: "포근한 이불 속, 고소한 시작",
    productName: "coff 고소 드립백",
    description: "아침의 분주함보다는 포근한 침대에서 맞는 아침을 선호하는 당신. 부드럽고 고소한 풍미의 드립백 커피가 따뜻한 위로를 전합니다.",
    productImage: defaultProductImage
  },
  "I-S-N": {
    typeTitle: "늦은 밤, 카페인 걱정 없는 여유",
    productName: "coff 디카프 콜드브루",
    description: "올빼미형이지만 숙면도 놓칠 수 없죠. 카페인 부담 없이, 고소한 풍미는 그대로 간직한 디카프 콜드브루로 편안한 밤을 완성하세요.",
    productImage: defaultProductImage
  },

  // 2. 아웃도어(O)
  // 2.1 산미(A)
  "O-A-M": {
    typeTitle: "필드를 누비는 에너지 부스터",
    productName: "coff 산미 파우더",
    description: "아침 일찍부터 활기차게 움직이는 당신! 등산, 캠핑, 러닝 어디서든 물만 부으면 완성되는 상큼한 산미의 커피 파우더로 즉시 에너지를 충전하세요.",
    productImage: defaultProductImage
  },
  "O-A-N": {
    typeTitle: "밤샘 작업도 OK, 액티브 나이트",
    productName: "coff 산미 파우더",
    description: "낮과 밤의 경계 없이 활동하는 당신에겐 간편함이 생명! 늦은 밤 야외 활동이나 작업 중에도 물만 있으면 상쾌하게 리프레시할 수 있습니다.",
    productImage: defaultProductImage
  },
  // 2.2 고소(S)
  "O-S-M": {
    typeTitle: "아침 산책길의 든든한 동반자",
    productName: "coff 고소 파우더",
    description: "이른 아침, 상쾌한 공기를 마시며 하루를 시작하는 당신. 언제 어디서든 따뜻하고 든든하게 즐길 수 있는 고소한 커피 파우더가 제격입니다.",
    productImage: defaultProductImage
  },
  "O-S-N": {
    typeTitle: "고요한 밤바다, 감성 캠퍼",
    productName: "coff 디카프 파우더",
    description: "밤늦게까지 이어지는 야외 활동에도 커피는 포기할 수 없죠. 카페인 걱정 없는 디카프 파우더로, 늦은 밤의 감성을 오롯이 즐겨보세요.",
    productImage: defaultProductImage
  }
};

// =========================
// 상태 변수 & DOM 요소
// =========================

let currentQuestionIndex = 0;
let userAnswers = [];
let currentResultData = null; // 공유 시 사용할 최종 결과 데이터

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".btn-answer");
const progressIndicator = document.getElementById("progress-indicator");
const progressText = document.getElementById("progress-text");
const backBtn = document.getElementById("back-btn");

const resultTypeTitle = document.getElementById("result-type-title");
const resultProductName = document.getElementById("result-product-name");
const resultDescription = document.getElementById("result-description");
const resultImage = document.getElementById("result-image");
const shareLinkBtn = document.getElementById("share-link");
const shareKakaoBtn = document.getElementById("share-kakao");

// =========================
// 유틸리티 함수
// =========================

/**
 * 전달받은 페이지 ID에 해당하는 섹션만 화면에 표시합니다.
 * @param {string} targetPageId - 보여줄 페이지의 ID
 */
function switchPage(targetPageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === targetPageId);
  });
}

/**
 * 현재 질문 인덱스를 기준으로 UI 요소를 갱신합니다.
 * @param {number} index - 표시할 질문의 인덱스
 */
function showQuestion(index) {
  const totalQuestions = questions.length;
  const currentQuestion = questions[index];

  questionTitle.textContent = `질문 ${index + 1}/${totalQuestions}`;
  questionText.textContent = currentQuestion.q;

  // 각 버튼의 텍스트 및 데이터 속성을 최신화합니다.
  answerButtons[0].textContent = currentQuestion.a1;
  answerButtons[0].dataset.answer = currentQuestion.v1;

  answerButtons[1].textContent = currentQuestion.a2;
  answerButtons[1].dataset.answer = currentQuestion.v2;

  // 진행률 바 및 텍스트 업데이트
  const progressPercentage = ((index + 1) / totalQuestions) * 100;
  progressIndicator.style.width = `${progressPercentage}%`;
  progressIndicator.setAttribute("aria-valuenow", String(progressPercentage));
  progressText.textContent = `${index + 1} / ${totalQuestions}`;

  // 첫 질문에서는 '이전' 버튼 숨김, 그 외에는 표시
  if (backBtn) {
    backBtn.style.display = index === 0 ? "none" : "block";
  }
}

/**
 * 답변 배열을 기반으로 결과 페이지를 표시합니다.
 */
function showResult() {
  const resultKey = userAnswers.join("-");
  const resultPayload = resultsData[resultKey];

  if (resultPayload) {
    currentResultData = resultPayload; // 공유용으로 저장
    resultTypeTitle.textContent = resultPayload.typeTitle;
    resultProductName.textContent = resultPayload.productName;
    resultDescription.textContent = resultPayload.description;
    resultImage.src = resultPayload.productImage;
    resultImage.alt = `${resultPayload.productName} 이미지`;
  } else {
    currentResultData = null;
    // 데이터 매칭 실패 시 기본 메시지를 출력합니다.
    resultTypeTitle.textContent = "오류가 발생했어요";
    resultProductName.textContent = "결과를 찾을 수 없어요";
    resultDescription.textContent = "잠시 후 다시 시도해 주세요.";
    resultImage.src = "";
    resultImage.alt = "결과 이미지를 불러올 수 없습니다.";
  }

  switchPage("result-page");
}

/**
 * 테스트 상태를 초기화하고 다시 시작합니다.
 */
function resetTest() {
  currentQuestionIndex = 0;
  userAnswers = [];
  progressIndicator.style.width = "0%";
  progressIndicator.setAttribute("aria-valuenow", "0");
  switchPage("start-page");
}

// =========================
// 이벤트 리스너 등록
// =========================

// 시작 버튼 클릭 시 첫 번째 질문을 보여줍니다.
startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  userAnswers = [];
  showQuestion(currentQuestionIndex);
  switchPage("question-page");
});

// 각 답변 버튼에 대해 클릭 시 선택을 저장하고 다음 질문으로 넘깁니다.
answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedValue = button.dataset.answer;

    if (!selectedValue) return;

    userAnswers.push(selectedValue);
    currentQuestionIndex += 1;

    if (currentQuestionIndex >= questions.length) {
      showResult();
    } else {
      showQuestion(currentQuestionIndex);
    }
  });
});

// 다시하기 버튼 클릭 시 새로고침으로 초기 상태로 되돌립니다.
restartBtn.addEventListener("click", () => {
  // 새로고침 대신 부드럽게 초기화하고 시작 화면으로 전환합니다.
  resetTest();
});

// 이전(Back) 버튼: 마지막 답변을 제거하고 이전 질문으로 이동
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (currentQuestionIndex === 0) return;
    userAnswers.pop();
    currentQuestionIndex -= 1;
    showQuestion(currentQuestionIndex);
  });
}

// 공유: 링크 복사
if (shareLinkBtn) {
  shareLinkBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    } catch (err) {
      alert("링크 복사에 실패했습니다. 브라우저 설정을 확인해 주세요.");
    }
  });
}

// 공유: 카카오톡
if (shareKakaoBtn) {
  shareKakaoBtn.addEventListener("click", () => {
    if (!(window.Kakao && window.Kakao.isInitialized())) {
      alert("카카오 공유를 사용할 수 없습니다. SDK 또는 키 설정을 확인하세요.");
      return;
    }
    if (!currentResultData) {
      alert("결과가 없습니다. 테스트를 먼저 완료해 주세요.");
      return;
    }
    // 이미지 URL은 절대 경로여야 합니다. 아래 new URL을 사용하면 현재 도메인을 기준으로 절대 경로가 생성됩니다.
    // 배포 환경에서 CDN/정적 자산 도메인을 사용한다면 해당 도메인으로 교체하세요.
    const absoluteImageUrl = new URL(currentResultData.productImage, window.location.origin).href;

    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: currentResultData.typeTitle,
          description: currentResultData.productName,
          imageUrl: absoluteImageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href
          }
        },
        buttons: [
          {
            title: "테스트 하러가기",
            link: {
              mobileWebUrl: window.location.origin,
              webUrl: window.location.origin
            }
          }
        ]
      });
    } catch (e) {
      alert("카카오 공유 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      console.error(e);
    }
  });
}

