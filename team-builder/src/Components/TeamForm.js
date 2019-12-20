import React, {
    useState,
    useEffect
  } from "react";
import {
withFormik,
Form,
Field
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { stat } from "fs";

const TeamForm = (
    {
        values,
        errors,
        touched,
        status
    }) => {
        const [team,setTeam] = useState([]);
        useEffect(() => {
            console.log("status has changed",status);
            status && 
                setTeam(...team, status)

        }, [status]);

        return (
            <div className="team-form">
                <Form>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <Field
                        id="name"
                        type="text"
                        name="name"
                    />
                    {touched.name &&
                        errors.name &&
                            <p className="errors">
                                {errors.name}
                            </p>
                    }
                    <label htmlFor="email">
                        Email:
                    </label>
                    <Field
                        id="email"
                        type="text"
                        name="email"
                    />
                    {touched.email &&
                        errors.email &&
                            <p className="errors">
                                {errors.email}
                            </p>
                    }
                    <label htmlFor="password">
                        Passowrd:
                    </label>
                    <Field
                        id="password"
                        type="text"
                        name="password"
                    />
                    {touched.password &&
                        errors.password &&
                            <p className="errors">
                                {errors.password}
                            </p>
                    }
                    <label
                        htmlFor="terms-of-service"
                        className="checkbox-container"
                        >
                        Terms of Service
                        <Field
                            id="tos"
                            type="checkbox"
                            name="tos"
                            checked={values.tos}
                        />
                        <span className="checkmark" />
                    </label>
                    <button type="submit">
                        Submit!
                    </button>
                </Form>
                    {team.map(item => (
                    <ul key={item.name}>
                    <li>Name: {item.name}</li>
                    <li>Email: {item.email}</li>
                    <li>Password: {item.password}</li>
                    </ul>
                ))}

            </div>
        )


    }

    const FormikTeamForm = withFormik({
        mapPropsToValues({
          name,
          email,
          password,
          tos
        }) {
          return {
            Name: name || "",
            Email: "",
            ToS : tos || false,
            notes: ""
          };
        },
        validationSchema: Yup.object().shape({
          species: Yup.string().required(
            "This is a new error"
          ),
          size: Yup.string().required()
        }),
        handleSubmit(
          values,
          { setStatus, resetForm }
        ) {
          console.log("submitting", values);
          axios
            .post(
              "https://reqres.in/api/users/",
              values
            )
            .then(res => {
              console.log("success", res);
              setStatus(res.data);
              resetForm();
            })
            .catch(err =>
              console.log(err.response)
            );
        }
      })(TeamForm);

export default FormikTeamForm;
