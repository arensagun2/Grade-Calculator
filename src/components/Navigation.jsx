import { Link } from 'react-router-dom'

export default function Navigation() {
    const links = [
        {name: "home", element: <span className="material-symbols-outlined">home</span>, to: "/"},
        {name: "calc", element: <span className="material-symbols-outlined">calculate</span>, to: "/calculator"}
    ]
    return (
        <div className='p-2 flex items-center justify-evenly gap-2'>
            {links.map(
                link => <Link to={link.to} key={link.name}
                    className='text-2xl hover:bg-blue-200 p-2 rounded-lg hover:text-gray-600 transition-all flex items-center justify-center'
                >
                    {link.element}
                </Link>)}
        </div>
    )
}