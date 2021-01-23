export const initialState = {
  employees: [],
  user: null,
  rows: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_EMPLOYEES":
      return {
        ...state,
        employees: action.item,
      };
    case "REMOVE_FROM_EMPLLOYEES":
      let tempEmployees = [...state.employees];
      let employeesFiltered = tempEmployees.filter((w) => w._id !== action.id);
      return {
        ...state,
        employees: employeesFiltered,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.item,
      };
    case "UPDATE_PAYROLL":
      return {
        ...state,
        rows: action.item,
      };

    default:
      return state;
  }
}
export default reducer;
