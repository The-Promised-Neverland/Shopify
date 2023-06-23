import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const Rating = ({ value, text }) => {
  return (
    <>
      <div className="rating">
        <span>
          {value >= 1 ? (
            <FaStar style={{ color: "yellow" }} />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt style={{ color: "yellow" }} />
          ) : (
            <FaRegStar style={{ color: "yellow" }} />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <FaStar style={{ color: "yellow" }} />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt style={{ color: "yellow" }} />
          ) : (
            <FaRegStar style={{ color: "yellow" }} />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <FaStar style={{ color: "yellow" }} />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt style={{ color: "yellow" }} />
          ) : (
            <FaRegStar style={{ color: "yellow" }} />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <FaStar style={{ color: "yellow" }} />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt style={{ color: "yellow" }} />
          ) : (
            <FaRegStar style={{ color: "yellow" }} />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <FaStar style={{ color: "yellow" }} />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt style={{ color: "yellow" }} />
          ) : (
            <FaRegStar style={{ color: "yellow" }} />
          )}
        </span>
        {/*text && text meansn if theres text it will show text else will show null*/}
      </div>
      {text && <span className="rating-text">{text}</span>}
    </>
  );
};

export default Rating;
