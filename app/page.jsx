"use client"
import moment from "moment/moment"
import { card, form, inputsContainer, inputs, label, input, fieldsMassage, submitArea, submitIcon, results, span } from "./page.module.css"
import { useRef, useState } from "react"
import Image from "next/image"
const Page = () => {
  const submitButton = useRef()
  const [age, setAge] = useState({
    days: 0,
    months: 0,
    years: 0,
  })
  const [fieldState, setFieldState] = useState({
    days: null,
    months: null,
    years: null,
  })
  const [massages, setMassages] = useState({
    days: false,
    months: false,
    years: false,
  })
  const fieldContent = (e) => setFieldState({ ...fieldState, [e.target.id]: false })
  const UserAge = async (e) => {
    e.preventDefault()
    const days = e.target["days"]
    const months = e.target["months"]
    const years = e.target["years"]
    setFieldState({
      days: days.value === "",
      months: months.value === "",
      years: years.value === "",
    })
    if (Object.values(fieldState).every(fields => fields === false)) {
      const age = moment.duration(moment().diff(moment(`${days.value}/${months.value}/${years.value}`, "DD/MM/YYYY")))._data
      if (moment(age).isValid()) {
        setAge({
          days: age.days,
          months: age.months,
          years: age.years,
        })
        setMassages({
          days: !(days.value <= moment(months.value, "MM").daysInMonth()),
          months: months.value > 12 || months.value < 1,
          years: years.value > moment().format("YYYY") || years.value < 1900
        })
      } else {
        setAge({
          days: 0,
          months: 0,
          years: 0,
        })
        setMassages({
          days: ((months.value < 12 && months.value > 1) && !(days.value <= moment(months.value, "MM").daysInMonth())) || (years.value === moment().format("YYYY") && days.value >= moment().format("D")),
          months: months.value > 12 || months.value < 1 || years.value === moment().format("YYYY") && months.value > moment().format("M"),
          years: years.value > moment().format("YYYY") || years.value < 1900
        })
      }
    }
  }
  return (
    <div className={card}>
      <form className={form} onSubmit={UserAge}>
        <div className={inputsContainer}>
          <div className={inputs} style={{ color: fieldState.days | massages.days ? 'hsl(0, 100%, 67%)' : 'black' }}>
            <label htmlFor="days" className={label}>day</label>
            <input type="number" id="days" className={input} onChange={fieldContent} placeholder="DD" />
            {fieldState.days && <span className={fieldsMassage}>this field is required</span>}
            {massages.days && <span className={fieldsMassage}>Must be a valid day</span>}
          </div>
          <div className={inputs} style={{ color: fieldState.months | massages.months ? 'hsl(0, 100%, 67%)' : 'black' }}>
            <label htmlFor="months" className={label}>month</label>
            <input type="number" id="months" className={input} onChange={fieldContent} placeholder="MM" />
            {fieldState.months && <span className={fieldsMassage}>this field is required</span>}
            {massages.months && <span className={fieldsMassage}>Must be a valid month</span>}
          </div>
          <div className={inputs} style={{ color: fieldState.years | massages.years ? 'hsl(0, 100%, 67%)' : 'black' }}>
            <label htmlFor="years" className={label}>year</label>
            <input type="number" id="years" className={input} onChange={fieldContent} placeholder="YYYY" />
            {fieldState.years && <span className={fieldsMassage}>this field is required</span>}
            {massages.years && <span className={fieldsMassage}>Must be a valid year</span>}
          </div>
        </div>
        <div className={submitArea}>
          <button className={submitIcon} ref={submitButton} style={{
            backgroundColor: Object.values(age).some(fields => fields !== 0) ? "hsl(259, 100%, 65%)" : "hsl(0, 0%, 8%)"
          }}>
            <Image
              src="/icon-arrow.svg"
              alt="submitIcon"
              width={40}
              height={40}
            />
          </button>
        </div>
      </form >
      <div className={results}>
        <p><span className={span}>{age.years !== 0 ? age.years : "- -"}</span> years</p>
        <p><span className={span}>{age.months !== 0 ? age.months : "- -"}</span> months</p>
        <p><span className={span}>{age.days !== 0 ? age.days : "- -"}</span> days</p>
      </div>
    </div >
  )
}
export default Page
