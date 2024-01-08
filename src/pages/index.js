import '@/assets/app.css';
import { initialCards } from '@/components/cards';
import { createCard, likeCard, removeCard } from '@/components/card';
import { closeModal, openModal, handleModalClick } from '@/components/modal';
import { checkImageLink } from '@/components/util';

const placeContainer = document.querySelector('.places__list');

const cardForm = document.forms['new-place'];
const cardFormNameInput = cardForm['place-name'];
const cardFormLinkInput = cardForm['link'];

const cardAddBtn = document.querySelector('.profile__add-button');
const cardPopup = cardForm.closest('.popup');

const profileForm = document.forms['edit-profile'];
const profileFormNameInput = profileForm.name;
const profileFormDescriptionInput = profileForm.description;

const profilePopup = profileForm.closest('.popup');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-button');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

initialCards.forEach(async (item) => {
    const card = await createCard(item, removeCard, likeCard, handleCardImageClick);

    renderCard(card);
});

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

function handleCardImageClick({ name, link }) {
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupCaption.textContent = name;

    openModal(imagePopup);
}

function handleFormProfileEditSubmit(e) {
    e.preventDefault();

    profileInfo.querySelector('.profile__title').textContent = profileFormNameInput.value;
    profileInfo.querySelector('.profile__description').textContent = profileFormDescriptionInput.value;

    closeModal(profilePopup);
}

async function handleFormCardAddSubmit(e) {
    e.preventDefault();

    const link = await checkImageLink(cardFormLinkInput.value);

    const card = await createCard({ name: cardFormNameInput.value, link }, removeCard, likeCard, handleCardImageClick);
    renderCard(card, 'prepend');

    closeModal(cardPopup);
    cardForm.reset();
}

profileEditBtn.addEventListener('click', () => {
    profileFormNameInput.value = profileName.textContent;
    profileFormDescriptionInput.value = profileDescription.textContent;

    openModal(profilePopup);
});

cardAddBtn.addEventListener('click', () => openModal(cardPopup));
cardForm.addEventListener('submit', handleFormCardAddSubmit);
profileForm.addEventListener('submit', handleFormProfileEditSubmit);
cardPopup.addEventListener('click', handleModalClick);
imagePopup.addEventListener('click', handleModalClick);
profilePopup.addEventListener('click', handleModalClick);
