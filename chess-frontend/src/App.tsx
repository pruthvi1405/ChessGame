import './App.scss'
import ChessBoard from './components/ChessBoard/ChessBoard';



function App() {

  return (
    <>
     <div className={`d-flex flex-row mh-100 game`}>
        <div className='board w-75 '>
          <ChessBoard/>
        </div>
        <div>User</div>
     </div>
    </>
  )
}

export default App
