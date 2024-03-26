import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <p>Oops! Something went wrong..</p>
            <Link to="/">Back to Home</Link>
        </div>
    )
}