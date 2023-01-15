import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";


const getAllData = () => {
  const allData = localStorage.getItem("studentsList");
  if (allData) {
    return JSON.parse(allData);
  } else {
    return [];
  }
};
function Crud() {
  const [data, setData] = useState(getAllData());
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);

  const handleClose = () => {
    setShow(false);
    setName("");
  };

  const handleShow = (id) => {
    let update = data.find((ele) => {
      return ele.name === id;
    });
    setName(update.name);
    setEdit(id);
    setShow(true);
  };

  const updateSubmission = (e) => {
    e.preventDefault();
    const updatedData = data.map((ele) => {
      if (ele.name === edit) {
        return { ...ele, name };
      }
      return ele;
    });
    setData(updatedData);
    setShow(false);
    setName("");
  };

  const handleSubmission = (e) => {
    if(name === ""){
        toast.warn("Please enter data")
        return
    }
    e.preventDefault();
    const x = JSON.parse(localStorage.getItem("studentsList"));
    const y = x.find((ele) => ele.name === name);
    if (y) {
      toast.warn("Data already taken");
      return;
    }
    let allCred = {
      name,
    };
    setData([...data, allCred]);
    setName("");
  };

  useEffect(() => {
    localStorage.setItem("studentsList", JSON.stringify(data));
  }, [data]);

  const delteData = (id) => {
    const newData = data.filter((value, index) => {
      return value.name !== id;
    });
    setData(newData);
  };

  const pageData = React.useMemo(() => {
    //use useMemo to memorize the page
    return data.filter((ele) => ele.name.toLowerCase());
  }, [data]);


  console.log(data);
  return (
    <div style={{ maxWidth: "50%", margin: "0 auto", marginTop: "30px" }}>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-12">
          <div style={{ fontSize: "80px", alignItem: "center", marginLeft:"10rem" }}>
            React ToDo
          </div>
          <form>
            <div className="form-group text-nowrap">
              <TextField
                id="standard-basic"
                label="What need to be done ?"
                variant="standard"
                type="text"
                required
                value={name.trimStart()}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <Button variant="contained" onClick={handleSubmission}>
                ADD TASK
              </Button>
            </div>
          </form>
          <br />
          {data.length > 0 ? (
            <>
              <table className="table table-stried">
                <tbody>
                  {pageData.map((ele, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Checkbox
                            // {...label}
                            // defaultChecked
                            sx={{
                                color: "",
                                '&.Mui-checked': {
                                    color: "#FF1493",
                                },
                            }}
                          />
                          <span className="crossLine">
                          {ele.name}
                          </span>
                        </div>
                        <div>
                          <EditIcon
                            style={{ cursor: "pointer", color: "grey" }}
                            onClick={() => handleShow(ele.name)}
                          >
                            Edit
                          </EditIcon>
                          <CloseIcon
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => delteData(ele.name)}
                          >
                            delete{" "}
                          </CloseIcon>
                        </div>
                      </div>
                    );
                  })}
                </tbody>
              </table>
              <Button variant="contained" onClick={() => setData([])}>
                Delete All
              </Button>
            </>
          ) : (
            <h2>No data found</h2>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="text-nowrap">
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="What need to be edited ?"
                  variant="standard"
                  type="text"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  style={{ marginBottom: "7px" }}
                />
              </div>
              <div className="form-group">
                <Button variant="contained" onClick={updateSubmission}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Crud;
