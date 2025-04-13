import { useRef , useState } from "react";
import React from 'react';
import './App.css';
import './data.js'


export default function App() {

/*///////////////////////////////////////////////////////*/
  
  const [point,setPoint] = useState(0)

  const [autoPoint,setAutoPoint] = useState(10)  

  const [valueTime,setValueTime] = useState(10)  
  
  const [time,setTime] = useState(5000)  

  const [dimamicPoint,setDinamicPoint] = useState(1)  

  const [active,setActive] = useState("off")  

  const [dinamicTime,setDinamicTime] = useState("")  

  const intervalRef = useRef(null);

  const valueAutoCLick = useRef(100);

  const [upValAuto, setUpValAuto] = useState(10);

  const [upAuto, setUpAuto] = useState(100);

/*///////////////////////////////////////////////////////*/

  function addPoint () {setPoint(param => param+dimamicPoint) }

  function autoClick () { setPoint(param => param + valueAutoCLick.current) }

  function upValAutoCLick () { setAutoPoint(param => param*2) }

  function upValTime() { setValueTime(param => param*2) }

/*///////////////////////////////////////////////////////*/

  function upgradeAutoClick () {

    if(point>=upValAuto)
    {
      setPoint(param => param-upValAuto )
      setUpValAuto(param => param*1.6)
      setUpAuto(param => param*1.4)
      valueAutoCLick.current *= 1.4
    }

  }

  function onClickStart () { 
    if(intervalRef.current) 
    {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(autoClick,time) 
    }

/*------------------------------------*/

  function timeChange () {

    if(active=="on")
    {
      if(point >= valueTime )
        {
          onClickStart()
          setTime(param => param-100)
          let a = valueTime;
          setPoint(param => param-a )
          setValueTime(param => param*1.6)
        }
    }
  }

/*------------------------------------*/

  function startAutoClick () {
    if(point >= 1000)
    {
      if(active=="off")
      {
        setPoint(param => param-1000 )
        onClickStart()
        setActive("on")
      }
    }
  }

/*------------------------------------*/  

  function upgradeClick () { 
    if(point >= autoPoint )
      {
        setDinamicPoint(param => param*1.6)
        let a = autoPoint;
        setPoint(param => param-a )
        setAutoPoint(param => param*1.7)
      }  
  }

/*------------------------------------*/  

function isActiveAutoClick () {
  if(active=="off")
  {
    return "Value A/C : 1000 P"
  } else {
    return "AutoClick On"
  }
}
  
/*///////////////////////////////////////////////////////*/

  function format(num, fix) {
    var p = num.toFixed(fix).split(".");
    return p[0].split("").reduceRight(function(acc, num, i, orig) {
        if ("-" === num && 0 === i) {
            return num + acc;
        }
        var pos = orig.length - i - 1
        return  num + (pos && !(pos % 3) ? "." : "") + acc;
    }, "") + (p[1] ? "," + p[1] : "");
}

/*///////////////////////////////////////////////////////*/
  
  return (
    <>
    <section className="section">
      <div id="a">
        <button id="a_btn1" >Page 1</button>
        <button id="a_btn2">Page 2</button>
        <button id="a_btn3">Page 3</button>
      </div>
      <div id="b">
        <div id="b1">
          <p id="b1_p"> {format(point)}P</p>
          <button id="b1_btn">REBIRTH</button>
        </div>
        <div id="b2">
          <div id="b2_info">
            <div id="b2_i1">
              <div id="b2_i1_1">Click</div>
              <div id="b2_i1_2">{format(Math.round(dimamicPoint))} P</div>
              <button id="b2_i_btn" onClick={upgradeClick}>{"<"}Up{">"}</button>
            </div>
            <div id="b2_i2">
              <div id="b2_i2_1">Time</div>
              <div id="b2_i2_2">{time} ms</div>
              <button id="b2_i2_btn" onClick={timeChange}>{"<"}Up{">"}</button>
            </div>
            <div id="b2_i3">
              <div id="b2_i3_1" onClick={startAutoClick}>Auto-C: {active}</div>
              <div id="b2_i3_3">{format(Math.round(upAuto))} P/s</div>
              <div id="b2_div_btn3"><button id="b2_i3_btn" onClick={upgradeAutoClick} >{"<"}Up{">"}</button>
              </div>
            </div>
          </div>
          
          <div id="b2_click" onClick={addPoint}> 
            <div>            Value Click : {format(Math.round(autoPoint))} P</div>
            <div>Value Time : {format(Math.round(valueTime))} P</div>
            <div>{isActiveAutoClick()}</div>
            <div>Value P/S : {format(Math.round(upValAuto))} P</div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
  /*///////////////////////////////////////////////////////*/

}