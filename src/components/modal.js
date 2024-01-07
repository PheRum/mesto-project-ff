export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePressEscapeModal);
    popup.addEventListener('mousedown', closeOnOverlayModal);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePressEscapeModal);
    popup.removeEventListener('mousedown', closeOnOverlayModal);
}

function closeOnOverlayModal(e) {
    if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
        closeModal(e.currentTarget);
    }
}

function closePressEscapeModal(e) {
    if (e.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}
