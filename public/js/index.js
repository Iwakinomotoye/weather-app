const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');

const error = document.querySelector('.error');
const messageOne = document.querySelector('.message-one');
const messageTwo = document.querySelector('.message-two');
const status = document.querySelector('.status');
status.style.display = 'none';


searchBtn.onclick = function () {
    error.style.display = 'none';
    messageOne.style.display = 'none';
    messageTwo.style.display = 'none';
    status.style.display = 'block';
    fetch('/weather?address=' + locationInput.value)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            error.style.display = 'block';
            return error.textContent = data.error;
        }
        messageOne.style.display = 'block';
        messageTwo.style.display = 'block';
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    })
    .catch(error => console.log(error))
    .finally(() => {
        status.style.display = 'none';
    })
}
