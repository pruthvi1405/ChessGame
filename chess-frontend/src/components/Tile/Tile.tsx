import "./Tile.scss";

interface Props {
  number: number;
  image?: string;
}

function Tile({ number, image }: Props) {
  return (
    <div className={`grid ${number % 2 === 0 ? "pink" : "purple"}`}>
     { image && <div
        className="img"
        style={{ backgroundImage:`url(${image})`}} 
        />}
    </div>
  );
}

export default Tile;
