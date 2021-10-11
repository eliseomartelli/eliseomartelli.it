export default function Home() {
  return (
    <div className="grid-cols-2 grid space-y-8">
      <Article
        direction="col-span-2 space-x-8"
        image="https://eliseomartelli.it/static/aeb7d0061d695afcf54b40d74c79274f/f84cf/network-equipment-hardware-internet-data-server-communication-connection-datacenter.jpg"
      />
      <Article />
      <Article />
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
