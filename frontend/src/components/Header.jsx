import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav>
            <div className='flex flex-row justify-between py-3 px-2 bg-gray-200 shadow-sm shadow-gray-400 mb-4'>
                <div>
                    <Link className='text-2xl' to='/'>
                        Apollonia Dental Practice
                    </Link>
                </div>
                <div className='flex flex-row space-x-4 pr-10'>
                    <Link to='/' className='hover:underline'>
                        Dashboard
                    </Link>
                    <Link to='/employees' className='hover:underline'>
                        Employees
                    </Link>
                    <Link to='/departments' className='hover:underline'>
                        Departments
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
