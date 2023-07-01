import { useNavigate } from "react-router-dom";
import Posts from './Posts';
import'./style.css'
const Profile = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <div className='top-heading'>
        <h5>Nikhil Rajput (
        <span>
          Software Engineer
        </span>)</h5>
        <button className='logout' onClick={()=>navigate("/logout")}>Logout</button>
      </div>

      <Posts />
    </div>
  );
};
export default Profile;
