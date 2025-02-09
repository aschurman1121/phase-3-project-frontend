import React, {useState } from 'react'
import PosesDropdown from './PosesDropdown'

const newYogaClassObj = {
  teacher_name: "",
  class_name: "",
  class_time: ""
};

function Form({ poses, setYogaClasses }) {
console.log(poses)
 const poseIdArr = poses.map((pose) => pose.id);
 console.log(poseIdArr);
const [newYogaClass, setNewYogaClass] = useState(newYogaClassObj);
const [poseIds, setPoseIds] = useState([])
 
  function handleChange(e) {
    setNewYogaClass((newYogaClassState) => ({
      ...newYogaClassState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleClick() {
    console.log("pose card clicked!");
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/yoga_classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newYogaClass),
    })
      .then((response) => response.json())
      .then((data) =>
        setYogaClasses((existingYogaClasses) => [...existingYogaClasses, data])
      );

    setNewYogaClass(newYogaClassObj);
  }

  const poseCardRender = poses.map((p) => {
    return (
      <PosesDropdown
      setPoseIds={setPoseIds}
      pose={p}
        englishName={p.english_name}
        key={p.id}
        imgUrl={p.img_url}
        sanskritName={p.sanskrit_name}
      />
    );
  });

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-name">
          <span>Schedule Your Class</span>
        </div>
        <div className="form-info">
          <div className="leftSideOfForm">
            <div>
              <input
                className="form-item"
                type="text"
                name="teacher_name"
                value={newYogaClass.teacher_name}
                placeholder="Teacher's name:"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="form-item"
                type="text"
                name="class_name"
                value={newYogaClass.class_name}
                placeholder="Class name:"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="form-item"
                type="text"
                name="class_time"
                value={newYogaClass.class_time}
                placeholder="Class time:"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="rightSideOfForm">
            Select poses to add to yoga sequence
            <ul
              className="poseCardForm"
              type="button"
              name="pose_card"
              value={newYogaClass.pose_card}
              onClick={handleClick}
            >
              {poseCardRender}
            </ul>
          </div>
        </div>
        <input
          className="deleteButton"
          type="submit"
          value="Create your Class!"
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Form