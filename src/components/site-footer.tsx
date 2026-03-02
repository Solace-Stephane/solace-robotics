export function SiteFooter() {
  return (
    <footer className="container footer">
      <p>© {new Date().getFullYear()} Solace Robotics</p>
      <p className="text-muted">Simulation-first robotics data and evaluation.</p>
    </footer>
  );
}
