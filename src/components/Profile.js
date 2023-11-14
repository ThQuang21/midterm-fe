import React, {useEffect, useState} from "react";
import "./Profile.css";
import ProfileCard from "./ProfileCard";
import AuthService from "../services/auth.service";

const Profile = () => {
	const [user, setUser] = useState('');

	useEffect(() => {
		AuthService.getUserByEmail().then((res) => {
			setUser(res)
		});
	}, [])

	return (
		<div className="background">
			<div className="bg-pattern-top"></div>
			<div className="bg-pattern-bottom"></div>

			<ProfileCard
				name={user.name}
				age={user.age}
				status={user.status}
				job={user.job}
				phone={user.phone}
				email={user.email}
				city={user.city}
			></ProfileCard>

		</div>
	);
};
export default Profile;