import React from 'react';

import {Link} from "react-router-dom";

class Sidebar extends React.Component {
    render(){
        return(
            <div className='w-full flex flex-col bg-gray-100 h-full'  id='sidebar'>
                <Link to="/myday">
                    <div className="my-4 p-3">
                        <h2>My Day</h2>
                    </div>
                </Link>
                <Link to="/perfil">
                    <div className="my-y p-3">
                        <h2>Perfil</h2>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Sidebar