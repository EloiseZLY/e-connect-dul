// Kuan Tsa Chen
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Cardlist.css";
import Card from "../Card";

const Cardlist = ({ status, current }) => {
  const defaultUser = [
    {
      firstName: "Jimmy",
      lastName: "Zhang",
      email: "jimmylovewebdev@gmail.com",
      intro:
        "Hi, My name is Jimmy and I'm a software engineer. My current focus is taking John's web class.",
      phone: "206123456789",
      job: "Web Developer",
      location: "San Mateo, CA",
      profileImg: "/images/jimmy-icon.jpeg",
    },
    {
      profileImg: "/images/icon1.webp",
      firstName: "Ben",
      lastName: "Lee",
      email: "benlee95@gmail.com",
      intro: "Hi I'm Ben.",
      phone: "1234567890",
      job: "Data Analyst",
      location: "Los Angeles, CA",
    },
    {
      profileImg: "/images/icon2.webp",
      firstName: "Amy",
      lastName: "Kim",
      email: "amy123@gmail.com",
      intro: "Hello",
      phone: "40392102312",
      job: "Human resource specialist",
      location: "New York, NY",
    },
    {
      profileImg: "/images/icon3.jpeg",
      firstName: "Dory",
      lastName: "lin",
      email: "dorybbbb@gmail.com",
      intro: "Hello world",
      phone: "59192439129",
      job: "UX/UI designer",
      location: "Seattle, WA",
    },
  ];
  const [cards, setCards] = useState([]);

  const populateCards = () => {
    if (current !== undefined) {
      fetch(`/get${status}Cards`)
        .then((res) => res.json())
        .then((item) => {
          console.log("fetching success");
          setCards(item);
        })
        .catch(() => {
          console.log("fetching error");
        });
    } else {
      console.log("use default users");
    }
  };

  useEffect(populateCards, [current, status]);

  const renderCard = () => {
    if (cards.length > 0) {
      return cards.map((items) => (
        <div className="col-sm-3" key={items.id}>
          <Card currentUser={items} />
        </div>
      ));
    } else {
      return <h3 className="p-3">You don't have any cards here!</h3>;
    }
  };
  return (
    <>
      <div className="row py-3 mx-5">
        {status === "My" ? <h2 className="p-3">Your Cards</h2> : ""}
        {status === "Other" ? <h2 className="p-3">Collections</h2> : ""}

        {status === "gallery" ? <h2 className="p-3">Cards Gallery</h2> : ""}
        {status === "gallery"
          ? defaultUser.map((items) => (
              <div className="col-sm-3" key={items.id}>
                <Card currentUser={items} status={"gallery"} />
              </div>
            ))
          : renderCard()}
      </div>
    </>
  );
};
Cardlist.propTypes = {
  status: PropTypes.string.isRequired,
};
export default Cardlist;
