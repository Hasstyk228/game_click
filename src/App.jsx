import { useRef , useState , useEffect } from "react";
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

  const [coords, setCoords] = useState(null);

  const [show, setShow] = useState(true);


/*///////////////////////////////////////////////////////*/

  function addPoint (e) {
    setPoint(param => param+dimamicPoint) 
    
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });
      
  }

  useEffect(() => {
    if (coords) {
      const timer = setTimeout(() => {setCoords(null)}, 1000);
      return () => clearTimeout(timer);
    }
  }, [coords]);

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
    return "1000 P"
  } else {
    return "On"
  }
}
  
/*------------------------------------*/  

function endText (value) {

  if(value > 0 && value < 1000 )
  {
    return format(Math.round(value))

  } else if(value /1000 > 1 && value /1000 < 1000)
  {
    return (Math.round(value)/1000).toFixed(1) + " K"

  } else if(value /1000000 > 1 && value /1000000 < 1000)
  {
    return (Math.round(value)/1000000).toFixed(1) + " M"
  
  } else if(value /1000000000 > 1 && value /1000000000 < 1000)
  {
    return (Math.round(value)/1000000000).toFixed(1) + " B"

  } else if(value /1000000000000 > 1 && value /1000000000000 < 1000)
  {
      return (Math.round(value)/1000000000000).toFixed(1) + " T"

  } else if(value /1000000000000000 > 1 && value /1000000000000000 < 1000)
  {
      return (Math.round(value)/1000000000000000).toFixed(1) + " Q"

  } else if(value /1000000000000000000 > 1 && value /1000000000000000000 < 1000)
  {
    return (Math.round(value)/1000000000000000000).toFixed(1) + " Q"
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
              <div id="b2_i1_2" >
                
                {endText(dimamicPoint)} [P]
                
                </div>
              <button id="b2_i_btn" onClick={upgradeClick}>{"<"}Up{">"}</button>
            </div>
            <div id="b2_i2">
              <div id="b2_i2_1">Time</div>
              <div id="b2_i2_2">{time} ms</div>
              <button id="b2_i2_btn" onClick={timeChange}>{"<"}Up{">"}</button>
            </div>
            <div id="b2_i3">
              <div id="b2_i3_1" onClick={startAutoClick}>Auto-C: {active}</div>
              <div id="b2_i3_3">
                {endText(upAuto)} [P/s]
              </div>
              <div id="b2_div_btn3"><button id="b2_i3_btn" onClick={upgradeAutoClick} >{"<"}Up{">"}</button>
              </div>
            </div>
          </div>
          
          <div id="b2_click" onClick={addPoint}> 
            <div id="vl_click_div">   
              <p>{format(Math.round(autoPoint))} P</p>
              <label htmlFor="">Value Click</label>
            </div>

            <div id="vl_click_div2">
              <p>{format(Math.round(valueTime))} P</p>
              <label htmlFor="">Value Time</label>
            </div>

            <div id="vl_click_div2">
              <p>{format(Math.round(upValAuto))} P</p>
              <label htmlFor="">Value p/s</label>
            </div>
            
            <div id="vl_click_div2">
              <p>{isActiveAutoClick()}</p>
              <label htmlFor="">Auto Click</label>
            </div>

            <div >
              {coords && (
                <div
                  className="absolute text-red-600 font-bold"
                  style={{
                    width:'60px',
                    height:'60px',
                    left: coords.x,
                    top: coords.y,
                    fontWeight:'800',
                    transform: 'translate(-90%, -480%)',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingLeft:"0px",
                    color:'rgb(195, 133, 0)',
                    border:'3px solid rgb(199, 136, 0)',
                    borderRadius:'100px',
                    background: 'linear-gradient(140deg,rgba(255, 221, 0, 1) 22%, rgb(255, 243, 176) 35%, rgb(255, 251, 182) 38%, rgba(255, 225, 0, 1) 51%, rgba(255, 225, 0, 1) 35%, rgb(254, 247, 170) 58%, rgb(254, 255, 191) 61%, rgba(255, 225, 0, 1) 73%)',
                    boxShadow: '1px 0px 0px 1px rgb(158, 116, 0)',
                    fontSize: 'clamp(12px, 14px, 32px)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                   // backgroundColor:"rgb(255, 225, 0)",
                    }}> 

                  {"+" + endText(dimamicPoint)}</div> )
            }
          </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
  /*///////////////////////////////////////////////////////*/

}