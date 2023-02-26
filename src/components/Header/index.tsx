import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header>
      <Link className="logo" to={"/"}>Prime flix</Link>
      <Link className="favorites" to={"/favorites"}>Meus filmes</Link>
    </header>
  );
}
