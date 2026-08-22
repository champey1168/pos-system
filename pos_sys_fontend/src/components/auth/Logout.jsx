import axios from "axios";

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Remove token
            localStorage.removeItem("token");

            // Go to login page
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;