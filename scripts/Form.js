const contactUsForm = document.forms.feedbackForm;

const firstName = contactUsForm.firstName;
const lastName = contactUsForm.lastName;
const email = contactUsForm.email;
const phoneNumberPrefix = contactUsForm.phoneNumberPrefix;
const phoneNumber = contactUsForm.phoneNumber;
const message = contactUsForm.message;

contactUsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumberPrefix: phoneNumberPrefix.value,
        phoneNumber: phoneNumber.value,
        message: message.value,
    };

    console.log(userData);

    const sectionAfterModal = document.querySelector(".footer");

    sectionAfterModal.insertAdjacentHTML(
        "beforebegin",
        `
        <dialog class="modal">
            <p class="modal__title">Your details have been sent</p>
            <p class="modal__description">Thank you for your feedback</p>
            <button type="button" class="button modal__button">Close</button>
        </dialog>`
    );

    const modal = document.querySelector(".modal");
    const closeModalBUtton = modal.querySelector(".modal__button");

    modal.showModal();

    closeModalBUtton.addEventListener("click", () => {
        modal.close();
        modal.remove(); // чтобы удалить полностью из DOMа
    });

    contactUsForm.reset();
});
