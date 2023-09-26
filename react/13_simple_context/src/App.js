import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {themes,ThemeContext} from './context/ThemeContext';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

function App() {
	
	const [state,setState] = useState({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return (
		<ThemeContext.Provider value={state.theme}>
			<div className="App">
				<Headline>
				createContext
				</Headline>
				<Paragraph>
				createContext lets you create a context that components can provide or read. The context object itself does not hold any information. It represents which context other components read or provide. Typically, you will use SomeContext.Provider in components above to specify the context value, and call useContext(SomeContext) in components below to read it. 
				</Paragraph>
				<ThemeButton toggleTheme={toggleTheme}/>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
