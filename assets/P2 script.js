// 자모별 획수 테이블
const strokes = {
  // 초성
  'ㄱ': 2, 'ㄲ': 4, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 6, 'ㄹ': 5, 'ㅁ': 4,
  'ㅂ': 4, 'ㅃ': 8, 'ㅅ': 2, 'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅉ': 6,
  'ㅊ': 4, 'ㅋ': 3, 'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3,

  // 중성
  'ㅏ': 2, 'ㅐ': 3, 'ㅑ': 3, 'ㅒ': 4, 'ㅓ': 2, 'ㅔ': 3,
  'ㅕ': 3, 'ㅖ': 4, 'ㅗ': 2, 'ㅘ': 4, 'ㅙ': 5, 'ㅚ': 3,
  'ㅛ': 3, 'ㅜ': 2, 'ㅝ': 4, 'ㅞ': 5, 'ㅟ': 3, 'ㅠ': 3,
  'ㅡ': 1, 'ㅢ': 2, 'ㅣ': 1,

  // 종성
  '': 0, 'ㄱ': 2, 'ㄲ': 4, 'ㄳ': 4, 'ㄴ': 2, 'ㄵ': 5, 'ㄶ': 5,
  'ㄷ': 3, 'ㄹ': 5, 'ㄺ': 7, 'ㄻ': 9, 'ㄼ': 9, 'ㄽ': 7,
  'ㄾ': 9, 'ㄿ': 9, 'ㅀ': 8, 'ㅁ': 4, 'ㅂ': 4, 'ㅄ': 6,
  'ㅅ': 2, 'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅊ': 4, 'ㅋ': 3,
  'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3
};

// 초성, 중성, 종성 리스트
const CHO = [ 'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ' ];
const JUNG = [ 'ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ' ];
const JONG = [ '', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ' ];

function splitHangul(char) {
  const code = char.charCodeAt(0) - 0xAC00;
  const cho = Math.floor(code / (21 * 28));
  const jung = Math.floor((code % (21 * 28)) / 28);
  const jong = code % 28;
  return [CHO[cho], JUNG[jung], JONG[jong]];
}

function getTotalStroke(char) {
  const [cho, jung, jong] = splitHangul(char);
  return (strokes[cho] || 0) + (strokes[jung] || 0) + (strokes[jong] || 0);
}

function calculate() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) return;

  const fullName = "대한민국" + name;
  const chars = Array.from(fullName);
  const strokeValues = chars.map(getTotalStroke);

  // 처음 한 번만 앞뒤 숫자 합산
  let current = [];
  for (let i = 0; i < strokeValues.length - 1; i++) {
    current.push((strokeValues[i] + strokeValues[i + 1]) % 10);
  }

  // 재귀적으로 숫자 줄이기
  const steps = [current.slice()];
  while (current.length > 2) {
    const next = [];
    for (let i = 0; i < current.length - 1; i++) {
      next.push((current[i] + current[i + 1]) % 10);
    }
    steps.push(next);
    current = next;
  }

  render(chars, strokeValues, steps, current.join(""));
}

function render(chars, strokes, steps, finalScore) {
  const container = document.getElementById("visual-result");
  container.innerHTML = "";

  // 한글 + 획수 시각화
  chars.forEach((char, i) => {
    const div = document.createElement("div");
    div.className = "char-box";
    div.innerHTML = `<strong>${char}</strong><br><small>${strokes[i]}획</small>`;
    container.appendChild(div);
  });

  // 단계별 숫자 합산 시각화
  steps.forEach((step, i) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "result-box";
    stepDiv.innerHTML = `<p>단계 ${i + 1}: ${step.join(" → ")}</p>`;
    container.appendChild(stepDiv);
  });

  // 최종 궁합 퍼센트 출력
  const finalDiv = document.createElement("div");
  finalDiv.className = "result-box";
  finalDiv.innerHTML = `<h2>궁합 결과: ${finalScore}%</h2>`;
  container.appendChild(finalDiv);
}