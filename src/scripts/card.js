const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard(data, removeCard, handleCardImageClick) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = data.link;
    card.querySelector('.card__image').alt = data.name;
    card.querySelector('.card__title').textContent = data.name;

    card.querySelector('.card__image').addEventListener('click', () => {
        handleCardImageClick({
            name: data.name,
            link: data.link,
        });
    });

    card.querySelector('.card__delete-button').addEventListener('click', removeCard);

    return card;
}

function removeCard(e) {
    const cardContainer = e.target.closest('li');

    cardContainer.remove();
}

function renderCard(card) {
    cardList.append(card);
}

export { createCard, removeCard, renderCard };
