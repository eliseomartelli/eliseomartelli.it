export default function Footer(): JSX.Element {
  return (
    <footer className="py-6 bg-gray-100 grow-0">
      <div className="flex max-w-3xl px-4 mx-auto flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <ul className="flex gap-1 flex-col">
            <li>Newsletter</li>
            <li>Contact me</li>
            <li>About</li>
          </ul>
          <ul className="flex gap-1 flex-col">
            <li>Twitter</li>
            <li>Instagram</li>
            <li>GitHub</li>
          </ul>
        </div>
        <p className="text-sm">
          © 2011-{new Date().getFullYear()} Eliseo Martelli 🐾
        </p>
      </div>
    </footer>
  );
}
