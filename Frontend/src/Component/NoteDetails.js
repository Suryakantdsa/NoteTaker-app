import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome, AiOutlinePlus, AiFillDelete, AiOutlineExport } from "react-icons/ai";
import "./Home.css"

function NoteDetails() {
    // const [oneNote, getNote] = useState([])
    const [title,getTitle]=useState("")
    const [desc,getDesc]=useState("")
    const navigate = useNavigate()
    const params = useParams()
    console.log(params.id)

    useEffect(() => {
        getNOTEdetails()
    }, [])

    const getNOTEdetails = async () => {
        let result = await fetch(`https://notetaker4.onrender.com/${params.id}`)
        result = await result.json()
        // getNote(result)
        getDesc(result.description)
        getTitle(result.title)

    }




    const handleLogout = () => {
        localStorage.clear()
        navigate("/signin")
    }
    const deleteALL = async () => {
        let result = await fetch(`https://notetaker4.onrender.com/home`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        console.log(result)
        if (result) {
            getNOTEdetails()
        }
    }

    const updateTheNote=async()=>{
        let time=new Date().toLocaleString()
        let result = await fetch(`https://notetaker4.onrender.com/note/${params.id}`, {
            method: "put",
            body:JSON.stringify({title:title,description:desc,time:time}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json()
        console.log(result)

        navigate("/home")
    }
    const deleteTheNote=async()=>{
        let result=await fetch(`https://notetaker4.onrender.com/note/${params.id}`,{
            method:"Delete"
        })
        result=await result.json()
        if(result){
            // alert("the record is deleted")
            navigate("/home")
        }

       
    }


    return (
        <div>
            <div id='home'>

                <nav>
                    <Link to={"/home"}>
                        <button onClick={() => { navigate("/home") }}><AiFillHome /> Home</button>
                    </Link>
                    <Link to={"/addnote"}>
                        <button><AiOutlinePlus /> AddNote</button>
                    </Link>
                    <Link onClick={() => { deleteALL() }} >
                        <button><AiFillDelete /> DeleteAll</button>
                    </Link>
                    <Link >
                        <button><AiOutlineExport />  Export</button>
                    </Link>
                    <Link onClick={handleLogout} >
                        <button > LogOut</button>
                    </Link>
                </nav>

                <div id="update-page">
                    <input id="one-title" value={title} onChange={(e)=>{getTitle(e.target.value)}}/>
                    <textarea id="one-desc" value={desc} onChange={(e)=>{getDesc(e.target.value)}} />
                    <div>
                        <Link onClick={updateTheNote}>
                            <button>Update</button>
                        </Link>
                        <Link onClick={deleteTheNote}>
                            <button>Delete</button>
                        </Link>
                    </div >
                </div>


            </div>

        </div>
    )
}

export default NoteDetails