import "./ProfilePage.css";
// import axios from "axios";
import MarkerIcon from "../../icons/MarkerIcon/MarkerIcon";
import pin from "../../images/location-pin.svg";
import PostJob from "../../components/PostJob/PostJob";
const ProfilePage = () => {
	return (
		<div className='profile-page container'>
			<h1>ProfilePage</h1>
			<PostJob />
		</div>
	);
};

export default ProfilePage;
