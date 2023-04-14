import fullStarIcon from "../assets/full-star.svg";
import halfStarIcon from "../assets/half-star.svg";

export const stars = (course_item) => {
    const stringRating = course_item && course_item.rating.toString();
    const point = Number(stringRating[0]);
    const decimal_point = Number(stringRating[2]);
    const stars = [];
    for (let i = 0; i < point; i++) {
      stars.push(
        <img src={fullStarIcon} alt="Course rating, star icon" key={i} />
      );
    }
    if (decimal_point != undefined) {
      if (decimal_point > 7) {
        stars.push(
          <img
            src={fullStarIcon}
            alt="Course rating, star icon"
            key={decimal_point + fullStarIcon}
          />
        );
      } else if (decimal_point > 4 && decimal_point < 8) {
        stars.push(
          <img
            src={halfStarIcon}
            alt="Course rating, half-star icon"
            key={decimal_point + halfStarIcon}
          />
        );
      }
    }

    return stars;
  };
