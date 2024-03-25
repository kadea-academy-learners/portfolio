const contactForm = document.querySelector("#contact-form");
const serviceId = "service_nijtmhm";
const templateId = "template_akb0afa";

function isEmailValid(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validate(data) {
  const errors = {};
  const { email, nom, prénom, objet, message } = data;

  if (!isEmailValid(email)) errors.email = "Ton adresse email n'est pas valide";

  if (nom.length < 3) errors.nom = "Votre nom doit avoir 3 lettres minimum";
  if (nom.length > 25) errors.nom = "Votre nom doit avoir 25 lettres maximum";

  if (prénom.length < 3)
    errors.prénom = "Votre prénom doit avoir 3 lettres minimum";
  if (prénom.length > 25)
    errors.prénom = "Votre prénom doit avoir 25 lettres maximum";

  if (objet.length < 3)
    errors.objet =
      "Votre l'objet de votre message doit avoir 3 lettres minimum";
  if (objet.length > 25)
    errors.objet =
      "Votre l'objet de votre message doit avoir 25 lettres maximum";

  if (message.trim().length < 3)
    errors.message = "Votre message doit avoir 3 lettres minimum";
  if (message.split(" ").length > 500)
    errors.message = "Votre message doit avoir 500 mots maximum";

  return errors;
}

contactForm.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitButton = contactForm.querySelector("button");
    const validationErrors = validate(Object.fromEntries(formData.entries()));
    if (Object.keys(validationErrors).length) {
      console.log(validationErrors);

      for (const error in Object.fromEntries(formData.entries())) {
        const elementSelectorId = `#${error}Error`;
        const ErrorElement = document.querySelector(elementSelectorId);
        ErrorElement.textContent = validationErrors[error];
      }
    } else {
      submitButton.disabled = true;

      let sendConformation = confirm("Voulez-vous envoyer votre message");
      if (sendConformation) {
        const sendEmailResponse = await emailjs.send(
          serviceId,
          templateId,
          Object.fromEntries(formData.entries())
        );

        event.target.reset();
        alert("Votre message a été envoyé avec succès");
        sendConformation = false;
      }
    }

    submitButton.disabled = false;
  } catch (error) {
    console.log(error);
  }
});
