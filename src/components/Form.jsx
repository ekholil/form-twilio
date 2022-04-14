import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";
const Form = () => {
  const [smsType, setSmsType] = useState("single");
  const [advanced, setAdvanced] = useState(false);
  const [msg, setMsg] = useState("");
  const { reset, register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.smsType = smsType;
    data.advanced = advanced;
    fetch("http://localhost:5000/sendMsg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMsg(data);
      });
    reset();
    console.log(data);
  };

  return (
    <div style={{ maxWidth: "600px", border: '1px solid gray' }} className="container shadow my-5 p-4 rounded">
      <Container>
        <h2 className="text-center ">SMS Sender App</h2>
        {msg && <h3 className="text-center">{msg}</h3>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <label className="my-2" htmlFor="Sender">Sender Number</label>{" "}
            </Col>
            <Col>
              <select
                className="form-control my-2"
                id="Sender"
                {...register("sender")}
              >
                <option value="+15408024345">+15408024345</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <span>Select Sms Type</span>
            </Col>
            <Col>
              <input
                onChange={() => setSmsType("single")}
                name="smstype"
                type="radio"
                id="single"
                
                defaultChecked
              />
              <label htmlFor="single">Single</label>
              <input
                onChange={() => setSmsType("bulk")}
                name="smstype"
                type="radio"
              
                id="bulk"
              />
              <label htmlFor="bulk">Bulk</label> <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="my-2" htmlFor="Receiver">Receiver Number</label>
            </Col>
            <Col>
              {smsType === "single" && <input className="form-control my-2" {...register("receiver")} />}
              {smsType === "bulk" && <textarea className="form-control my-2" {...register("receiver")} />}
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="my-2" htmlFor="">Message</label>
            </Col>
            <Col>
              <textarea className="form-control my-2" {...register("message")} />
            </Col>
          </Row>
          
         <Row>
           <Col>
           </Col>
           <Col>
           <input
            type="checkbox"
            className="mx-2"
            id="advanced"
            onChange={(e) => setAdvanced(e.target.checked)}
          />
          <label htmlFor="advanced">Show Advanced Options</label> 
           </Col>
         </Row>
          {advanced && (
            <div>
              <Row>
                <Col>
                  <label className="my-2" htmlFor="delay">Delay</label>
                </Col>
                <Col>
                  <select className="form-control my-2" {...register("delay")}>
                    <option value="20">20s</option>
                    <option value="30">30s</option>
                    <option value="60">60s</option>
                  </select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="my-2" htmlFor="delay">Timeout</label>
                </Col>
                <Col>
                  <select className="form-control my-2" {...register("timeout")}>
                    <option value="20">20s</option>
                    <option value="30">30s</option>
                    <option value="60">60s</option>
                  </select>
                </Col>
              </Row>
            </div>
          )}
          <input className="btn btn-success form-control mt-3" type="submit" />
        </form>
      </Container>
    </div>
  );
};

export default Form;
