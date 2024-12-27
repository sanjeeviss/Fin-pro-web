import { GetSelectOption } from "../services/Index";
import {
  filterAgent,
  filterRoute,
  filterTenur,
} from "../store/slice/filterSlice";
import Common from "./common";

const UpdateFilterData = () => {
  const { dispatch } = Common();

  const fetchOptionField = async () => {
    try {
      const res = await GetSelectOption();
      console.log(res);

      // Mapping collection agents
      dispatch(
        filterAgent(
          res.table2.map(({ id, name }) => ({
            label: name,
            value: id,
          }))
        )
      );

      // Mapping routes
      dispatch(
        filterRoute(
          res.table.map(({ id, starting_point }) => ({
            label: starting_point,
            value: id,
          }))
        )
      );

      // Mapping tenur types
      dispatch(
        filterTenur(
          res.table1.map(({ id, loan_type }) => ({
            label: loan_type,
            value: id,
          }))
        )
      );
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const updateAllFilters = async () => {
    await Promise.all([fetchOptionField()]);
  };

  const Update = async (type) => {
    switch (type) {
      case "all":
        await updateAllFilters();
        break;
      case "selectOption":
        await fetchOptionField();
        break;

      default:
      // console.error("Invalid filter type:", type);
    }
  };

  return {
    Update,
  };
};

export default UpdateFilterData;
