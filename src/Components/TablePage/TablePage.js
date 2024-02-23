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
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../Assests/Gif/load3.gif";
import Swal from "sweetalert2";

const TablePage = () => {
  const [popup, setpopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [dtpageindex, setdtPageindex] = useState(1);
  const [dtpagesize, setdtPagesize] = useState(10);

  const [allData, setAllData] = useState([]);
  const [showOrganizationModal, setOrganizationModal] = useState(false);
  const [showOrganizationEditModal, setOrganizationEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    number: "",
    email: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    description: "",
    location: "",
    number: "",
    email: "",
  });

  const [organization, setOrganization] = useState(null);
  const [showOrganizationViewModal, setOrganizationViewModal] = useState(false);

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
        Header: "Email",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.email}
              >
                <p>{String(row.row.original.email)}</p>
              </p>
            </>
          );
        },
      },
      {
        Header: "Number",
        accessor: "",

        Cell: (row) => {
          return (
            <>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={row.row.original.number}
              >
                <p>{String(row.row.original.number)}</p>
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
              <div className="action-wrap">
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
                    marginRight: "10px",
                  }}
                  onClick={(e) => handleDeleteClick(row.row.original._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
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
    // setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.location ||
      !formData.description
    ) {
      toast.error("All fields are required");
      return;
    }

    axios
      .post(apikey + "/organizations", formData)
      .then((res) => {
        console.log(res, "res");
        setOrganizationModal(false);
        setFormData({
          name: "",
          description: "",
          location: "",
          number: "",
          email: "",
        });
        // setLoading(false);
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
    setLoading(true);

    axios({
      method: "get",
      url: apikey + "/organizations",
    })
      .then((response) => {
        setAllData(response.data);
        console.log(response.data, "res");
        setLoading(false);
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
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this organization?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleOrganizationDelete(organizationId);
      }
    });
  };

  // EDIT
  const handleOrganizationEditModal = (organizationId, item) => {
    setOrganizationEditModal(true);
    setFormDataEdit({
      ...formDataEdit,
      name: item.name,
      description: item.description,
      location: item.location,
      number: item.number,
      email: item.email,
      _id: organizationId,
    });
    console.log(item, "oooo", organizationId);
  };

  const handleOrganizationEditCloseModal = () => {
    setOrganizationEditModal(false);
  };

  const handleOrganizationEdit = () => {
    const organizationId = formDataEdit._id;
    console.log(organizationId, "eeeddd");
    setLoading(true);

    axios({
      method: "PUT",
      url: apikey + `/organizations/${organizationId}`,
      data: formDataEdit,
    })
      .then((res) => {
        console.log("Organization updated:", res.data);
        debugger;
        setLoading(false);
        toast.success("Organization Updated Successfully");
        handleOrganizationEditCloseModal();
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
      <Navbar />
      <Sidebar />

      <div className="row your-order-inner">
        <div class="col-sm-7 col-auto">
          <h4 class="page-title">Organization Table</h4>
        </div>
        <div
          class="col-sm-5 col"
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
        <div>
          {loading ? (
            <div className="loader-wrap">
              <img src={Loader} alt="Loading..." className="loader-gif" />
            </div>
          ) : (
            <div className="table-responsive w-100">
              <BasicTable
                columns={columns}
                data={allData}
                pagesize={pagesize}
                pageindex={pageindex}
                dtpagesize={dtpagesize}
                dtpageindex={dtpageindex}
              />
            </div>
          )}
        </div>
        {/* CREATE modal start*/}
        <div
          className={
            showOrganizationModal ? "modal display-block" : "modal display-none"
          }
        >
          <section className="product-modal-main">
            <div className="modal-header">
              <h5 className="product-modal-title-modal2">
                Create Organization
              </h5>

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
                                required
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
                                Email: <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                class="form-control name_list"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>

                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Number: <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                name="number"
                                placeholder="Number"
                                required
                                class="form-control name_list"
                                value={formData.number}
                                onChange={handleChange}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 10);
                                }}
                              />
                            </div>

                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Location <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="location"
                                className="form-control"
                                required
                                placeholder="Location"
                                class="form-control name_email"
                                value={formData.location}
                                onChange={handleChange}
                              />
                            </div>
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Description:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                type="text"
                                name="description"
                                placeholder="Location"
                                class="form-control name_list"
                                style={{
                                  height: "0px",
                                  padding: "5px",
                                }}
                                value={formData.description}
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
              <h5 className="product-modal-title-modal2">Edit Organization</h5>

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
                                required
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
                                Email: <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                class="form-control name_list"
                                value={formDataEdit.email}
                                onChange={handleChangeEdit}
                              />
                            </div>

                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>
                                Number: <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                name="number"
                                placeholder="Number"
                                required
                                class="form-control name_list"
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 10);
                                }}
                                value={formDataEdit.number}
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
                                required
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
                                Email
                              </th>
                              <th colspan="1" role="columnheader">
                                Number
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
                                  <p data-tooltip-id="my-tooltip">
                                    <p>{organization.name}</p>
                                  </p>
                                </td>
                                <td role="cell">
                                  <p data-tooltip-id="my-tooltip">
                                    <p>{organization.email}</p>
                                  </p>
                                </td>
                                <td role="cell">
                                  <p data-tooltip-id="my-tooltip">
                                    <p>{organization.number}</p>
                                  </p>
                                </td>
                                <td role="cell">
                                  <p data-tooltip-id="my-tooltip">
                                    <p>{organization.description}</p>
                                  </p>
                                </td>
                                <td role="cell">
                                  <p data-tooltip-id="my-tooltip">
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
