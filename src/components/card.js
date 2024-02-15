import { checkImageLink } from '@/components/util';

const cardTemplate = document.querySelector('#card-template').content;

export async function createCard(data, removeCard, likeCard, handleCardImageClick) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const link = await checkImageLink(data.link);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = data.name;
    card.querySelector('.card__title').textContent = data.name;

    card.querySelector('.card__image').addEventListener('click', () => {
        handleCardImageClick({
            name: data.name,
            link: link,
        });
    });

    if (data.owner_id === data.owner['_id']) {
        deleteButton.classList.add('card__delete-button_is-active');
        deleteButton.addEventListener('click', () => {
            removeCard(data['_id'], card);
        });
    }

    if (data.likes.find((like) => like['_id'] === data.owner_id)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeCounter.textContent = data.likes.length;

    card.querySelector('.card__like-button').addEventListener('click', () => {
        likeCard(data['_id'], likeButton, likeCounter);
    });

    return card;
}
