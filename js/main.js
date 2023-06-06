'use strict'

const URL = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users'
let users = []

//                        ЗАПРОС
const getUsers = () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => dividing(data, users))
    .then(() => {
      renderUserList()
      renderPagList()
    }
    )
    .catch(error => alert('Ошибка: ' + error))
}

getUsers()

//                        РЕНДЕР ТАБЛИЦЫ
const renderUserList = (pagItem = 0) => {
  const usersList = document.querySelector('.users__list')
  users[pagItem].forEach(user => {
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

//                        ПАГИНАЦИЯ
const pag = pagItem => {
  destroy()
  renderUserList(pagItem)
}

const renderPagList = () => {
  const pagination = document.querySelector('.pagination')

  const pagItem = document.querySelector('.pagination__item')

  if (!pagItem) {
    for (let i = 0; i < users.length; i++) {
      const pagList =
        `<li class="pagination__item" onclick="pag(${i})">${i + 1}</li>`

      pagination.insertAdjacentHTML('beforeend', pagList)
    }
  }
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
    let sortedUsers = users.flat()
    users = []

    sortedUsers = sortedUsers.filter(el => {
      const itemSortByName = el.username.toLowerCase().includes(searchValue.toLowerCase())
      const itemSortByMail = el.email.toLowerCase().includes(searchValue.toLowerCase())
      return itemSortByName || itemSortByMail
    })
    if (sortedUsers.length) {
      showClearBtn()
      destroy()
      dividing(sortedUsers, users)
      renderUserList()
    } else {
      alert('Совпадений не найдено')
    }
  }

  document.getElementById('input').value = ''
}

//                        СОРТИРОВКА ПО ДАТЕ
let dateCount = 0

const sortByDate = () => {
  document.getElementById('date').classList.add('sort__list-item--active')
  document.getElementById('rating').classList.remove('sort__list-item--active')

  destroy()
  let sortedUsers = users.flat()
  users = []

  if (dateCount % 2 === 0) {
    sortedUsers = sortedUsers.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date))
    dividing(sortedUsers, users)
    renderUserList()
  } else {
    sortedUsers = sortedUsers.sort((a, b) => new Date(b.registration_date) - new Date(a.registration_date))
    dividing(sortedUsers, users)
    renderUserList()
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
  let sortedUsers = users.flat()
  users = []

  if (ratingCount % 2 === 0) {
    sortedUsers = sortedUsers.sort((a, b) => a.rating - b.rating)
    dividing(sortedUsers, users)
    renderUserList()
  } else {
    sortedUsers = sortedUsers.sort((a, b) => b.rating - a.rating)
    dividing(sortedUsers, users)
    renderUserList()
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
  users = []
  getUsers()
}


//                        УДАЛЕНИЕ
let removeId = null

const getId = id => {
  removeId = id
}

const removeUser = () => {
  destroy()
  let sortedUsers = users.flat()
  users = []

  sortedUsers = sortedUsers.filter(el => el.id != removeId)
  dividing(sortedUsers, users)

  renderUserList()

  showModal()
}

//                        МОДАЛЬНОЕ ОКНО

const showModal = () => document.querySelector('.modal').classList.toggle('modal--show')


//                        ДЕЛЕНИЕ МАССИВА

const dividing = (arr, newArr) => {
  for (let i = 0; i < arr.length; i += 5) {
    newArr.push(arr.slice(i, i + 5));
  }
}