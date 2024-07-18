import "../styles/Header.css";
import { useAuth } from "../provider/AuthProvider";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { getLocalStorageItemByName } from "../services/sessionService";
function Header() {
  const { isLoggedIn } = useAuth();
  const username = getLocalStorageItemByName("username");
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
              <a
                href="/feed"
                className="header_nav-link text-fontColor font-medium"
              >
                Feed
              </a>
            </li>
            {!isLoggedIn && (
              <>
                <li className="header_nav-item">
                  <a
                    href="/login"
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Login
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href="/signup"
                    className="header_nav-link text-fontColor font-medium"
                  >
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
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Create Post
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href="/code"
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Create Program
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href="/programs"
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Browse Programs
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href="/workflows"
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Browse Workflows
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href="/workflow"
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Workflow
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href={`/profile/${encodeURIComponent(username)}`}
                    className="header_nav-link text-fontColor font-medium"
                  >
                    Profile
                  </a>
                </li>
                <li className="header_nav-item">
                  <a
                    href="/logout"
                    className="header_nav-link text-fontColor font-medium"
                  >
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
