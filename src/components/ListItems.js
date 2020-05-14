import React from "react";
import { CardBody, FormCheckbox } from "shards-react";

import Scrollbars from "react-custom-scrollbars";

const ListItems = ({
  checkboxHeader,
  children,
  items,
  headerData,
  headerChecked,
  handleChange,
  scrollHeight
}) => {
  return (
    <CardBody className="p-0">
      <Scrollbars autoHeight autoHeightMin={scrollHeight}>
        <table className="table mb-0">
          <thead className="bg-light">
            <tr>
              {checkboxHeader && (
                <th
                  key="checkboxHeader"
                  scope="col"
                  width="5%"
                  className="bg-light border-0 pl-3"
                  style={{ position: "sticky", top: "0" }}
                >
                  <FormCheckbox
                    className="m-0 mb-1"
                    name="checkAll"
                    checked={headerChecked}
                    onChange={e => {
                      e.target.name = "checkAll";
                      handleChange(e);
                    }}
                  />
                </th>
              )}
              {headerData.map((header, key) => (
                <th
                  key={`${header.name}~${key}`}
                  scope="col"
                  width={header.width}
                  className={`bg-light border-0 ${key === 0 && "pl-3"}`}
                  style={{ position: "sticky", top: "0" }}
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length < 1 && (
              <tr className="text-center">
                <td
                  colSpan={
                    checkboxHeader ? headerData.length + 1 : headerData.length
                  }
                >
                  Tidak ada data ditemukan
                </td>
              </tr>
            )}
            {children}
          </tbody>
        </table>
      </Scrollbars>
    </CardBody>
  );
  // return <Row>{arrays}</Row>;
};

export default ListItems;
