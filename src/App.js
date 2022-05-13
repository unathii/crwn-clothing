//React library imports
import {Route, Routes} from "react-router-dom";

//Component Import
import Navigation from "./routes/navigation_bar/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";

//CSS imports
import './categories.styles.scss'

const App = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path={'shop'} element={<h1>Shopping List</h1>}/>
				<Route path={'auth'} element={<Authentication/>}/>
			</Route>
		</Routes>
	);
}

export default App;
