import React from "react";

function AdminNavbar() {
  return (
    <>
      <div
        className="navbar-container"
        style={{ width: "100vw", height: "10vh" }}
      >
        <div
          style={{
            padding: "10px",
            background: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className="log">
            <img
              src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
              width="40px"
              alt="logo"
            />{" "}
            <span>
              <h1>GenZ</h1>
            </span>
            <span style={{ marginLeft: "20px", fontSize: "18px" }}>
              <p>Dashboard</p>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;
