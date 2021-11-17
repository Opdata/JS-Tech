const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

// dragstart, dragend 이벤트를 통한 스타일링 컨트롤
draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

// dragover 이벤트를 통한 엘리먼트 over 감지
containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault(); // container 내부에서 불가능 커서 이벤트 비활성화
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggable); // 이동하지 않을(제자리의 경우)
    } else {
      container.insertBefore(draggable, afterElement); // 앞에 추가
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect(); // 상대적인 위치 정보 제공
      const offset = y - (box.top + box.height / 2); // Element의 위인지 아래인지(순서정렬을 위해) 계산
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
