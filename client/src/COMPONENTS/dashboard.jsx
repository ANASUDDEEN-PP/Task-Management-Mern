import React, {  } from 'react';
import './assets/style.css';

import Header from './header.jsx';
import AllProduct from './allProducts.jsx';

const UserDashboard = () => {
    // const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     // Fetch user data from localStorage
    //     const storedUserData = localStorage.getItem('userData');

    //     if (storedUserData) {
    //         const parsedUserData = JSON.parse(storedUserData);
    //         setUserData(parsedUserData);
    //     }
    // }, []);

    return (
        <div className="dashboard-container">
            {/* <h2>Welcome to Your Dashboard, {userData ? userData.username : 'User'}!</h2>
            <div className="card">
                <h3>My Email</h3>
                <p>My email is <span>{userData ? userData.email : 'User'}</span></p>
            </div>
            <div className="card">
                <h3>Phone Number</h3>
                <p>Your Phone number is <span>{userData ? userData.phone : 'User'}</span></p>
            </div>
            <button className='logout-btn' onClick={handleLogout}>
                Logout
            </button> */}
            <Header />
            <AllProduct />
            
            
        </div>
    );
};

export default UserDashboard;