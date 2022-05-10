// import Home from "./routes/home/home.component";
import {Route, Routes, Outlet} from "react-router-dom";

import './categories.styles.scss'
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign_in/sign_in.component";

const App = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path={'shop'} element={<h1>Shopping List</h1>}/>
				<Route path={'sign_in'} element={<SignIn/>}/>
			</Route>
		</Routes>
	);
}

export default App;
