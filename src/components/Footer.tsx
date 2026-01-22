import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Super Simple List. All rights reserved.</p>
      <p>Created by João Eduardo Silva.</p>
    </footer>
  );
}