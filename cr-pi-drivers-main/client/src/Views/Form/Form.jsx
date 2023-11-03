
import { useState } from "react";
import { useSelector ,useDispatch } from "react-redux";
import axios from "axios"
import { getDrivers } from "../../Redux/actions";
import style from "./Form.module.css"


const Form = () => {
  const teams = useSelector((state) => state.teams);
  const dispatch= useDispatch()
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
      newErrors.surname = "Invalid surname";
    }

    if (!/^[A-Za-z\s]+$/.test(form.nationality)) {
      newErrors.nationality = "Invalid nationality";
    }

    if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(form.dob)) {
      console.log("Fecha no válida:", form.dob);
      newErrors.dob = "Invalid dob";
    }

    if (!form.image) {
      form.image =
        "https://s1.eestatic.com/2020/09/02/deportes/motor/deportes-deportes_de_motor-motor_517709501_158978197_1706x960.jpg";
    } else if (
      !/(https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(form.image )
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

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // para que valide junto a la info que se quiere enviar
    validate({ ...form, [property]: value });

    // copia del objeto, [property]: propiedad que quiero modificar , value: el valor que le quiero dar
    setForm({ ...form, [property]: value });
  };


  const [selectedTeam, setSelectedTeam]= useState([])

  const selectTeamHandler= (event) =>{
    const selected = event.target.value 
    if(selectedTeam.length < 3 && !selectedTeam.includes(selected)){
      setSelectedTeam([...selectedTeam,selected])
    }
  }

  const deleteTeamHandler= (team)=>{
    const updateTeams= selectedTeam.filter((selectedTeam)=> selectedTeam !== team)
    setSelectedTeam(updateTeams)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Submit button clicked");


    if (selectedTeam.length === 0) {
      setErrors({ ...errors, teams: "Select at least one team" });
      setIsValid(false);
      return;
    }




    const formErrors = validate(form);
    if (Object.keys(formErrors).length === 0) {
      axios
      .post("http://localhost:3001/drivers", form)
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
          dispatch(getDrivers());
        })
        .catch((error) => {
          console.error("Error creating driver:", error);
          alert("Error creating driver. Please try again.");
          
        });
    }else {
      setErrors(formErrors);
    }
  };

  return (
    //el submit handler es disparado desde el form
    <form onSubmit={submitHandler} className={style.form}>
      <div>
        <label>forename</label>
        <input
          type="text"
          value={form.forename}
          onChange={changeHandler}
          name="forename"
        />
        <span>{errors.forename}</span>
      </div>
      <div>
        <label>surname</label>
        <input
          type="text"
          value={form.surname}
          onChange={changeHandler}
          name="surname"
        />
        <span>{errors.surname}</span>
      </div>
      <div>
        <label>nationality</label>
        <input
          type="text"
          value={form.nationality}
          onChange={changeHandler}
          name="nationality"
        />
        <span>{errors.nationality}</span>
      </div>
      <div>
        <label>dob</label>
        <input
          type="text"
          value={form.dob}
          onChange={changeHandler}
          name="dob"
        />
        <span>{errors.dob}</span>
      </div>
      <div>
        <label>image</label>
        <input
          type="url"
          value={form.image}
          onChange={changeHandler}
          name="image"
        />
        <span>{errors.image}</span>
      </div>
      <div>
        <label>description</label>
        <input
          type="text"
          value={form.description}
          onChange={changeHandler}
          name="description"
        />
        <span>{errors.description}</span>
      </div>
      <div className={style.teams}>
        <label>teams</label>
        <select
          value={selectedTeam}
          onChange={selectTeamHandler}
          name="teams"
          multiple
        >
          {teams.map((team, index) => (
            <option key={index} value={team.name}>
              {team}
            </option>
          ))}
        </select>
        <span>{errors.teams}</span>
        <div className="selectTeam">
            {selectedTeam.map((team ,index)=>(
              <div key={index} className="deleteTeam">
                {team}

              <button onClick={() => deleteTeamHandler(team)}>x</button>

              </div>
              
            ))}

        </div>
      </div>
      <button type="submit" disabled={!isValid}>Create Driver </button>
    </form>
  );
};
export default Form;
