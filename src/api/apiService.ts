const axios = require("axios").default;

export default {
  getPopulationData() {
    return axios.get(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    ).then((response:any)=>{
        return response;
    });
  },
};
