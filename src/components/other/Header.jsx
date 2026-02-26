import React from 'react'

const Header = (props) => {
  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    props.changeUser('')
  }

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
        Hello <br /> <span className="text-3xl font-semibold">username 👋</span>
      </h1>
      <button
        onClick={logOutUser}
        className="bg-black text-base font-medium text-white px-5 py-2 rounded-sm border border-black hover:bg-neutral-800 transition dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200"
      >
        Log Out
      </button>
    </div>
  )
}

export default Header
