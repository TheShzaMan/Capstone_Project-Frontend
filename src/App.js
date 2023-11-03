// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import oilfieldBG from "../src/images/silhouette-oilfield-sunset.jpg";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
	return (
		<div className='app-wrapper'>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<HomePage />
						</PrivateRoute>
					}
				/>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<ProfilePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/search'
					element={
						<PrivateRoute>
							<SearchPage />
						</PrivateRoute>
					}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
