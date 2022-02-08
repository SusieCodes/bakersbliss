// import React, { useRef } from "react";
// import { render } from "react-dom";
// import { useHistory } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { getItemsByUserId } from "./ShoppingManager";
// import { ListPrintCard } from "./ItemCard";
// import "../shopping/print.css";

// this component is displayed when user is directed to /shopping/print from clicking PRINT button in ShoppingList.js
// export class ComponentToPrint extends React.Component {
//   state = { items: [] };

//   componentDidMount() {
//     getItemsByUserId(localStorage.getItem("bb_user")).then((userItems) => {
//       this.setState({ items: userItems });
//     });
//   }

//   render() {
//     return (
//       <>
//         <div className="print-container">
//           <div className="print-info">
//             <div className="printable-list">
//               <div className="print-header">
//                 {localStorage.getItem("bb_username")}&#39;s List
//               </div>
//               <div className="print-list">
//                 {this.state.items.map((item) => (
//                   <ListPrintCard key={item.id} item={item} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export const PrintList = () => {
//   const componentRef = useRef();
//   const history = useHistory();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <>
//       <div className="print-wrapper" ref={componentRef}>
//         <ComponentToPrint />
//         <div className="print-btn-flex">
//           <div className="shop-print-btn" onClick={handlePrint}>
//             Print
//           </div>

//           <div
//             className="shop-print-btn"
//             onClick={() => {
//               history.goBack();
//             }}
//           >
//             Back
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
