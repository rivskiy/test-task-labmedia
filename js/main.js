'use strict'

const URL = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users'
let users = []

//                        ЗАПРОС
const getUsers = () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => users = data)
    .then(() => renderUserList(users))
    .catch(error => alert('Ошибка: ' + error))
}

getUsers()

//                        РЕНДЕР ТАБЛИЦЫ
const renderUserList = users => {
  const usersList = document.querySelector('.users__list')
  users.forEach(user => {
    const html = `
    <tr class="user" id="${user.id}">
      <td class="user__name">${user.username}</td>
      <td>${user.email}</td>
      <td>${user.registration_date.substring(0, 10)}</td>
      <td>${user.rating}</td>
      <td><button class="user__remove-btn" onclick="getId(${user.id}), showModal()"></button></td>
    </tr>`

    usersList.insertAdjacentHTML('beforeend', html)
  })
}

//                        ДЕМОНТАЖ
const destroy = () => {
  const renderedUsers = document.querySelectorAll('.user')
  renderedUsers.forEach(el => el.remove())
}

//                        ПОИСК 
const find = (event) => {
  event.preventDefault()
  
  const searchValue = document.getElementById('input').value

  if (searchValue) {
    users = users.filter(el => {
      const itemSortByName = el.username.toLowerCase().includes(searchValue.toLowerCase())
      const itemSortByMail = el.email.toLowerCase().includes(searchValue.toLowerCase())
      return itemSortByName || itemSortByMail
    })
  }

  if (users.length) {
    showClearBtn()
    destroy()
    renderUserList(users)
  } else {
    alert('Совпадений не найдено')
  }

  document.getElementById('input').value = ''
}

//                        СОРТИРОВКА ПО ДАТЕ
let dateCount = 0

const sortByDate = () => {
  document.getElementById('date').classList.add('sort__list-item--active')
  document.getElementById('rating').classList.remove('sort__list-item--active')

  destroy()

  if (dateCount % 2 === 0) {
    users = users.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date))
    renderUserList(users)
  } else {
    users = users.sort((a, b) => new Date(b.registration_date) - new Date(a.registration_date))
    renderUserList(users)
  }

  dateCount++

  showClearBtn()
}

//                        СОРТИРОВКА ПО РЕЙТИНГУ
let ratingCount = 0

const sortByRating = () => {
  document.getElementById('rating').classList.add('sort__list-item--active')
  document.getElementById('date').classList.remove('sort__list-item--active')

  destroy()

  if(ratingCount % 2 === 0) {
    users = users.sort((a, b) => a.rating - b.rating)
    renderUserList(users)
  } else {
    users = users.sort((a, b) => b.rating - a.rating)
    renderUserList(users)
  }

  ratingCount++
  showClearBtn()
}

//                        СБРОС ФИЛЬТРОВ
const showClearBtn = () => {
    document.querySelector('.clear-btn').classList.remove('visually-hidden')
}

const clearFilter = () => {
  document.querySelector('.clear-btn').classList.add('visually-hidden')
  document.getElementById('date').classList.remove('sort__list-item--active')
  document.getElementById('rating').classList.remove('sort__list-item--active')

  destroy()

  getUsers()
}