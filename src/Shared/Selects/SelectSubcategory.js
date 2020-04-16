import React, { useEffect, useState, forwardRef } from "react";
import { Select } from "antd";

// Services
import { CommonAPI } from "../../Services/Common";

const { Option } = Select;

const SelectSubcategories = forwardRef(({ ...props }, ref) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await CommonAPI.getSubcategory();
      setDataSource(response);
    };
    fetchData();
  }, []);

  return (
    <Select {...props} ref={ref} placeholder="Selecciona una subcategoría">
      {dataSource.map(item => (
        <Option key={item.id} value={item.name} >
          {item.name}
        </Option>
      ))}
    </Select>
  );
});

export default SelectSubcategories;
