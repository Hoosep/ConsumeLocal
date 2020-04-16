import React, { useEffect, useState, forwardRef } from "react";
import { Select } from "antd";

// Services
import { CommonAPI } from "../../Services/Common";

const { Option } = Select;

const SelectStates = forwardRef(({ ...props }, ref) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await CommonAPI.getStates();
      setDataSource(response);
    };
    fetchData();
  }, []);


  const filterFn = (input, option) => {
    const term = String(input).toLowerCase();
    const optLabel = String(option.props.children).toLowerCase();
    return String(optLabel).includes(term);
  };

  return (
    <Select
      {...props}
      ref={ref}
      filterOption={filterFn}
      showSearch
      placeholder="Selecciona un estado">
      {dataSource.map(item => (
        <Option key={item.nombre} value={item.nombre} >
          {item.nombre}
        </Option>
      ))}
    </Select>
  );
});

export default SelectStates;
