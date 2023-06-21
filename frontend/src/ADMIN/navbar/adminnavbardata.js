const navbarTitle = 'Library Management System'

const navbarImage = `/book-min.png`

const navbarLinks = [
  {
    name: 'Home',
    url: '/admin',
  },
  {
    name: `Book Request's`,
    url: '/admin/booksrequests',
  },
  {
    name: 'Users',
    url: '/admin/viewusers',
  },
  {
    name: `Issued Book's`,
    url: '/admin/issuedbooks',
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
