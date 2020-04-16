import React, { useEffect, useState, forwardRef } from "react";
import { Select } from "antd";

//Services
import { CommonAPI } from "../../Services/Common";

const { Option } = Select;

const SelectCounties = forwardRef(({ ...props }, ref) => {
  const [dataSource, setDataSource] = useState([]);
  const [disableControls, setDisableControls] = useState(true);
  const { disabled, filter, state } = props;

  useEffect(() => {
    const getData = async () => {
      let response = await CommonAPI.getCounties(state);
      setDataSource(response);
      setDisableControls(false);
    };
    if (state) {
      getData();
    }
  }, [state]);

  const filterFn = (input, option) => {
    const term = String(input).toLowerCase();
    const optLabel = String(option.props.children).toLowerCase();
    return String(optLabel).includes(term);
  };
  
  return (
    <Select
      {...props}
      ref={ref}
      disabled={disabled === true || disableControls === true || state === ""}
      filterOption={filterFn}
      showSearch
      placeholder="Selecciona un ciudad">
      {dataSource.map(item => (
        <Option key={item.id} value={item.name} filter={filter}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
});

export default SelectCounties;
