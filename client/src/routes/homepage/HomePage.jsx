import React, { useContext } from 'react'
import './homepage.scss'
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'

function homePage() {

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)

  return (
    <div className='homePage'>
        <div className="textContainer">
            <div className="wrapper">
                <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Illo quidem quod ducimus dicta voluptatem perferendis 
                    voluptatum quia possimus similique quis? Tempora vitae 
                    dignissimos doloribus, laborum impedit in quibusdam eum molestias!
                </p>
                <SearchBar/>
                <div className="boxes">
                    <div className="box">
                        <h1>16+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                        <h1>1200+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default homePage