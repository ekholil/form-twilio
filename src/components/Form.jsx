import React, { useState } from "react";
import {  useForm } from "react-hook-form";
const Form = () => {
  const [smsType, setSmsType] = useState('single')
  const [advanced, setAdvanced] = useState(false)
  const [msg, setMsg] = useState('')
  const { reset, register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.smsType = smsType;
    data.advanced = advanced;
    fetch('http://localhost:5000/sendMsg', {
      method: 'POST',
      headers:  {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setMsg(data)
    })
    reset()
    console.log(data)
  };

  return (
    <div>
      {msg && <h1>{msg}</h1>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Sender">Sender Number</label>
        <select id="Sender" {...register("sender")}> 
            <option value="+15408024345">+15408024345</option>
        </select>
      <br />
        <input onChange={() => setSmsType('single')} name="smstype" type="radio" id="single" defaultChecked/>
        <label htmlFor="single">Single</label> 
        <input onChange={() => setSmsType('bulk')} name="smstype" type="radio"  id="bulk" />
        <label htmlFor="bulk">Bulk</label> <br />
        <label htmlFor="Receiver">Receiver Number</label>
        {smsType === 'single' && <input {...register("receiver")} /> }
        {smsType === 'bulk' && <textarea {...register("receiver")} /> } <br />
        <label htmlFor="">Message</label>
        <textarea {...register("message")} /> <br />
        <input type="checkbox" id="advanced" onChange={(e) => setAdvanced(e.target.checked)} />
        <label htmlFor="advanced">Show Advanced Options</label> <br />
        {advanced && <div>
            <label htmlFor="delay">Delay</label>
        <select {...register("delay")}>
        <option value="20">20s</option>
        <option value="30">30s</option>
        <option value="60">60s</option>
      </select> <br />
      <label htmlFor="delay">Timeout</label>
        <select {...register("timeout")}>
        <option value="20">20s</option>
        <option value="30">30s</option>
        <option value="60">60s</option>
      </select> <br />
            </div>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;

