import React from "react";
import { Card, CardHeader, CardFooter, Button } from "shards-react";
const FilterData = ({ children, handleFilter, handleChange, ...props }) => {
  return (
    <Card>
      <CardHeader className="border-bottom">Kategori</CardHeader>
      {children}
      <CardFooter className="border-top py-3 px-3">
        <Button theme="primary" onClick={handleFilter}>
          &nbsp;Terapkan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilterData;
