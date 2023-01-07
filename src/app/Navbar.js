import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numNewNotifications = notifications.filter((n) => n.isNew).length
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  let newNotificationsBage
  if (numNewNotifications > 0) {
    newNotificationsBage = <span className="badge">{numNewNotifications}</span>
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {newNotificationsBage}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
