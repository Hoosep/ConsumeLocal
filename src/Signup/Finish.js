import React, { useState, useEffect, Fragment } from "react";
import { Row, Form, Input } from 'antd'; 

import { UserAPI } from "../Services/Users";

import LoadingLayout from "../Layouts/LoadingLayout";

const { Item: ItemForm } = Form;

const LastStepSignUp = props => {
  const { location } = props;
  const [form] = Form.useForm();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getParams = async () => {
      let response = await UserAPI.getAuth();
      setResponse(response);
    }
    getParams();
  }, []);

  const onFinish = async values => {
    /* let response = await BusinessAPI.createBusiness(values);
    
    if(response.type === "success") message.success(response.message);
    else message.error(response.message); */
  }

  const onFinishFailed = ({ errorFields, values }) => {
    form.scrollToField(errorFields[0].name);
  }

  return (
    <Fragment>
      { response ? (
        <Form
        layout="vertical"
        className="mb-5"
        form={form}
        name="register"
        scrollToFirstError={true}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        colon={false}>
          <Row type="flex" justify="center" align="middle" style={{minHeight: "100vh"}}>
            <Fragment>
              { response.type === "RESEND_LINK" ? (
                <h1 className="text-center">¡Ooops! Parece que ya ha sido usado este sitio web por ti antes. No te preocupes, te hemos enviado otro correo.</h1>
              ) : (
                <ItemForm 
                label="Correo electrónico"
                type="password"
                rules={[{
                  required: true, message: "Ingresa el correo electrónico.",
                  type: "email", message: "Debes ingresar un correo electrónico válido."
                }]}>
                  <Input />
                </ItemForm>
              )
              }
            </Fragment>
          </Row>
        </Form>
      ) : <LoadingLayout text="Cargando" dots={true} />
      }
    </Fragment>)
}

export default LastStepSignUp;