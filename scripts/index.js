const templateCard = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard (data) {
    const card = templateCard.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = data.link;
    card.querySelector('.card__title').textContent = data.name;

    cardList.append(card);

    card.querySelector('.card__delete-button').addEventListener('click', removeCard);
}

function removeCard (e) {
    const parentElement = e.target.closest('li');

    parentElement.remove();
}

for (const card of initialCards) {
    createCard(card);
}
