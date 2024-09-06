import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H4, LI, UL } from '../../../AbstractElements'
import { changeText } from '../../../Utils'
import TopLeftToast from '../../../Componant/BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../ReduxToolkit/Store'
import { emptyPlanGetById, patchMasterAdminPlanData, postMasterAdminPlanData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice'
import BottomRightToast from '../../../Componant/BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast'
import { useLocation } from 'react-router-dom'

const MasterAdminPlanAdd = () => {
    const location = useLocation();
    const getPlanData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.plans.plan);
    const [showToast, setShowToast] = useState(false);
    const [txt, setTxt] = useState("");
    const [plan, setPlan] = useState({
        name: "",
        api_call_count: "",
        amount: 0,
        validity_number: 0,
        validity_time: ""
    })
    useEffect(() => {
        if(getPlanData?.data !== null){
            const data = getPlanData?.data[0];
            setPlan({
                name: data?.name,
                api_call_count: data?.api_call?.split(" ")[0],
                amount: data?.amount,
                validity_number: data?.validity?.split(" ")[0],
                validity_time: data?.validity?.split(" ")[1]
            })
        }
    }, [getPlanData]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        console.log("plan", plan);
    }, [plan]);
    const handleAddUpdatePlan = async () => {
        if(plan.name === "" || plan.api_call_count === "" || plan.validity_number === 0 || plan.validity_time === ""){
            setTxt(`All fields are required`);
            setShowToast(true);
            return;
        }else{
            try {
                let res;
                if(getPlanData?.data === null && location.pathname.includes("add")){
                    res = await dispatch(postMasterAdminPlanData(plan)).unwrap();
                }else{
                    res = await dispatch(patchMasterAdminPlanData({data: plan, id: getPlanData?.data[0]?.id})).unwrap();
                }
                console.log("res on dis", res);
                setTxt(`${res.message}`);
                setShowToast(true);
                setPlan({
                    name: "",
                    api_call_count: "",
                    amount: 0,
                    validity_number: 0,
                    validity_time: ""
                })
              } catch (error) {
                console.log("res on dis err", error);
                setTxt(`${error}`);
                setShowToast(true);
              }
        }
    }
    useEffect(() => {
        return () => {
            dispatch(emptyPlanGetById());
            setPlan({
                name: "",
                api_call_count: "",
                amount: 0,
                validity_number: 0,
                validity_time: ""
            });
        }
    }, []);
  return (
    <div className='page-body'>
        <Row>
            <Col sm="12">
                <Card>
                <CommonCardHeader title={location?.pathname.includes("add")?"Add New Plan":"Edit Plan"} />
                    <CardBody className="pricing-block">
                        <Row>
                            <Col sm="6" md="6">
                                <FormGroup>
                                    <Label>Plan Name</Label>
                                    <Input onChange={(e) => changeText(e, setPlan, plan)} type="text" name='name' placeholder="Enter Plan Name" value={plan.name} />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="6">
                                <FormGroup>
                                    <Label>Api Call Count</Label>
                                    <Input onChange={(e) => changeText(e, setPlan, plan)} type="number" name='api_call_count' placeholder="Enter Api Call Count" value={plan.api_call_count} />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="12">
                                <FormGroup>
                                    <Label>Amount</Label>
                                    <Input onChange={(e) => changeText(e, setPlan, plan)} type="number" name='amount' placeholder="Enter Amount" value={plan.amount} />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="6">
                                <FormGroup>
                                    <Label>Validity Number</Label>
                                    <Input onChange={(e) => changeText(e, setPlan, plan)} type="number" name='validity_number' placeholder="Enter Validity Number" value={plan.validity_number} />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="6">
                                <Label>Validity</Label>
                                <Input onChange={(e) => changeText(e, setPlan, plan)} id="validity" name="validity_time" type="select" required>
                                    <option value={""}>Choose...</option>
                                    <option selected={plan?.validity_time === "days"} value={"days"}>Days</option>
                                    <option selected={plan?.validity_time === "months"} value={"months"}>Months</option>
                                </Input>
                                {/* <FormGroup>
                                    <Label>Validity</Label>
                                    <Input onChange={(e) => changeText(e, setPlan, plan)} type="text" name='validity_time' placeholder="Enter Validity Time" value={plan.validity_time} />
                                </FormGroup> */}
                            </Col>
                            <Col style={{display: "flex", justifyContent: "end"}} sm="12" md="12">
                                <FormGroup>
                                    <Btn onClick={handleAddUpdatePlan} tag="a" size="full" color="primary">{location?.pathname.includes("add")?"Add New Plan":"Update Plan"}</Btn>
                                </FormGroup>
                            </Col>
                        {/* <Col md="12">
                            <FormGroup>
                                <Label >{"Address"}</Label>
                                <textarea onChange={(e) => changeText(e, setUser, user)} name='address' value={user?.address} rows={3} className="form-control" defaultValue={"Type your address"} />
                            </FormGroup>
                        </Col> */}
                    </Row>
                </CardBody>
                </Card>
            </Col>
        </Row>
        {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </div>
  )
}

export default MasterAdminPlanAdd
