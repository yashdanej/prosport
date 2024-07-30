import { FeatherIcons, H5, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { featuredCourseData } from "../../../../Data/Dashboard/EducationData";
import { Link } from "react-router-dom";
import './checkIcon.css';

const FeaturedCoursesBody = () => {
  return (
    <tbody>
      {featuredCourseData.map((data, i) => (
        <tr key={i}>
          <td>{data.name}</td>
          <td>
            <span className="d-flex align-item-center gap-2 font-primary">
              {data.ratting}
            </span>
          </td>
          <td className="initial-color" id={data.id}>
            <div className="checkIcon">
              <div className="checkbox-wrapper">
                <input checked={true} type="checkbox"/>
                <svg viewBox="0 0 35.6 35.6">
                  <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                  <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                  <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                </svg>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default FeaturedCoursesBody;
