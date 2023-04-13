import Button, { Color } from "@/components/Button";
import { Textarea } from "@/components/Input";
import WidthLimit from "@/components/WidthLimit";

const Feedback = () => {
  return (
    <WidthLimit className="p-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold mb-4">Feedback</h1>
      <form>
        <fieldset className="flex flex-col rounded-md overflow-hidden max-w-xl mx-auto gap-4">
          <Textarea
            placeholder="Your question..."
            className="resize-none"
            rows={3}
          />
          <Button color={Color.Red}>
            <input type="submit" value="Ask" />
          </Button>
        </fieldset>
      </form>
      <article className="prose mx-auto w-full">
        <h2>Data collected</h2>
        <ul>
          <li>The message you&apos;re sending.</li>
        </ul>
        <h2>Why not something like ngl?</h2>
        <ul>
          <li>Not fun enough.</li>
          <li>
            Privacy implications. You can check the source code of this web
            application to see what I&apos;m collecting.
          </li>
        </ul>
      </article>
    </WidthLimit>
  );
};

export default Feedback;
