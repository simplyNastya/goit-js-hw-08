import throttle from 'lodash.throttle';
import localStorageAPI from './storage';

const formEl = document.querySelector('.feedback-form');

const users = localStorageAPI.load('feedback-form-state') || [];

function storeDataOnInput (event) {
  event.preventDefault();

  const {
    email: {value: emailValue}, 
    message: {value: messageValue},
  } = formEl.elements
  
  const userData = {
    emailValue,
    messageValue,
  }

  if (emailValue === "" && messageValue === "") {
    return console.log("Please fill in all the fields!");
  }

  users.push(userData)
  localStorageAPI.save('feedback-form-state', users);
}

formEl.addEventListener('input', throttle (storeDataOnInput, 500)) 

function getUserData () {
  localStorageAPI.load('feedback-form-state');
  if (users.length)
  {
    formEl.email.value = users[users.length - 1].emailValue;
    formEl.message.value = users[users.length - 1].messageValue;
  }
}

getUserData ()

function hadlerDataOnSubmit (event) {
  event.preventDefault();

  console.log(users)
  localStorageAPI.remove('feedback-form-state')
  localStorage.clear('feedback-form-state')
  formEl.reset()
}

formEl.addEventListener('submit', throttle (hadlerDataOnSubmit, 1000))

window.addEventListener('DOMContentLoaded', localStorageAPI.load('feedback-form-state'));