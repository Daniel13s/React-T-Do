import { useEffect, useState } from "react"
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { Delete } from "lucide-react";
import {v4} from "uuid";

export default function App(){
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])


  function deleteTask(taskId) {
    const taskDelete = tasks.filter(task => task.id != taskId)
    setTasks(taskDelete)
  }
  
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {        
        return {...task, isCompleted: !task.isCompleted}
      }
      return task
    })
    setTasks(newTasks)
  }
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false
    }
    setTasks([...tasks, newTask])
  }

  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-[30px] text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} deleteTask={deleteTask}/>
      </div>
    </div>
  )
}