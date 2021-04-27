import React from "react";


class Button extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()} className={this.props.classe} style={{ color: this.props.color, backgroundColor: this.props.bcolor }}>
        {this.props.name}
      </button>
    );
  }
}
//button appeler dans la table.js avec des valeurs differentes (give and stop)
export default Button;