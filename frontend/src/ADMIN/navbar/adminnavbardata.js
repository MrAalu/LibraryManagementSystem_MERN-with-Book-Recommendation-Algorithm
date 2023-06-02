const navbarTitle = 'Library Management System'

const navbarImage = `/book-min.png`

const navbarLinks = [
  {
    name: 'Home',
    url: '/adminhome',
  },
  {
    name: `Book Request's`,
    url: '/admin-booksrequests',
  },
  {
    name: 'Users',
    url: '/admin-viewusers',
  },
  {
    name: 'Logout',
    url: '/logout',
  },
  // {
  //  name : '',
  //  url : ''
  // },
]

export default {
  navbarLinks,
  navbarTitle,
  navbarImage,
}