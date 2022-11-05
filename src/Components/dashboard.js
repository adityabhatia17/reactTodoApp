import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Class from "../styles/dashboard.module.css";
import notesLogo from "../images/notesLogo.png";
import prevArrow from "../images/left.png";
import rightArrow from "../images/right.png";
// Get items from Local Storage
const getLocalItems = () => {
  let list = localStorage.getItem("items");
  if (list) {
    return JSON.parse(localStorage.getItem("items"));
  } else {
    return [];
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    task: "",
    date: "",
  });
  const [items, setItems] = useState(getLocalItems);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [editedItem, setEditedItem] = useState();

  const navigateToLogin = () => {
    navigate("/");
  };
  //   Getting Access Token & Setting items to local storage
  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      console.log("Not found");
      navigateToLogin();
    } else {
      localStorage.getItem("access-token");
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);
  //for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageItems, setPageItems] = useState(items);
  useEffect(() => {
    setPageItems(items.slice(0, 10));
  }, []);
  const nextPage = () => {
    setPageItems(
      items.slice((pageNumber + 1 - 1) * 10, (pageNumber + 1 - 1) * 10 + 10)
    );
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber - 1 > 0) {
      setPageItems(
        items.slice((pageNumber - 1 - 1) * 10, (pageNumber - 1 - 1) * 10 + 10)
      );
      setPageNumber(pageNumber - 1);
    }
  };
  const totalPages = () => {
    var count = parseInt(items.length / 10);
    if (items.length % 10 > 0) {
      count = count + 1;
    }
    return count;
  };
  //   add items
  const addItem = () => {
    setItems([...items, [inputData.task, inputData.date]]);
    setPageItems([...items, [inputData.task, inputData.date]]);
    setInputData({
      task: "",
      date: "",
    });
  };

  const handleChange = (e) =>
    setInputData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

  const editItem = () => {
    setItems([
      ...items.filter((item) => item != editedItem),
      (items[items.indexOf(editedItem)] = [inputData.task, inputData.date]),
    ]);
    setPageItems([
      ...items.filter((item) => item != editedItem),
      (items[items.indexOf(editedItem)] = [inputData.task, inputData.date]),
    ]);
    setToggleEdit(true);
    setInputData({
      task: "",
      date: "",
    });
  };

  //   delete items
  const deleteItem = (id) => {
    const updatedItems = items.filter((elem, index) => {
      return index !== id;
    });
    setItems(updatedItems);
    setPageItems([...items, [inputData.task, inputData.date]]);
  };

  return (
    <>
      <div className={Class.mainDiv}>
        <div className={Class.childDiv}>
          <div className={Class.heading}>To-Do List 📝</div>
          <figure className={Class.logo}>
            <img src={notesLogo}></img>
            <figcaption>Add your tasks here ✍️</figcaption>
          </figure>
          <div className={Class.addItems}>
            <input
              type="text"
              placeholder="Write Task"
              name="task"
              value={inputData.task}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={inputData.date}
              placeholder="Date of Completion"
              onChange={handleChange}
            />
            {toggleEdit ? (
              <button onClick={addItem} className={Class.addBtn}>
                Add Items
              </button>
            ) : (
              <button onClick={editItem} className={Class.addBtn}>
                Edit item
              </button>
            )}
          </div>
          <div className={Class.todos}>
            {items
              .sort(
                (a, b) =>
                  Date.parse(new Date(a[1])) - Date.parse(new Date(b[1]))
              )
              ?.map((elem, index) => {
                if (elem) {
                  return (
                    <div className={Class.task} key={index}>
                      <div className={Class.taskName}>
                        <span>
                          {(pageNumber - 1) * 10 + index + 1}. {elem[0]}
                        </span>
                      </div>
                      <div className={Class.taskDate}>
                        <span>{elem[1]}</span>
                        <img
                          className={Class.Btns}
                          src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                          onClick={() => {
                            setEditedItem(elem);
                            setInputData({
                              task: elem[0],
                              date: elem[1],
                            });
                            setToggleEdit(false);
                          }}
                        ></img>
                        <img
                          onClick={() => deleteItem(index)}
                          className={Class.Btns}
                          src="https://cdn-icons-png.flaticon.com/512/3405/3405234.png"
                        ></img>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
      {items.length && (
        <>
          <p>
            Page {pageNumber} out of {totalPages()}
          </p>
          <div className={Class.navSec}>
            <button
              className={Class.navigation}
              onClick={previousPage}
              disabled={pageNumber - 1 <= 0 ? true : false}
            >
              <img src={prevArrow}></img>
              Previous
            </button>
            <button
              className={Class.navigation}
              onClick={nextPage}
              disabled={totalPages() === pageNumber}
            >
              Next
              <img src={rightArrow}></img>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
