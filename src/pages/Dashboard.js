import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaTasks, FaDollarSign, FaBell, FaMoon, FaSun, FaNewspaper, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Dashboard.css";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [notifications, setNotifications] = useState([]);
    const [stats, setStats] = useState({ users: 120, tasks: 45, revenue: 5000 });
    const [news, setNews] = useState([]);
    const [tasks, setTasks] = useState([
        { id: 1, title: "Complete project", status: "To Do" },
        { id: 2, title: "Review code", status: "In Progress" },
        { id: 3, title: "Submit report", status: "Completed" }
    ]);
    const statuses = ["To Do", "In Progress", "Completed"];

    useEffect(() => {
        setNotifications([
            { id: 1, message: "New user registered!" }
            // { id: 2, message: "Task deadline approaching" },
        ]);

        setNews([
            { id: 1, title: "Tech Stocks Surge Amid AI Boom" },
            { id: 2, title: "Global Markets Face Uncertainty in 2025" },
            { id: 3, title: "Breakthrough in Renewable Energy Announced" },
        ]);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Store theme in localStorage
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const data = [
        { name: "Jan", revenue: 4000 },
        { name: "Feb", revenue: 3000 },
        { name: "Mar", revenue: 5000 },
        { name: "Apr", revenue: 7000 },
    ];

    const moveTask = (id, newStatus) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    };

    const addTask = (title) => {
        if (title) {
            setTasks([...tasks, { id: tasks.length + 1, title, status: "To Do" }]);
            setNewTaskTitle("");
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const Task = ({ task }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "TASK",
            item: { id: task.id },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));

        return (
            <div ref={drag} className="task-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
                {task.title}
                <button onClick={() => deleteTask(task.id)} className="delete-btn"><FaTrash /></button>
            </div>
        );
    };

    const TaskColumn = ({ status }) => {
        const [, drop] = useDrop(() => ({
            accept: "TASK",
            drop: (item) => moveTask(item.id, status)
        }));

        return (
            <div ref={drop} className="task-column">
                <h3>{status}</h3>
                {tasks.filter(task => task.status === status).map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        );
    };

    return (
        <div className={`dashboard ${theme}`}>
            <div className="sidebar">
                <h2 className="sidebar-title">Dashboard</h2>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
                <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
            <div className="main-content">
                <h1>Welcome, {user ? user.name : "Guest"}</h1>
                <div className="stats">
                    <div className="stat-card">
                        <FaUsers />
                        <div className="stat-value">Users: {stats.users}</div>
                    </div>
                    <div className="stat-card">
                        <FaTasks />
                        <div className="stat-value">Tasks: {stats.tasks}</div>
                    </div>
                    <div className="stat-card">
                        <FaDollarSign />
                        <div className="stat-value">Revenue: ${stats.revenue}</div>
                    </div>
                </div>
                <div className="chart-container">
                    <h2>Revenue Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="notifications">
                    <h2><FaBell /> Notifications</h2>
                    <ul>
                        {notifications.map((notif) => (
                            <li key={notif.id}>{notif.message}</li>
                        ))}
                    </ul>
                </div>
                <div className="news-section">
                    <h2><FaNewspaper /> News Forecast</h2>
                    <ul>
                        {news.map((article) => (
                            <li key={article.id}>{article.title}</li>
                        ))}
                    </ul>
                </div>
                <div className="task-manager">
                    <div className="task-manager">
                        <h2><FaTasks /> Task Management</h2>
                        <div className="task-input-container">
                            <input
                                type="text"
                                placeholder="Add new task..."
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                            />
                            <button className="add-btn" onClick={() => addTask(newTaskTitle)}>
                                Add Task
                            </button>
                        </div>
                        <DndProvider backend={HTML5Backend}>
                            <div className="task-columns">
                                {statuses.map(status => <TaskColumn key={status} status={status} />)}
                            </div>
                        </DndProvider>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Dashboard;
