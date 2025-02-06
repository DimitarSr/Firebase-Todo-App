import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Welcome to the To-Do App! ✅</h1>
        <p className="home-description">
          Organize your daily tasks effortlessly with this powerful and simple To-Do App.
          Stay productive and track your progress!
        </p>

        <h2>✨ Features:</h2>
        <ul className="home-list">
          <li>➕ Add, edit, and manage your tasks easily</li>
          <li>✔️ Mark tasks as completed</li>
          <li>❌ Delete tasks with a single click</li>
          <li>🔄 Real-time syncing across devices</li>
          <li>🔐 Secure authentication with Firebase</li>
        </ul>

        <p className="home-footer">
          Ready to get started? Head over to <strong>Todos</strong> and start managing your tasks efficiently!
          <br /> <br />
          Created with ❤️ by <strong>Dimitar Srabski</strong>.  
        </p>
      </div>
    </div>
  );
};

export default Home;
