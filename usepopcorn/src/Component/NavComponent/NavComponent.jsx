
import Logo from "./Logo";
function NavComponent({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
};

export default NavComponent;