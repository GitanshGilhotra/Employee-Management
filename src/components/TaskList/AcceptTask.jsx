import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ data, taskIndex }) => {
    const [userData, setUserData] = useContext(AuthContext)

    const handleStatusChange = (status) => {
        // Find the current user in userData (by id or email)
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
        if (!loggedInUser || !userData) return
        const user = userData.find(u => u.email === loggedInUser.data.email)
        if (!user) return
        // Update the task
        const updatedTasks = user.tasks.map((task, idx) => {
            if (idx === taskIndex) {
                if (status === 'completed') {
                    return { ...task, completed: true, active: false, failed: false, newTask: false }
                } else if (status === 'failed') {
                    return { ...task, failed: true, active: false, completed: false, newTask: false }
                }
            }
            return task
        })
        // Update task counts
        let { active, completed, failed, newTask } = user.taskCounts
        if (status === 'completed') {
            completed += 1
            if (user.tasks[taskIndex].active) active -= 1
            if (user.tasks[taskIndex].newTask) newTask -= 1
        } else if (status === 'failed') {
            failed += 1
            if (user.tasks[taskIndex].active) active -= 1
            if (user.tasks[taskIndex].newTask) newTask -= 1
        }
        const updatedUser = {
            ...user,
            tasks: updatedTasks,
            taskCounts: { active, completed, failed, newTask }
        }
        // Update userData array
        const updatedUserData = userData.map(u => u.email === user.email ? updatedUser : u)
        setUserData(updatedUserData)
        // Also update localStorage
        localStorage.setItem('employees', JSON.stringify(updatedUserData))
        // Update loggedInUser in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updatedUser }))
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
            <div className='flex justify-between mt-6 '>
                <button className='bg-green-500 rounded font-medium py-1 px-2 text-xs' onClick={() => handleStatusChange('completed')}>Mark as Completed</button>
                <button className='bg-red-500 rounded font-medium py-1 px-2 text-xs' onClick={() => handleStatusChange('failed')}>Mark as Failed</button>
            </div>
        </div>
    )
}

export default AcceptTask