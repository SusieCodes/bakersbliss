// // import React, { useRef } from "react";
// // import * as ReactDOM from "react-dom";
// // import { render } from "react-dom";
// // import { useHistory } from "react-router-dom";
// // import ReactToPrint from "react-to-print";
// // import { getRecipeById } from "./RecipeManager";
// // import { PrintableRecipe } from "../recipes/PrintableRecipe";
// import "../shopping/print.css";

// // export class ComponentToPrint extends React.Component {
// //   state = { recipe: {} };

// //   componentDidMount() {
// //     let recipeId = this.props.params;
// //     this.fetchData(recipeId);
// //   }
// //   fetchData = (recipeId) => {
// //     console.log("recipeId is :", recipeId);
// //     //this is showing as undefined in the console
// //     getRecipeById(recipeId).then((userRecipe) => {
// //       this.setState({ recipe: userRecipe });
// //     });
// //   };

// //   render() {
// //     return (
// //       <>
// //         <div className="test-printing">
// //           <h1>CAN I GET THIS TO PRINT</h1>
// //         </div>
// //       </>
// //     );
// //   }
// // }

// // export default (props) => <ComponentToPrint {...props} params={useParams()} />;

// // export const PrintRecipe = () => {
// //   const componentRef = useRef();
// //   const history = useHistory();

// //   // const handlePrint = useReactToPrint({
// //   //   content: () => componentRef.current,
// //   // });

// //   return (
// //     <>
// //       <div className="print-wrapper">
// //         {/* <ComponentToPrint ref={componentRef} /> */}
// //         <ReactToPrint
// //           trigger={() => (
// //             <button
// //               className="recipe-print-btn"
// //               onClick={() => {
// //                 history.goBack();
// //               }}
// //             >
// //               Print
// //             </button>
// //           )}
// //           content={() => componentRef.current}
// //         />
// //         <div ref={componentRef}>
// //           <PrintableRecipe />
// //           {/* </div>
// //         <div className="print-btn-flex">
// //           {/* <button className="recipe-print-btn" onClick={handlePrint}>
// //             Print
// //           </button> */}

// //           <button
// //             className="recipe-print-btn"
// //             onClick={() => {
// //               history.goBack();
// //             }}
// //           >
// //             Print
// //           </button>

// //           <button
// //             className="recipe-print-btn"
// //             onClick={() => {
// //               history.goBack();
// //             }}
// //           >
// //             Back
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // render(<PrintRecipe />, document.querySelector("#root"));

// // export default PrintRecipe;

// // ReactDOM.render(<PrintRecipe />, document.getElementById("root"));

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import ReactToPrint from "react-to-print";
// import {
//   getRecipeById,
//   getIngredientsByRecipeId,
//   getImagesByRecipeId,
// } from "./RecipeManager";
// import { PrintableRecipe } from "./PrintableRecipe";

// export const PrintRecipe = () => {
//   const componentRef = useRef(null);
//   const { recipeId } = useParams();
//   console.log("recipeId is: ", recipeId);
//   const [notes, setNotes] = useState([]);
//   const [images, setImages] = useState([]);
//   const [ingredients, setIngredients] = useState([]);
//   const [recipe, setRecipe] = useState({});

//   useEffect(() => {
//     getRecipeById(recipeId).then((recipeFromAPI) => {
//       setRecipe(recipeFromAPI);
//       setNotes(recipeFromAPI.notes);
//     });
//     getImagesByRecipeId(recipeId).then((imageArray) => {
//       setImages(imageArray);
//     });
//     getIngredientsByRecipeId(recipeId).then((ingredientList) => {
//       setIngredients(ingredientList);
//     });
//     console.log("recipe after useEffect is :", recipe);
//   }, []);

//   const reactToPrintContent = React.useCallback(() => {
//     return componentRef.current;
//   }, [componentRef.current]);

//   const reactToPrintTrigger = useCallback(() => {
//     // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
//     // to the root node of the returned component as it will be overwritten.

//     // Bad: the `onClick` here will be overwritten by `react-to-print`
//     // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

//     // Good
//     return <button>Print</button>; // eslint-disable-line max-len
//   }, []);

//   return (
//     <div className="print-wrapper">
//       <ReactToPrint
//         content={reactToPrintContent}
//         trigger={reactToPrintTrigger}
//       />
//       <PrintableRecipe
//         ref={componentRef}
//         recipe={recipe}
//         images={images}
//         notes={notes}
//         ingredients={ingredients}
//       />
//     </div>
//   );
// };
