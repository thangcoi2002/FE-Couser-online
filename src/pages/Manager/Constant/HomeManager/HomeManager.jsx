import { useEffect, useState } from "react";

import Bars from "~/components/Chart/Bars";
import * as authService from "~/services/authService"

function HomeManager() {
  const labelsMonths = []
  const [dataBar,setDataBar] = useState([111,2132,123,123,12312,312,3123,112,123,123,4,1])

  for (var i = 1; i <=12; i++) {
    labelsMonths.push(`Tháng ${i}`)
  }


  return (
    <div className="flex flex-col items-center w-full my-10">
      <Bars title={"Doanh thu hàng tháng"} labels={labelsMonths} dataBar={dataBar}/>  
    </div>
  );
}

export default HomeManager;
