import React, { useState } from "react";
import logo from "./assets/userLogo.webp";


export default function EatSplit() {
  const [splitbtn1, setSplitBtn1] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friendName, setFriendName] = useState("");
  const [viewFriendInp, setViewFriendInp] = useState(false);
  const [friendImage, setFriendImage] = useState(null);
  const [totAmt, setTotAmt] = useState("");
  const [myExp, setMyExp] = useState("");
  const [frndExp, setFrndExp] = useState("");
  const [whoPaid, setWhoPaid] = useState("");

  const [users, setUsers] = useState([
    { id: 101, name: "Ramanand R", img: logo, balance: 200 },
    { id: 102, name: "Jithu Francis", img: logo, balance: -500 },
  ]);

  function handleAddFriend() {
    setViewFriendInp(true);
  }

  function handleFriendName(e) {
    setFriendName(e.target.value);
  }

  function handleFriendImage(e) {
    const file = e.target.files[0];
    if (file) setFriendImage(URL.createObjectURL(file));
  }

  function handleAddNewFriend() {
    if (friendName.trim() === "") return;
    if (users.some((u) => u.name.toLowerCase() === friendName.toLowerCase())) {
      alert(`${friendName} already exists.`);
      return;
    }

    const newFriend = {
      id: Math.trunc(Math.random() * 1000),
      name: friendName,
      img: friendImage || logo,
      balance: Math.trunc(Math.random() * 1000),
    };

    setUsers([...users, newFriend]);
    setFriendName("");
    setFriendImage(null);
    setViewFriendInp(false);
  }

  function handleSplitBtn1(id) {
    setSplitBtn1(true);
    setSelectedUser(users.find((u) => u.id === id));
    setTotAmt("");
    setMyExp("");
    setFrndExp("");
    setWhoPaid("");
  }

  function handleSplit(id) {
    if (!totAmt || !myExp || !frndExp || !whoPaid) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(totAmt) !== Number(myExp) + Number(frndExp)) {
      alert("Amounts do not add up to total.");
      return;
    }

    const updated = users.map((u) => {
      if (u.id === id) {
        if (whoPaid === "Arjun Kumar") u.balance += Number(frndExp);
        else u.balance -= Number(myExp);
      }
      return u;
    });

    setUsers(updated);
    setSplitBtn1(false);
    setSelectedUser(null);
  }

  return (
    <div
      className="d-flex flex-column vh-100 vw-100"
      style={{ overflow: "hidden", backgroundColor: "#111f2eff" }}
    >
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <a href="#" className="navbar-brand ms-4 fs-3 fw-bold">
            🍉 Split Eat & Goo
          </a>
        </div>
      </nav>

      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* LEFT SIDE */}
          <div className="col-lg-6 col-md-6 col-sm-12 p-4 h-100">
            <div
              className="card h-100 shadow-sm p-3 overflow-auto"
              style={{ backgroundColor: "#541e1eff" }}
            >
              <h4 className="text-center text-primary mb-3 fw-bold">
                Friends List
              </h4>
              <table className="table align-middle text-center">
                <tbody>
                  {users.map((ele) => {
                    let status = "";
                    if (ele.balance < 0) status = "I_OWE";
                    else if (ele.balance > 0) status = "U_OWE";
                    else status = "NO_OWE";

                    return (
                      <tr key={ele.id} className="border-bottom">
                        <td>
                          <img
                            src={ele.img}
                            alt="friend"
                            className="rounded-circle border"
                            width="80"
                            height="80"
                          />
                        </td>
                        <td className="text-start ps-3">
                          <h5 className="fw-bold text-primary mb-1">
                            {ele.name}
                          </h5>
                          {status === "NO_OWE" && (
                            <p className="text-muted mb-0">
                              You and {ele.name} owe nothing.
                            </p>
                          )}
                          {status === "U_OWE" && (
                            <p className="text-success mb-0">
                              {ele.name} owes you ${ele.balance}
                            </p>
                          )}
                          {status === "I_OWE" && (
                            <p className="text-danger mb-0">
                              You owe {ele.name} ${Math.abs(ele.balance)}
                            </p>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleSplitBtn1(ele.id)}
                          >
                            Split
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="text-center mt-4">
                {viewFriendInp ? (
                  <div className="p-3 border rounded-3 bg-light">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Enter Friend Name"
                      value={friendName}
                      onChange={handleFriendName}
                    />
                    <input
                      type="file"
                      className="form-control mb-3"
                      accept="image/*"
                      onChange={handleFriendImage}
                    />
                    <button
                      className="btn btn-danger"
                      onClick={handleAddNewFriend}
                    >
                      Add Friend
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-danger mt-3"
                    onClick={handleAddFriend}
                  >
                    + Add Friend
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 col-md-6 col-sm-12 p-4 h-100">
            <div
              className="card h-100 shadow-sm p-4 transition-all"
              style={{
                backgroundColor: "#541e1eff",
                overflowY: "auto",
                visibility: splitbtn1 && selectedUser ? "visible" : "hidden",
                opacity: splitbtn1 && selectedUser ? 1 : 0,
                transition: "opacity 0.4s ease, visibility 0.4s ease",
              }}
            >
              {selectedUser && (
                <>
                  <h3 className="text-center text-primary mb-4 fw-bold">
                    Split with {selectedUser.name}
                  </h3>

                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Enter Total Amount Spent"
                    value={totAmt}
                    onChange={(e) => setTotAmt(e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Enter Your Expense"
                    value={myExp}
                    onChange={(e) => setMyExp(e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Your Friend's Expense"
                    value={frndExp}
                    onChange={(e) => setFrndExp(e.target.value)}
                  />

                  <h5 className="text-center text-danger mt-3">
                    Who Paid the Bill?
                  </h5>
                  <select
                    className="form-select mb-4 mt-2"
                    value={whoPaid}
                    onChange={(e) => setWhoPaid(e.target.value)}
                  >
                    <option value="">--- Select ---</option>
                    <option value="Arjun Kumar">Arjun Kumar</option>
                    <option value={selectedUser.name}>
                      {selectedUser.name}
                    </option>
                  </select>

                  <div className="text-center">
                    <button
                      className="btn btn-dark px-4"
                      onClick={() => handleSplit(selectedUser.id)}
                    >
                      Split Bill
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
