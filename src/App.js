import React from 'react';
import {useState} from 'react';

const App = () => {
    let imageDefault = 'https://image.tmdb.org/t/p/w500//sf9YInz0NOS7VBGWYRml5AQFQUG.jpg'
    let film = 'aggro dr1ft'

    const [slot1, setImage1] = useState(imageDefault)
    const [slot2, setImage2] = useState(imageDefault)
    const [slot3, setImage3] = useState(imageDefault)
    const [slot4, setImage4] = useState(imageDefault)
    const [slot5, setImage5] = useState(imageDefault)
    const [slot6, setImage6] = useState(imageDefault)
    const [slot7, setImage7] = useState(imageDefault)
    const [slot8, setImage8] = useState(imageDefault)
    const [slot9, setImage9] = useState(imageDefault)
    const [slot10, setImage10] = useState(imageDefault)

    function changeImage(id){
        console.log("id: " + id)
        fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film )
        .then(data => data.json())
        .then(data => {
            console.log(data)
            const poster = 'https://image.tmdb.org/t/p/w500/' + data.results[0].poster_path
            funcArray[id](poster)
        })
    }

    function imageTime(id){
      film = document.getElementById('form').value
      
      changeImage(id)
    }

  const images = []
  const states = [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10]
  const funcArray = [setImage1, setImage2, setImage3, setImage4, setImage5, setImage6, setImage7, setImage8, setImage9, setImage10]
  function imageCompiler(){
  for(let i = 0; i < 4; i++){
        images.push(<img 
        src={states[i]}
        style={{
            width: '200px',
            border: 'solid black',
            borderWidth: '10px'
        }} 
        onClick={() => imageTime(i)}
        key = {i}
          />)
    }
}
imageCompiler()
document.getElementById('id1')

    return (
<div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <input id="form" style={{width: '500px', height: '30px'}}/>
    </div>

        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(4, 200px)`,
            justifyContent: 'center'
            }}>
          {images}
        </div>

</div>
    )
}

export default App;



// {
//   "page": 1,
//   "results": [
//     {
//          "adult":false,
//          "backdrop_path":"/krML56h31aXVKudBh4IMnZE0o86.jpg",
//          "genre_ids":[18,10752],
//          "id":467244,
//          "original_language":"en",
//          "original_title":"The Zone of Interest",
//          "overview":"The commandant of Auschwitz, Rudolf Höss, and his wife Hedwig, strive to build a dream life for their family in a house and garden next to the camp.",
//          "popularity":12.496,
//          "poster_path":"/ruyeAfmxbNPWZ92dWymqwTc6nWV.jpg",
//          "release_date":"2023-12-15",
//          "title":"The Zone of Interest",
//          "video":false,
//          "vote_average":0.0,
//          "vote_count":0
//     }
//    ],"total_pages":1,"total_results":1
// }