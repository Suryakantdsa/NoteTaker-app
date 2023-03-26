import React, { useState } from 'react'
import { AiFillHome, AiOutlinePlus, AiFillDelete, AiOutlineExport } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import "./Home.css"
import "./AddNotes.css"
import { Link } from 'react-router-dom'
function AddNotes() {
    const [title, getTitle] = useState("")
    const [desc, getDesc] = useState("")
    const navigate = useNavigate()
    const handleAdd = async () => {
        if (title && desc) {
            let time = new Date().toLocaleString()

            fetch("https://notetaker4.onrender.com/addnote",
                {
                    method: "post",
                    body: JSON.stringify({ title: title, description: desc, time: time })
                    , headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(resp => resp.json())
                .then((data) => {
                    if (data) {
                        navigate("/home")
                    }
                    console.log(data)
                })
                .catch(err => console.log(err))

        }
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
            // getNOTEdetails()
        }
    }

    return (
        <>
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


                <div id="addnote">
                    <div>
                        <label htmlFor='title'>
                            Title:
                        </label>
                        <input type="title" id='title' placeholder='Enter title' onChange={(e) => { getTitle(e.target.value) }} value={title} />
                        <label htmlFor='desc'>
                            Description:
                        </label>
                        <textarea id='desc' placeholder='what is on your mind' rows="5" cols="50" onChange={(e) => { getDesc(e.target.value) }} value={desc} />
                        <button onClick={() => handleAdd()}>Add note</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddNotes