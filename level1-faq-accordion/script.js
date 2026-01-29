// 選取所有的問題區塊
const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  const title = question.querySelector('.title');
  const img = question.querySelector('img');
  const answer = question.querySelector('.answer');

  // 針對每個 question，都綁定 click 的 event listener
  title.addEventListener('click', () => {
    // 檢查目前點擊的這個是否已經是開啟狀態
    const isOpen = answer.classList.contains('active');

    // 如果這個問題原本是關閉的，就把它打開
    if (!isOpen) {
      answer.classList.add('active');
      img.src = 'images/icon-minus.svg';
      img.alt = 'icon minus';
    } else {
      // 否則就收起來
      answer.classList.remove('active');
      img.src = 'images/icon-plus.svg';
      img.alt = 'icon plus';
    }
  });
});
