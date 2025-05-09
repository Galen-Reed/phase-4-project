import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewDeviceForm() {

    const [refreshPage, setRefreshPage] = useState(false);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter device's name").max(15),
        type: yup.string().required("Must enter type of device"),
        serial_number: yup
            .number()
            .positive()
            .integer()
            .required("Must enter serial number")
            .typeError("Please enter an integer"),
        status: yup.string().required("Must enter device's status"),
        user_id: yup
            .number()
            .positive()
            .integer()
            .required("Must enter user_id")
            .typeError("Please enter an integer"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            serial_number: "",
            status: "",
            user_id: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/devices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if (response.status == 200) {
                    setRefreshPage(!refreshPage);
                }
            });
        },
    });

    return (
        <div>
            <h1>forms!</h1>
        </div>
    )
}

export default NewDeviceForm;