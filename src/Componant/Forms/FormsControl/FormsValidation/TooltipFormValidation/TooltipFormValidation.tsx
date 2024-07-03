import { Card, CardBody, Col } from 'reactstrap'
import { FormValidationTooltip } from '../../../../../utils/Constant'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { tooltipFormSubTitle, tooltipInitialValue, tooltipValidationSchema } from '../../../../../Data/Forms/FormsControl/FormsValidation/FormsValidation'
import { useState } from 'react'
import { Formik } from 'formik'
import { TooltipValidationProp } from '../../../../../Types/Forms/FormsControl/FormValidation'
import TooltipValidationForm from './TooltipValidationForm'

const TooltipFormValidation = () => { 
  const [submitErrors, setSubmitError] = useState<boolean>(false);

  const submitHandler = (values: TooltipValidationProp, { resetForm }: { resetForm: () => void }) => {
    resetForm();
    setSubmitError(false);
  };

  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={FormValidationTooltip} span={tooltipFormSubTitle} />
        <CardBody>
          <Formik initialValues={tooltipInitialValue} onSubmit={submitHandler} validationSchema={tooltipValidationSchema}>
            {({ errors }) => <TooltipValidationForm errors={errors} setSubmitError={setSubmitError} submitErrors={submitErrors} />}
          </Formik>
        </CardBody>
      </Card>
    </Col>
  );
  
}

export default TooltipFormValidation