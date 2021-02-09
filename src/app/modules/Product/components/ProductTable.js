/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from 'react'
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import * as swal from "../../Common/components/SweetAlert";
import ProductTableSearch from './ProductTableSearch'
import * as productAxios from '../_redux/productAxios'

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductTable(props) {
    const [paginated, setPaginated] = React.useState({
        page: 1,
        recordsPerPage: 10,
        orderingField: "",
        ascendingOrder: true,
        searchValues: {
          name: "",
          productGroupId: null,
          isShowInActive: false
        }
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
        productAxios
          .getProductFilter(
            paginated.orderingField,
            paginated.ascendingOrder,
            paginated.page,
            paginated.recordsPerPage,
            paginated.searchValues.name,
            paginated.searchValues.isShowInActive,
            paginated.searchValues.productGroupId
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
              alert(res.data.message);
            }
          })
          .catch((err) => {
            alert(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
    
      const handleDelete = (id,name) => {
        //confirm
        swal
          .swalConfirm("Confirm delete?", `Confirm delete ${name}?`)
          .then((res) => {
            if (res.isConfirmed) {
              //delete
              productAxios
                .deleteProduct(id)
                .then((res) => {
                  if (res.data.isSuccess) {
                    //reload
                    swal
                      .swalSuccess("Success", `Delete ${id} success.`)
                      .then(() => {
                        loadData();
                      });
                  }
                })
                .catch((err) => {
                  //network error
                  swal.swalError("Error", err.message);
                });
            }
          });
      };
    
      const handleEdit = (id) => {
        props.history.push(`/products/edit/${id}`)
      }
    
      const handleSearch = (values) => {
        setPaginated({
          ...paginated,
          page: 1,
          searchValues: values
        });
      }
    
      const columns = [
        {
          name: "id",
          label: "Id",
        },
        {
          name: "name",
          label: "Name",
        },
        {
          name: "productGroup.name",
          label: "Group",
        },
        {
          name: "price",
          label: "Price",
          options: {
            customBodyRenderLite: (dataIndex) => {
              return (
                <Grid
                  style={{ padding: 0, margin: 0 }}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {data[dataIndex].price}
                </Grid>
              );
            }
          }
        },
        {
          name: "stock",
          label: "Stock",
        },
        {
          name: "createdBy",
          label: "Create by",
        },
        {
          name: "createdDate",
          label: "Create Date",
          options: {
            customBodyRenderLite: (dataIndex) => {
              return (
                <Grid
                  style={{ padding: 0, margin: 0 }}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {dayjs(data[dataIndex].createdDate).format(
                    "DD/MM/YYYY hh:mm:ss"
                  )}
                </Grid>
              );
            },
          },
        },
        {
          name: "isActive",
          label: "Status",
          options: {
            customBodyRenderLite: (dataIndex) => {
              return (
                <Grid
                  style={{ padding: 0, margin: 0 }}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {data[dataIndex].isActive ? (
                    <Typography color="primary">Active</Typography>
                  ) : (
                    <Typography color="error">InActive</Typography>
                  )}
                </Grid>
              );
            },
          },
        },
        {
          name: "",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {
              return (
                <>
                  {data[dataIndex].isActive && (
                    <Grid
                      style={{ padding: 0, margin: 0 }}
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <EditButton
                        style={{ marginRight: 5 }}
                        onClick={() => {
                          handleEdit(data[dataIndex].id);
                        }}
                      >
                        Edit
                      </EditButton>

                      <DeleteButton
                        onClick={() => {
                          handleDelete(
                            data[dataIndex].id,
                            data[dataIndex].name
                          );
                        }}
                      >
                        Delete
                      </DeleteButton>
                    </Grid>
                  )}
                </>
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
        onTableChange: (action, tableState) => {
          switch (action) {
            case "changePage":
              setPaginated({ ...paginated, page: tableState.page + 1});
              break;
            case "sort":
              setPaginated({
                ...paginated,
                orderingField: `${tableState.sortOrder.name}`,
                ascendingOrder:
                  tableState.sortOrder.direction === "asc" ? true : false,
              });
              break;
            case "changeRowsPerPage":
              setPaginated({
                ...paginated,
                recordsPerPage: tableState.rowsPerPage,
              });
              break;
            default:
            //  console.log(`action not handled. [${action}]`);
          }
        },
      };
    
      return (
        <div>
          {/* search */}
          <ProductTableSearch
            submit={handleSearch.bind(this)}
            history={props.history}
          ></ProductTableSearch>
          <MUIDataTable
            title={
              <Typography variant="h6">
                Products
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
export default ProductTable
