import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchRestaurant } from "../../services/yelpService"
// import { addRestaurant } from '../../services/tripService'


const Restaurants = (props) => {
  const [formData, setFormData] = useState({
    query: ''
  })
  const [results, setResults] = useState([])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      searchRestaurant(formData.query)
        .then(results => {
          setResults(results.businesses)
        })
        .catch(() => {
          console.log("something went wrong!");
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddSubmit = (restaurant) => {
    const trip = props.trip
    try {
      props.handleAddRestaurant(restaurant, trip)
    } catch (err) {
      console.log(err)
    }
  }

  const { query } = formData
  const isFormInvalid = () => {
    return !(query)
  }

  if (results === null) {
    return <div>Try a different search</div>;
  } else {
    return (
      <>
        <div>
          <h3>Restaraunt Search</h3>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="City, State"
              type="text"
              value={query}
              name="query"
              onChange={handleChange}
            />
            <button
              disabled={isFormInvalid()}
            >Get Restaurant
            </button>
          </form>
          <div>
            {results.length ?
              <>
                <div className="restaurant-cards parent">
                  {results.map((restaurant, idx) =>
                    <div className="card child col-sm-3" key={restaurant._id}>
                      <div className='img-div'>
                        <img id="restaurant-img" src={restaurant.image_url} className="card-img-top" alt="..." />
                      </div>
                      {restaurant.name &&
                        <h5 className="card-header">
                          {restaurant.name}
                        </h5>
                      }
                      <p>Rating: {restaurant.rating}/5</p>
                      <p>Price: {restaurant.price}</p>
                      <p> Contact: {restaurant.phone}</p>
                      <button className="btn btn-success" onClick={() => handleAddSubmit(restaurant)}>Add to Trip</button>
                    </div>
                  )}
                </div>
              </>
              :
              <h4>Search for a city to get results</h4>
            }
          </div>
        </div>
      </>
    );
  }
}
export default Restaurants;




