import { Link } from "@inertiajs/react"

const Navbar = ({ user }) => {
    console.log('is user? = ', user)
    return (
        <div className="navbar bg-slate-100 shadow-sm text-black">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">KenNews</a>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-slate-200" />
                <div className="dropdown dropdown-end">
                    <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex="0"
                        className="menu menu-sm dropdown-content bg-slate-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {!user ?
                            <>
                                <li><Link href={route('login')} as="button">Login</Link></li>
                                <li><Link href={route('register')} as="button">Register</Link></li>
                            </>
                            :
                            <>
                                <li>
                                    <Link href={route('dashboard')} className="justify-between" as="button">
                                        Dashboard
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link>Settings</Link></li>
                                <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar