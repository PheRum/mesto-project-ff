import { checkImageLink } from '@/scripts/util';

const cardTemplate = document.querySelector('#card-template').content;
const placeContainer = document.querySelector('.places__list');

async function createCard(data, removeCard, handleCardImageClick) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const link = await checkImageLink(data.link);

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = data.name;
    card.querySelector('.card__title').textContent = data.name;

    card.querySelector('.card__image').addEventListener('click', () => {
        handleCardImageClick({
            name: data.name,
            link: link,
        });
    });

    card.querySelector('.card__delete-button').addEventListener('click', removeCard);

    return card;
}

function removeCard(e) {
    const cardContainer = e.target.closest('li');

    cardContainer.remove();
}

function renderCard(card, type = 'append') {
    switch (type) {
        case 'append':
            placeContainer.append(card);
            break;

        case 'prepend':
        default:
            placeContainer.prepend(card);
            break;
    }
}

export {
    createCard,
    removeCard,
    renderCard,
};
