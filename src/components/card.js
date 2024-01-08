import { checkImageLink } from '@/components/util';

const cardTemplate = document.querySelector('#card-template').content;

export async function createCard(data, removeCard, likeCard, handleCardImageClick) {
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

    card.querySelector('.card__like-button').addEventListener('click', likeCard);
    card.querySelector('.card__delete-button').addEventListener('click', removeCard);

    return card;
}

export function likeCard(e) {
    const btn = e.target;

    btn.classList.toggle('card__like-button_is-active');
}

export function removeCard(e) {
    const cardContainer = e.target.closest('li');

    cardContainer.remove();
}
