const contactUsForm = document.forms.feedbackForm;

const firstName = contactUsForm.firstName;
const lastName = contactUsForm.lastName;
const email = contactUsForm.email;
const phoneNumberPrefix = contactUsForm.phoneNumberPrefix;
const phoneNumber = contactUsForm.phoneNumber;
const message = contactUsForm.message;

async function postData(user) {
    try {
        const response = await fetch(
            "https://future-tech-d56a8-default-rtdb.firebaseio.com/users.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            },
        );

        if (!response.ok) throw new Error("Ошибка сервера");

        return true; // Всё ок
    } catch (error) {
        console.error("Ошибка при отправке:", error);
        return false; // Ошибка
    }
}

contactUsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumberPrefix: phoneNumberPrefix.value,
        phoneNumber: phoneNumber.value,
        message: message.value,
    };

    const dbResult = await postData(userData);
    let dialogText = dbResult
        ? `<p class="modal__title">Your details have been sent</p>
            <p class="modal__description">Thank you for your feedback</p>
            <button type="button" class="button modal__button">Close</button>`
        : `<p class="modal__title">Ooops</p>
            <p class="modal__description">Something went wrong. Please, try again later</p>
            <button type="button" class="button modal__button">Close</button>`;

    const sectionAfterModal = document.querySelector(".footer");

    sectionAfterModal.insertAdjacentHTML(
        "beforebegin",
        `
        <dialog class="modal">
            ${dialogText}
        </dialog>`,
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
