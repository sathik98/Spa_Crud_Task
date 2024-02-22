import { useState, useMemo, useEffect, useRef } from "react";
import BasicTable from "../reacttable/table";
import { NavLink } from "react-router-dom";
import "../../Stylesheets/TablePage/TablePage.scss";
import axios from "axios";
import { apikey } from "../../ApiData/apidata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Navbar from "../Navbar/Navbar";

const TablePage = () => {
  const [popup, setpopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);
  const [datacount, setdatacount] = useState();

  const [allData, setAllData] = useState([]);
  const [showOrganizationModal, setOrganizationModal] = useState(false);
  const [showOrganizationEditModal, setOrganizationEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [organization, setOrganization] = useState(null);
  const [showOrganizationViewModal, setOrganizationViewModal] = useState(false);
  const [organizationId2, setOrganizationId2] = useState(null);

  const pagesize = (arg) => {
    setdtPagesize(arg);
  };

  const pageindex = (arg) => {
    setdtPageindex(arg);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.name}
              >
                <p>{String(row.row.original.name)}</p>
              </p>
            </>
          );
        },
      },
      {
        Header: "description",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.description}
              >
                <p>{String(row.row.original.description)}</p>
              </p>
            </>
          );
        },
      },
      {
        Header: "location",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.location}
              >
                <p>{String(row.row.original.location)}</p>
              </p>
            </>
          );
        },
      },
      {
        Header: "Action",
        accessor: "",
        Cell: (row) => {
          return (
            <>
              <button
                className="action-btn"
                style={{
                  border: "none",
                  background: "none",
                  marginRight: "10px",
                }}
                onClick={() =>
                  handleOpenPopup(row.row.original._id, row.row.original)
                }
              >
                <RemoveRedEyeIcon />
              </button>

              <button
                className="action-btn"
                style={{
                  border: "none",
                  background: "none",
                  marginRight: "10px",
                }}
                onClick={() =>
                  handleOrganizationEditModal(
                    row.row.original._id,
                    row.row.original
                  )
                }
              >
                <EditIcon />
              </button>

              <button
                className="action-btn"
                style={{
                  border: "none",
                  background: "none",
                }}
                onClick={(e) => handleDeleteClick(row.row.original._id)}
              >
                <DeleteIcon />
              </button>
            </>
          );
        },
      },
    ],
    [popup]
  );

  // CREATE
  const handleOrganizationCreateModal = () => {
    console.log("Create organization");
    axios
      .post(apikey + "/organizations", formData)
      .then((res) => {
        console.log(res, "res");
        setOrganizationModal(false);
        setFormData({
          name: "",
          description: "",
          location: "",
        });
        toast.success("Organization Created Successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error, "error");

        toast.error("Failed to create organization");
        debugger;
      });
  };

  const handleOrganizationCreateOpenModal = () => {
    setOrganizationModal(true);
  };

  const handleOrganizationCreateCloseModal = () => {
    setOrganizationModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GET
  useEffect(() => {
    axios({
      method: "get",
      url: apikey + "/organizations",
    })
      .then((response) => {
        setAllData(response.data);
        console.log(response.data, "res");
      })
      .catch((error) => {
        console.log(error, "err");
      });
  }, []);

  // DELETE
  const handleOrganizationDelete = (organizationId) => {
    axios
      .delete(apikey + `/organizations/${organizationId}`)
      .then((res) => {
        console.log("Organization deleted:", res.data);
        toast.success("Organization Deleted Successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error deleting organization:", error);
        toast.error("Error deleting organization");
      });
  };

  const handleDeleteClick = (organizationId) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      handleOrganizationDelete(organizationId);
    }
  };

  // EDIT
  const handleOrganizationEditModal = (organizationId, item) => {
    setOrganizationEditModal(true);

    // Populate formDataEdit with organization data
    setFormDataEdit({
      ...formDataEdit,
      name: item.name,
      description: item.description,
      location: item.location,
      _id: organizationId,
    });
    console.log(item, "oooo", organizationId);
    // debugger;
  };

  const handleOrganizationEditCloseModal = () => {
    setOrganizationEditModal(false);
  };

  const handleOrganizationEdit = () => {
    const organizationId = formDataEdit._id;
    console.log(organizationId, "eeeddd");
    debugger;

    axios({
      method: "PUT",
      url: apikey + `/organizations/${organizationId}`,
      data: formDataEdit,
    })
      .then((res) => {
        console.log("Organization updated:", res.data);
        debugger;
        toast.success("Organization Updated Successfully");
        handleOrganizationEditCloseModal();

        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch((error) => {
        console.error("Error updating organization:", error);
        toast.error("Error updating organization");
        handleOrganizationEditCloseModal();

        debugger;
      });
  };

  const handleChangeEdit = (e) => {
    setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value });
  };

  // VIEW
  const handleOpenPopup = async (id) => {
    console.log(id, "llll");
    try {
      const response = await axios.get(apikey + `/organizations/${id}`);
      setOrganization(response.data);
      setOrganizationId2(id);
      setOrganizationViewModal(true);
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  const handleClosePopup = () => {
    setOrganizationViewModal(false);
  };

  return (
    <div className="your-orders-main-wrapper">
      {/* <Navbar />  */}
      <div className="your-order-inner">
        <div
          class="col-sm-12 col"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <button
            style={{
              backgroundColor: "#137c7e",
              border: "1px solid #137c7e",
              color: "white",
              padding: "8px",
              borderRadius: "4px",
            }}
            type="button"
            data-toggle="modal"
            onClick={handleOrganizationCreateOpenModal}
          >
            Create
          </button>
        </div>{" "}
        <div className="table-responsive w-100">
          <BasicTable
            columns={columns}
            data={allData}
            pagesize={pagesize}
            pageindex={pageindex}
            dtpagesize={dtpagesize}
            dtpageindex={dtpageindex}
            datacount={datacount}
          />
        </div>
        {/* CREATE modal start*/}
        <div
          className={
            showOrganizationModal ? "modal display-block" : "modal display-none"
          }
        >
          <section className="product-modal-main">
            <div className="modal-header">
              <h5 className="product-modal-title-modal2">Create ORG</h5>

              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleOrganizationCreateCloseModal}
              >
                <CloseIcon />{" "}
              </button>
            </div>
            <div className="modal-body" style={{ padding: "0 !important" }}>
              <div
                className="product-modal2-body-inner"
                style={{ marginLeft: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12" style={{ paddingLeft: "0px" }}>
                    <div
                      className="col-12 product-form-group"
                      style={{ paddingLeft: "0px" }}
                    >
                      <form
                        name="add_name"
                        id="add_name"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="modal2-email-wrap">
                          <div className="row mb-2">
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Name <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                class="form-control name_list"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Description{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="description"
                                className="form-control"
                                placeholder="Description"
                                class="form-control name_email"
                                value={formData.description}
                                onChange={handleChange}
                              />
                            </div>

                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Location:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                type="text"
                                name="location"
                                placeholder="Description"
                                class="form-control name_email"
                                style={{
                                  height: "0px",
                                  padding: "5px",
                                }}
                                value={formData.location}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="product-submit-btn">
                      <button
                        type="submit"
                        onClick={handleOrganizationCreateModal}
                        style={{
                          backgroundColor: "#137c7e",
                          border: "1px solid #137c7e",
                          color: "white",
                          padding: "8px",
                          borderRadius: "4px",
                        }}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* CREATE modal end */}
        {/* EDIT modal start */}
        <div
          className={
            showOrganizationEditModal
              ? "modal display-block"
              : "modal display-none"
          }
        >
          <section className="product-modal-main">
            <div className="modal-header">
              <h5 className="product-modal-title-modal2">Edit ORG</h5>

              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleOrganizationEditCloseModal}
              >
                <CloseIcon />{" "}
              </button>
            </div>
            <div className="modal-body" style={{ padding: "0 !important" }}>
              <div
                className="product-modal2-body-inner"
                style={{ marginLeft: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12" style={{ paddingLeft: "0px" }}>
                    <div
                      className="col-12 product-form-group"
                      style={{ paddingLeft: "0px" }}
                    >
                      <form
                        name="add_name"
                        id="add_name"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="modal2-email-wrap">
                          <div className="row mb-2">
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Name <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                class="form-control name_list"
                                value={formDataEdit.name}
                                onChange={handleChangeEdit}
                              />
                            </div>
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                description{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className="form-control"
                                placeholder="SKU"
                                class="form-control name_email"
                                type="text"
                                name="description"
                                value={formDataEdit.description}
                                onChange={handleChangeEdit}
                              />
                            </div>

                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                location <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                placeholder="Description"
                                class="form-control name_email"
                                style={{
                                  height: "0px",
                                  padding: "5px",
                                }}
                                type="text"
                                name="location"
                                value={formDataEdit.location}
                                onChange={handleChangeEdit}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="product-submit-btn">
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#137c7e",
                          border: "1px solid #137c7e",
                          color: "white",
                          padding: "8px",
                          borderRadius: "4px",
                        }}
                        onClick={handleOrganizationEdit}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* EDIT modal end  */}
        {/* VIEW modal start */}
        <div
          className={
            showOrganizationViewModal
              ? "modal display-block"
              : "modal display-none"
          }
        >
          <section className="product-modal-main">
            <div className="modal-header">
              <h5 className="product-modal-title-modal2">
                Organization Details
              </h5>

              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleClosePopup}
              >
                <CloseIcon />{" "}
              </button>
            </div>
            <div className="modal-body" style={{ padding: "0 !important" }}>
              <div
                className="product-modal2-body-inner"
                style={{ marginLeft: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12" style={{ paddingLeft: "0px" }}>
                    <div
                      className="col-12 product-form-group"
                      style={{ paddingLeft: "0px" }}
                    >
                      <div>
                        <table>
                          <thead>
                            <tr role="row">
                              <th colspan="1" role="columnheader">
                                Name
                              </th>
                              <th colspan="1" role="columnheader">
                                description
                              </th>
                              <th colspan="1" role="columnheader">
                                location
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {organization ? (
                              <tr role="row">
                                <td role="cell">
                                  <p
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="da d"
                                  >
                                    <p>{organization.name}</p>
                                  </p>
                                </td>
                                <td role="cell">
                                  <p
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content=" du"
                                  >
                                    <p>{organization.description}</p>
                                  </p>
                                </td>
                                <td role="cell">
                                  <p
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content=" dug"
                                  >
                                    <p> {organization.location}</p>
                                  </p>
                                </td>
                              </tr>
                            ) : (
                              <p>Loading organization data...</p>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* <div className="product-submit-btn">
                      <button
                        style={{
                          backgroundColor: "#137c7e",
                          border: "1px solid #137c7e",
                          color: "white",
                          padding: "8px",
                          borderRadius: "4px",
                        }}
                        type="submit"
                        onClick={handleOrganizationEdit}
                      >
                        Close
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* VIEW modal END */}
      </div>
    </div>
  );
};

export default TablePage;
