document.getElementById("submit").addEventListener("click", () => {
  const nameInputs = [
    document.getElementById("input1").value,
    document.getElementById("input2").value,
    document.getElementById("input3").value,
  ].filter(Boolean);

  const allChars = ['대', '한', '민', '국', ...nameInputs];

  const choList = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const jungList = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const jongList = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

  const choStroke = {
    'ㄱ':2, 'ㄲ':4, 'ㄴ':2, 'ㄷ':3, 'ㄸ':6, 'ㄹ':5, 'ㅁ':4, 'ㅂ':4, 'ㅃ':8, 'ㅅ':2, 'ㅆ':4, 'ㅇ':1, 'ㅈ':3, 'ㅉ':6, 'ㅊ':4, 'ㅋ':3, 'ㅌ':4, 'ㅍ':4, 'ㅎ':3
  };

  const jungStroke = {
    'ㅏ':2, 'ㅐ':3, 'ㅑ':3, 'ㅒ':4, 'ㅓ':2, 'ㅔ':3, 'ㅕ':3, 'ㅖ':4, 'ㅗ':2, 'ㅘ':3, 'ㅙ':4, 'ㅚ':3, 'ㅛ':2, 'ㅜ':2, 'ㅝ':3, 'ㅞ':4, 'ㅟ':3, 'ㅠ':3, 'ㅡ':1, 'ㅢ':2, 'ㅣ':1
  };

  const jongStroke = {
    '':0, 'ㄱ':2, 'ㄲ':4, 'ㄳ':4, 'ㄴ':2, 'ㄵ':5, 'ㄶ':5, 'ㄷ':3, 'ㄹ':5, 'ㄺ':7, 'ㄻ':9, 'ㄼ':9, 'ㄽ':7, 'ㄾ':9, 'ㄿ':9, 'ㅀ':8, 'ㅁ':4, 'ㅂ':4, 'ㅄ':6,
    'ㅅ':2, 'ㅆ':4, 'ㅇ':1, 'ㅈ':3, 'ㅊ':4, 'ㅋ':3, 'ㅌ':4, 'ㅍ':4, 'ㅎ':3
  };

  const getScore = (char) => {
    const code = char.charCodeAt(0) - 0xAC00;
    const cho = choList[Math.floor(code / 588)];
    const jung = jungList[Math.floor((code % 588) / 28)];
    const jong = jongList[code % 28];

    return (choStroke[cho] || 0) + (jungStroke[jung] || 0) + (jongStroke[jong] || 0);
  };

  let numbers = allChars.map(getScore); // 1글자 = 1숫자

  // 5번 덧셈 반복 (일의 자리만 유지)
  for (let i = 0; i < 5; i++) {
    const next = [];
    for (let j = 0; j < numbers.length - 1; j++) {
      next.push((numbers[j] + numbers[j + 1]) % 10);
    }
    numbers = next;
  }

  const finalScore = parseInt(numbers.join(""), 10);

  let resultPage = "result1.html";
  if (finalScore <= 50) resultPage = "result1.html";
  else if (finalScore <= 70) resultPage = "result2.html";
  else resultPage = "result3.html";

  window.location.href = `result/${resultPage}?score=${finalScore}`;
});
