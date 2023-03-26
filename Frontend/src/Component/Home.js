import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome, AiOutlinePlus, AiFillDelete, AiOutlineExport } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";
import "./Home.css"

function Home() {
    const [data, getData] = useState([])
    const [keyToserach, getkey] = useState("")
    const navigate=useNavigate()
    useEffect(() => {
      getAlldata()
    },[])
   
    function handleLogout(){
        localStorage.clear()
        navigate("/signin") 
    }
    function getAlldata(){
    getkey("")
        fetch("https://notetaker4.onrender.com/home")
        .then(resp => resp.json())
        .then((res) => {
            getData(res)
        })
        navigate("/home") 
    }
    const searchTheKey = async () => {
        if (keyToserach) {
          console.log(keyToserach);
          let response=await fetch(`http://localhost:5000/search/${keyToserach}`)
          let result = await response.json();
          if (result.length > 0) {
            getData(result)

          } else {
            console.log("No results found");
          }
        } else {
          console.log("Please enter a search term");
        }
      };
      
      



    return (
        <div id='home'>
            <nav>
                <Link to={"/home"}>
                    <button onClick={()=>{getAlldata()}}><AiFillHome /> Home</button>
                </Link>
                <Link to={"/addnote"}>
                    <button><AiOutlinePlus /> AddNote</button>
                </Link>
                <Link >
                    <button><AiFillDelete /> DeleteAll</button>
                </Link>
                <Link >
                    <button><AiOutlineExport />  Export</button>
                </Link>
                <Link onClick={handleLogout} to="/signin">
                    <button > LogOut</button>
                </Link>
            </nav>
            <div id='search-bar'>
                <input type="text" placeholder='search ..!' value={keyToserach} onChange={(e)=>{getkey(e.target.value)}} />
                <button onClick={()=>{searchTheKey()}} >search</button>
            </div>
            { data.length>0?data.map((note, id) => {
                    return (
                       
                       
                        <div className="allNote" key={id} >
                            <Link to={`/${note._id}`}>
                            <p> <span><IoTimeSharp /></span>{note.time}</p>
                            <p>{note.title}</p>
                            </Link>
                            <p>{note.description}</p>
                        </div>
                       
                    )
                })
                :
                    <h1>No note is there</h1>
            }



        </div>
    )
}

export default Home