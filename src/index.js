import '@/assets/css/app.css';
import { initialCards } from '@/scripts/cards';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard (data, removeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = data.link;
    card.querySelector('.card__title').textContent = data.name;

    card.querySelector('.card__delete-button').addEventListener('click', removeCard);

    return card;
}

function removeCard (e) {
    const cardContainer = e.target.closest('li');

    cardContainer.remove();
}

function renderCard (card) {
    cardList.append(card);
}

initialCards.forEach((item) => {
    const card = createCard(item, removeCard);

    renderCard(card);
});
