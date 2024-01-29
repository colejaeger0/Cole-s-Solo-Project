import React from 'react';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import Draggable from 'react-draggable';
import {useState, useRef, useEffect} from 'react';

const WIDTH = 200;
const HEIGHT = 300;

const App = () => {

    // useEffect(() => {

    // }, [multiplier])

    const exportRef = useRef(null)

    let imageDefault = 'https://images.squarespace-cdn.com/content/v1/5acd17597c93273e08da4786/1547847934765-ZOU5KGSHYT6UVL6O5E5J/Shrek+Poster.png'

    const [searchImage, setSearchImage] = useState('https://images.squarespace-cdn.com/content/v1/5acd17597c93273e08da4786/1547847934765-ZOU5KGSHYT6UVL6O5E5J/Shrek+Poster.png');

    const [x, setX] = useState(0);

    const [isExporting, setIsExporting] = useState(false)
    const multiplier = isExporting? 5 : 1;
    const opacity = isExporting? 0 : 50;
    if (isExporting === true){ 
        setTimeout(() => {
            exportComponentAsPDF(exportRef)
            setIsExporting(false)
        }, 1)
    }

    console.log(x)

    const [filmName, setFilmName] = useState('')
    
    const [slots, setSlots] = useState([imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault, imageDefault])

    function imageTime(id){
      // const film = document.getElementById('form').value
      fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + filmName )
        .then(data => data.json())
        .then(data => {
            const poster = 'https://image.tmdb.org/t/p/w500/' + data.results[x].poster_path
            const newSlots = [...slots]
            newSlots[id] = poster
            setSlots(newSlots)
        })
    }

    function search(){
        setX(0)
        const film = document.getElementById('form').value
        console.log(film)
        fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film )
          .then(data => data.json())
          .then(data => {
            console.log(data)
              const poster = 'https://image.tmdb.org/t/p/w500/' + data.results[x].poster_path
              setSearchImage(poster)
              setFilmName(film)
          })

      }

    function increment() {
          setX(x + 1)
          //   const film = document.getElementById('form').value;
          fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + filmName)
            .then(data => data.json())
            .then(data => {
              console.log("DATA", data)
              const poster = 'https://image.tmdb.org/t/p/w500/' + data.results[x + 1].poster_path;
              setSearchImage(poster)
            });
    }

    function decrement() {
        if(x >= 0){ 
        setX(x - 1)
        //   const film = document.getElementById('form').value;
          fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + filmName)
            .then(data => data.json())
            .then(data => {
              const poster = 'https://image.tmdb.org/t/p/w500/' + data.results[x - 1].poster_path;
              setSearchImage(poster)
            });
        }
    }

    const [position, setPosition] = useState([0, 0, 0, 0, 0, 0])

    function up(i){
        const newPositions = [...position]
        newPositions[i] = newPositions[i] + 5
        setPosition([...newPositions])
    }

    function down(i){
        const newPositions = [...position]
        newPositions[i] = newPositions[i] - 5
        setPosition([...newPositions])
    }
    
    // function save(){
    //     const projectName = document.getElementById('save').value
    //     fetch('http://localhost:3001/api/save', {
    //         headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'},
    //         body: JSON.stringify({ name: projectName, slots: slots }),
    //         method: 'POST'
    //     })
    // }

    // function load(){
    //     const projectName = document.getElementById('load').value
    //     fetch('http://localhost:3001/api/load', {
    //         body: JSON.stringify({ name: projectName }),
    //         headers: {"Content-Type": "application/json"},
    //         method: 'POST'
    //     })
    //       .then(data => data.json())
    //       .then(data => {
    //         console.log(data)
    //         setSlots(data)
    //       })
    // }

    const s = {
        width: WIDTH * multiplier,
        height: HEIGHT * multiplier,
        border: '5px solid black',
        boxSizing: 'border-box',
        overflow: 'hidden',
    }
    const p = {
        border: '5px solid black',
        boxSizing: 'border-box',
        width: WIDTH * multiplier,
        height: HEIGHT * .5 * multiplier,
        overflow: 'hidden',
    }
    
    const images = []
    for(let i = 0; i < slots.length; i++){
        if(i === 0){
            images.push(
            <div style={{
                gridRowStart: 1,
                gridRowEnd: 3,
                ...s
            }}>
            <img 
                src={slots[i]}
                style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />
            </div>
                )
        } else if (i === 1){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 5,
                    gridRowStart: 1,
                    gridRowEnd: 3,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 2){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 3,
                    gridRowStart: 1,
                    gridRowEnd: 3,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 3){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 2,
                    gridRowStart: 2,
                    gridRowEnd: 4,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 4){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 4,
                    gridRowStart: 2,
                    gridRowEnd: 4,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 5){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 0,
                    gridRowStart: 2,
                    gridRowEnd: 4,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 6){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 0,
                    gridRowStart: 3,
                    gridRowEnd: 5,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 7){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 0,
                    gridRowStart: 5,
                    gridRowEnd: 7,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 8){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 0,
                    gridRowStart: 4,
                    gridRowEnd: 6,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 9){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 3,
                    gridRowStart: 3,
                    gridRowEnd: 5,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 10){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 4,
                    gridRowStart: 4,
                    gridRowEnd: 6,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 11){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 5,
                    gridRowStart: 3,
                    gridRowEnd: 5,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 12){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 5,
                    gridRowStart: 5,
                    gridRowEnd: 7,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 13){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 3,
                    gridRowStart: 5,
                    gridRowEnd: 7,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 14){
            images.push(<img 
                src={slots[i]}
                style={{
                    gridColumnStart: 6,
                    gridRowStart: 4,
                    gridRowEnd: 6,
                    ...s
                }} 
                onClick={() => imageTime(i)}
                key = {i}
                />)
        } else if (i === 15){
        images.push(
        <div style={{
            overflow: 'hidden',
            objectfit: 'cover',
            position: 'relative',
            ...p,
            }}>
            <button onClick={() => up(0)} style={{
                zIndex: 1,
                width:200,  
                position:'absolute',
                opacity: `${opacity}%`,
                backgroundColor: 'white',
                }}>^
            </button> 
            <button onClick={() => down(0)} style={{
                zIndex: 1,
                top: 120,
                width: 200,
                position:'absolute',
                opacity: `${opacity}%`,
                backgroundColor: 'white'
                }}>v
            </button> 
            <img src={slots[i]}
                style={{
                    position: 'absolute',
                    top: position[0] * multiplier,
                    width: WIDTH * multiplier,
                    height: HEIGHT * multiplier,
                }} 
                onClick={() => imageTime(i)}
                key = {0} 
            />
        </div>  
        )} else if (i === 16){
            images.push(
            <div style={{
                overflow: 'hidden',
                objectfit: 'cover',
                position: 'relative',
                ...p,
                }}>
                <button onClick={() => up(1)} style={{
                    zIndex: 1,
                    width: 200,
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white',
                    }}>^
                </button> 
                <button onClick={() => down(1)} style={{
                    zIndex: 1,
                    top: 120,
                    width: 200,
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white'
                    }}>v
                </button> 
                <img src={slots[i]}
                    style={{
                        position: 'absolute',
                        top: position[1] * multiplier,
                        width: WIDTH * multiplier,
                        height: HEIGHT * multiplier,
                    }} 
                    onClick={() => imageTime(i)}
                    key = {0} 
                />
            </div>  
        )} else if (i === 17){
            images.push(
            <div style={{
                overflow: 'hidden',
                objectfit: 'cover',
                position: 'relative',
                ...p,
                }}>
                <button onClick={() => up(2)} style={{
                    zIndex: 1,
                    width:200,  
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white',
                    }}>^
                </button> 
                <button onClick={() => down(2)} style={{
                    zIndex: 1,
                    top: 120,
                    width: 200,
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white'
                    }}>v
                </button> 
                <img src={slots[i]}
                    style={{
                        position: 'absolute',
                        top: position[2] * multiplier,
                        width: WIDTH * multiplier,
                        height: HEIGHT * multiplier,
                    }} 
                    onClick={() => imageTime(i)}
                    key = {0} 
                />
            </div>  
        )} else if (i === 18){
            images.push(
            <div style={{
                overflow: 'hidden',
                objectfit: 'cover',
                position: 'relative',
                ...p,
                }}>
                <button onClick={() => up(3)} style={{
                    zIndex: 1,
                    width:200,  
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white',
                    }}>^
                </button> 
                <button onClick={() => down(3)} style={{
                    zIndex: 1,
                    top: 120,
                    width: 200,
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white'
                    }}>v
                </button> 
                <img src={slots[i]}
                    style={{
                        position: 'absolute',
                        top: position[3] * multiplier,
                        width: WIDTH * multiplier,
                        height: HEIGHT * multiplier,
                    }} 
                    onClick={() => imageTime(i)}
                    key = {0} 
                />
            </div>  
        )} else if (i === 19){
            images.push(
            <div style={{
                overflow: 'hidden',
                objectfit: 'cover',
                position: 'relative',
                ...p,
                }}>
                <button onClick={() => up(4)} style={{
                    zIndex: 1,
                    width:200,  
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white',
                    }}>^
                </button> 
                <button onClick={() => down(4)} style={{
                    zIndex: 1,
                    top: 120,
                    width: 200,
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white'
                    }}>v
                </button> 
                <img src={slots[i]}
                    style={{
                        position: 'absolute',
                        top: position[4] * multiplier,
                        width: WIDTH * multiplier,
                        height: HEIGHT * multiplier,
                    }} 
                    onClick={() => imageTime(i)}
                    key = {0} 
                />
            </div>  
        )} else if (i === 20){
            images.push(
            <div style={{
                overflow: 'hidden',
                objectfit: 'cover',
                position: 'relative',
                ...p,
                }}>
                <button onClick={() => up(5)} style={{
                    zIndex: 1,
                    width:200,  
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white',
                    }}>^
                </button> 
                <button onClick={() => down(5)} style={{
                    zIndex: 1,
                    top: 120,
                    width: 200,
                    position:'absolute',
                    opacity: `${opacity}%`,
                    backgroundColor: 'white'
                    }}>v
                </button> 
                <img src={slots[i]}
                    style={{
                        position: 'absolute',
                        top: position[5] * multiplier,
                        width: WIDTH * multiplier,
                        height: HEIGHT * multiplier,
                    }} 
                    onClick={() => imageTime(i)}
                    key = {0} 
                />
            </div>  
        )}
      }

return (
<div>
    <div style={{
        display: 'grid', 
        flexDirection: 'column', 
        padding: '10px', 
        justifyContent: 'center', 
        }}>
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            padding: 10,
            }}>
                <input id="form" style={{
                width: '500px', 
                height: '30px',
            }}/>
            <button onClick={() => search()}>SEARCH</button>
        </div>
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            }}>
            <div style={{
                width: WIDTH,
                height: HEIGHT,
                border: '5px solid black',
                
            }}>
                <img
                src={searchImage}
                style={{
                    width: '100%',
                    height: '100%',
                }}/>
            </div>
            <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            padding: 10,
            }}>
                <button onClick={() => increment()}>NEXT MOVIE</button> 
                <button onClick={() => decrement()}>PREV MOVIE</button> 
            </div>
            <button style={{
                padding: 10,
            }} onClick={() => {
                setIsExporting(true)
                // exportComponentAsJPEG(exportRef)
                }
            }>EXPORT</button> 
        </div>
        {/* <div>
            <button onClick={() => save()}>SAVE</button> 
            <input id="save" defaultValue="project name"/>
        </div>
        <div>
            <button onClick={() => load()}>LOAD</button> 
            <input id="load" defaultValue="project name"/>
        </div> */}
    <div id="container" style={{
        width: WIDTH * 6 * multiplier,
        height: HEIGHT * 3 * multiplier,
        display: 'grid',
        border: '5px solid black',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
    }} ref={exportRef}>
        {images}
    </div>
    </div>
</div>
    )
}

export default App;