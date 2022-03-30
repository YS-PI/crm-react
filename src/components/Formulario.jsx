import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const { nombre, empresa, notas, telefono, email, id } = cliente;

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "Escriba mas de 3 caracteres")
      .max(20, "Escriba menos de 20 caracteres")
      .required("El nombre del Cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la Empresa es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email del Cliente es obligatorio"),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("Ingrese solo numeros")
      .required("El telefono del Cliente es obligatorio"),
  });
  const handleSubmit = async (valores) => {
    try {
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await respuesta.json();
        navigate("/clientes");
      } else {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await respuesta.json();
        navigate("/clientes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return cargando ? (
    <Spinner></Spinner>
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: nombre ?? "",
          empresa: empresa ?? "",
          email: email ?? "",
          telefono: telefono ?? "",
          notas: notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          /* console.log(data); */
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="nombre"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta children={errors.nombre} />
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="empresa"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta children={errors.empresa} />
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="email"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta children={errors.email} />
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="telefono"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta children={errors.telefono} />
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="notas"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:cursor-pointer rounded"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
