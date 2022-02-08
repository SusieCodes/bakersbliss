// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import {
// //   getRecipeById,
// //   getIngredientsByRecipeId,
// //   getImagesByRecipeId,
// // } from "./RecipeManager";
// // import { NoteCard, IngredientCard } from "../recipes/Cards";
// // import photo from "../../images/defaultcupcake.png";
// // import "../shopping/print.css";

// // this component is displayed when user is directed to /recipe/{recipeId}/print from clicking PRINT button in RecipeDetail.js
// // export const PrintableRecipe = () => {
// //   const { recipeId } = useParams();
// //   console.log("recipeId is: ", recipeId);
// //   const [notes, setNotes] = useState([]);
// //   const [images, setImages] = useState([]);
// //   const [ingredients, setIngredients] = useState([]);
// //   const [recipe, setRecipe] = useState({});

// //   useEffect(() => {
// //     getRecipeById(recipeId).then((recipeFromAPI) => {
// //       setRecipe(recipeFromAPI);
// //       setNotes(recipeFromAPI.notes);
// //     });
// //     getImagesByRecipeId(recipeId).then((imageArray) => {
// //       setImages(imageArray);
// //     });
// //     getIngredientsByRecipeId(recipeId).then((ingredientList) => {
// //       setIngredients(ingredientList);
// //     });
// //     console.log("recipe after useEffect is :", recipe);
// //   }, []);

// //   return (
// //     <>
// //       <div className="print-container">
// //         <h1>THIS IS WHAT I WANT TO PRINT</h1>
// //         <div className="print-info">
// //           <div className="printable-recipe">
// //             <div className="recipe-top">
// //               <div className="recipe-top__col1">
// //                 <div className="recipe-info">
// //                   <div className="name-fave-wrapper">
// //                     <div className="recipe-name">{recipe?.name}</div>
// //                   </div>
// //                   <div className="cat-rating-wrapper">
// //                     <div className="category">
// //                       Category: <span>{recipe?.category.name}</span>
// //                     </div>
// //                     <div className="rating">
// //                       Rating: <span>{recipe?.ratingId}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="recipe-time">
// //                   <div className="prep-time-wrapper">
// //                     <div className="prep-text">
// //                       <div className="servings">Servings:</div>

// //                       <div className="prep">Prep time:</div>
// //                       <div className="cook">Cook time:</div>
// //                       <div className="total">Total:</div>
// //                     </div>
// //                     <div className="prep-times">
// //                       <div className="servings">
// //                         {recipe?.servings !== "" ? recipe?.servings : 0}
// //                       </div>
// //                       <div className="prep">
// //                         {recipe?.prep !== "" ? recipe.prep : 0}mins
// //                       </div>
// //                       <div className="cook">
// //                         {" "}
// //                         {recipe?.cook !== "" ? recipe.cook : 0}mins
// //                       </div>
// //                       <div className="total">
// //                         {recipe?.prep !== "" && recipe?.cook !== ""
// //                           ? parseInt(recipe.prep) + parseInt(recipe.cook)
// //                           : 0}
// //                         mins
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="recipe-prep-info"></div>
// //                 </div>
// //               </div>
// //               <div className="recipe-top__col2">
// //                 {images[1] ? (
// //                   <div className="recipe-photo__thumbnails">
// //                     <div className="thumbnail">
// //                       {images[1] ? (
// //                         <img src={images[1].image_path} alt={recipe?.name} />
// //                       ) : (
// //                         <img src={photo} alt={recipe?.name} />
// //                       )}
// //                     </div>
// //                     <div className="thumbnail middle">
// //                       {images[2] ? (
// //                         <img src={images[2].image_path} alt={recipe?.name} />
// //                       ) : (
// //                         <img src={photo} alt={recipe?.name} />
// //                       )}
// //                     </div>
// //                     <div className="thumbnail">
// //                       {images[3] ? (
// //                         <img src={images[3].image_path} alt={recipe?.name} />
// //                       ) : (
// //                         <img src={photo} alt={recipe?.name} />
// //                       )}
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   ""
// //                 )}

// //                 <div className="recipe-photo">
// //                   {images[0] ? (
// //                     <img src={images[0].image_path} alt={recipe?.name} />
// //                   ) : (
// //                     <img src={photo} alt={recipe?.name} />
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="recipe-middle">
// //               <h4>Description:</h4>
// //               <p>{recipe?.description}</p>
// //             </div>

// //             <div className="recipe-general">
// //               <div className="ingredients">
// //                 <h4>Ingredients:</h4>
// //                 ternary statement that shows ingredients if they exist
// //                 {ingredients[0] ? (
// //                   <div className="ingredient-list">
// //                     {ingredients.map((ingredient) => (
// //                       <IngredientCard
// //                         key={ingredient.id}
// //                         ingredient={ingredient}
// //                       />
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   ""
// //                 )}
// //               </div>
// //               <div className="instructions">
// //                 <h4>Instructions:</h4>
// //                 <p>{recipe?.instructions}</p>
// //               </div>
// //               ternary statement that shows notes if they exist
// //               {notes[0] ? (
// //                 <div className="notes">
// //                   <h4>Notes:</h4>

// //                   {notes.map((note) => (
// //                     <NoteCard key={note.id} note={note} />
// //                   ))}
// //                 </div>
// //               ) : (
// //                 ""
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// import React, { forwardRef } from "react";
// // import { useParams } from "react-router-dom";
// // import {
// //   getRecipeById,
// //   getIngredientsByRecipeId,
// //   getImagesByRecipeId,
// // } from "./RecipeManager";
// import { NoteCard, IngredientCard } from "../recipes/Cards";
// import photo from "../../images/defaultcupcake.png";
// import "../shopping/print.css";

// // this component is displayed when user is directed to /recipe/{recipeId}/print from clicking PRINT button in RecipeDetail.js
// export const ComponentToPrint = ({ images, ingredients, notes, recipe }) => {
//   // const { recipeId } = useParams();
//   // console.log("recipeId is: ", recipeId);
//   // const [notes, setNotes] = useState([]);
//   // const [images, setImages] = useState([]);
//   // const [ingredients, setIngredients] = useState([]);
//   // const [recipe, setRecipe] = useState({});

//   // useEffect(() => {
//   //   getRecipeById(recipeId).then((recipeFromAPI) => {
//   //     setRecipe(recipeFromAPI);
//   //     setNotes(recipeFromAPI.notes);
//   //   });
//   //   getImagesByRecipeId(recipeId).then((imageArray) => {
//   //     setImages(imageArray);
//   //   });
//   //   getIngredientsByRecipeId(recipeId).then((ingredientList) => {
//   //     setIngredients(ingredientList);
//   //   });
//   //   console.log("recipe after useEffect is :", recipe);
//   // }, []);

//   // *********************************

//   // export class ComponentToPrint extends React.PureComponent {
//   //   constructor(props) {
//   //     super(props);

//   //     this.state = { checked: false };
//   //   }

//   // canvasEl;

//   // componentDidMount() {
//   //   const ctx = this.canvasEl.getContext("2d");
//   //   if (ctx) {
//   //     ctx.beginPath();
//   //     ctx.arc(95, 50, 40, 0, 2 * Math.PI);
//   //     ctx.stroke();
//   //     ctx.fillStyle = "rgb(200, 0, 0)";
//   //     ctx.fillRect(85, 40, 20, 20);
//   //     ctx.save();
//   //   }
//   // }

//   // handleCheckboxOnChange = () =>
//   //   this.setState({ checked: !this.state.checked });

//   // setRef = (ref) => (this.canvasEl = ref);

//   // render() {
//   //   const { text } = this.props;

//   return (
//     <div className="print-container">
//       <h1>THIS IS WHAT I WANT TO PRINT</h1>
//       <div className="print-info">
//         <div className="printable-recipe">
//           <div className="recipe-top">
//             <div className="recipe-top__col1">
//               <div className="recipe-info">
//                 <div className="name-fave-wrapper">
//                   <div className="recipe-name">{recipe?.name}</div>
//                 </div>
//                 <div className="cat-rating-wrapper">
//                   <div className="category">
//                     Category: <span>{recipe?.category.name}</span>
//                   </div>
//                   <div className="rating">
//                     Rating: <span>{recipe?.ratingId}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="recipe-time">
//                 <div className="prep-time-wrapper">
//                   <div className="prep-text">
//                     <div className="servings">Servings:</div>

//                     <div className="prep">Prep time:</div>
//                     <div className="cook">Cook time:</div>
//                     <div className="total">Total:</div>
//                   </div>
//                   <div className="prep-times">
//                     <div className="servings">
//                       {recipe?.servings !== "" ? recipe?.servings : 0}
//                     </div>
//                     <div className="prep">
//                       {recipe?.prep !== "" ? recipe.prep : 0}mins
//                     </div>
//                     <div className="cook">
//                       {" "}
//                       {recipe?.cook !== "" ? recipe.cook : 0}mins
//                     </div>
//                     <div className="total">
//                       {recipe?.prep !== "" && recipe?.cook !== ""
//                         ? parseInt(recipe.prep) + parseInt(recipe.cook)
//                         : 0}
//                       mins
//                     </div>
//                   </div>
//                 </div>
//                 <div className="recipe-prep-info"></div>
//               </div>
//             </div>
//             <div className="recipe-top__col2">
//               {images[1] ? (
//                 <div className="recipe-photo__thumbnails">
//                   <div className="thumbnail">
//                     {images[1] ? (
//                       <img src={images[1].image_path} alt={recipe?.name} />
//                     ) : (
//                       <img src={photo} alt={recipe?.name} />
//                     )}
//                   </div>
//                   <div className="thumbnail middle">
//                     {images[2] ? (
//                       <img src={images[2].image_path} alt={recipe?.name} />
//                     ) : (
//                       <img src={photo} alt={recipe?.name} />
//                     )}
//                   </div>
//                   <div className="thumbnail">
//                     {images[3] ? (
//                       <img src={images[3].image_path} alt={recipe?.name} />
//                     ) : (
//                       <img src={photo} alt={recipe?.name} />
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 ""
//               )}

//               <div className="recipe-photo">
//                 {images[0] ? (
//                   <img src={images[0].image_path} alt={recipe?.name} />
//                 ) : (
//                   <img src={photo} alt={recipe?.name} />
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="recipe-middle">
//             <h4>Description:</h4>
//             <p>{recipe?.description}</p>
//           </div>

//           <div className="recipe-general">
//             <div className="ingredients">
//               <h4>Ingredients:</h4>
//               ternary statement that shows ingredients if they exist
//               {ingredients[0] ? (
//                 <div className="ingredient-list">
//                   {ingredients.map((ingredient) => (
//                     <IngredientCard
//                       key={ingredient.id}
//                       ingredient={ingredient}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 ""
//               )}
//             </div>
//             <div className="instructions">
//               <h4>Instructions:</h4>
//               <p>{recipe?.instructions}</p>
//             </div>
//             ternary statement that shows notes if they exist
//             {notes[0] ? (
//               <div className="notes">
//                 <h4>Notes:</h4>

//                 {notes.map((note) => (
//                   <NoteCard key={note.id} note={note} />
//                 ))}
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// // }

// export const PrintableRecipe = forwardRef((props, ref) => {
//   //eslint-disable-line max-len
//   return <ComponentToPrint ref={ref} text={props.text} />;
// });
