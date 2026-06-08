import React, { useState } from 'react';

function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "prepare major project report", status: "pending" },
    { id: 2, title: "connect backend server", status: "completed" },
    { id: 3, title: "complete project presentation", status: "pending" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // १. नवीन टास्क ॲड करणे किंवा जुना टास्क एडिट करून सेव्ह करणे
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask) return;

    if (isEditing) {
      // जर एडिट मोड सुरू असेल तर टास्क अपडेट करा
      setTasks(tasks.map(task => task.id === currentTaskId ? { ...task, title: newTask } : task));
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      // नवीन टास्क ॲड करा
      const taskObj = {
        id: Date.now(), // युनिक आयडीसाठी
        title: newTask,
        status: "pending"
      };
      setTasks([...tasks, taskObj]);
    }
    setNewTask("");
  };

  // २. टास्क स्टेटस बदलणे (Pending ⇄ Completed)
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
    ));
  };

  // ३. एडिट मोड ऑन करणे
  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTaskId(task.id);
    setNewTask(task.title); // इनपुट बॉक्समध्ये जुनं नाव दाखवा
  };

  // ४. टास्क डिलीट करणे
  const handleDeleteTask = (id) => {
    if (window.confirm("हा टास्क डिलीट करायचा का?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '500px' }}>
      <h2>📋 Welcome to Task Manager Dashboard</h2>
      <hr />
      
      {/* इनपुट फॉर्म */}
      <form onSubmit={handleAddTask} style={{ margin: '20px 0', display: 'flex' }}>
        <input 
          type="text" 
          placeholder="Enter New Task..." 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: '10px', flex: 1, marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: isEditing ? '#007bff' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          {isEditing ? 'Update' : 'Add Task'}
        </button>
      </form>

      {/* टास्क लिस्ट */}
      <h3>Your Tasks:</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ padding: '12px', background: '#f8f9fa', marginBottom: '8px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            
            {/* टास्क नाव (Completed असेल तर लाईन येईल) */}
            <span style={{ 
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              color: task.status === 'completed' ? '#6c757d' : '#212529',
              flex: 1,
              cursor: 'pointer'
            }}
            onClick={() => toggleTaskStatus(task.id)} // नावावर क्लिक करूनही स्टेटस बदलता येईल
            >
              {task.title}
            </span>

            {/* ॲक्शन बटन्स */}
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              
              {/* स्टेटस बटण */}
              <button 
                onClick={() => toggleTaskStatus(task.id)}
                style={{ padding: '5px 8px', background: task.status === 'completed' ? '#28a745' : '#ffc107', color: task.status === 'completed' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
              >
                {task.status.toUpperCase()}
              </button>

              {/* एडिट बटण */}
              <button 
                onClick={() => handleEditClick(task)}
                style={{ padding: '5px 8px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
              >
                ✏️ Edit
              </button>

              {/* डिलीट बटण */}
              <button 
                onClick={() => handleDeleteTask(task.id)}
                style={{ padding: '5px 8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
              >
                🗑️ Delete
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;