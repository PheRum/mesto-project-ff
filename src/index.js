import '@/assets/app.css';
import { createCard } from '@/components/card';
import { closeModal, openModal, handleModalClick } from '@/components/modal';
import { checkImageLink } from '@/components/util';
import { clearValidation, enableValidation } from '@/components/validation';
import { MestoAPI } from '@/components/api';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const placeContainer = document.querySelector('.places__list');

const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardFormNameInput = cardForm['place-name'];
const cardFormLinkInput = cardForm['link'];

const cardAddBtn = document.querySelector('.profile__add-button');
const cardPopup = cardForm.closest('.popup');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileFormNameInput = profileForm.name;
const profileFormDescriptionInput = profileForm.description;

const profilePopup = profileForm.closest('.popup');
const profileAvatarPopup = document.querySelector('.popup_type_edit-avatar');

const profileAvatarForm = document.forms['edit-avatar'];
const profileAvatarFormSubmitButton = profileAvatarForm.querySelector('.popup__button');
const profileImageInput = profileAvatarForm.avatar;

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditBtn = document.querySelector('.profile__edit-button');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

function setLoading({ buttonElement, isLoading }) {
    buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

function setProfile({ name, about, avatar }) {
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImage.style.backgroundImage = `url(${avatar})`;
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

function handleCardLike(cardId, el, counterEl) {
    el.disabled = true;

    if (el.classList.contains('card__like-button_is-active')) {
        MestoAPI.unLikeCard(cardId).then(({ data }) => {
            const likes = data['likes'];

            el.classList.remove('card__like-button_is-active');

            if (likes.length) {
                counterEl.classList.add('card__like-counter_is-active');
            } else {
                counterEl.classList.remove('card__like-counter_is-active');
            }

            counterEl.textContent = likes.length;
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
            el.disabled = false;
        });
    } else {
        MestoAPI.likeCard(cardId).then(({ data }) => {
            const likes = data['likes'];

            el.classList.add('card__like-button_is-active');

            counterEl.classList.add('card__like-counter_is-active');
            counterEl.textContent = likes.length;
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
            el.disabled = false;
        });
    }
}

function handleCardDelete(id, el) {
    openModal(popupConfirm);

    popupConfirmButton.onclick = () => {
        el.disabled = true;

        MestoAPI.deleteCard(id).then(() => {
            el.closest('li').remove();
            closeModal(popupConfirm);
        }).catch(e => {
            console.error(e.message);
        }).finally(() => {
            el.disabled = false;
        });
    };
}

function handleCardImageClick({ name, link }) {
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupCaption.textContent = name;

    openModal(imagePopup);
}

function handleFormProfileEditSubmit(e) {
    e.preventDefault();

    const data = {
        name: profileFormNameInput.value,
        about: profileFormDescriptionInput.value,
    };

    setLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: true,
    });

    MestoAPI.updateProfile(data).then(response => {
        const { name, about, avatar } = response.data;

        setProfile({ name, about, avatar });
        closeModal(profilePopup);
    }).catch(e => {
        console.error(e.message);
    }).finally(() => {
        setLoading({
            buttonElement: profileFormSubmitButton,
            isLoading: false,
        });
    });
}

async function handleFormCardAddSubmit(e) {
    e.preventDefault();

    const data = {
        name: cardFormNameInput.value,
        link: await checkImageLink(cardFormLinkInput.value),
    };

    setLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: true,
    });

    MestoAPI.storeCard(data).then(async ({ data }) => {
        const card = await createCard({
            ...data,
            owner_id: data.owner['_id'],
        }, handleCardDelete, handleCardLike, handleCardImageClick);

        renderCard(card, 'prepend');
        closeModal(cardPopup);
        cardForm.reset();
    }).catch(e => {
        console.error(e.message);
    }).finally(() => {
        setLoading({
            buttonElement: cardFormSubmitButton,
            isLoading: false,
        });
    });
}

function handleProfileAvatarFormSubmit(e) {
    e.preventDefault();

    setLoading({
        buttonElement: profileAvatarFormSubmitButton,
        isLoading: true,
    });

    MestoAPI.updateProfileAvatar(profileImageInput.value).then((response) => {
        const { name, about, avatar } = response.data;

        setProfile({
            name,
            about,
            avatar,
        });

        closeModal(profileAvatarPopup);
    }).catch((e) => {
        console.error(e.message);
    }).finally(() => {
        setLoading({
            buttonElement: profileAvatarFormSubmitButton,
            isLoading: false,
        });
    });
}

function handleCardPopupButtonOpen() {
    cardForm.reset();
    clearValidation(cardForm, validationConfig);
    openModal(cardPopup);
}

function handlePopupProfileButtonOpenClick() {
    profileFormNameInput.value = profileName.textContent;
    profileFormDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(profilePopup);
}

function handleProfileImageClick() {
    profileAvatarForm.reset();
    clearValidation(profileAvatarForm, validationConfig);
    openModal(profileAvatarPopup);
}

cardAddBtn.addEventListener('click', handleCardPopupButtonOpen);
profileEditBtn.addEventListener('click', handlePopupProfileButtonOpenClick);
profileImage.addEventListener('click', handleProfileImageClick);
cardForm.addEventListener('submit', handleFormCardAddSubmit);
profileForm.addEventListener('submit', handleFormProfileEditSubmit);
profileAvatarForm.addEventListener('submit', handleProfileAvatarFormSubmit);

cardPopup.addEventListener('click', handleModalClick);
imagePopup.addEventListener('click', handleModalClick);
profilePopup.addEventListener('click', handleModalClick);
popupConfirm.addEventListener('click', handleModalClick);
profileAvatarPopup.addEventListener('click', handleModalClick);

enableValidation(validationConfig);

Promise.all([MestoAPI.fetchProfile(), MestoAPI.fetchCards()]).then(([user, cards]) => {
    const { name, about, avatar, _id } = user.data;
    const cardList = cards.data;

    setProfile({
        name,
        about,
        avatar,
    });

    cardList.forEach(async (data) => {
        const card = await createCard({
            ...data,
            owner_id: _id,
        }, handleCardDelete, handleCardLike, handleCardImageClick);

        renderCard(card);
    });
}).catch(e => {
    console.error(e.message);
});
