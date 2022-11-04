import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Class from "../styles/dashboard.module.css";
import notesLogo from "../images/notesLogo.png";
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
  const [isEditItem, setIsEditItem] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [taskPerPage, setTaskPerPage] = useState(10);
  // const lastTaskIndex = currentPage * taskPerPage;
  // const firstTaskIndex = lastTaskIndex - taskPerPage;
  // const currList = items.slice(firstTaskIndex, lastTaskIndex);
  const navigateToLogin = () => {
    navigate("/login");
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
  //   add items
  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !toggleEdit) {
      setItems(
        items.map((elem, index) => {
          if (index === isEditItem) {
            return [...elem, [inputData.task, inputData.date]];
          }
          return elem;
        })
      );
    } else {
      setItems([...items, [inputData.task, inputData.date]]);
      setInputData({
        task: "",
        date: "",
      });
    }
  };
  const handleChange = (e) =>
    setInputData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  // edit items
  const editItem = (id) => {
    let newEditItem = items.find((elem, index) => {
      return index === isEditItem;
    });
    console.log("avi", newEditItem);
    setToggleEdit(false);
    setInputData({
      task: newEditItem[0],
      date: newEditItem[1],
    });
    setIsEditItem(isEditItem);
    // var newList = items;
    // console.log("avi2", inputData);
    // newList[isEditItem] = [inputData.task, inputData.date];
    // console.log("avi3", newList[isEditItem]);
    // setItems(newList);
  };
  //   delete items
  const deleteItem = (id) => {
    const updatedItems = items.filter((elem, index) => {
      return index !== id;
    });
    setItems(updatedItems);
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
              <button onClick={addItem} className={Class.addBtn}>
                Edit item
              </button>
            )}
          </div>
          <div className={Class.todos}>
            {items.map((elem, index) => {
              console.log("hi", elem);
              if (elem) {
                return (
                  <div className={Class.task} key={index}>
                    <div className={Class.taskName}>
                      <span>
                        {index + 1}.{" "}
                        {/* {elem[0] != null || typeof elem[0] != undefined
                          ? elem[0]
                          : ""} */}{" "}
                        {elem[0]}
                      </span>
                    </div>
                    <div className={Class.taskDate}>
                      <span>
                        {/* {elem[1] != null || typeof elem[1] != undefined
                          ? elem[1]
                          : ""} */}
                        {elem[1]}
                      </span>
                      <button
                        onClick={
                          () => editItem(index)
                          // setInputData({
                          //   task: elem[0],
                          //   date: elem[1],
                          // });
                          // setToggleEdit(false);
                          // setIsEditItem(index);
                        }
                      ></button>
                      <img
                        onClick={() => deleteItem(index)}
                        className={Class.deleteBtn}
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
    </>
  );
}

export default Dashboard;
