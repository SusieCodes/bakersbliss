import React, { useRef } from "react";
import { render } from "react-dom";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getItemsByUserId } from "./itemManager";
import { ListPrintCard } from "./ItemCard";
import "./item.css";

export class ComponentToPrint extends React.Component {
  state = { items: [] };

  componentDidMount() {
    getItemsByUserId(sessionStorage.getItem("bb_user")).then((userItems) => {
      this.setState({ items: userItems });
    });
  }

  render() {
    return (
      <>
        <div className="print-item-container">
          <div className="print-item-info">
            <div className="print-header">
              {sessionStorage.getItem("bb_username")}&#39;s Item List
            </div>

            <div className="print-item-list">
              {this.state.items.map((item) => (
                <ListPrintCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const PrintList = () => {
  const componentRef = useRef();
  const history = useHistory();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="print-page-item">
      <div className="print-wrapper-item">
        <ComponentToPrint ref={componentRef} />
        <div className="print-btn-flex">
          <button className="print-btn" onClick={handlePrint}>
            Print
          </button>

          <button
            className="print-btn"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

render(<PrintList />, document.querySelector("#root"));
