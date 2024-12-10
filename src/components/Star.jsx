import React, { useState } from "react";

export default function Star({setStars}) {
    // console.log(stars)
  return (
    <div>
      <div className="rating">


        <input value="5" name="rating" id="star5" onClick={()=> setStars(5)} type="radio" />
        <label title="5 stars" for="star5">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgOne"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgTwo"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </label>

        <input value="4" name="rating" id="star4" onClick={()=> setStars(4)} type="radio" />
        <label title="4 stars" for="star4">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgOne"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgTwo"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </label>

        <input value="3" name="rating" id="star3" onClick={()=> setStars(3)} type="radio" />
        <label title="3 stars" for="star3">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgOne"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgTwo"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </label>

        <input value="2" name="rating" id="star2" onClick={()=> setStars(2)} type="radio" />
        <label title="2 stars" for="star2">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgOne"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgTwo"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </label>

        <input value="1" name="rating" id="star1" onClick={()=> setStars(1)} type="radio" />
        <label title="1 star" for="star1">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgOne"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
            className="svgTwo"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </label>


      </div>
    </div>
  );
}
