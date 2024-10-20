import Link from "next/link";
import { useRouter } from "next/router"; // Import the router
import "../assets/css/Navbar.css";

function Navbar() {
  const router = useRouter(); // Access the router object to get the current path

  return (
    <>
      <div className="d-flex flex-column">
        <nav
          className="navbar navbar-expand-lg sticky-top p-1 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <Link
            href={"/home"}
            className="navbar-brand text-light d-flex align-items-center px-4 px-lg-5"
          >
            <div className="nav-item text-light nav-link ">Weather Monitoring</div>
          </Link>
          <button
            type="button"
            className="navbar-toggler me-4"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto me-2 p-2" style={{ gap: 10 }}>
              <Link
                href="/home"
                className={`nav-item nav-link btn ${
                  router.pathname === "/home"
                    ? "focus-ring focus-ring-light active"
                    : ""
                }`}
                style={{ fontSize: "19px" }}
              >
                Home
              </Link>

              <Link
                href="/history"
                className={`nav-item nav-link btn ${
                  router.pathname === "/history"
                    ? "focus-ring focus-ring-light active"
                    : ""
                }`}
                style={{ fontSize: "19px" }}
              >
                History 
              </Link>

              <Link
                href="/thresholdForm"
                className={`nav-item nav-link btn ${
                  router.pathname === "/thresholdForm"
                    ? "focus-ring focus-ring-light active"
                    : ""
                }`}
                style={{ fontSize: "19px" }}
              >
                Threshold
              </Link>

              

              {/* <Link
                href="/evaluateRule"
                className={`nav-item nav-link btn ${
                  router.pathname === "/evaluateRule"
                    ? "focus-ring focus-ring-light active"
                    : ""
                }`}
                style={{ fontSize: "19px" }}
              >
                Evaluate Rule
              </Link> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
