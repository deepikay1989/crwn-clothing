import { Outlet } from "react-router-dom";
import { Directory } from "../../componnets/directory/directory";

const Home = () => {
    return (
        <div>
            <Directory />
            <Outlet />
        </div>
       
    );
}

export {Home}