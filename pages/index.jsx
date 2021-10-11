export default function Home() {
  return (
    <div className="">
      <Article />
      <Article />
      <Article />
    </div>
  );
}

const Article = ({ image, direction }) => {
  return (
    <article className={`flex ${direction}`}>
      {image ? <img className="max-w-xl max-h-80" src={image} /> : <></>}
      <div className="prose w-1/2">
        <h2>Netflix Payments reminder with the help of Home Assistant</h2>
        <p>
          March 2, 2020 - 🕒 <i>6 minutes read</i>
        </p>
        <p>
          Today's project aims at tracking the invoices of a shared account
          thanks to Home Assistant. For those of you that don't know what Home…
        </p>
      </div>
    </article>
  );
};
