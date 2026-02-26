import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [asignTo, setAsignTo] = useState('')
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    const data = userData.map((elem) => {
      if (asignTo === elem.firstName) {
        const task = {
          taskTitle,
          taskDescription,
          taskDate,
          category,
          active: false,
          newTask: true,
          failed: false,
          completed: false,
        }
        return {
          ...elem,
          tasks: [...elem.tasks, task],
          taskCounts: {
            ...elem.taskCounts,
            newTask: elem.taskCounts.newTask + 1,
          },
        }
      }
      return elem
    })
    setUserData(data)
    localStorage.setItem('employees', JSON.stringify(data))
    console.log(data)

    setTaskTitle('')
    setCategory('')
    setAsignTo('')
    setTaskDate('')
    setTaskDescription('')
  }

  return (
    <div className="p-6 mt-5 rounded-2xl border border-neutral-200 bg-white/90 shadow-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <form
        onSubmit={(e) => {
          submitHandler(e)
        }}
        className="flex flex-wrap w-full items-start justify-between gap-6"
      >
        <div className="w-full lg:w-1/2">
          <div>
            <h3 className="text-sm text-neutral-600 dark:text-neutral-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value)
              }}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-white/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-neutral-900 dark:focus:border-white transition"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-neutral-600 dark:text-neutral-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => {
                setTaskDate(e.target.value)
              }}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-white/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-neutral-900 dark:focus:border-white transition"
              type="date"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-neutral-600 dark:text-neutral-300 mb-0.5">Asign to</h3>
            <input
              value={asignTo}
              onChange={(e) => {
                setAsignTo(e.target.value)
              }}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-white/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-neutral-900 dark:focus:border-white transition"
              type="text"
              placeholder="Employee name"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-neutral-600 dark:text-neutral-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-white/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-neutral-900 dark:focus:border-white transition"
              type="text"
              placeholder="Design, dev, etc"
            />
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-neutral-600 dark:text-neutral-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value)
            }}
            className="w-full h-44 text-sm py-2 px-4 rounded-lg outline-none bg-white/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-neutral-900 dark:focus:border-white transition"
          ></textarea>
          <button className="mt-4 w-full py-3 rounded-lg text-sm font-semibold border bg-black text-white border-black hover:bg-neutral-800 transition dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200">
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
