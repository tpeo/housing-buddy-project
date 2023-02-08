import React from "react";

function Form() {
  return (
    <div id="main_div">
      <div>
        <div className="container">
          <form method="post" id="add_housing">
            <h1>Add Apartment or Dorm</h1>
            <div className="field">
              <label htmlFor="apt_name">Apartment Name:</label>
              <input
                type="text"
                id="apt_name"
                name="apt_name"
                placeholder="Villas on Rio"
              />
              <small></small>
            </div>
            <div className="field">
              <label htmlFor="distance">Distance to Campus:</label>
              <input
                type="text"
                id="distance"
                name="distance"
                placeholder="0.5 miles"
              />
              <small></small>
            </div>
            <div className="field">
              <label htmlFor="rating">Rating out of 5:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                placeholder="4"
              />
              <small></small>
            </div>
            <div className="field">
              <button type="submit" className="full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
