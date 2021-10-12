import React from "react";
import { useState } from "react";

function Form() {
  /*
// 
// 
// I'm assuming I cant install anything for validation
// 
// so using this way to do it 
//
//check the console if no error appear to see the shape of the data being posted
// if tigerType.value is '' in the console that means it was never selected
// 
// I ran out of time before I could clean up the code or apply CSS, sorry to the person reading this
// 
    */
  const [form, setForm] = useState({
    email: { value: "", isvalid: true }, //initally are valid so the error message doesnt show
    password: { value: "", isvalid: true },
    colour: { value: "", isvalid: true },
    tigerType: { value: "", isvalid: true },
    animal: [],
  });
  const [tigerSelected, setTigerSelected] = useState(false); // state to check whether to show the textbox or not

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: { value, isvalid: true },
    });
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/; //using regex for a format of 'anything@anything.anything'
    return re.test(email);
  }
  function validatePassword(password) {
    return password.length > 8;
  }
  function validateAllbuttons() {
    if (form.animal.length === 0) {
      return false;
    }
    return form.colour.value !== "";
  }

  function handleCheckboxButtons(e) {
    //if the checked box is tiger then set the tiger state to true/false depending
    const animal = e.target.value;
    if (form.animal.includes(animal)) {
      const index = form.animal.indexOf(animal);
      if (animal === "Tiger") {
        setTigerSelected(false);
      }
      form.animal.splice(index, 1);
      setForm({ ...form });
    } else {
      if (animal === "Tiger") {
        setTigerSelected(true);
      }
      form.animal.push(animal);
      setForm({ ...form });
    }
  }
  function validateTigerBox() {
    //only want it to be false when it has been selected
    if (tigerSelected) {
      return form.tigerType.value !== "";
    }
    return true;
  }
  function handleClick(e) {
    //
    //
    // handleClick gets run when the user tries to post the form
    // it does the error checkings here
    //
    //
    //
    e.preventDefault();
    const tigerBoxValid = validateTigerBox();
    const emailValid = validateEmail(form.email.value);
    const passwordValid = validatePassword(form.password.value);
    const buttonsValid = validateAllbuttons();
    console.log(tigerBoxValid, emailValid, passwordValid, buttonsValid);
    if (emailValid && passwordValid && buttonsValid && tigerBoxValid) {
      console.log("these are the contents of the form:", form);
    } else if (
      !emailValid &&
      !passwordValid &&
      !tigerBoxValid &&
      !buttonsValid
    ) {
      setForm({
        ...form,
        email: { value: "", isvalid: false },
        password: { value: "", isvalid: false },
        tigerType: { value: "", isvalid: false },
      });
    } else if (!emailValid) {
      setForm({
        ...form,
        email: { value: "", isvalid: false },
      });
    } else if (!passwordValid) {
      setForm({
        ...form,
        password: { value: "", isvalid: false },
      });
    } else if (!tigerBoxValid) {
      setForm({
        ...form,
        tigerType: { value: "", isvalid: false },
      });
    } else if (!buttonsValid) {
      setForm({
        ...form,
        colour: { value: "", isvalid: false },
      });
    }
  }
  return (
    <section className="center-col-container">
      <h2 className="center-col-title form-title">Contact Form</h2>
      <form className="form-container">
        <div className="form-field">
          <label htmlFor="firstName" className="form-label">
            Email
          </label>
          <input
            className="input-field-standard"
            type="text"
            name="email"
            value={form.email.value}
            placeholder="please enter a valid email"
            onChange={handleChange}
          />
        </div>

        {form.email.isvalid ? (
          ""
        ) : (
          <p style={{ color: "red" }}>Enter a valid email!</p>
        )}

        <div className="form-field">
          <label htmlFor="lastName" className="form-label">
            Password
          </label>
          <input
            className="input-field-standard"
            type="password"
            name="password"
            value={form.password.value}
            onChange={handleChange}
          />
        </div>

        {form.password.isvalid ? (
          ""
        ) : (
          <p style={{ color: "red" }}>
            Password must be longer than 8 characters!
          </p>
        )}
        <h2> Colour </h2>
        <input
          type="radio"
          id="Blue"
          name="colour"
          value="Blue"
          onClick={handleChange}
        />
        <label for="Blue">Blue</label>

        <br></br>
        <input
          type="radio"
          id="Green"
          name="colour"
          value="Green"
          onClick={handleChange}
        />
        <label for="Green">Green</label>

        <br></br>
        <input
          type="radio"
          id="Red"
          name="colour"
          value="Red"
          onClick={handleChange}
        />
        <label for="Red">Red</label>

        <br></br>
        <input
          type="radio"
          id="Black"
          name="colour"
          value="Black"
          onClick={handleChange}
        />
        <label for="Black">Black</label>

        <br></br>
        <input
          type="radio"
          id="Brown"
          name="colour"
          value="Brown"
          onClick={handleChange}
        />
        <label for="Brown">Brown</label>

        <br></br>
        <h2> Animals </h2>
        <input
          type="checkbox"
          id="Bear"
          name="Bear"
          value="Bear"
          onClick={handleCheckboxButtons}
        />
        <label for="Bear">Bear</label>

        <br></br>
        <input
          type="checkbox"
          id="Tiger"
          name="Tiger"
          value="Tiger"
          onClick={handleCheckboxButtons}
        />
        <label for="Tiger">Tiger</label>

        <br></br>
        <input
          type="checkbox"
          id="Snake"
          name="Snake"
          value="Snake"
          onClick={handleCheckboxButtons}
        />
        <label for="Snake">Snake</label>

        <br></br>
        <input
          type="checkbox"
          id="Donkey"
          name="Donkey"
          value="Donkey"
          onClick={handleCheckboxButtons}
        />
        <label for="Donkey">Donkey</label>
        {form.colour.isvalid ? (
          ""
        ) : (
          <p style={{ color: "red" }}>
            Please select at least one of each fields!
          </p>
        )}
        <br></br>
        {tigerSelected ? (
          <>
            <input
              type="text"
              name="tigerType"
              value={form.tigerType.value}
              placeholder="Type of tiger"
              onChange={handleChange}
            />
            <br></br>
            {form.tigerType.isvalid ? (
              ""
            ) : (
              <p style={{ color: "red" }}>Please enter the type of tiger</p>
            )}
          </>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="small-button post-button"
          onClick={handleClick}
          data-testid="submitButton"
        >
          Post
        </button>
      </form>
    </section>
  );
}

export default Form;
