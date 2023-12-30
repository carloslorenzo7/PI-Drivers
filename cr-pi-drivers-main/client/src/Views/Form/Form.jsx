import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getDrivers } from "../../Redux/actions";
import style from "./Form.module.css";
//! revisar funcinamiento

const Form = () => {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);

  const [form, setForm] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    image: "",
    description: "",
    teams: [],
  });

  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    image: "",
    description: "",
    teams: "",
  });

  const validate = (form) => {
    let newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(form.forename)) {
      newErrors.forename = "Invalid Forename";
    }

    if (!/^[A-Za-z\s]+$/.test(form.surname)) {
      newErrors.surname = "Invalid Surname";
    }

    if (!/^[A-Za-z\s]+$/.test(form.nationality)) {
      newErrors.nationality = "Invalid Nationality";
    }

    if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(form.dob)) {
      console.log("Fecha no válida:", form.dob);
      newErrors.dob = "Invalid Dob";
    }

    if (!form.image) {
      form.image =
        "https://s1.eestatic.com/2020/09/02/deportes/motor/deportes-deportes_de_motor-motor_517709501_158978197_1706x960.jpg";
    } else if (
      !/(https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(
        form.image
      )
    ) {
      newErrors.image = "Enter a valid URL";
    }

    if (form.description.length < 5 || form.description.length > 250) {
      newErrors.description =
        "The description must be between 5 and 250 characters";
    }

    setIsValid(Object.keys(newErrors).length === 0);

    setErrors(newErrors);
    return newErrors;
  };

 //? para el efecto de que quede fijo el label cuando completo el input 
  const [inputValues, setInputValues] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    image: "",
    description: "",
  });



  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // para que valide junto a la info que se quiere enviar
    validate({ ...form, [property]: value });

    // copia del objeto, [property]: propiedad que quiero modificar , value: el valor que le quiero dar
    setForm({ ...form, [property]: value });

     // Actualiza el objeto de valores de entrada
  setInputValues({ ...inputValues, [property]: value });
  };

  const [selectedTeam, setSelectedTeam] = useState([]);

  const selectTeamHandler = (event) => {
    //const property = event.target.name;

    /// ! ver lia de error

    const selected = event.target.value;

    if (selectedTeam.length < 3 && !selectedTeam.includes(selected)) {
      setSelectedTeam([...selectedTeam, selected]);

      //setForm({ ...form, [property]: selected})
      //setForm({...form, teams: [...form.teams ,selected]})

      //? Actualiza el array de equipos en el estado form
      setForm((prevForm) => ({
        ...prevForm,
        teams: [...prevForm.teams, selected],
      }));

      console.log("setSelectedTeam:", setSelectedTeam);
      console.log("setForm:", setForm);

      // }
    } else {
      alert(
        "Lo sentimos, ya has seleccionado el límite de 3 equipos. Por favor, deselecciona alguno antes de continuar."
      );
    }
  };

  const deleteTeamHandler = (team) => {
    const updateTeams = selectedTeam.filter(
      (selectedTeam) => selectedTeam !== team
    );
    setSelectedTeam(updateTeams);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Submit button clicked");

    if (selectedTeam.length === 0) {
      setErrors({ ...errors, teams: "Select at least one team" });
      setIsValid(false);
      return;
    }

    const formErrors = validate(form); // linea comentada
    console.log(form);

    if (Object.keys(formErrors).length === 0) {
      // linea comentada
      axios
        .post("http://localhost:3001/drivers", {
          forename: form.forename,
          surname: form.surname,
          nationality: form.nationality,
          dob: form.dob,
          image: form.image,
          description: form.description,
          teams: form.teams.join(","), // Asegúrate de que esta línea incluya todos los equipos seleccionados
        })
        .then(() => {
          alert("Driver created successfully");

          // Restablece el formulario
          setForm({
            forename: "",
            surname: "",
            nationality: "",
            dob: "",
            image: "",
            description: "",
            teams: [],
          });

          // Restablece los errores
          setErrors({
            forename: "",
            surname: "",
            nationality: "",
            dob: "",
            image: "",
            description: "",
            teams: "",
          });

          // despacho la accion para actualizar la lista de conductores
          //!ver esta linea
          dispatch(getDrivers());
        })
        .catch((error) => {
          console.error("Error creating driver:", error);
          alert("Error creating driver. Please try again.");
        });
    } else {
      // else comentado
      setErrors(formErrors);
    }
  };

  return (
    <div className={style.formContainer}>
    {/* el submit handler es disparado desde el form */}
    <form onSubmit={submitHandler} className={style.form}>
      <div className={`${style.inputContainer} ${inputValues.forename.trim() && style.hasValue}`}>
        <input
          type="text"
          value={form.forename}
          onChange={changeHandler}
          name="forename"
          className={style.input}
        />
        <div className={style.cut}></div>
        <label className={style.iLabel}>Forename</label>
        <span>{errors.forename}</span>
      </div>
      <div className={`${style.inputContainer} ${inputValues.surname.trim() && style.hasValue}`}>
        <input
          type="text"
          value={form.surname}
          onChange={changeHandler}
          name="surname"
          className={style.input}
        />
        <div className={style.cut}></div>
        <label className={style.iLabel}>Surname</label>
        <span>{errors.surname}</span>
      </div>
      <div className={`${style.inputContainer} ${inputValues.nationality.trim() && style.hasValue}`}>
        <input
          type="text"
          value={form.nationality}
          onChange={changeHandler}
          name="nationality"
          className={style.input}
        />
        <div className={style.cut}></div>
        <label className={style.iLabel}>Nationality</label>
        <span>{errors.nationality}</span>
      </div>
      <div className={`${style.inputContainer} ${inputValues.dob.trim() && style.hasValue}`}>
        <input
          type="text"
          value={form.dob}
          onChange={changeHandler}
          name="dob"
          className={style.input}
          
        />
        <div className={style.cut}></div>
        <label className={style.iLabel}>Dob</label>
        <span>{errors.dob}</span>
      </div>
      <div className={`${style.inputContainer} ${inputValues.image.trim() && style.hasValue}`}>
        <input
          type="url"
          value={form.image}
          onChange={changeHandler}
          name="image"
          className={style.input}
        />
        <div className={style.cut}></div>
        <label className={style.iLabel}>Image</label>
        <span>{errors.image}</span>
      </div>
      <div className={`${style.inputContainer} ${inputValues.description.trim() && style.hasValue} ${style.textArea}`}>
        <textarea
          type="text"
          value={form.description}
          onChange={changeHandler}
          name="description"
          className={style.input}
        />
        <div className={style.cut}></div>
        <label className={style.iLabel}>Description</label>
        <span>{errors.description}</span>
      </div>
      <div className={style.teams}>
        <label>Teams</label>
        <select
          value={selectedTeam}
          onChange={selectTeamHandler}
          name="teams"
          multiple
          className={style.input}
        >
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
        <span>{errors.teams}</span>
        <div className="selectTeam">
          {selectedTeam.map((team, index) => (
            <div key={index} className={style.deleteTeam}>
              {team}

              <button  className={style.deleteButton} onClick={() => deleteTeamHandler(team)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <button className={style.button} type="submit" disabled={!isValid}>
        Create Driver{" "}
      </button>
    </form>
    </div>
  );
};
export default Form;
