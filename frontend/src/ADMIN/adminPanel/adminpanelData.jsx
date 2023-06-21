import { GiBookshelf } from 'react-icons/gi'
import { FaUserFriends } from 'react-icons/fa'
import { TiTickOutline } from 'react-icons/ti'
import { FiGitPullRequest } from 'react-icons/fi'
import { LuBackpack } from 'react-icons/lu'
import { AiOutlineLogout } from 'react-icons/ai'

export const adminpanelData = [
  {
    id: 1,
    title: `Manage Books`,
    url: '/admin/managebooks',
    panel_icon: <GiBookshelf />,
  },
  {
    id: 2,
    title: `Books Request's`,
    url: '/admin/booksrequests',
    panel_icon: <FiGitPullRequest />,
  },
  {
    id: 3,
    title: `View Users`,
    url: '/admin/viewusers',
    panel_icon: <FaUserFriends />,
  },
  {
    id: 4,
    title: `Issued Books`,
    url: '/admin/issuedbooks',
    panel_icon: <TiTickOutline />,
  },

  {
    id: 5,
    title: `Returned Books`,
    url: '/admin/returnedbooks',
    panel_icon: <LuBackpack />,
  },

  {
    id: 6,
    title: `Goto Logout`,
    url: '/admin/logout',
    panel_icon: <AiOutlineLogout />,
  },
]
