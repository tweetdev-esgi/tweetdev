import "../styles/Header.css"
function Header() {
    return (
        <div>
        <header className="header">
            <div className="header_logo">
            <a className="header_logo-link" href="/">
                TweetDev
                </a>
            </div>
            <nav className="header_navbar">
                <ul className="header_nav-menu">
                    <li className="header_nav-item"><a href="/login" className="header_nav-link">Login</a></li>
                    <li className="header_nav-item"><a href="/signup" className="header_nav-link">Sign up</a></li>

                </ul>
            </nav>
        </header>
        </div>
        
    );
}

export default Header;
