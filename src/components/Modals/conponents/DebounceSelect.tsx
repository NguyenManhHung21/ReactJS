import { Avatar, Select, Space, Spin } from "antd";
import { debounce, isEmpty } from "lodash";
import { useMemo, useState } from "react";
import { IOption } from "../../../typeChatApp";

export interface IDebounceSelectProps {
  fetching: boolean;
  fetchOptions: any;
  debounceTimeout: number;
  value: Array<IOption>;
  handleChangeSelect: any;
}
const { Option } = Select;

export default function DebounceSelect(props: IDebounceSelectProps) {
  const [option, setOption] = useState<Array<IOption>>([]);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (inputSearch: string) =>
      props.fetchOptions(inputSearch);
    return debounce(loadOptions, props.debounceTimeout);
  }, [props.debounceTimeout, props.fetchOptions]);

  return (
    <div>
      <Select
      allowClear
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={props.fetching ? <Spin size="small" /> : null}
        mode="multiple"
        placeholder="Nhập tên thành viên..."
        onChange={props.handleChangeSelect}
        style={{ width: "100%", margin: "20px 0" }}
      >
        {props.value.map((opt: IOption) => (
          <Option key={opt.uid} value={opt.uid} label={opt.label}>
            <Space>
              <Avatar src={opt.photoURL} size={"small"}>
                {opt.photoURL ? "" : opt?.label.charAt(0).toUpperCase()}
              </Avatar>
              <span>{opt.label}</span>
            </Space>
          </Option>
        ))}
      </Select>
    </div>
  );
}
