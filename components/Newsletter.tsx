interface NewsletterProps {
  modal?: boolean;
}
export function Newsletter({ modal }: NewsletterProps): JSX.Element {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Subscribe to the newsletter</h3>
      <form
        className={`flex flex-col gap-2 ${
          !modal && "p-4 border rounded-md bg-gray-50"
        }`}
      >
        <p>Stay in the loop to get news about software development and tech.</p>
        <fieldset className="relative">
          <input
            type="email"
            placeholder="mail@domain.com"
            className="px-4 py-2 border rounded-md w-full"
          ></input>
          <input
            type="submit"
            value="Subscribe"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-red-800 px-4 py-1 text-white rounded-md font-bold hover:bg-red-600"
          />
        </fieldset>
      </form>
    </section>
  );
}
