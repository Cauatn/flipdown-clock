export function Footer({ isFullScreen }: { isFullScreen: boolean }) {
  return (
    <footer className="flex px-12 justify-end pb-2">
      {!isFullScreen ? (
        <p className="text-lg">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Cauatn"
            className="hover:cursor-pointer text-bold underline underline-offset-4"
          >
            Cauã Tavares
          </a>
        </p>
      ) : null}
    </footer>
  );
}
