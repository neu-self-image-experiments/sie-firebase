import './App.scss';
import userS from './firebase/CRUDServices/UserServices';
/* eslint-disable */
function App() {
  const es = userS.getInstance();
  // es.postUser({email: 'qin.ha@northeastern.edu', password: '123456'}).then(res => console.log(res));
  // es.signIn({email: 'qin.ha@northeastern.edu', password: '123456'}).then(res => console.log(res));
  // es.getCurrentUser((user) => console.log(user));
  es.deleteUser().then(res => console.log(res));

  return (
    <div className="App">
      <header className="App-header">
        <p>
                    Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
                    Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
