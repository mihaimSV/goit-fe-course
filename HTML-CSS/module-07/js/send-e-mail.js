const sending = document.getElementById('send_mail');
const mail = document.querySelector('input[name="YouEMail"]');
const theme = document.querySelector('input[name="SubjectMsg"]');
const body = document.querySelector('textarea[name="MsgForSend"]');

sending.addEventListener('click', send);

function send(e) {
    e.preventDefault();
    let email = mail.value;
    let subject = theme.value;
    let emailBody = body.value;

    let req = "mailto:" + email + "?" +
        "&subject=" + subject + "&" +
        "&body=" + emailBody;
    document.location = req;
}