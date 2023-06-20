const navbarTitle = 'Library Management System'

const navbarImage = `/book-min.png`

const navbarLinks = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Books',
    url: '/books',
  },
  {
    name: 'About Us',
    url: '/about',
  },
  // {
  //  name : '',
  //  url : ''
  // },
]

const navbarLinksNotAuthenticated = [
  {
    name: 'Login',
    url: '/login',
  },
  {
    name: 'Signup',
    url: '/signup',
  },
]

const navbarLinksIsAuthenticated = [
  {
    name: 'Profile',
    url: '/profile',
  },
  // {
  //   name: 'Logout',
  //   url: '/logout',
  // },
]

export default {
  navbarLinks,
  navbarTitle,
  navbarImage,
  navbarLinksNotAuthenticated,
  navbarLinksIsAuthenticated,
}
