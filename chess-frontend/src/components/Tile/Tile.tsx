import "./Tile.scss"

interface Props{
    number:number
    image?:string
}

function Tile({ number, image }: Props) {
    return (
      <div className={`grid ${number % 2 === 0 ? "pink" : "purple"}`}>
        {/* Only render the image if `image` is defined */}
        {image && <img src={image} alt="pawn" />}
      </div>
    );
  }


export default Tile