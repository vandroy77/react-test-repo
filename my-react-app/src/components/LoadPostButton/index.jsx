import { Component } from "react";
import "./styles.css";

export class LoadPostsButton extends Component {
  render() {
    const { text, onclick, disabled } = this.props;

    return (
     
        <button disabled={disabled} className="button" onClick={onclick}>{text}</button>
    
    );
  }
}
