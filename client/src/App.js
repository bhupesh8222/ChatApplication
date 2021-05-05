import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import MainComponent from './MainComponent';
import Home from './Home';
import NotFoundPage from './NotFoundPage';

function App() {
	/*useEffect(() => {
    const pusher = new Pusher('1daad050e7d8ba9c63ad', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      setMessage([...message, newMessage]);
    });
    setMessage()
  }, [message])*/

	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/app' component={MainComponent} />
				<Route path='/signup' component={Signup} />
				<Route path='/login' component={Login} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
}

export default App;
