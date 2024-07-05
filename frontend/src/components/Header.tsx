import "../styles/Header.css";
import { useAuth } from "../provider/AuthProvider";
import { MagnifyingGlass } from "@phosphor-icons/react";
function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <header className="header border-2 border-headerBorder bg-headerBg">
        <div className="header_logo">
          <a className="header_logo-link text-fontColor" href="/feed">
            TweetDev
          </a>
          {/* <div>
            <MagnifyingGlass weight="bold"></MagnifyingGlass>
          </div> */}
          <input
            size={35}
            className="ml-6 rounded-xl text-sm p-2 border-solid border-2 border-searchBorder "
            type="search"
            name="searchbar"
            id="searchbar"
            placeholder=" 🔍 Search"
          />
        </div>
        <nav className="header_navbar">
          <ul className="header_nav-menu">
            <li className="header_nav-item">
              <a href="/feed" className="header_nav-link text-fontColor">
                Feed
              </a>
            </li>
            {!isLoggedIn && (
              <>
                <li className="header_nav-item">
                  <a href="/login" className="header_nav-link text-fontColor">
                    Login
                  </a>
                </li>
                <li className="header_nav-item">
                  <a href="/signup" className="header_nav-link text-fontColor">
                    Sign up
                  </a>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="header_nav-item">
                  <a
                    href="/create-post"
                    className="header_nav-link text-fontColor"
                  >
                    Create Post
                  </a>
                </li>
                <li className="header_nav-item">
                  <a href="/profile" className="header_nav-link text-fontColor">
                    Profile
                  </a>
                </li>
                <li className="header_nav-item">
                  <a href="/logout" className="header_nav-link text-fontColor">
                    Log Out
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
