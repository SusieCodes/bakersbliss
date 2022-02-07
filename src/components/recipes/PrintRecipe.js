import React, { useRef } from "react";
import { render } from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getRecipeById } from "./RecipeManager";
// import { PrintableRecipe } from "../recipes/PrintableRecipe";
import "../shopping/print.css";

export class ComponentToPrint extends React.Component {
  state = { recipe: {} };

  componentDidMount() {
    // let recipeId = this.props.params;
    // this.fetchData(recipeId);
  }
  // fetchData = (recipeId) => {
  //   console.log("recipeId is :", recipeId);
  //   //this is showing as undefined in the console
  //   getRecipeById(recipeId).then((userRecipe) => {
  //     this.setState({ recipe: userRecipe });
  //   });
  // };

  render() {
    return (
      <>
        <div className="test-printing">
          <h1>CAN I GET THIS TO PRINT</h1>
        </div>
      </>
    );
  }
}

export default (props) => <ComponentToPrint {...props} params={useParams()} />;

export const PrintRecipe = () => {
  const componentRef = useRef();
  const history = useHistory();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="print-wrapper">
        <ComponentToPrint ref={componentRef} />
        {/* <PrintableRecipe ref={componentRef} /> */}
        <div className="print-btn-flex">
          <button className="recipe-print-btn" onClick={handlePrint}>
            Print
          </button>

          <button
            className="recipe-print-btn"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

render(<PrintRecipe />, document.querySelector("#root"));
