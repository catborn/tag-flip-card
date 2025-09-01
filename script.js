// Важно: страница должна открываться через http(s), не через file://
fetch("./data.json")
  .then((r) => r.json())
  .then((data) => {
    const container = document.getElementById("cards");
    const firstCard = container.querySelector(".card");

    data.forEach((item, idx) => {
      let cardEl;

      if (idx === 0) {
        // Заполняем первую существующую карточку
        cardEl = firstCard;
      } else {
        // Клонируем для остальных
        cardEl = firstCard.cloneNode(true);
        container.appendChild(cardEl);
      }

      // Подставляем tag на фронт
      const frontP = cardEl.querySelector(".card-front p");
      if (frontP) {
        frontP.textContent = `${item.tag}`;
      }

      // Подставляем specification на обратную сторону
      let backP = cardEl.querySelector(".card-back p");
      if (!backP) {
        // Если абзаца нет — создадим
        backP = document.createElement("p");
        cardEl.querySelector(".card-back").appendChild(backP);
      }
      backP.textContent = `${item.specification}: ${item.display}`;
    });
  })
  .catch(console.error);
