/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import * as swal from "../../Common/components/SweetAlert";
import * as stockAxios from "../_redux/stockAxios";
import StockTableSearch from "./StockTableSearch";
var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function StockTable(props) {
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      productGroupId: 0,
      productId: 0,
    },
  });

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [data, setData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //load data from api
    loadData();
  }, [paginated]);

  const loadData = () => {
    setIsLoading(true);
    stockAxios
      .getStockFilter(
        paginated.orderingField,
        paginated.ascendingOrder,
        paginated.page,
        paginated.recordsPerPage,
        paginated.searchValues.productGroupId,
        paginated.searchValues.productId
      )
      .then((res) => {
        if (res.data.isSuccess) {
          //flatten data
          let flatData = [];
          res.data.data.forEach((element) => {
            flatData.push(flatten(element));
          });
          setData(flatData);
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          swal.swalError("error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("error", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = (values) => {
    setPaginated({
      ...paginated,
      page: 1,
      searchValues: values,
    });
  };

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "product.productGroup.name",
      label: "ProductGroup",
    },
    {
      name: "product.name",
      label: "Product",
    },
    {
      name: "amountBefore",
      label: "amountBefore",
    },
    {
      name: "amountNumber",
      label: "amountNumber",
    },
    {
      name: "amountAfter",
      label: "amountAfter",
    },
    {
      name: "remark",
      label: "Remark",
    },
    {
      name: "createdBy",
      label: "Create by",
    },
    {
      name: "createdDate",
      label: "Create Date",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {dayjs(data[dataIndex].createdDate).format("DD/MM/YYYY hh:mm:ss")}
            </Grid>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: "none",
    serverSide: true,
    count: totalRecords,
    page: paginated.page - 1,
    rowsPerPage: paginated.recordsPerPage,
    onChangeRowsPerPage: (numberOfRows) => {
      setPaginated({ ...paginated, recordsPerPage: numberOfRows });
    },
    onChangePage: (currentPage) => {
      setPaginated({ ...paginated, page: currentPage + 1 });
    },
    onColumnSortChange: (changedColumn, direction) => {
      setPaginated({
        ...paginated,
        orderingField: `${changedColumn}`,
        ascendingOrder: direction === "asc" ? true : false,
      });
    },
  };

  return (
    <div>
      {/* search */}
      <StockTableSearch
        history={props.history}
        submit={handleSearch.bind(this)}
      ></StockTableSearch>
      <MUIDataTable
        title={
          <Typography variant="h6">
            Stock Edit Log
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />
      {/* {JSON.stringify(data)} */}
    </div>
  );
}
export default StockTable;
