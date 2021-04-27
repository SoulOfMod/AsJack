import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './component/Button.jsx'
import Cartes from "./component/Cartes";
import StartGame from './component/StartGame.jsx'
import cardsUtils from './utils/cardsUtils.js'

class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      endGame: false,
      nameOfWinner: ""
    }
    //tout commence a "0",pas de carte,game pas commencé
  }

  onClickStop = () => {
    const cardSelectedDealer = this.rndCarte()
    const cardSelectedDealer2 = this.rndCarte()

    const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = this.transformCardIntoInt(cardSelectedDealer2.split("")[0])

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    //ajoute la carte apres avoirs mis les valeurs en int

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {
      const cardSelectedDealer = this.rndCarte()
      const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])

      cardsDealer.push(cardSelectedDealer)

      dealerValue += valueCarteDealer

      if (dealerValue > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }
        //si le dealer a + de 21 le jeu finis et player win
        break;
      }
    }
    if (dealerValue <= 21) {
      if (this.state.counterPlayer > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
        //si le dealer a - de/ou 21 et le player a + de 21 dealer win

      } else if (this.state.counterPlayer < dealerValue) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
        //si le dealer a - de/ou 21 et le player a une valeur inferieur a dealer,dealer win
      } else {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }
        //si le dealer a - de/ou 21 et aucune des condition du dessus s'apolique player win
      }
    }

    console.log("update state on stop");

    this.setState({
      counterDealer: dealerValue,
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame
    })
  }
  //cela done le nom du winner et active endgame

  onClickGive = () => {
    const cardSelected = this.rndCarte()
    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte

    this.setState({
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
    //this onclick add la carte ajouté par le bouton au total du player
  }

  startGame = () => {
    const cardSelected = this.rndCarte()
    const cardSelected2 = this.rndCarte()

    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = this.transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]

    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }
  //ceci commence le jeu,donne 2 carte et met leur valeur en int 

  renderGame() {
    return (<div>

      <div className="playGame">
        <div style={{ height: '100vh', position: 'relative' }}>
          <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>
          {/* titre */}

          <Cartes key={"dealer"} cardList={this.state.dealerCardList} />
          {this.state.endGame && (<div className='winlost'>
            <h1>Winner is {this.state.nameOfWinner}</h1>
          </div>)}
          {/* montre les cartes du dealer,jeu finis et donne le gagnant */}

          <Cartes key={"player"} cardList={this.state.playerCardList} />
          {/* montre les cartes du player */}

          <div style={{ bottom: '20px', position: 'absolute' }} className="row col-6 offset-3 flex d-flex justify-content-between">
            <div className="d-grid gap-2">
              <Button
                onClick={this.onClickGive}
                classe="btn btn-outline-warning btn-lg rounded-pill"
                color="white"
                bcolor="#0d6efd"
                name="Give"
              />
              {/* bouton give onclick donne une carte */}
            </div>
            <div>
            </div>
            <div className="d-grid gap-2">
              <Button
                onClick={this.onClickStop}
                classe="btn btn-outline-warning btn-lg rounded-pill"
                color="white"
                bcolor="#dc3545"
                name="Stop"
              />
              {/* bouton stop onclick arrete le give */}

            </div>

          </div>
        </div>
      </div>
    </div>
    )
  }

  render() {
    if (this.state.startGame === false) {
      return (
        <StartGame startGame={this.startGame} />
      )
      //si startgame est false cela return le startgame du jsx
    } else {
      return this.renderGame()
    }
  }
}

export default Table;

