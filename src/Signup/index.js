import React, { useState, Fragment } from 'react';
import { Row, Col, Form, Input, Button, Checkbox, Upload, Modal, message } from 'antd'; 
import { UploadOutlined } from '@ant-design/icons';
import styled from "styled-components";

// Own component
import Map from "../Map/";
import SelectStates from "../Shared/Selects/SelectStates";
import SelectCounties from "../Shared/Selects/SelectCounties";
import SelectCategories from "../Shared/Selects/SelectCategories";
import SelectSubcategories from "../Shared/Selects/SelectSubcategory";
import LoadingLayout from "../Layouts/LoadingLayout";

// Backgrounds
import WavesBackgroud from "../Shared/Backgrounds/Waves.svg";

// Own services
import { BusinessAPI } from "../Services/Business"; 

const { Item: ItemForm } = Form;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Servicio a domicilio", "Pide y pasa"]

// Other color: #186fa2, 063651
const PageHeader = styled.h1`
  color: #000;
  margin-top: 1rem;
  @media (min-width: 768px) {
    font-size: 3em;
  }
`;

const RowStyled = styled.div`
  width: 90%;
  margin: 0 auto;

  @media (min-width: 1200px) {
    width: 60%;
  }
`;


const FormStyled = styled(Form)`
  /*background-image: url('${WavesBackgroud}');*/
  background-repeat: no-repeat;
  background-position: bottom;
`;

const UploadStyled = styled(Upload)`
  .ant-upload-list-picture-card-container {
    margin: 10px auto 0;
    float: none;
    width: 200px;
    height: 200px;
  }
  .ant-upload.ant-upload-select-picture-card {
    background-color: transparent;
    width: 100%;
    border: none;
    height: 60px;
    margin: 0 auto;
  }

  @media (max-width: 425px) {
    margin: 10px auto;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 200px;
    height: 200px;
  }
  .ant-upload.ant-upload-select-picture-card > .ant-upload {
    padding:0;
  }
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;
const Signup = props => {
  const { history } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [streetMap, setStreetMap] = useState(null);
  const [exteriorNumberMap, setExteriorNumberMap] = useState(null);
  const [zipcodeMap, setZipcode] = useState(null);
  const [neighborhoodMap, setNeighborhoodMap] = useState(null);
  const [stateMap, setStateMap] = useState(null);
  const [countyMap, setCountyMap] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showDeliveryCompanies, setShowDeliveryCompanies] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const handleChangeCategory = value => {
    if ( value === "Restaurantes") setShowSubcategories(true);
    else setShowSubcategories(false);
  }

  const handleChangeState = value => {
    if ( value.length > 0) {
      form.setFieldsValue({ state: value });
      setStateMap(value);
      if (countyMap) {
        setCountyMap(null);
        form.setFieldsValue( { county: null} );
      }
    }
  }

  const handleChangeCounty = value => {
    if ( value.length > 0) {
      form.setFieldsValue({ county: value });
      setCountyMap(value);
    }
  }

  const handleBlurStreet = e => {
    const { value } = e.target;
    if ( value.length > 0) {
      form.setFieldsValue({ street: value });
      setStreetMap(value);
    }
  }
  const handleBlurExteriorNumber = e => {
    const { value } = e.target;
    if ( value.length > 0) {
      form.setFieldsValue({ exterior_number: value });
      setExteriorNumberMap(value);
    }
  }
  const handleBlurZipcode = e => {
    const { value } = e.target;
    if ( value.length > 0) {
      form.setFieldsValue({ zipcode: value });
      setZipcode(value);
    }
  }

  const handleBlurNeighborhood = e => {
    const { value } = e.target;
    if ( value.length > 0) {
      form.setFieldsValue({ neighborhood: value });
      setNeighborhoodMap(value);
    }
  }

  const handleOnChangeMap = coordenates => {
    const [lat, lng] = coordenates
    form.setFieldsValue({ coordenates: { lat, lng } });
  }

  const onFinish = async values => {
    setLoadData(true);
    let response = await BusinessAPI.createBusiness(values);
    setLoadData(false);
    if(response.type === "success") {
      await message.success(response.message);
      history.push(`/business/${response.slug}`);
    } else message.error(response.message);
  }

  const onFinishFailed = ({ errorFields, values }) => {
    console.log("errors", errorFields);
    console.log("values", values);
    form.scrollToField(errorFields[0].name);
  }

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const getMeasureImage = file => {
    return new Promise((resolved, reject) => {
      const img = new Image();
      img.onload = () => {
        resolved({ width: img.width, 
                  height: img.height });
      };
      img.src = file;
    });
  }
  const handleChange = async info => {
    const { fileList } = info;
    if(fileList.length !== 0) {
      let base64 = await getBase64(fileList[0].originFileObj);
      let propsImage = await getMeasureImage(base64);
      if(propsImage.width < 400) {
        message.error("La imagen debe ser mayor a 400px");
      } else {
        form.setFieldsValue( { main_img: base64 });
        setFileList(fileList);
      }
    } else {
      setFileList([])
    }
  }
  const handleBeforeUpload = (file, fileList) => false;
  const handleCancel = () => setPreviewVisible(false);
  
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChangeDeliveryOptions = values => {
    let filter = values.filter(item => item === "Servicio a domicilio");
    if(filter.length > 0) setShowDeliveryCompanies(true);
    else setShowDeliveryCompanies(false);
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      <Button>
        <UploadOutlined /> Subir imagen
      </Button>
    </div>
  );

  console.log("props", props);
  return (
    <Fragment>
      {
        loadData ? <LoadingLayout text="Estamos validando la información" dots={true} />
        : (
          <FormStyled
          layout="vertical"
          className="login-form mb-5"
          form={form}
          name="register"
          scrollToFirstError={true}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}>
            <Row type="flex" justify="center" style={{ backgroundColor: "#000" }}>
              <PageHeader className="mb-3 text-white">Crear negocio</PageHeader>
            </Row>
            <RowStyled className="mt-5 mb-2">
              <Row type="flex" align="center" justify="center" gutter={20}>
                <Col xs={24} md={24}>
                  <ItemForm
                    className="mb-0"
                    label="Sube una imagen relacionada a tu negocio. Puede ser el logo, comida, ambientación"
                    name="main_img">
                    <UploadStyled
                        accept=".png,.jpg,.jpeg"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        onPreview={handlePreview}
                        beforeUpload={handleBeforeUpload}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        showUploadList={{
                          showPreviewIcon: true,
                          showDownloadIcon: false,
                          showRemoveIcon: true
                        }}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </UploadStyled>
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                  </ItemForm>
                </Col>
              </Row>
    
    
              <Row type="flex" gutter={20}>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Nombre del negocio"
                    name="business_name"
                    rules={[{
                      required: true, message: "Ingresa el nombre de tu negocio."
                    }]}>
                    <Input />
                  </ItemForm>
                </Col>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Correo electrónico"
                    name="email"
                    rules={[{
                      required: true, message: "Ingresa el correo electrónico.",
                      type: "email", message: "Debes ingresar un correo electrónico válido."
                    }]}>
                    <Input />
                  </ItemForm>
                </Col>
              </Row>
              <Row type="flex" gutter={20}>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Teléfono de contacto"
                    name="telephone"
                    rules={[
                      {
                      required: true, message: "Ingresa el teléfono de contacto"
                      },
                      {
                        min: 10,
                        max: 10,
                        message: "Tiene que tener 10 digitos."
                      }
                    ]}>
                    <Input />
                  </ItemForm>
                </Col>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Whatsapp"
                    name="whatsapp"
                    rules={[
                      {
                        min: 10,
                        max: 10,
                        message: "Tiene que tener 10 digitos."
                      }
                    ]}>
                    <Input />
                  </ItemForm>
                </Col>
              </Row>
              <Row type="flex" gutter={20}>
                <Col xs={24}>
                  <ItemForm
                    label="Certificado de regalo"
                    name="gift_card"
                    help={
                      <p className="text-center">
                        Puedes utilizar <a
                          href="https://boleti.co/covid-19?fbclid=IwAR2vooH3MMGIJy_3iLMeyv8aXgjutyxKQw6ixuZYLwwr5_gpYDY0SyViTAo"
                          target="_blank">Boletico</a> para crear certificados de regalo.
                      </p>
                    }>
                      <Input placeholder="Ingresa la página web donde pueden comprar un certificado de regalo" />
                  </ItemForm>
                </Col>
              </Row>
              <Row type="flex" gutter={20}>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Facebook"
                    name="facebook"
                    rules={[{
                      type: "url", message: "Debes ingresar la página web de facebook de tu negocio"
                    }]}>
                    <Input 
                    placeholder="Ingresa la página web de facebook"/>
                  </ItemForm>
                </Col>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Opciones de entrega"
                    name="delivery_options"
                    rules={[{
                      required: true, message: "Ingresa tus opciones de entrega."
                    }]}>
                    <CheckboxGroup
                      options={plainOptions}
                      onChange={handleChangeDeliveryOptions}/>
                  </ItemForm>
                </Col>
              </Row>
              
              {
                showDeliveryCompanies ? (
                  <Row type="flex" gutter={20}>
                    <Col xs={24} md={12}>
                      <ItemForm 
                        label="UberEats"
                        name="uber_eats"
                        rules={[{
                          type: "url", message: "Debes ingresar la página web de UberEats de tu negocio"
                        }]}>
                        <Input 
                        placeholder="Ingresa la página web de UberEats"/>
                      </ItemForm>
                    </Col>
                    <Col xs={24} md={12}>
                      <ItemForm 
                        label="Rappi"
                        name="rappi"
                        rules={[{
                          type: "url", message: "Debes ingresar la página web de Rappi de tu negocio"
                        }]}>
                        <Input 
                        placeholder="Ingresa la página web de Rappi"/>
                      </ItemForm>
                    </Col>
                  </Row>
                ) : null
              }
    
              <Row type="flex" gutter={20}>
                <Col xs={24} md={showSubcategories ? 12 : 24 }>
                  <ItemForm
                    label="Categorias"
                    name="category"
                    rules={[{
                      required: true, message: "Selecciona una categoría"
                    }]}>
                      <SelectCategories onChange={handleChangeCategory}/>
                  </ItemForm>
                </Col>
                {
                  showSubcategories ? (
                    <Col xs={24} md={12}>
                      <ItemForm
                        label="Subcategorías"
                        name="subcategory"
                        rules={[{
                          required: true, message: "Selecciona una subcategoría"
                        }]}>
                          <SelectSubcategories />
                      </ItemForm>
                    </Col>
                  ) : null
                }
              </Row>
              
    
              <Row type="flex" gutter={20}>
                <Col xs={24} md={12}>
                  <ItemForm 
                    label="Calle"
                    name="street"
                    rules={[{
                      required: true, message: "Ingresa la calle."
                    }]}
                    >
                      <Input onBlur={handleBlurStreet} />
                  </ItemForm>
                </Col>
                <Col xs={24} md={6}>
                  <ItemForm 
                    label="Número exterior"
                    name="exterior_number"
                    rules={[{
                      required: true, message: "Ingresa el número exterior."
                    }]}>
                      <Input onBlur={handleBlurExteriorNumber} />
                  </ItemForm>
                </Col>
                <Col xs={24} md={6}>
                  <ItemForm 
                    label="Código Postal"
                    name="zipcode"
                    rules={[{
                      required: true, message: "Ingresa el código postal."
                    }]}>
                      <Input onBlur={handleBlurZipcode}/>
                  </ItemForm>
                </Col>
                <Col xs={24} md={8}>
                  <ItemForm 
                    label="Colonia"
                    name="neighborhood"
                    rules={[{
                      required: true, message: "Ingresa la colonia."
                    }]}>
                      <Input onBlur={handleBlurNeighborhood} />
                  </ItemForm>
                </Col>
                <Col xs={24} md={8}>
                  <ItemForm label="Estado" name="state"
                    rules={[{
                      required: true, message: "Selecciona el estado."
                    }]}>
                    <SelectStates onChange={handleChangeState} />
                  </ItemForm>
                </Col>
                <Col xs={24} md={8}>
                  <ItemForm 
                    label="Ciudad"
                    name="county"
                    rules={[{
                      required: true, message: "Selecciona una ciudad."
                    }]}
                    >
                      <SelectCounties state={stateMap} onChange={handleChangeCounty} />
                  </ItemForm>
                </Col>
              </Row>
              <Row type="flex" gutter={20} className="mb-4">
                <Col xs={24} md={24} style={{ height: "350px" }}>
                  <ItemForm
                    noStyle
                    name="coordenates"
                    className="mb-0"
                    >
                    <Map
                      street={streetMap}
                      exteriorNumber={exteriorNumberMap}
                      zipcode={zipcodeMap}
                      neighborhood={neighborhoodMap}
                      state={stateMap}
                      county={countyMap}
                      onChange={handleOnChangeMap}/>
                  </ItemForm>
                </Col>
                <Col xs={24}>
                  <p className="mb-0 text-center text-secondary">Una vez que el marcador aparezca, puedes arrastrarlo a una ubicación más exacta.</p>
                </Col>
              </Row>
            </RowStyled>
              
            <RowStyled>
              <Row type="flex" gutter={20}>
                <Col xs={24} md={24} >
                  <ButtonStyled
                    className="d-block mx-auto"
                    type="primary"
                    size="large"
                    htmlType="submit">
                    Crear negocio
                  </ButtonStyled>
                </Col>
              </Row>
            </RowStyled>
          </FormStyled>
        )
      }
    </Fragment>
  );
}

export default Signup;