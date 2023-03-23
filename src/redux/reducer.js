const initState = {
  todoEdit: { id: 3, name: "hung", birthday: "2003-09-03" },
};

const rootReducer = (state = initState, action) => {
  console.log({ state, action });
  switch (action.type) {
    case "studentList/todoEdit":
      return {
        ...state,
        todoEdit: action.payload,
      };
    case "test":
      return {
        ...state,
        todoEdit: { id: 5, name: "manh", birthday: "2002-09-03" },
      };
    default:
      return state;
  }
};
// const rootReducer = (state = initState, action) => {
//   switch (action.type) {
//     case "todoEdit":
//       return {
//         ...state,
//         todoEdit: { id: 5, name: "manh", birthday: "2002-09-03" },
//       };
//     default:
//       return state;
//   }
// };
export default rootReducer;
