'use strict';

const URL = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';
let users = [];


//                        ЗАПРОС
const getUsers = () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => users = data)
    .then(() => renderUserList(users))
    .catch(error => alert('Ошибка: ' + error))
};

getUsers()

//                        РЕНДЕР ТАБЛИЦЫ
const renderUserList = users => {
  const usersList = document.querySelector('.users-list');
  users.forEach(user => {
    const html = `
    <tr class="user" id="${user.id}">
      <td class="user__name">${user.username}</td>
      <td>${user.email}</td>
      <td>${user.registration_date.substring(0, 10)}</td>
      <td>${user.rating}</td>
      <td><button class="user__remove-btn" onclick="getId(${user.id}), showModal()"></button></td>
    </tr>`;

    usersList.insertAdjacentHTML('beforeend', html)
  })

};