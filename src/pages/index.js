import '@/pages/index.css';
import { initialCards } from '@/scripts/cards';
import { createCard, removeCard, renderCard } from '@/scripts/card';
import { openModal } from '@/scripts/modal';

const cardAddPopup = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('.profile__edit-button');
const imagePopup = document.querySelector('.popup_type_image');

initialCards.forEach((item) => {
    const card = createCard(item, removeCard);

    renderCard(card);
});

cardAddPopup.addEventListener('click', (e) => {
    const popup = document.querySelector('.popup_type_new-card');

    openModal(popup);
});

profileEditPopup.addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_edit');

    openModal(popup);
});

imagePopup.addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_image');

    openModal(popup);
});
